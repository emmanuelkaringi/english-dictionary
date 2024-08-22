const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // Find the first phonetics entry with an audio link
            let audioUrl = "";
            for (let phonetic of data[0].phonetics) {
                if (phonetic.audio) {
                    audioUrl = phonetic.audio;
                    break;
                }
            }
            result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>
                <button onClick="playSound()">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>${data[0].phonetic}</p>
            </div>
            <p class="word-meaning">${data[0].meanings[0].definitions[0].definition}</p>
            <p class="word-example">${data[0].meanings[0].synonyms || ""}</p>
            `;
            if (audioUrl) {
                sound.setAttribute("src", audioUrl);
            } else {
                console.log("No audio available for this word.");
            }
        })
        .catch( () => {
            result.innerHTML = `<h3 class="error">Sorry pal, we couldn't find definitions for the word you were looking for."</h3>`
        })
});
function playSound() {
    sound.play();
}