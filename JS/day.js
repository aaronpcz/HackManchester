/**

function addMeal(data)
{
	
	
	
	
	// Get Day
	var d = new Date();
	var weekday=new Array(7);
	weekday[0]="Sunday";
	weekday[1]="Monday";
	weekday[2]="Tuesday";
	weekday[3]="Wednesday";
	weekday[4]="Thursday";
	weekday[5]="Friday";
	weekday[6]="Saturday";
	
	// Check if the day contains current information
	if(localStorage.getItem(weekday[d.getDay()]) == null)
	{
		// If the field is empty/null put it in
		localStorage.setItem(weekday[d.getDay()], recipe.id);
		
		// Update html
		loadDays(weekday[d.getDay()], data);
	}
	else
	{
		// If the field exists, refuse it
		// ...
		loadDays(weekday[d.getDay()], data);
	}
	
}

function loadDays(day,data) {
	
	// Load in the values 
	var recipe = data;
	console.log(recipe);
	var newDay = day.substr(0,3);
	
	
	var dayEl = document.getElementById(newDay);
	
	//var image = recipe.imageUrlsBySize[90];
	//dayEl.innerHTML = "<img src='"+image+"' />";
	dayEl.innerHTML = "Tick";


}
**/ 
