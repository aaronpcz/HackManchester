// Base API Call
var url = "http://api.yummly.com/v1/api/recipes?_app_id=083f169b&_app_key=c267473a2514311e7d6cb7280f813e7f";

// Dynamically obtain an object through the recipe id.
function getRecipeByID(id) {
	var temp = new Object();
	
		$.ajax({
			type: 'GET',
			url: url,
			async: false,
			crossDomain: true,
			contentType: "application/json",
			dataType: 'jsonp',
			data:
			{
				q:id,
				requiresPictures: true,
				maxResult: "1",
			},
			success: function(data){ localStorage.setItem("temp", JSON.stringify(data));
			}
		});
		return JSON.parse(localStorage.getItem("temp"));
}

// Search the API recipe database through a query
function getRecipesBySearch(query) {
	var masterObject = new Object();
	
			$.ajax({
			type: 'GET',
			url: url,
			async: false,
			crossDomain: true,
			contentType: "application/json",
			dataType: 'jsonp',
			data:
			{
				q:query,
				requiresPictures: true,
				maxResult: "12",
				start: "0",
				
			},
			success: function(data) { localStorage.setItem("temp", JSON.stringify(data)) }
		});
		return JSON.parse(localStorage.getItem("temp"));
}

// Display search results
function displaySearch(query) {
	// Initialise the query
	var data = getRecipesBySearch(query);
	data = getRecipesBySearch(query);


	// Grab the search results space element to display results
	var searchSpace = document.getElementById("stuff");
	// Clear the results area in case it's already in use
	searchSpace.innerHTML = "";
	
	// Make a check to see if there are any actual results for the query
	if(data.matches.length == 0)
	{
		// Display a simple error showing there's no results for that query
		searchSpace.innerHTML = "No results... ";
	}
	else
	{
		// Loop through the recipe objects that we have 
		$.each( data.matches, function(key, value){
			// Obtain the image to display
			var image = value.imageUrlsBySize[90];
			// Create a title element
			var title = "<span class='title'>"+value.recipeName+"</span>";
			// Hide the results in preperation for fadeIn
			$("#stuff").hide();
			// Create the results :)
			searchSpace.innerHTML = searchSpace.innerHTML + "<div class='recipe'><p>"+title+"</p><div class='addmeal' value='"+value.id+"'  onClick=\"addMeal('"+value.id+"')\"> </div><a href='http://www.yummly.com/recipe/"+ value.id + "'><img src='"+ image + "' /></a></div>";
			// Fade in :)
			$("#stuff").fadeIn();
		
	})
	}
}

// Add a recipe to your daily meal calander
function addMeal(recipeID){
	// Check if the localStorage contains an entry already and if not make one
	if(localStorage.getItem(recipeID) == null)
	{
		// Set the chosen recipe to an initial value of one
		localStorage.setItem(recipeID, "1");
	}
	else
	{
		// Obtain the initial counter
		var count = parseInt(localStorage.getItem(recipeID));
		count++;
		// Set the local recipe variable counter to a new value
		localStorage.setItem(recipeID, count.toString());		
	}
	// Update Flavour values
	var r = getRecipeByID(recipeID)
	updateFlavours(r);
	
	// Get the current Day
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
		localStorage.setItem(weekday[d.getDay()], JSON.stringify(getRecipeByID(recipeID)));
	}
	
}

// Load and update the HTML of the calandar
function loadDays() {
	
	var weekday=new Array(7);
	weekday[0]="Sunday";
	weekday[1]="Monday";
	weekday[2]="Tuesday";
	weekday[3]="Wednesday";
	weekday[4]="Thursday";
	weekday[5]="Friday";
	weekday[6]="Saturday";
	
	for(var i=0;i<=6;i++) {
	
		var day = weekday[i];
		day = day.substr(0,3);
		
		if(localStorage.getItem(weekday[i]) == null)
		{
			// do nothing ... 
		}
		else
		{
			var dayObj = JSON.parse(localStorage.getItem(weekday[i]));
			var dayEl = document.getElementById(day);
			
		dayEl.innerHTML = "<img src='"+dayObj.imageUrlsBySize[90]+"'/>";		
		}
	}
}


