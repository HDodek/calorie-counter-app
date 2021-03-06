"use strict" ;

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'calorie-counter',
  timezone : 'utc'
});

connection.connect();

function getItems(callback) {
	connection.query("SELECT  * FROM  meals", function (err, result) {
		if (err) console.log(err);
		callback(result);
	})
}

function addItems(attributes, callback) {
	connection.query("INSERT INTO meals SET ?", attributes, function (err, result) {
		if (err) console.log(err);
		callback({"status": "ok"});
	})
}

function deleteItems(id, callback) {
	connection.query("DELETE FROM meals WHERE id = ?", id, function (err, result) {
		if (err) console.log(err);
		if  (result.affectedRows === 1) {
			callback({"status": "ok"});
		} else {
			callback({"status": "not exists"});
		}
	})
}

function filterItemsByDate(date, callback) {
	connection.query("SELECT ID, Name, Calorie, Date FROM meals WHERE CAST(date AS DATE)=?", date, function (err, result) {
		if (err) throw err;
		callback(result);
	})
}



module.exports = {
  getItems: getItems,
  addItems: addItems,
  deleteItems: deleteItems,
  filterItemsByDate: filterItemsByDate
};