"use strict" ;

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'calorie-counter'
});

connection.connect();

function getItems(callback) {
	connection.query("SELECT  * FROM  meals", function (err, result) {
		if (err) throw err;
		callback(result);
	})
}

function addItems(attributes, callback) {
	connection.query("INSERT INTO meals SET ?", attributes, function (err, result) {
		if (err) throw err;
		callback({"status": "ok"});
	})
}

function deleteItems(id, callback) {
	connection.query("DELETE FROM meals WHERE id = ?", id, function (err, result) {
		console.log(result);
		if (err) throw err;
		if  (result.affectedRows === 1) {
			callback({"status": "ok"});
		} else {
			callback({"status": "not exists"});
		}
	})
}



module.exports = {
  getItems: getItems,
  addItems: addItems,
  deleteItems: deleteItems
};