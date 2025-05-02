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

function loadRedditAPI() {
  return fetch('https://tradestie.com/api/v1/apps/reddit?date=2022-04-03').then((result) =>
  result.json
  )
};

function loadUpSite() {
  const stockData = loadRedditAPI();
  console.log(APIResponse)

  const stockTable = document.getElementById('stockTable')

  stockData.forEach((stock) => {
    const tableRow = document.createElement('tr')
    const stockTicker = document.createElement('td');
    const commentCount = document.createElement('td');
    const sentiment = document.createElement('td');

    stockTicker.innerHTML = stock['ticker']
    commentCount.innerHTML = stock['no_of_comments']
    sentiment.innerHTML = stock['sentiment']

    tableRow.appendChild(stockTicker)
    tableRow.appendChild(commentCount)
    tableRow.appendChild(sentiment)

    stockTable.append(tableRow)


  })



}