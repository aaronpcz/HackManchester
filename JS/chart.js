 google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Food', 'Types'],
          ['Salty', parseFloat(window.localStorage.getItem("averageSalty"))],
          ['Sweet', parseFloat(window.localStorage.getItem("averageSweet"))],
          ['Sour',  parseFloat(window.localStorage.getItem("avaergaeSour"))],
          ['Meaty', parseFloat(window.localStorage.getItem("averageMeaty"))],
		  ['Bitter', parseFloat(window.localStorage.getItem("averageBitter"))],
		  
          
        ]);

        var options = {
          title: 'Weekly flavour preferences!'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
      }