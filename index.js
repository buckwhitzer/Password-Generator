const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

const inputEl = document.getElementById("input-el")
const copyIcon = document.getElementById("copy-icon")
const refreshIcon = document.getElementById("refresh-icon")
const modalEl = document.getElementById("modal-el")
const checkboxChar = document.getElementById("checkbox-char")
const checkboxNumbers = document.getElementById("checkbox-numbers")
const setPasswordLength = document.getElementById("password-length-input")
const themeChangeIcon = document.getElementById("theme-change-icon")
const soundToggleIcon = document.getElementById("sound-toggle-icon")
const cssFile = document.getElementById("css-file")
const cssFileDay = document.getElementById("css-file-day")

let sound = new Audio("alert.wav")

let randomPassword = ""

modalEl.style.display = "none"
cssFileDay.disabled = true

function getRandomNumber() {
  const randomNum = characters[Math.floor(Math.random() * characters.length)]
  if (checkboxChar.checked) {
    characters.forEach((el, i, arr) => {
      arr[i] = el.replace(/[^\w ]/g, randomNum)
     })
    return randomNum
  } else if (checkboxNumbers.checked) {
    characters.forEach((el, i, arr) => {
      arr[i] = el.replace(/[^a-zA-Z ]/g, randomNum)
     })
    return randomNum
  } else {
    return randomNum
  }
}

function generatePassword() {
  randomPassword = ""
  inputEl.value = ""
  if (setPasswordLength.value) {
    for (let i = 0; i < setPasswordLength.value; i++) {
      randomPassword += getRandomNumber()
    }
  } else {
    for (let i = 0; i < 15; i++) {
      randomPassword += getRandomNumber()
    }
  }
  inputEl.value = randomPassword
}

function generateAgain() {
  generatePassword()
  refreshIcon.classList.add("fa-spin")
  setTimeout(function() {
    refreshIcon.classList.remove("fa-spin")
  }, 2000)
}

function copyToClipboard() {
  const CopyPassword = inputEl.value
  navigator.clipboard.writeText(CopyPassword)
    .then (() => {
      copyIcon.classList.add("fa-flip")
      setTimeout(function(){
        copyIcon.classList.remove("fa-flip")
      }, 1000)
      playSoundAlert()
    })
}

function playSoundAlert() {
  sound.play()
}

document.getElementById("generate-password-button").addEventListener("click", generatePassword)

document.getElementById("refresh-btn").addEventListener("click", generateAgain)

document.getElementById("copy-btn").addEventListener("click", copyToClipboard)

document.getElementById("settings-btn").addEventListener("click", function() {
  modalEl.style.display = "flex"
})

document.getElementById("close-btn").addEventListener("click", function() {
  modalEl.style.display = "none"
})

document.getElementById("sound-toggle-btn").addEventListener("click", function() {
  if (!sound.muted) {
    sound.muted = true
    soundToggleIcon.classList.remove("fa-volume")
    soundToggleIcon.classList.add("fa-volume-xmark")
  } else {
    sound.muted = false
    soundToggleIcon.classList.remove("fa-volume-xmark")
    soundToggleIcon.classList.add("fa-volume")
  }
})

document.getElementById("color-mode-btn").addEventListener("click", function() {
  if (cssFileDay.disabled) {
    cssFileDay.disabled = false
    cssFile.disabled = true
    themeChangeIcon.classList.remove("fa-sun")
    themeChangeIcon.classList.add("fa-moon")
  } else {
    cssFileDay.disabled = true
    cssFile.disabled = false
    themeChangeIcon.classList.remove("fa-moon")
    themeChangeIcon.classList.add("fa-sun")
  }
})