function populateQuote() {
    const quote = document.getElementById('quote')
    fetch('https://zenquotes.io/api/random')
    .then((result) => result.json())
    .then((resultJson) => {
        console.log(resultJson);
        quote.innerHTML = `"${resultJson[0].q}" - ${resultJson[0].a}`;
        });
    };

window.onload = populateQuote;
