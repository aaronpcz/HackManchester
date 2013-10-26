function rec3(data){	
		var url = "http://www.recipepuppy.com/api/";

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
				i:data,
			},
			success: function(response){ console.log(response); },
		});
}

function rec2(data) {
	console.log(data);
	var stuff = document.getElementById("stuff");
	stuff.innerHTML = "";
	
	if(data.results.length == 0)
	{
		stuff.innerHTML = "No results...";
	}
	else
	{
	$.each( data.results, function(key, value){
		$("#stuff").hide();
		stuff.innerHTML = stuff.innerHTML + ("<a href='"+value.href+"'><img src='"+value.thumbnail+"' /></a>");
		$("#stuff").fadeIn();
	})
	}
}