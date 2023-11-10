const dic_url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
//dictionary api's url added.


const resultContainer = document.querySelector('.result')
const sound = document.querySelector('#sound')
const word_input = document.querySelector('#word-input')
const search_button = document.querySelector('#search-btn')



search_button.addEventListener('click', wordGetter)
word_input.addEventListener('keydown', wordGetterInput)

function wordGetterInput(event){
    if(event.key === "Enter"){
        event.preventDefault();

        wordGetter()
        //call the main function when enter pressed.
    }
}

function wordGetter(){
    // console.log(word_input.value);
    document.body.classList.remove('fade')
    fetch(`${dic_url}${word_input.value}`)
    .then(response => response.json())
    .then(word_data => {
        // console.log(word_data);
        // console.log(word_data[0].word);
        // console.log(word_data[0].phonetics[1].text);
        // console.log(word_data[0].phonetics[1].audio);
        // console.log(word_data[0].meanings[0].partOfSpeech);
        // console.log(word_data[0].meanings[0].definitions[0].definition);
        // console.log(word_data[0].meanings[0].definitions[0].example);

        // The variables which is going to used as a data in below is tested in console!
        
        resultContainer.innerHTML = `
        <div class="word">
            <h3>${word_data[0].word}</h3>
            <button onclick= "playSound()">
                <i class="fa-solid fa-volume-high"></i>
            </button>
        </div>
        <div class="details">
            <p>${word_data[0].meanings[0].partOfSpeech}</p>
            <p>${word_data[0].phonetics[1].text}</p>
        </div>
        <p class="word-meaning">
            ${word_data[0].meanings[0].definitions[0].definition}
        </p>
        <p class="word-sample">
            ${word_data[0].meanings[0].definitions[0].example || ""}
        </p>`
        document.body.classList.add('fade')
        
        sound.setAttribute("src", `${word_data[0].phonetics[1].audio}`)
        // console.log(sound); is tested in console.
    })
    .catch( () => {
        resultContainer.innerHTML = `<h3 class= "error"> Couldn't Find The Word</h3>`
        document.body.classList.add('fade')
    })
}

function playSound(){
    sound.play()
}