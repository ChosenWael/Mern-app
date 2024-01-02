import passport from 'passport';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
import generateGravatar from '../utils/generateGravatar.js';

// all passport strategies
import GoogleStrategy from 'passport-google-oauth20';

// to use .env variables in this file
dotenv.config();
const backendURL = process.env.BACKEND_BASE_URL;

// Funtion to send a flash message depending on which social account the user had originally registered with
const handleAuthError = (err, done) => {
	
	User.findOne({
		email: err.keyValue.email, 
	}).then((user) => {
		if (user.googleID)
			return done(null, false, {
				message: 'Registered using google account',
			});
		if (user.githubID)
			return done(null, false, {
				message: 'Registered using github account',
			});
		if (user.twitterID)
			return done(null, false, {
				message: 'Registered using twitter account',
			});
		if (user.linkedinID)
			return done(null, false, {
				message: 'Registered using linkedin account',
			});
	});
};

// Include all passport strategies' setup in this function itself
const setupPassport = () => {
	// setup a session with the logged in user, by serialising this user is
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	// end the current login session after deserialising the user
	passport.deserializeUser((id, done) => {
		User.findById(id)
			.then((user) => done(null, user))
			.catch((err) => console.log(`${err}`.bgRed.bold));
	});

	// setup for the google strategy
	passport.use(
		new GoogleStrategy(
			{
				// options for the google strategy
				clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
				clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
				callbackURL: `${backendURL}/api/auth/google/redirect`,
			},
			(accessToken, refreshToken, profile, done) => {
				// if a user with this google ID is present, serialise that user, otherwise create a new User
				User.findOne({ googleID: profile.id }).then((foundUser) => {
					if (!foundUser) {
						User.create({
							name: profile.displayName,
							isAdmin: false,
							isConfirmed: profile._json.email_verified,
							googleID: profile.id,
							email: profile._json.email,
							avatar: generateGravatar(profile._json.email), // gravatar is unique for all email IDs
						})
							.then((user) => {
								done(null, user);
							})
							.catch((err) => {
								handleAuthError(err, done);
							});
					} else {
						done(null, foundUser);
					}
				});
			}
		)
	);

};



export default setupPassport;
