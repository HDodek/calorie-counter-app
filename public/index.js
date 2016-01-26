"use strict" ;

var url = 'http://localhost:3000/meals';


var nameInput = document.getElementById('name');
var caloriesInput = document.getElementById('calories');
var dateInput = document.getElementById('date');
var mealsContainer = document.getElementById('mealsList');
var addButton = document.getElementById('add')

function listAllItemsFromServer(callback) {
	var req = new XMLHttpRequest();
	req.open("GET", url);
	req.send();
	req.onreadystatechange = function () {
		if (req.readyState === 4) {
			var mealItem = JSON.parse(req.response);
			return callback(mealItem);
		}
	}
}

function listItems(mealItem) {
	mealItem.forEach(function(meal) {
		createSingleItem(meal);
	})
}

listAllItemsFromServer(listItems);

function createSingleItem(meal) {
	var meals = document.createElement("li");
		meals.innerText = meal.Name + " " + meal.Calorie + " " + "calories" + " " + meal.Date;
		mealsContainer.appendChild(meals);
}

function postNewItemToServer(callback) {
	var req = new XMLHttpRequest();
	req.open("POST", url);
	req.setRequestHeader('Content-Type', 'application/json');
	var text = ({"Name": nameInput.value, "Calorie": caloriesInput.value, "Date": dateInput.value})
	req.send(JSON.stringify(text));
	req.onreadystatechange = function () {
		if (req.readyState === 4) {
			var res = JSON.parse(req.response);
			return callback(text);
		}
	}
}

addButton.addEventListener("click", function() {
	postNewItemToServer(createSingleItem);
})






