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
	
		//var image = value.smallImageUrls[0];
		var image = value.imageUrlsBySize[90];
		
		$("#stuff").hide();
		stuff.innerHTML = stuff.innerHTML + "<a href='http://www.yummly.com/recipe/"+ value.id + "'><img src='"+ image + "' /></a>";
		$("#stuff").fadeIn();
	})
	}
}