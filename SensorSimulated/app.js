const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;

var sensor = (function() {
  var sensorData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return function() {
    var lastValue = sensorData[sensorData.length - 1];
    var newValue = lastValue + (Math.random()-0.5)*10 ;
    sensorData.shift();
    console.log(sensorData);
    sensorData.push(newValue);
    console.log(sensorData);
    console.log("done");
    //sensorData[sensorData.length-1] = newValue;
    return sensorData;
  };
})();

var app = express();
app.use('/', express.static('./public'));


app.get('/data', (req, res)=>{
  res.send({data: sensor()});
});

app.listen(port, (err)=>{
  if(err) {
    console.log(err.message);
    throw err;
  }
  console.log(`connected to ${port}`);
});
