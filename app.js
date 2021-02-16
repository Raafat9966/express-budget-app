const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const indexRouter = require("./routes/index");

require("dotenv").config();
const app = express();
let port = process.env.PORT || 3000;

require("./models/db");
// view engine setup
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.listen(port, () =>
	console.log(`Server running on http://localhost:${port}`)
);
