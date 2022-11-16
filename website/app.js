/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather";
const apiKEY = "00ad4bfdc8c2300b65d3dd09e8752904";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
const zipInput = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const getBtn = document.getElementById("generate");

getBtn.addEventListener("click", generateData);

function generateData(e) {
  e.preventDefault();
  if (zipInput.value !== "") {
    getWeather(baseURL, zipInput.value, apiKEY)
      .then(function (DATA) {
        postData("/add", {
          date: newDate,
          temp: DATA.main.temp,
          content: content,
        });
      })
      .then(function (DATA) {
        console.log(DATA);
        retrieveData();
      });
  }
}

async function getWeather(baseUrl, zipCode, apiKey) {
  const response = await fetch(`${baseUrl}?zip=${zipCode}&appid=${apiKey}`);
  try {
    const data = await response.json();
    console.log(data);
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
    const newDATA = await request.json();
    return newDATA;
  } catch (error) {
    console.log(error);
  }
}

const retrieveData = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      Math.round(allData.temp) + " degrees";
    document.getElementById("content").innerHTML = allData.feel;
    document.getElementById("date").innerHTML = allData.date;
  } catch (error) {
    console.log("error", error);
  }
};
