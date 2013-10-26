function rec3(data){	
<<<<<<< HEAD
		var url = "http://api.yummly.com/v1/api/recipes?_app_id=7b053b82&_app_key=a2b4713bdb0b9b132a16a104823ed74c";
=======
		var url = "http://www.recipepuppy.com/api/";
>>>>>>> 15b91f47779d0f308f77e6704b9634d14825262c

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
<<<<<<< HEAD
				q:data,
=======
				i:data,
>>>>>>> 15b91f47779d0f308f77e6704b9634d14825262c
			},
			success: function(response){ console.log(response); },
		});
}

<<<<<<< HEAD
=======
function rec(data) {
		var url = "http://www.recipepuppy.com/api/";
		
		var script = document.getElementById("a");
		var newUrl = url+"?i="+data+"&callback=rec2";
		script.src=newUrl;
		console.log(script.src);
		
	
}

>>>>>>> 15b91f47779d0f308f77e6704b9634d14825262c
function rec2(data) {
	console.log(data);
	var stuff = document.getElementById("stuff");
	stuff.innerHTML = "";
	
<<<<<<< HEAD
	if(data.matches.length == 0)
=======
	if(data.results.length == 0)
>>>>>>> 15b91f47779d0f308f77e6704b9634d14825262c
	{
		stuff.innerHTML = "No results...";
	}
	else
	{
<<<<<<< HEAD
	$.each( data.matches, function(key, value){
	
		//var image = value.smallImageUrls[0];
		var image = value.imageUrlsBySize[90];
		
		$("#stuff").hide();
		stuff.innerHTML = stuff.innerHTML + "<a href='http://www.yummly.com/recipe/"+ value.id + "'><img src='"+ image + "' /></a>";
=======
	$.each( data.results, function(key, value){
		$("#stuff").hide();
		stuff.innerHTML = stuff.innerHTML + ("<a href='"+value.href+"'><img src='"+value.thumbnail+"' /></a>");
>>>>>>> 15b91f47779d0f308f77e6704b9634d14825262c
		$("#stuff").fadeIn();
	})
	}
}