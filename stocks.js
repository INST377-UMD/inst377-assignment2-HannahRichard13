function epochToDate(epochTime) { // Convert epoch to date
    const date = new Date(epochTime * 1000);
    return date;
  }
  
async function lookupStocks() { // loop up stock based on form input
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
 
 async function populateChart() { // Populate chart based on api data
 
    const stockData = await lookupStocks();
 
    const stockLabels = [];
    const closingData = [];
 
    stockData.results.forEach((item) => {
            const epochTimestamp = item.t;
            const dateObject = epochToDate(epochTimestamp);

            const formattedDate = dateObject.toLocaleDateString();
            console.log(formattedDate);
  
            stockLabels.push(formattedDate); 
            closingData.push(item.c); 
        }
  )
 
    const ctx = document.getElementById('myChart'); // Chart code
 
new Chart(ctx, {
        type: 'line',
        data: {
        labels: stockLabels,
        datasets: [
            {
              label: '($) Stock Price',
              data: closingData,
              borderWidth: 1,
        },
      ],
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

function loadRedditAPI() { // Load reddit data
  return fetch('https://tradestie.com/api/v1/apps/reddit?date=2022-04-03').then((result) =>
  result.json()
  )
};

async function loadUpSite() {
  const stockData = await loadRedditAPI();
  console.log(stockData)

  const stockTable = document.getElementById('stockTable')

  stockData.forEach((stock) => { // Populate table
    if (stock['no_of_comments'] > 11) {
      const tableRow = document.createElement('tr')
      const link = document.createElement('a');
      link.href =  `https://finance.yahoo.com/quote/${stock['ticker']}`
      link.textContent = stock['ticker']
      link.target = '_blank'

      const commentCount = document.createElement('td');
      commentCount.innerHTML = stock['no_of_comments']

      const sentiment = document.createElement('td');
      tableRow.appendChild(link)
      tableRow.appendChild(commentCount)
      const sentimentImage = document.createElement('img');
      if (stock['sentiment'] === "Bullish" ) {
        sentimentImage.src = 'https://static.thenounproject.com/png/3328202-200.png';
      } else {
        sentimentImage.src = 'https://cdn.iconscout.com/icon/free/png-256/free-bearish-icon-download-in-svg-png-gif-file-formats--downtrend-animal-stocks-finance-investment-pack-business-icons-1570417.png';

      }
      sentimentImage.width = 100;
      sentiment.appendChild(sentimentImage)
      tableRow.appendChild(sentiment)
      stockTable.append(tableRow)

    }
  })
}

window.onload = loadUpSite;