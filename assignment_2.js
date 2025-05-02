function populateQuote() {
    if (document.querySelector("#quote_box")) {
        const quote = document.getElementById('quote')
        fetch('https://zenquotes.io/api/random')
        .then((result) => result.json())
        .then((resultJson) => {
            console.log(resultJson);
            quote.innerHTML = `"${resultJson[0].q}" - ${resultJson[0].a}`;
            });
        } else {

        }
    };


const commands = {

'hello': () => { alert('Hello world!'); },

'change the color to *color': (color) => {
    document.body.style.backgroundColor = color;
},

'navigate to *page': (page) => {
    if (page === 'home') {
        window.location.href = 'home_page.html';
    } else if (page === 'stocks') {
        window.location.href = 'stocks_page.html';
    } else if (page === 'dogs') {
        window.location.href = 'dogs_page.html';
    }}
};


function startListen() {
    if (annyang) {
        annyang.addCommands(commands);
        annyang.setLanguage('en-US');
        annyang.start();
        console.log('started listening');
        sessionStorage.setItem('isListening', 'true');

    }
}

function stopListen() {
    if (annyang) {
        annyang.abort();
        console.log('stopped listening');
    }
}


function checkStorage() {


    if (sessionStorage.getItem('isListening') === 'true') {
        console.log('Listening is on')
        annyang.start();
    } else {
        sessionStorage.getItem('isListening') === 'false' 
        console.log('Listening is off')
        annyang.abort();
    }
}

function epochToDate(epochTime) {
    // Epoch time is often in seconds, but JavaScript Date uses milliseconds, so multiply by 1000.
    const date = new Date(epochTime * 1000);
    return date;
  }
  
async function lookupStocks() {
    const ticker = document.getElementById('ticker').value.toUpperCase();
    const dayRange = parseInt(document.getElementById('dayCount').value);    
    const today = new Date();
    const currentDate = today.toISOString().split('T')[0];

    const startDateObj = new Date();
    startDateObj.setDate(today.getDate() - dayRange);
    const startDate = startDateObj.toISOString().split('T')[0];
    const stockData = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${startDate}/${currentDate}?adjusted=true&sort=asc&limit=120&apiKey=wcqijblPNnJEqjFJrkK0cQzVpjhbIPtB`)
    .then((result) => result.json()
  );
 
 
  console.log("retrieved data:", stockData)
 
 
  return stockData
 }
 

 // function from js charting code online
 async function populateChart() {
 
    const stockData = await lookupStocks();
 
    const stockLabels = [];
    const closingData = [];
 
    stockData.results.forEach((item) => {
            const epochTimestamp = item.t; // Example epoch timestamp
            const dateObject = epochToDate(epochTimestamp);

            // Format the date as desired (e.g., "YYYY-MM-DD HH:MM:SS")
            const formattedDate = dateObject.toLocaleDateString();
            console.log(formattedDate);
  
            stockLabels.push(formattedDate); 
            closingData.push(item.c); 
        }
  )
 
    // getting the canvas
    const ctx = document.getElementById('myChart');
 
    // creating chart object from the js library
new Chart(ctx, {
        type: 'line', // type of chart
        data: {
        labels: stockLabels, // ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], //labels for values // array
        datasets: [
            {
              label: '($) Stock Price',
              data: closingData, //[12, 19, 3, 5, 2, 3], // array of numbers
              borderWidth: 1,
        },
      ], // All the values to be shown
    },
    options: {
        scales: {
        y: {
            beginAtZero: false,
        }
            }
        }
    });
 }

window.onload = function() {
    populateQuote();
    checkStorage();
};
