// script.js
const inputDigits = document.querySelectorAll(".input-digit");
const generateBtn = document.getElementById("generateBtn");
const numberSequenceDisplay = document.getElementById("numberSequenceDisplay");
const nonRedNumbers = document.getElementById("nonRedNumbers");
const numberSequenceDisplaySubtract = document.getElementById(
  "numberSequenceDisplaySubtract"
);
const generateBtnSubtract = document.getElementById("generateBtnSubtract");

generateBtn.addEventListener("click", () => {
  // Tampilkan iklan di dalam #adsense-container
  const adsenseContainer = document.getElementById("adsense-container");
  adsenseContainer.style.display = "block";

  // Tunggu hingga iklan selesai ditonton
  adsbygoogle = window.adsbygoogle || [];
  adsbygoogle.push(() => {
    adsbygoogle.ads;
    pauseAdRequests = true;
    adsbygoogle.ads;
    adsbygoogle.push({});
  });

  // Setelah iklan selesai, tampilkan hasil
  adsenseContainer.addEventListener("adsbygoogle:adclosed", () => {
    adsenseContainer.style.display = "none"; // Sembunyikan iklan
    // Tampilkan hasil di sini
    generateNumberSequence(); // Panggil fungsi yang menampilkan hasil
  });
});

inputDigits.forEach((digitInput, index) => {
  if (index < inputDigits.length - 1) {
    digitInput.addEventListener("input", handleInputChange);
  }
});

function handleInputChange(event) {
  const input = event.target;

  if (input.value === "") {
    const prevInput = input.previousElementSibling;
    if (prevInput) {
      prevInput.focus();
    }
  }

  if (input.value.length >= 1) {
    const nextInput = input.nextElementSibling;
    if (nextInput) {
      nextInput.focus();
    }
  }
}

generateBtn.addEventListener("click", generateNumberSequence);
generateBtnSubtract.addEventListener("click", generateNumberSequenceSubtract);

function focusNextInput(event) {
  const input = event.target;
  if (input.value !== "") {
    const nextInput = input.nextElementSibling;
    if (nextInput) {
      nextInput.focus();
    }
  }
}

function generateNumberSequence() {
  const enteredNumber = Array.from(inputDigits)
    .map((digitInput) => digitInput.value)
    .join("");

  if (enteredNumber.length !== 4 || isNaN(enteredNumber)) {
    numberSequenceDisplay.innerHTML = "Please enter a valid 4-digit number.";
    return;
  }

  numberSequenceDisplay.innerHTML = "";
  nonRedNumbers.innerHTML = "";

  const redNumbers = [];
  const nonRed = [];
  for (let i = 0; i < 5; i++) {
    const numberLine = document.createElement("div");
    numberLine.classList.add("number-line");
    const shiftedNumber = shiftNumber(enteredNumber, i);

    shiftedNumber.forEach((digit, index) => {
      const digitBox = document.createElement("div");
      digitBox.classList.add("number-box");
      if ((i + index) % 2 === 0) {
        digitBox.classList.add("red");
        redNumbers.push(digit);
      } else {
        digitBox.classList.add("non-red");
        if (nonRed.indexOf(digit) === -1) {
          nonRed.push(digit);
        }
      }
      digitBox.textContent = digit;
      numberLine.appendChild(digitBox);
    });

    numberSequenceDisplay.appendChild(numberLine);
  }

  nonRed.forEach((digit) => {
    const nonRedBox = document.createElement("div");
    nonRedBox.classList.add("number-box", "non-red");
    nonRedBox.textContent = digit;
    nonRedNumbers.appendChild(nonRedBox);
  });

  // Setelah kode menampilkan hasil perhitungan, tambahkan ini
  const randomNumberDisplay = document.getElementById("randomNumberDisplay");
  randomNumberDisplay.innerHTML = ""; // Kosongkan konten sebelumnya

  const randomButton = document.createElement("button");
  randomButton.classList.add("btn", "btn-primary", "mt-3");
  randomButton.textContent = "Generate Angka Acak";
  randomButton.addEventListener("click", generateRandomNumberFromNonRed);

  randomNumberDisplay.appendChild(randomButton);
}

