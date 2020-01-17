// Empty object to store current data
const data = {};

// Global Variables 
const feelings = document.getElementById('feelings');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const getDate = () => {
    const date = new Date();
    return date.toDateString();
  }

// Personal API Key for OpenWeatherMap API

let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = 'eff8e54ccf7fc80bec996bbabf661134';
let addApi = '&units=metric&APPID=';

// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener('click', performAction);


/* Function called by event listener */

const getWeather = async (baseURL, newZip, addApi, apiKey)=>{

  const res = await fetch(baseURL+newZip+addApi+apiKey)
  try {
    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}

/* Function to GET Web API Data*/
const saveData = async () => {
    data.date = getDate();
    data.feelings = feelings.value;
    data.temp = await getTemp();
    updateUI();
  }
  
  const getTemp = async () => {

    const zip = document.getElementById('zip').value;
    const endpoint = baseURL + zip + addApi + apiKey;
    try {
      const response = await fetch(endpoint);
      if(response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse.main.temp;
      }
    } catch(error) {
      console.log(error.message);
    }
  }

/* Function to POST data */

const postData = async (url = '/addWeather', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    };
};

/*Function to update UI*/
const updateUI = async () => {
    const request = await fetch ('/weatherData');
    try{
        const allData = await request.json();
        date.innerHTML = 'Today is ' + data.date;
        temp.innerHTML = data.temp + '&deg;C';
        content.innerHTML = 'Feelings: ' + data.feelings;

        document.getElementById('zip').value = "";
        document.getElementById('feelings').value = "";
    } catch (error){
        console.log("error", error);
    }
}

function performAction(e){
  const newZip =  document.getElementById('zip').value;
  getWeather(baseURL,newZip, addApi, apiKey)
  saveData();
  }
