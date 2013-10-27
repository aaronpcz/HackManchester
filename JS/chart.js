 google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Food', 'Types'],
          ['Salty',     0.1],
          ['Sweet',      0.3],
          ['Sour',  0.1],
          ['Meaty', 0.1],
		  ['Bitter', 0.4],
		  
          
        ]);

        var options = {
          title: 'Weekly flavour preferences!'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
      }