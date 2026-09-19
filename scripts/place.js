// Populate footer copyright year and last modified timestamp
document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = `Last Modification: ${document.lastModified}`;

// Static temperature and wind speed matching page content
const temp = 28;       // °C
const windSpeed = 12;  // km/h


const calculateWindChill = (t, v) =>
  (13.12 + 0.6215 * t - 11.37 * Math.pow(v, 0.16) + 0.3965 * t * Math.pow(v, 0.16)).toFixed(1);

const windChillDisplay = document.querySelector("#wind-chill");

// Viable Metric conditions: Temp <= 10 °C AND Wind speed > 4.8 km/h
if (temp <= 10 && windSpeed > 4.8) {
  windChillDisplay.textContent = `${calculateWindChill(temp, windSpeed)} °C`;
} else {
  windChillDisplay.textContent = "N/A";
}