// Update Flavour Values
function updateFlavours(recipeObject){
	var r = recipeObject;
	
	// Update Sweet
	localStorage.setItem("sweet",(parseFloat(localStorage.getItem("sweet") + r.flavors.sweet)));
	// Update Salty
	localStorage.setItem("salty",(parseFloat(localStorage.getItem("salty") + r.flavors.salty)));
	// Update bitter
	localStorage.setItem("bitter",(parseFloat(localStorage.getItem("bitter") + r.flavors.bitter)));
	// Update Sour
	localStorage.setItem("sour",(parseFloat(localStorage.getItem("sour") + r.flavors.sour)));
	// Update Meaty
	localStorage.setItem("meaty",(parseFloat(localStorage.getItem("meaty") + r.flavors.meaty)));
}


function updateAverageFlavors()
{
	// It GETS THE JOB DONE! >:D
	var count = parseFloat(localStorage.getItem("count"));

	if(window.localStorage.getItem("averageBitter") == null)
	{
		window.localStorage.setItem("averageBitter", "0");
	}
	window.localStorage.setItem("averageBitter", ((parseFloat(window.localStorage.getItem("bitter"))) / count).toString());
	if(window.localStorage.getItem("averageMeaty") == null)
	{
		window.localStorage.setItem("averageMeaty", "0");
	}
	window.localStorage.setItem("averageMeaty", ((parseFloat(window.localStorage.getItem("meaty"))) / count).toString());
	if(window.localStorage.getItem("averageSalty") == null)
	{
		window.localStorage.setItem("averageSalty", "0");
	}
	window.localStorage.setItem("averageSalty", ((parseFloat(window.localStorage.getItem("salty"))) / count).toString());
	if(window.localStorage.getItem("averageSour") == null)
	{
		window.localStorage.setItem("averageSour", "0");
	}
	window.localStorage.setItem("averageSour", ((parseFloat(window.localStorage.getItem("sour"))) / count).toString());
	if(window.localStorage.getItem("averageSweet") == null)
	{
		window.localStorage.setItem("averageSweet", "0");
	}
	window.localStorage.setItem("averageSweet", ((parseFloat(window.localStorage.getItem("sweet"))) / count).toString());
}

function setupFlavour(flavour, value)
{	
	//
	if(window.localStorage.getItem("bitter") == null)
	{
		window.localStorage.setItem("bitter", "0");
	}
	if(flavour == "bitter")
	{
		var calc = parseFloat(window.localStorage.getItem("bitter"));
		calc = calc + value;
		window.localStorage.setItem("bitter", calc);
	}
	
	//
	if(window.localStorage.getItem("meaty") == null)
	{
		window.localStorage.setItem("meaty", "0");
	}
	if(flavour == "meaty")
	{
		var calc = parseFloat(window.localStorage.getItem("meaty"));
		calc = calc + value;
		window.localStorage.setItem("meaty", calc);
	}
	
	//
	if(window.localStorage.getItem("salty") == null)
	{
		window.localStorage.setItem("salty", "0");
	}
	if(flavour == "salty")
	{
		var calc = parseFloat(window.localStorage.getItem("salty"));
		calc = calc + value;
		window.localStorage.setItem("salty", calc);
	}
	
	//
	if(window.localStorage.getItem("sour") == null)
	{
		window.localStorage.setItem("sour", "0");
	}
	if(flavour == "sour")
	{
		var calc = parseFloat(window.localStorage.getItem("sour"));
		calc = calc + value;
		window.localStorage.setItem("sour", calc);
	}
	
	//
	if(window.localStorage.getItem("sweet") == null)
	{
		window.localStorage.setItem("sweet", "0");
	}
	if(flavour == "sweet")
	{
		var calc = parseFloat(window.localStorage.getItem("sweet"));
		calc = calc + value;
		window.localStorage.setItem("sweet", calc);
	}
}
