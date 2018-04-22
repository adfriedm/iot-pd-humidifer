# iot-pd-humidifer
A simple PD controller for a humidifier with webserver using ESP 8266

## Explanation
This project is intended to extend the functionality of a cheap humidifier far beyond its out-of-the-box capabilities.

Using a DHT22 Temperature and Humidity sensor, a relay switchable power socket, and an ESP 8266, the following are planned:

1. A webserver hosted on the ESP 8266, that can display a time-series of the sensor data and the targets. Also the ability to set target humidity values after user authentication.
2. A PD controller on the ESP 8266 to reach the target humidity.
3. OTA updates.

## Current State
Presently the project runs on node js, simulating sensor data.

First use `cd SensorSimulated` and `npm init` to install the necessary packages. Start the application with `npm start`. The website with sensor data should be accessible via `http://localhost:3000`.

### Functionality
The hosted website make AJAX GET requests to the server. The server then sends back the data as an array. Currently the sensor is simulated, and shifts in a new data point every time it is queried.

## Update
The humidity sensor I ordered appears to have been lost in transit, so I am proceeding with a DS18b20 temperature sensor to implement desired functionality. This will include a fixed-length queue to store both the UTC time stamp and the sensor value. The UTC value will be read from NTC when a network is available.

Additionally this will require:
1. GET HTTP request http://temperaturesensor.localhost/data?length=20;skipby=0 returns json data array. (I will make more meaningful query definitions later, as the need becomes apparent).
2. HTTPS support
3. Authorization token support

## Next Steps
The model will be extended to make query requests of different lengths and differently time-scaled time series. (Client side)

A sensor module will be setup on the ESP 8266.

The HTTP server will be setup on the ESP8266.


