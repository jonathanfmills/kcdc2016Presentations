// create dataset
var data = [];
var names = ["ALPHA", "BRAVO", "CHARLIE", "DELTA", "ECHO"];
var endTime = Date.now();
var month = 30 * 24 * 60 * 60 * 1000;
var startTime = endTime - 6 * month;

function createEvent (name, maxNbEvents) {
    maxNbEvents = maxNbEvents | 35;
    var event = {
        name: name,
        dates: []
    };
    // add up to 200 events
    var max =  Math.floor(Math.random() * maxNbEvents);
    for (var j = 0; j < max; j++) {
        var time = (Math.random() * (endTime - startTime)) + startTime;
        event.dates.push(new Date(time));
    }

    return event;
}

for (var i = 0; i < names.length; i++) {
    data.push(createEvent(names[i]));
}

// var color = d3.scale.category20();
// TODO: trigger color change on data
var color = d3.scale.ordinal()
  .domain(["one", "two", "three", "four", "five"])
  .range(["#2ca02c", "#1f77b4" , "#d62728", "#000", "#ff7f0e"]);

// create chart function
var eventDropsChart = d3.chart.eventDrops()
        .eventColor(function (datum, index) { return color(index % names.length); })
        .start(new Date(startTime))
        .end(new Date(endTime))
    ;

    eventDropsChart.width = 700;
    eventDropsChart.height = 800;

// bind data with DOM
var element = d3.select("body").datum(data);

// draw the chart
eventDropsChart(element);
