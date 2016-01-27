"use strict" ;

var url = 'http://localhost:3000/meals';


var nameInput = document.getElementById('name');
var caloriesInput = document.getElementById('calories');
var dateInput = document.getElementById('date');
var mealsContainer = document.getElementById('mealsList');
var addButton = document.getElementById('add');
var allItemsButton = document.getElementById('all');
var filterButton = document.getElementById('filter');
var dateInput = document.getElementById('filterdate');
var sumCalories = document.getElementById('sumcalorie')

function filterFromServer(url, callback) {
	var req = new XMLHttpRequest();
	req.open("GET", url);
	req.send();
	req.onreadystatechange = function () {
		if (req.readyState === 4) {
			var res = JSON.parse(req.response);
			return callback(res);
		}
	}
}

function listAllItemsFromServer(callback) {
	var req = new XMLHttpRequest();
	req.open("GET", url);
	req.send();
	req.onreadystatechange = function () {
		if (req.readyState === 4) {
			var res = JSON.parse(req.response);
			return callback(res);
		}
	}
}

function sumCal(res) {
	var sum = 0;
	res.forEach(function(meal) {
		sum += meal.Calorie;
		sumCalories.innerText = "Sum of the calories: " + " " + sum;
		return sum;
	})
}

listAllItemsFromServer(sumCal);

function clearList() {
	mealsContainer.innerText = "";
}

function listItems(res) {
	res.forEach(function(meal) {
		var meals = document.createElement("li");
		meals.innerText = meal.Name + " " + meal.Calorie + " " + "calories" + " " + meal.Date;
		mealsContainer.appendChild(meals);
	})
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
			return callback(res);
		}
	}
}

addButton.addEventListener("click", function() {
	postNewItemToServer(listItems);
});

filterButton.addEventListener("click", function () {
	clearList();
	var newUrl = url + "/filter/" + dateInput.value;
	filterFromServer(newUrl, listItems)
	filterFromServer(newUrl, sumCal);
});

allItemsButton.addEventListener("click", function () {
	clearList();
	listAllItemsFromServer(listItems);
	listAllItemsFromServer(sumCal);
})

listAllItemsFromServer(listItems);
listAllItemsFromServer(sumCal);












