var chart = c3.generate({
  bindto: '#chart',
  data: {
    columns: []
  }
});

function getNewData(callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState==4 && this.status==200) {
      var newData = JSON.parse(this.responseText)['data'] || [1, 2, 3];
      //console.log(newData);
      callback(newData);
    }
  };
  xhttp.open("GET", "data", true);
  xhttp.send();
}

function updateGraph() {
  getNewData(
    function(data) {
      data.unshift('Sensor Value');
      chart.load({
        columns: [
          data
        ]
        /*unload: 'Sensor Value'*/
      });
    }
  );
}

function SensorStreamer(period) {
  var updatePeriod = period || 500;
  var intervalTrigger;
  return {
    start: function() {
      // Updates the graph
      intervalTrigger = setInterval(updateGraph, updatePeriod);
    },
    stop: function() {
      if(intervalTrigger) {
          clearInterval(intervalTrigger);
          intervalTrigger = null;
      } else {
        throw Error('SensorStreamer already stopped');
      }
    },
    isRunning: function() {
      return !!intervalTrigger;
    }
  };
}

var updateChartState = (function() {
  // The sensor streamer
  var sensorStream = new SensorStreamer(1000);
  const triggerButton = document.getElementById('trigger_button');
  triggerButton.value = "Start Streaming";
  return function() {
    // If sensor stream isn't running then start it and change the button label
    if(!sensorStream.isRunning()) {
      triggerButton.value = "Stop Streaming";
      sensorStream.start();
    } else {
      // Otherwise stop the stream
      triggerButton.value = "Continue Streaming";
      sensorStream.stop();
    }
  };
}) ();

document.getElementById('trigger_button').onclick = updateChartState;
