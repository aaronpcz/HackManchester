 google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Food', 'Types'],
          ['Salty', parseFloat(window.localStorage.getItem("salty"))],
          ['Sweet', parseFloat(window.localStorage.getItem("sweet"))],
          ['Sour',  parseFloat(window.localStorage.getItem("sour"))],
          ['Meaty', parseFloat(window.localStorage.getItem("meaty"))],
		  ['Bitter', parseFloat(window.localStorage.getItem("bitter"))],
		  
          
        ]);

        var options = {
          title: 'Weekly flavour preferences!'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
      }