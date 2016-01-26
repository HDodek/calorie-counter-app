"use strict" ;

var url = 'http://localhost:3000/meals';


var nameInput = document.getElementById('name');
var caloriesInput = document.getElementById('calories');
var dateInput = document.getElementById('date');
var mealsContainer = document.getElementById('mealsList');

function listAllItemsFromServer(callback) {
	var req = new XMLHttpRequest();
	req.open("GET", url);
	req.send();
	req.onreadystatechange = function () {
		if (req.readyState === 4) {
			var mealItem = JSON.parse(req.response);
			console.log(mealItem);
			return callback(mealItem);
		}
	}
}

function listItems(mealItem) {
	mealItem.forEach(function(meal) {
		var meals = document.createElement("li");
		meals.setAttribute("ID", meal.ID, "Name", meal.Name, "Calorie", meal.Calorie, "Date", meal.Date);
		meals.innerText = (meal.ID,meal.name, meal.Name = "", meal.Calorie = 0, meal.Date = 0);
		mealsContainer.appendChild(meals);
	})
}

listAllItemsFromServer(listItems);






