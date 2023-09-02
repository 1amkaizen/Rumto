// script.js
const inputDigits = document.querySelectorAll(".input-digit");
const generateBtn = document.getElementById("generateBtn");
const numberSequenceDisplay = document.getElementById("numberSequenceDisplay");
const nonRedNumbers = document.getElementById("nonRedNumbers");
const numberSequenceDisplaySubtract = document.getElementById(
  "numberSequenceDisplaySubtract"
);

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

// Event listener untuk tombol "Rumus A"
generateBtn.addEventListener("click", () => {
  generateNumberSequence();
  updateCombinedNonRedNumbers(); // Memanggil fungsi untuk memperbarui gabungan non-merah
});

// Event listener untuk tombol "Rumus B"
generateBtnSubtract.addEventListener("click", () => {
  generateNumberSequenceSubtract();
  updateCombinedNonRedNumbers(); // Memanggil fungsi untuk memperbarui gabungan non-merah
});

function focusNextInput(event) {
  const input = event.target;
  if (input.value !== "") {
    const nextInput = input.nextElementSibling;
    if (nextInput) {
      nextInput.focus();
    }
  }
}
// Tambahkan variabel global untuk menyimpan angka-angka non-merah unik.
const combinedNonRedNumbers = new Set();
// Deklarasi variabel global
let allNonRed = [];

// ...
function generateNumberSequence() {
  const enteredNumber = Array.from(inputDigits)
    .map((digitInput) => digitInput.value)
    .join("");

  if (enteredNumber.length !== 4 || isNaN(enteredNumber)) {
    numberSequenceDisplay.innerHTML = "Please enter a valid 4-digit number.";
    return;
  }

  combinedNonRedNumbers.clear();
  // Hapus konten sebelumnya di dalam randomNumbersContainer
  randomNumbersContainer.innerHTML = "";

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

    // Tambahkan angka non-merah ke dalam combinedNonRedNumbers
    combinedNonRedNumbers.add(digit);
  });

  // ...

  // Perbarui tampilan combinedNonRedNumbers
  updateCombinedNonRedNumbers();

  // ...

  // Tampilkan combinedNonRedNumbers tanpa duplikat dalam tampilan HTML.
  const uniqueNonRedNumbers = Array.from(combinedNonRedNumbers);
  const combinedNonRedNumbersContainer = document.getElementById(
    "combinedNonRedNumbers"
  );
  combinedNonRedNumbersContainer.innerHTML = uniqueNonRedNumbers
    .map((digit) => {
      return `<div class="number-box non-red">${digit}</div>`;
    })
    .join("");
  // Update variabel global allNonRed
  allNonRed = nonRed;
}
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
  // Hapus konten sebelumnya di dalam randomNumbersContainer
  randomNumbersContainer.innerHTML = "";
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
  nonRedNumbersSubtract.appendChild(nonRedNumbersContainerSubtract); // Setelah menghitung nonRedSubtract, tambahkan angkanya ke combinedNonRedNumbers.
  nonRedSubtract.forEach((digit) => combinedNonRedNumbers.add(digit));

  // ...

  // Tampilkan combinedNonRedNumbers tanpa duplikat dalam tampilan HTML.
  const uniqueNonRedNumbers = Array.from(combinedNonRedNumbers);
  const combinedNonRedNumbersContainer = document.getElementById(
    "combinedNonRedNumbers"
  );
  combinedNonRedNumbersContainer.innerHTML = uniqueNonRedNumbers
    .map((digit) => {
      return `<div class="number-box non-red">${digit}</div>`;
    })
    .join("");
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

function shiftNumberSubtract(number, shift) {
  const shiftedNumber = [];
  for (let i = 0; i < number.length; i++) {
    const digit = parseInt(number[i]);
    const shiftedDigit = (digit - shift + 10) % 10;
    shiftedNumber.push(shiftedDigit);
  }
  return shiftedNumber;
}

// Fungsi untuk memperbarui gabungan non-merah// Fungsi untuk memperbarui gabungan non-merah
function updateCombinedNonRedNumbers() {
  const combinedNonRedNumbersContainer = document.getElementById(
    "combinedNonRedNumbers"
  );
  combinedNonRedNumbersContainer.innerHTML = "";

  // Iterasi melalui angka non-merah yang unik dalam combinedNonRedNumbers
  combinedNonRedNumbers.forEach((digit) => {
    const digitBox = document.createElement("div");
    digitBox.classList.add("number-box", "non-red");
    digitBox.textContent = digit;
    combinedNonRedNumbersContainer.appendChild(digitBox);
  });
}
// Temukan tombol "Generate Random" berdasarkan ID-nya
const generateRandomBtn = document.getElementById("generateRandomBtn");

// Ambil referensi ke elemen tombol "Generate Random Numbers" dan kontainer untuk menampilkan angka acak
const generateRandomNumbersBtn = document.getElementById(
  "generateRandomNumbersBtn"
);
const randomNumbersContainer = document.getElementById("randomNumbers");

// Fungsi untuk mengambil 4 angka acak dari array
function getRandomNumbersFromArray(arr) {
  const randomNumbers = [];

  while (randomNumbers.length < 4) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const randomNumber = arr.splice(randomIndex, 1)[0];
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
}

// Event listener untuk tombol "Generate Random Numbers"
generateRandomNumbersBtn.addEventListener("click", () => {
  // Salin isi dari combinedNonRedNumbers ke dalam array
  const combinedNonRedNumbersArray = Array.from(combinedNonRedNumbers);

  // Pastikan ada cukup angka untuk diambil
  if (combinedNonRedNumbersArray.length >= 4) {
    // Ambil 4 angka acak
    const randomNumbers = getRandomNumbersFromArray(combinedNonRedNumbersArray);

    // Tampilkan angka acak dalam kontainer
    const randomNumbersDiv = document.createElement("div");
    randomNumbersDiv.textContent = randomNumbers.join(" ");
    randomNumbersContainer.appendChild(randomNumbersDiv);
  } else {
    // Pesan jika tidak ada cukup angka
    const messageDiv = document.createElement("div");
    messageDiv.textContent = "Tidak cukup angka untuk diambil.";
    randomNumbersContainer.appendChild(messageDiv);
  }
});
