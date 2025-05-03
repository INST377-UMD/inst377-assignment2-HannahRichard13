function loadDogAPI() {
    return fetch('https://dog.ceo/api/breeds/image/random').then((result) =>
    result.json()
    )
  };

async function loadCarousel() {
    carousel = document.getElementById('dogCarousel')
    carousel.innerHTML = '';
    let dogImages = []
    for (let i = 0; i < 10; i++) {
        const dogImage = await loadDogAPI();
        console.log(dogImage['message'])
        const image = document.createElement('img');
        image.src = dogImage['message']
        dogImages.push(image)
    }
    dogImages.forEach((i) => carousel.appendChild(i))
    simpleslider.getSlider();
 }


 function loadBreedAPI() {
    return fetch(' https://dogapi.dog/api/v2/breeds')
    .then((result) => result.json())
    .then((data) => {
        const breeds = data.data
        const buttonArea = document.getElementById('breed-button-container');
        const breedInfoArea =  document.getElementById('breed-Info-container');

        breeds.forEach((breed) => {
            const button = document.createElement('button')
            button.textContent = breed.attributes.name
            button.id = 'breed-buttons'
            button.setAttribute('breed-id', breed.id)
            button.addEventListener('click', () => {
                breedInfoArea.innerHTML = '';
                const breedArea = document.createElement('div')
                breedArea.setAttribute('id', `container-${breed.id}`)

                const name = document.createElement('h2')
                name.textContent = 'Name: ' + breed.attributes.name

                const description = document.createElement('h3')
                description.textContent = 'Description: ' + breed.attributes.description


                const minLife = document.createElement('h3')
                minLife.textContent = 'Min Life: ' + breed.attributes.life.min

                const maxLife = document.createElement('h3')
                maxLife.textContent = 'Max Life: ' + breed.attributes.life.max

                breedArea.appendChild(name)
                breedArea.appendChild(description)
                breedArea.appendChild(minLife)
                breedArea.appendChild(maxLife)

                breedInfoArea.appendChild(breedArea)
            })
            buttonArea.appendChild(button)
        })
    })
  };

window.onload = function() {
    loadCarousel();
    loadBreedAPI();
};






