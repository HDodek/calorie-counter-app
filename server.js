"use strict" ;

var express = require("express");
var bodyParser = require("body-parser");
var items = require("./meal.js");
var app = express();

app.use(express.static("public"));
app.use(bodyParser.json());


app.get('/meals', function (req, res) {
	items.getItems(function (result) {
		res.status(200).json(result);
	}) 
});

app.post('/meals', function (req, res) {
		items.addItems(req.body, function (result) {
		res.json(result);
	})
})

app.delete('/meals/:id', function (req, res) {
	items.deleteItems(req.params.id, function (result) {
		res.json(result);
	})

})


app.listen(3000, function () {
  console.log("Listening on port 3000...")
});