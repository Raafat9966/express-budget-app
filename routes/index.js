const { clearCache } = require("ejs");
const moment = require("moment");
const router = require("express").Router();
const server = require("../models/server");

/* GET home page. */
router.get("/", (req, res) => {
	server
		.getInput()
		.then((result) => {
			let sum = result
				.map((element) => element.amount)
				.reduce((a, b) => a + b);
			res.status(200).render("index", { result, sum });
		})
		.catch((err) => {
			res.status(500).render("index", { result: [], sum: [] });
		});
});

router.post("/add", (req, res) => {
	let type = req.body.type;
	// * pos_to_neg(req.body.amount)
	let amount = type === "Expenses" ? ~req.body.amount + 1 : req.body.amount;
	let description = req.body.description;
	let inputDate = moment().format("DD-MM-YY");

	server.addInput(amount, description, type, inputDate).then(() => {
		server
			.getInput()
			.then((result) => {
				res.status(200).redirect("/");
			})
			.catch((err) => {
				res.status(500).send(err);
			});
	});
});

router.delete("/delete/:id", async (req, res) => {
	try {
		await server.deleteItem(req.params.id);
		res.redirect("/");
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;
