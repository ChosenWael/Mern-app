import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'Admin',
		email: 'admin@Echri.com',
		password: bcrypt.hashSync('pass123', 12),
		isAdmin: true,
		isConfirmed: true,
		avatar: '/images/icon_user.png',
	},
	{
		name: 'Rajat',
		email: 'rajat@Echri.com',
		password: bcrypt.hashSync('pass123', 12),
		isConfirmed: true,
		avatar: '/images/icon_user.png',
	},
	{
		name: 'Ravi',
		email: 'ravi@Echri.com',
		password: bcrypt.hashSync('pass123', 12),
		isConfirmed: true,
		avatar: '/images/icon_user.png',
	},
	{
		name: 'Voca',
		email: 'dataxom889@flmmo.com',
		password: bcrypt.hashSync('pass123', 12),
		isConfirmed: true,
		avatar: '/images/icon_user.png',
	},
];

export default users;
