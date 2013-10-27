function rec3(data){	
		var url = "http://api.yummly.com/v1/api/recipes?_app_id=7b053b82&_app_key=a2b4713bdb0b9b132a16a104823ed74c";

			$.ajax({
			type: 'GET',
			url: url,
			async: false,
			jsonpCallback: "rec2",
			crossDomain: true,
			contentType: "application/json",
			dataType: 'jsonp',
			data:
			{
				q:data,
				requiresPictures: true,
				maxResult: "12",
				start: "0",
				
			},
			success: function(response){ console.log(response); },
		});
}

function rec2(data) {
	console.log(data);
	var stuff = document.getElementById("stuff");
	stuff.innerHTML = "";
	
	if(data.matches.length == 0)
	{
		stuff.innerHTML = "No results...";
	}
	else
	{
	
	$.each( data.matches, function(key, value){
		
		var image = value.imageUrlsBySize[90];
		
		var title = "<span class='title'>"+value.recipeName+"</span>"
		$("#stuff").hide();
		stuff.innerHTML = stuff.innerHTML + "<div class='recipe'><p>"+title+"</p><a href='http://www.yummly.com/recipe/"+ value.id + "'><img src='"+ image + "' /></a></div>";
		$("#stuff").fadeIn();
		
	})
	}
}

function saveFavourite(recipeId)
{
	if(window.localStorage.getItem(recipeId) == null)
	{
		window.localStorage.setItem(recipeId, "1");
	}
	else
	{
		var count = window.localStorage.getItem(recipeId);
		count = parseInt(count);
		count += 1;
		window.localStorage.setItem(recipeId, count.toString());
		window.localStorage.setItem("count", (parseInt(window.localStorage.getItem("count")) +1));
		
	}
	retrieveFavouriteForCalculating(recipeId);
}

function retrieveFavourite(recipeId)
{
			var url = "http://api.yummly.com/v1/api/recipes?_app_id=7b053b82&_app_key=a2b4713bdb0b9b132a16a104823ed74c";

			$.ajax({
			type: 'GET',
			url: url,
			async: false,
			crossDomain: true,
			contentType: "application/json",
			dataType: 'jsonp',
			data:
			{
				q:recipeId,
			},
			success: function(response){ rec4(recipeId, response); },
		});
}

function rec4(recipeId, data) {
	if(data.matches.length == 0)
	{
		stuff.innerHTML = "No results...";
	}
	else
	{
		$.each( data.matches, function(key, value){
			if(value.id == recipeId)
			{
				return value;
			}
		})
	}
}

function retrieveFavouriteForCalculating(recipeId)
{
			var url = "http://api.yummly.com/v1/api/recipes?_app_id=7b053b82&_app_key=a2b4713bdb0b9b132a16a104823ed74c";

			$.ajax({
			type: 'GET',
			url: url,
			async: false,
			crossDomain: true,
			contentType: "application/json",
			dataType: 'jsonp',
			data:
			{
				q:recipeId,
			},
			success: function(response){ gettingRecipeObject(recipeId, response); }
		});
}

function gettingRecipeObject(recipeId, data) {
	if(data.matches.length == 0)
	{
		stuff.innerHTML = "No results...";
	}
	else
	{
		$.each( data.matches, function(key, value){
			if(value.id == recipeId)
			{
				console.log(key);
				console.log(value);
				setupFlavour("bitter", value.flavors.bitter);
				setupFlavour("meaty", value.flavors.meaty);
				setupFlavour("salty", value.flavors.salty);
				setupFlavour("sour", value.flavors.sour);
				setupFlavour("sweet", value.flavors.sweet);
			}
		})
	}
}

function initialCount()
{
	window.localStorage.setItem("count", "0");
}

function updateAverageFlavors()
{
	var count = parseFloat(window.localStorage.getItem("count"));
	
	window.localStorage.setItem("bitter", (parseFloat(window.localStorage.getItem("bitter")) / count).toString());
	window.localStorage.setItem("meaty", (parseFloat(window.localStorage.getItem("meaty")) / count).toString());
	window.localStorage.setItem("salty", (parseFloat(window.localStorage.getItem("salty")) / count).toString());
	window.localStorage.setItem("sour", (parseFloat(window.localStorage.getItem("sour")) / count).toString());
	window.localStorage.setItem("sweet", (parseFloat(window.localStorage.getItem("sweet")) / count).toString());
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
