const mongoose = require("mongoose");

const inputSchema = new mongoose.Schema({
	amount: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	inputDate: {
		type: String,
		required: true,
	},
});

const Input = mongoose.connection.model("inputs", inputSchema);

const addInput = (amount, description, type, inputDate) => {
	return new Promise((res, rej) => {
		const newInput = new Input({
			amount,
			description,
			type,
			inputDate,
		});
		newInput
			.save()
			.then((result) => res(result))
			.catch((err) => rej(err));
	});
};

const getInput = () => {
	return new Promise((res, rej) => {
		Input.find()
			.then((result) => {
				res(result);
			})
			.catch((err) => {
				rej(err);
			});
	});
};

module.exports = {
	addInput,
	getInput,
};
