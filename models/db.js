const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

mongoose
	.connect(uri, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("mongoDB connected");
	})
	.catch((err) => {
		console.log(err);
		process.exit(1);
	});
