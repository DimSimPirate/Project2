google.charts.load('current', {packages: ['corechart']});

var options = {'title':"Composition of Earth's atmosphere  ",
        'width':400,
        'height':300};
var data 

function drawPie(){
   	graphData = new google.visualization.DataTable();
	graphData.addColumn('string', 'Element');
	graphData.addColumn('number', 'Percentage');
	$.each(data, function(key, val) {
		graphData.addRow([key, val]);
	})
	var chart = new google.visualization.PieChart($("#myChart")[0]);
	chart.draw(graphData, options);
}

$(document).ready(function() {
	
	//Query to get all data needed for overall statistics
	$.ajax({
		url:'/overall/getOverall', 
		complete: function (data) {
			jsonText = JSON.parse(data.responseText);
			
			document.getElementById("mostRevTitle").innerHTML = jsonText.mostRevisions.title;
			document.getElementById("mostRevSum").innerHTML = jsonText.mostRevisions.amount;
			document.getElementById("leastRevTitle").innerHTML = jsonText.leastRevisions.title;
			document.getElementById("leastRevSum").innerHTML = jsonText.leastRevisions.amount;
			document.getElementById("largeGroupName").innerHTML = jsonText.editedByLargestGroup.title;
			document.getElementById("largeGroupSum").innerHTML = jsonText.editedByLargestGroup.amount;
			document.getElementById("smallGroupName").innerHTML = jsonText.editedBySmallestGroup.title;
			document.getElementById("smallGroupSum").innerHTML = jsonText.editedBySmallestGroup.amount;
			document.getElementById("longestHistTitle").innerHTML = jsonText.longestHistory.title;
			document.getElementById("longestHistDate").innerHTML = jsonText.longestHistory.date;
			document.getElementById("shortestHistTitle").innerHTML = jsonText.shortestHistory.title;
			document.getElementById("shortestHistDate").innerHTML = jsonText.shortestHistory.date;
			
		}
	})
		
    $.getJSON('/data',null, function(rdata) {
    	data = rdata
    }
    );
    
    $("#pie").click(function(event){
    	event.preventDefault();
    	drawPie()
   	})	
	
});