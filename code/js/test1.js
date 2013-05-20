var northwestern = 2;
var michigan = 1;
var soccer = "soccer" + "ball"
console.log("Northwestern is #" + northwestern + " while Michigan is #" + michigan + " soccer is: " + soccer);
// show many months in a year
// var months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
// var total_months = 0;
// for (var i=0; i<months.length; i++){
// 	total_months += 1;
// 	console.log("Adding month: " + months[i]);
// 	console.log("Total months is: " + total_months);
// }

var Northwestern_object = {
	school:"Pretty good",
	weather:"Not so good",
	beach:"Beautiful",
	Sheridan:"Not so beautiful",
	football_team:"Terrible",
	name:"Northwestern"
}

console.log("before: ", Northwestern_object);
Northwestern_object['analytics'] = 'up-and-coming';
console.log("after: ", Northwestern_object);

var Michigan_object = {
	school:"Good",
	weather:"Not so good",
	beach:"Non-existant",
	football_team:"Excellent",
	name:"Michigan"
}

var big_ten_list = [];

big_ten_list.push(Northwestern_object);
big_ten_list.push(Michigan_object);
console.log(big_ten_list);

function trial (university) {
	if (university.football_team == 'Excellent'){
		console.log("Must be Michigan");
		console.log(university.name);
	}
	else {
		console.log("Must be Northwestern");
		console.log(university.name);
	}
}

// trial(Northwestern_object);

for (var i=0; i<big_ten_list.length; i++){
	trial(big_ten_list[i]);
}