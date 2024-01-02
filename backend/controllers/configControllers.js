import asyncHandler from 'express-async-handler';

const getPaypalClientId = asyncHandler(async (req, res) => {
	res.send(process.env.PAYPAL_CLIENT_ID);
});

export { getPaypalClientId };
