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
	var i = 1;
	$.each( data.matches, function(key, value){
		if(i > 3)
		{
				stuff.innerHTML = stuff.innerHTML + "<br style='clear:both'>";
				
				i=1;
		}
		var image = value.imageUrlsBySize[90];
		
		var title = "<span class='title'>"+value.recipeName+"</span>"
		$("#stuff").hide();
		stuff.innerHTML = stuff.innerHTML + "<div class='recipe'>"+title+"<a href='http://www.yummly.com/recipe/"+ value.id + "'><img src='"+ image + "' /></a></div>";
		$("#stuff").fadeIn();
		i++;
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
	}
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
				console.log(value);
			}
		})
	}
}