const slider = document.querySelector("#character-length");
const lengthLabel = document.querySelector(".length-label"); 
const passwordLabel = document.querySelector(".password-field h1"); 
const generateBtn = document.querySelector("button[type='submit']"); 
const copiedText = document.querySelector(".copied-text"); 
const copyImg = document.querySelector(".copy-icon"); 

const upperCheckBox = document.querySelector("#upper-checkbox"); 
const lowerCheckBox = document.querySelector("#lower-checkbox"); 
const numberCheckBox = document.querySelector("#number-checkbox"); 
const symbolCheckBox = document.querySelector("#symbol-checkbox")


// Dynamic Slider Bar
function progressSlider() {
    const sliderValue = slider.value; 
    slider.style.background = `linear-gradient(to right, var(--neon-green) ${sliderValue}%, var(--very-dark-grey) ${sliderValue}%)`
}
// Character Length Label
function updateLengthLabel() {
    lengthLabel.textContent = slider.value; 
}


function updateStrengthState(value) {
    // To Weak Password 1 - 5
    const columns = document.querySelectorAll(".column"); 
    const strengthLabel = document.querySelector(".strength-state h2"); 
    columns.forEach((element) => {
        element.classList.remove("weak", "medium", "strong"); 
    })
    if(value <= 5) {
        strengthLabel.textContent = "TOO WEAK!"; 
        columns[0].classList.add("to-weak"); 
    } 
    // Weak Password  5 - 10 
    else if(value >= 5 && value <= 10 ) {
        strengthLabel.textContent = "WEAK!"; 
        columns[0].classList.add("weak"); 
        columns[1].classList.add("weak"); 
    }
    // Medium - 10 - 50 
    else if(value >= 10 && value <= 50 ) {
        strengthLabel.textContent = "MEDIUM"; 
        columns[0].classList.add("medium"); 
        columns[1].classList.add("medium"); 
        columns[2].classList.add("medium"); 
    }
    // Strong - 50 - 100 
    else {
        strengthLabel.textContent = "STRONG"; 
        columns[0].classList.add("strong"); 
        columns[1].classList.add("strong"); 
        columns[2].classList.add("strong"); 
        columns[3].classList.add("strong"); 
    }

}


function generateArray(low, high) {
    let arr = []
    for(let i = low; i <= high;  i++) {
        arr.push(String.fromCharCode(i))
    }
    return arr; 
}


function generatePassword(characterLength, upperFlag, lowerFlag, numberFlag, symbolsFlag) {
    let upperCharsList = generateArray(65,90); 
    let lowerCharsList = generateArray(97,122); 
    let numbersList = generateArray(48, 57); 
    let symbolsList = generateArray(33,57).concat(generateArray(58,64)).concat(generateArray(91,96)).concat(generateArray(generateArray(123,126))); 
    let password = ""; 
    let passwordArray = []; 
    characterLength = Number(characterLength); 
    if(characterLength < 0) {
        return password; 
    }

    if(upperFlag) {
        passwordArray = passwordArray.concat(upperCharsList); 
    }
    if(lowerFlag) {
        passwordArray = passwordArray.concat(lowerCharsList); 
    }
    if(numberFlag) {
        passwordArray = passwordArray.concat(numbersList); 
    }
    if(symbolsFlag) {
        passwordArray = passwordArray.concat(symbolsList);
    }
    if(passwordArray.length === 0) {
        return  "Please include some characters"; 
    }

    for(let i = 0; i < characterLength; i++) {
        let randomNumber = Math.floor(Math.random() *  passwordArray.length); 
        password += passwordArray[randomNumber];
    }
    return password

}

updateLengthLabel(); 
progressSlider(); 
updateStrengthState(); 
slider.addEventListener("input", () => {
    progressSlider(); 
    updateLengthLabel();
    updateStrengthState(slider.value); 
})

generateBtn.addEventListener("click", (e) => {
    e.preventDefault(); 
    let password = generatePassword(slider.value, upperCheckBox.checked, lowerCheckBox.checked, numberCheckBox.checked, symbolCheckBox.checked); 
    passwordLabel.textContent = password; 
    passwordLabel.classList.add("toggleOpacity");
    copiedText.style.display = "none"; 
})


copyImg.addEventListener("click", () => {
    navigator.clipboard.writeText(passwordLabel.textContent).then(() => {
        copiedText.style.display = "block"; 
    })
})
