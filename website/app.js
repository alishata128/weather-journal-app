/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = "00ad4bfdc8c2300b65d3dd09e8752904&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
const zipInput = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const getBtn = document.getElementById("generate");

getBtn.addEventListener("click", generateData);
document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    generateData();
  }
});

function generateData(e) {
  e.preventDefault();
  if (zipInput.value !== "" && feelings.value !== "") {
    getWeather(baseURL, zipInput.value, apiKey)
      .then(function (clientData) {
        postData("/add", {
          date: newDate,
          temp: clientData.main.temp,
          content: feelings.value,
        });
      })
      .then(function (clientData) {
        updateInterface();
      });
  }
}

async function getWeather(baseUrl, zipCode, apiKEY) {
  const response = await fetch(`${baseUrl}?zip=${zipCode}&appid=${apiKEY}`);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

async function postData(url = "", data = {}) {
  const request = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content,
    }),
  });

  try {
    const postedData = await request.json();
    return postedData;
  } catch (error) {
    console.log(error);
  }
}

const updateInterface = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById("entry").style.display = "flex";
    document.getElementById("temp").innerHTML =
      Math.round(allData.temp) + " degrees";
    document.getElementById("content").innerHTML = allData.content;
    document.getElementById("date").innerHTML = allData.date;
  } catch (error) {
    console.log("error", error);
  }
};
