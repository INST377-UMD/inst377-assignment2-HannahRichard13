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


function lookupStocks() {
    
}


window.onload = function() {
    populateQuote();
    checkStorage();
};
