"use strict" ;

var url = 'http://localhost:3000/meals';


var nameInput = document.getElementById('name');
var caloriesInput = document.getElementById('calories');
var dateInput = document.getElementById('date');
var mealsContainer = document.getElementById('listContainer');
var addButton = document.getElementById('add');
var allItemsButton = document.getElementById('all');
var filterButton = document.getElementById('filter');
var dateFilterInput = document.getElementById('filterdate');
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

function listItems(res) {
	res.forEach(function(meal) {
		var meals = document.createElement("p");
		meals.innerText = meal.ID + "." + " " + meal.Name + " " + meal.Calorie + " " + "calories" + " " + meal.Date.split("T")[0];
		mealsContainer.appendChild(meals);
	})
}
listAllItemsFromServer(listItems);

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

function postNewItemToServer(callback) {
	var req = new XMLHttpRequest();
	req.open("POST", url);
	req.setRequestHeader('Content-Type', 'application/json');
	var text = ({"Name": nameInput.value, "Calorie": caloriesInput.value, "Date": dateInput.value})
	req.send(JSON.stringify(text));
	req.onreadystatechange = function () {
		if (req.readyState === 4) {
			var item = JSON.parse(req.response);
			return callback;
		}
	}
}

addButton.addEventListener("click", function() {
	clearList();
	postNewItemToServer(listAllItemsFromServer(listItems));
});

filterButton.addEventListener("click", function () {
	clearList();
	var newUrl = url + "/filter/" + dateFilterInput.value;
	filterFromServer(newUrl, listItems)
	filterFromServer(newUrl, sumCal);
});

allItemsButton.addEventListener("click", function () {
	clearList();
	listAllItemsFromServer(listItems);
	listAllItemsFromServer(sumCal);
})


listAllItemsFromServer(sumCal);