function generateRandomNumberFromNonRed() {
  const nonRedNumbers = getNonRedNumbers();
  const nonRedNumbersSubtract = getNonRedNumbersSubtract();

  const combinedNonRedNumbers = nonRedNumbers.concat(nonRedNumbersSubtract);

  if (combinedNonRedNumbers.length < 4) {
    return; // Hanya lanjutkan jika ada cukup angka non-merah dari kedua hasil perhitungan
  }

  const randomNumbers = Array.from({ length: 4 }, () => {
    const randomIndex = Math.floor(
      Math.random() * combinedNonRedNumbers.length
    );
    return combinedNonRedNumbers[randomIndex];
  });

  const randomNumberDisplay = document.getElementById("randomNumberDisplay");
  const randomNumberParagraph = document.createElement("p");
  randomNumberParagraph.textContent = `Hasil Prediksi: ${randomNumbers.join(
    ""
  )}`;

  randomNumberDisplay.appendChild(randomNumberParagraph);
}

function getNonRedNumbers() {
  const nonRedNumberBoxes = document.querySelectorAll(".number-box.non-red");
  return Array.from(nonRedNumberBoxes, (box) => box.textContent);
}

function getNonRedNumbersSubtract() {
  const nonRedNumberBoxesSubtract = document.querySelectorAll(
    ".number-box.non-red"
  );
  return Array.from(nonRedNumberBoxesSubtract, (box) => box.textContent);
}
function shiftNumber(number, shift, subtract) {
  const shiftedNumber = [];
  for (let i = 0; i < number.length; i++) {
    const digit = parseInt(number[i]);
    let shiftedDigit;
    if (subtract) {
      shiftedDigit = (digit - shift + 10) % 10;
    } else {
      shiftedDigit = (digit + shift) % 10;
    }
    shiftedNumber.push(shiftedDigit);
  }

  return shiftedNumber;
}

// ... kode sebelumnya ...

function generateNumberSequenceSubtract() {
  const enteredNumber = Array.from(inputDigits)
    .map((digitInput) => digitInput.value)
    .join("");

  if (enteredNumber.length !== 4 || isNaN(enteredNumber)) {
    numberSequenceDisplaySubtract.innerHTML =
      "Please enter a valid 4-digit number.";
    return;
  }

  // Clear previous results
  numberSequenceDisplaySubtract.innerHTML = "";
  nonRedNumbersSubtract.innerHTML = "";

  const redNumbers = [];
  const nonRedSubtract = [];

  for (let i = 0; i < 5; i++) {
    const numberLine = document.createElement("div");
    numberLine.classList.add("number-line");
    const shiftedNumber = shiftNumberSubtract(enteredNumber, i);

    shiftedNumber.forEach((digit, index) => {
      const digitBox = document.createElement("div");
      digitBox.classList.add("number-box");
      if ((i + index) % 2 === 0) {
        digitBox.classList.add("red");
        digitBox.textContent = digit; // Menampilkan angka di kotak merah
        redNumbers.push(digit);
      } else {
        digitBox.classList.add("non-red");
        digitBox.textContent = digit;
        if (nonRedSubtract.indexOf(digit) === -1) {
          nonRedSubtract.push(digit);
        }
      }
      numberLine.appendChild(digitBox);
    });

    numberSequenceDisplaySubtract.appendChild(numberLine);
  }

  const nonRedNumbersContainerSubtract = document.createElement("div");
  nonRedSubtract.forEach((digit) => {
    const nonRedBox = document.createElement("div");
    nonRedBox.classList.add("number-box", "non-red");
    nonRedBox.textContent = digit;
    nonRedNumbersContainerSubtract.appendChild(nonRedBox);
  });
  nonRedNumbersSubtract.appendChild(nonRedNumbersContainerSubtract);
}

function shiftNumberSubtract(number, shift) {
  const shiftedNumber = [];
  for (let i = 0; i < number.length; i++) {
    const digit = parseInt(number[i]);
    const shiftedDigit = (digit - shift + 10) % 10;
    shiftedNumber.push(shiftedDigit);
  }
  return shiftedNumber;
}
