"use strict";
// background video changing effects

// HOME PAGE____________________________________________________________________________
const homePage = document.querySelector(".homePage");
const searchBtn = document.querySelector(".search-btn");
const searchedCountry = document.getElementById("search-country");
const listBtn = document.querySelector(".list-btn");
const settingsBtn = document.querySelector(".settings-btn");
const achievementsModal = document.querySelector(".achievements-modal");
const optionsSetting = document.querySelector(".options-settings");
const listTooltip = document.querySelector(".list-tooltip");
const closeAgreementBtn = document.querySelector(".close-agreement-btn");
const agreementModal = document.querySelector(".agreement-form");
const layoutAgreement = document.querySelector(".layout2");
const searchButton = document.getElementById("search-button");
const agreeBtn = document.querySelector(".agree-btn");
const agreementForm = document.querySelector(".agreement-form");

// QUIZ PAGE____________________________________________________________________________
const quizPage = document.querySelector(".quizPage");
const homeBtn = document.querySelector(".home-button");
const exitQuizModal = document.querySelector(".exit-quiz-modal");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const layoutExitQuiz = document.querySelector(".layout3");
const startLayout = document.querySelector(".start-layout");
const startQuizBtn = document.querySelector(".start-quiz-btn");
const agreeCheckbox = document.getElementById("agree");

const submitQuiz = document.getElementById("submit-quiz");
const resetQuiz = document.querySelector(".reset-quiz");
const doneQuiz = document.querySelector(".done-quiz");
const quizArea = document.getElementById("quiz-area");
const easyPart = document.getElementById("easy-part");
const mediumPart = document.getElementById("medium-part");
const hardPart = document.getElementById("hard-part");
let answerInput;
const quizScore = document.querySelector(".quiz-score");
const quizLength = document.querySelector(".quiz-length");
const quizScoreBox = document.querySelector(".quiz-score-box");
const likeCountry = document.querySelector(".like-country");
const loadingPage = document.querySelector(".loading-page");
const countryName = document.querySelector(".country-name");
const extitingPage = document.querySelector(".exiting-page");

const achievementsNotif = document.querySelector(".achievements-num");
const timerBox = document.querySelector(".timer");
const achievementsContainer = document.querySelector(".achievements-container");
const sortDates = document.querySelector(".sort-date");
const sortFavorites = document.querySelector(".sort-favorites");
const sortHighest = document.querySelector(".sort-highest");
const deleteAll = document.querySelector(".delete-all");

let count = 0,
  count1 = 0,
  count2 = 0;

class Start {
  constructor() {
    // Selects the body and add event listeners to the clicked elements
    document
      .querySelector("body")
      .addEventListener("click", (e) => this.openCloseList(e));
  }
  // Removes and add effects
  addClass = (element, className) => element.classList.add(className);
  removeClass = (element, className) => element.classList.remove(className);

  // quiz to homepage transition
  quizToHomepage = () => {
    this.removeClass(homePage, "hidden");
    this.addClass(quizPage, "hidden");
    this.removeClass(quizPage, "fadeIn");
    this.addClass(homePage, "fadeIn");
    this.addClass(doneQuiz, "hidden");
    this.removeClass(startLayout, "hidden");
    submitQuiz.disabled = false;
  };
  homeToQuizPage = () => {
    this.addClass(homePage, "hidden");
    this.removeClass(quizPage, "hidden");
    this.addClass(quizPage, "fadeIn");
    this.removeClass(homePage, "fadeIn");
    this.addClass(agreementForm, "hidden");
    this.addClass(layoutAgreement, "hidden");
    this.addClass(doneQuiz, "hidden");
    this.removeClass(startQuizBtn, "hidden");
    this.addClass(achievementsModal, "hidden");
    this.addClass(extitingPage, "hidden");
    agreeCheckbox.checked = false;
    submitQuiz.disabled = false;
  };

  openCloseList(e) {
    //button to change to quiz page
    if (e.target.classList.contains("agree-btn")) {
      e.preventDefault();
      if (agreeCheckbox.checked) {
        this.homeToQuizPage();
      } else {
        alert(`You should agree to the terms`);
      }
    }
    // list-btn element
    if (e.target.classList.contains("list-btn")) {
      count1 = count1 === 1 ? 0 : 1;
      if (count1 == 1) {
        this.addClass(achievementsModal, "growUp");
        this.removeClass(achievementsModal, "growBack");
      } else {
        this.addClass(achievementsModal, "growBack");
        this.removeClass(achievementsModal, "growUp");
        setTimeout(this.addClass(optionsSetting, "fadeOut"), 2000);
      }
    }
    // settings-btn element
    if (e.target.classList.contains("settings-btn")) {
      count2 = count2 === 1 ? 0 : 1;
      if (count2 == 1) {
        this.removeClass(optionsSetting, "fadeOut");
        this.addClass(optionsSetting, "fadeIn");
      } else {
        this.addClass(optionsSetting, "fadeOut");
        this.removeClass(optionsSetting, "fadeIn");
      }
    }
    //  close agreement button
    if (e.target.classList.contains("close-agreement-btn")) {
      this.addClass(agreementModal, "hidden");
      this.addClass(layoutAgreement, "hidden");
    }
    // home button
    if (e.target.classList.contains("home-button")) {
      // Show modal
      this.removeClass(exitQuizModal, "hidden");
      this.removeClass(layoutExitQuiz, "hidden");
    }
    //  no button in exit quiz modal
    if (e.target.classList.contains("no-btn")) {
      this.addClass(exitQuizModal, "hidden");
      this.addClass(layoutExitQuiz, "hidden");
    }
    // yes button in exit quiz modal
    if (e.target.classList.contains("yes-btn")) {
      this.addClass(layoutExitQuiz, "hidden");
      this.addClass(exitQuizModal, "hidden");
      this.quizToHomepage();
    }
    //  submit quiz
    if (e.target.classList.contains("submit-quiz")) {
      e.preventDefault();
      // Enable submit button, add reset and done button when the text inputt is not empty
      submitQuiz.disabled = true;
      this.removeClass(doneQuiz, "hidden");
    }
    // Done quiz
    if (e.target.classList.contains("done-quiz")) {
      // quiz to homepage
      this.quizToHomepage();
      searchedCountry.value = "";
    }
    // Start quiz
    if (e.target.classList.contains("start-quiz-btn")) {
      this.addClass(startQuizBtn, "hidden");
      this.removeClass(loadingPage, "hidden");
    }
  }
}

class User {
  constructor() {
    this.achievements;
    this.currentScore;
    this.currentCountry;
    this.currentCountryData = "";
    this.currentCountryIndex = 0;

    searchBtn.addEventListener("click", this.setCountry.bind(this));
  }
  // This function gets the country from the user input and search its API
  async setCountry() {
    this.currentCountry = searchedCountry.value;
    // Get API
    const res = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await res.json();
    this.countryDataApi = data;

    // Validation
    const countryData = [...data].find(
      (cntries) => cntries.name.common == this.currentCountry
    );
    // Gets the index of the country
    const countryDataIndex = [...data].findIndex(
      (cntries) => cntries.name.common == this.currentCountry
    );

    if (countryData) {
      this.currentCountryData = countryData;
      this.currentCountryIndex = countryDataIndex;
      // Open the agreement modal and Add effects fade in and fade out
      agreementModal.classList.remove("hidden");
      layoutAgreement.classList.remove("hidden");
      agreementModal.classList.add("fadeIn");
    } else {
      alert("Country not found/ invalid country");
    }
  }
}
// const user = new User();

class QuizApp extends User {
  constructor(currentCountry, currentCountryIndex, timer) {
    super(currentCountry, currentCountryIndex);
    this.timer;
    this.timerCount = 30;
    this.indexCorrectAnswer = 0;
    this.countryApis = [];
    this.correctAnswers = [];
    this.userAnswers = [];
    this.userScore = 0;
    this.userAchievements = {};
    this.localStorageData = JSON.parse(localStorage.getItem("myArray"));
    // Render user achievements in the achievemnts mdoal
    submitQuiz.addEventListener("click", this.getAnswerInput.bind(this));
    startQuizBtn.addEventListener("click", this.startQuiz.bind(this));
    doneQuiz.addEventListener("click", this.storeUserAchievements.bind(this));
    sortFavorites.addEventListener("click", this.sorting.bind(this, "byFave"));
    sortDates.addEventListener("click", this.sorting.bind(this, "byDate"));
    sortHighest.addEventListener("click", this.sorting.bind(this, "byHighest"));
    deleteAll.addEventListener("click", () => {
      localStorage.clear();
      window.location.reload();
    });
    listBtn.addEventListener("click", this.openAchievementModal.bind(this));
    achievementsNotif.textContent = this.localStorageData
      ? this.localStorageData.length
      : "0";
  }
  openAchievementModal() {
    achievementsContainer.innerHTML = "";
    this.renderUserAchievements();
  }
  startQuiz() {
    //TODO change the country name as start
    // TODO create timer
    // TODO Add the user data in the achievements modal
    this.getAnswerInput();
    this.questions();
    countryName.textContent = this.currentCountry;
  }
  setTimer() {
    timerBox.textContent = `00:${this.timerCount}`;
    let time = this.timerCount;
    this.timer = setInterval(() => {
      time--;
      timerBox.textContent = `00:${time}`;
      if (time < 10) {
        timerBox.textContent = `00:0${time}`;
        timerBox.style.backgroundColor = "Red";
      }
      if (time == 0) {
        clearTimeout(this.timer);
        timerBox.textContent = "Time out";
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }, 1000);
  }
  // Generates 3 random countries as index 0 is the searched country
  async generateUniqueRandomCountries() {
    const numbers = [];
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();

    while (numbers.length < 3) {
      const randNum = Math.floor(Math.random() * 250);
      if (
        !numbers.includes(randNum) &&
        !numbers.includes(this.currentCountryIndex)
      ) {
        // avoids duplicate
        numbers.push(data[randNum]);
      }
    }
    return [data[this.currentCountryIndex], ...numbers];
    //     [ph data, ... 3 random data of country that is not PH]
  }
  // Generates 4 unique random  numbers
  generateUniqueRandomNumbers() {
    const numbers = [];
    while (numbers.length < 4) {
      const randNum = Math.floor(Math.random() * 4);
      if (!numbers.includes(randNum)) {
        // avoids duplicate
        numbers.push(randNum);
      }
    }
    return numbers;
  }
  // Category 1 (name) , deep if 2 then (name.common)
  async generateRandomQuestions(category1, deep, category2 = "") {
    const randNums = this.generateUniqueRandomNumbers();
    const data = await this.generateUniqueRandomCountries();

    if (deep == 1) {
      const generatedQuestions = data.map((countries) => countries[category1]);
      const randQuestions = randNums.map((i) => generatedQuestions[i]);
      const correctAnswer = randQuestions.findIndex(
        (q) => q == data[0][category1]
      );

      this.correctAnswers.push(correctAnswer);
      return randQuestions;
    }
    if (deep == 2) {
      const generatedQuestions = data.map(
        (countries) => countries[category1][category2]
      );
      const randQuestions = randNums.map((i) => generatedQuestions[i]);
      const correctAnswer = randQuestions.findIndex(
        (q) => q == data[0][category1][category2]
      );
      this.correctAnswers.push(correctAnswer);
      return randQuestions;
    }
  }
  // Contains the questions and return an array
  async questions(section = "") {
    console.log(this.currentCountry);
    const easy = [
      {
        category: "capital",
        question: `What is the capital of ${this.currentCountry}?`,
        options: await this.generateRandomQuestions("capital", 1), // 4 random numbers as index for options
      },
      {
        category: "official-name",
        question: `What is the official name of ${this.currentCountry}?`,
        options: await this.generateRandomQuestions("name", 2, "official"),
      },
      {
        category: "alt-name",
        question: `What is the alternative name for ${this.currentCountry}?`,
        options: await this.generateRandomQuestions("altSpellings", 2, 0),
      },
    ];

    const medium = [
      {
        category: "country-code",
        question: `What is the three-letter country code of ${this.currentCountry}?`,
        options: await this.generateRandomQuestions("cca3", 1),
      },
      {
        category: "time-zone",
        question: `What is the time zone of ${this.currentCountry}?`,
        options: await this.generateRandomQuestions("timezones", 2, 0),
      },
      {
        category: "population",
        question: `What is the current population of ${this.currentCountry}?`,
        options: await this.generateRandomQuestions("population", 1),
      },
      {
        category: "lat-lng",
        question: `What are the latitude and longitude coordinates of ${this.currentCountry}?`,
        options: await this.generateRandomQuestions("latlng", 1),
      },
    ];

    const hard = [
      {
        category: "flag",
        question: `What does the flag of ${this.currentCountry} look like?`,
        options: await this.generateRandomQuestions("flags", 2, "png"),
      },
    ];
    // Prints the sequence of correct answers based on the currentCountryIndex
    console.log(this.correctAnswers);
    // Render quesitons
    this.renderQuestions(easy, easyPart, "easy");
    this.renderQuestions(medium, mediumPart, "medium");
    this.picQuestGenerator(hard, hardPart, "hard");
    answerInput = document.querySelector(".answer");

    //Removes layout after fetching and rendering the test
    startLayout.classList.add("hidden");
    loadingPage.classList.add("hidden");
    // Timer will start after starting the game
    this.setTimer();
    switch (section) {
      case "easy":
        return easy;
        break;
      case "medium":
        return medium;
        break;
      case "hard":
        return hard;
        break;
      default:
    }
  }
  renderQuestions(arr, container, name) {
    arr.forEach((q) => {
      count++;
      container.insertAdjacentHTML(
        "beforeend",
        `
          <div class="question${count - 1}">
            <h2>${count}. ${q.question}</h2>
            <ol class="question-list">
              <li class="${q.category}0">${q.options[0]}</li>
              <li class="${q.category}1">${q.options[1]}</li>
              <li class="${q.category}2">${q.options[2]}</li>
              <li class="${q.category}3">${q.options[3]}</li>
            </ol>
            <input class="answer" id="answer${
              count - 1
            }" type="text" placeholder="Answer here" required autocomplete="off">
            `
      );
    });
  }
  picQuestGenerator(arr, container, name) {
    arr.forEach((q) => {
      count++;
      container.insertAdjacentHTML(
        "beforeend",
        `

             <div class="question${count - 1} img-question">
            <h2>${count}. ${q.question}</h2>
              <ol>
                <li>
                  <img class="${q.category}0" src=${q.options[0]}>
                </li>
                <li>
                  <img class="${q.category}1" src=${q.options[1]}>
                </li>
                <li>
                  <img class="${q.category}2" src=${q.options[2]}>
                </li>
                <li>
                  <img class="${q.category}3" src=${q.options[3]}>
                </li>
              </ol>
              <input class="answer" id="answer${
                count - 1
              }" type="text" placeholder="Answer here" required autocomplete="off">
           </div>
      `
      );
    });
  }
  renderCorrectAnswer(container, answer) {
    container.insertAdjacentHTML(
      "beforeend",
      `
        <h3> Correct answer: ${answer} </h3>
        `
    );
  }
  getAnswerInput() {
    // Change color of all div if wrong or right
    const changeBgDiv = function (container, color) {
      container.style.backgroundColor = color;
    };

    // Convert correct answers to letters
    const letters = ["A", "B", "C", "D"];
    const correctAnswrLetters = this.correctAnswers.map((i) => letters[i]);
    for (let i = 0; i < this.correctAnswers.length; i++) {
      const valueInc = document.getElementById(`answer${i}`);
      if (valueInc) {
        // Ensure the element exists
        this.userAnswers.push(valueInc.value.toUpperCase());
      }
    }
    //  Check answers
    for (let i = 0; i < this.correctAnswers.length; i++) {
      if (correctAnswrLetters[i] == this.userAnswers[i]) {
        this.userScore++;
        //change color
        const x = document.querySelector(`.question${i}`);
        changeBgDiv(x, "#90EE90");
      } else {
        const x = document.querySelector(`.question${i}`);
        this.renderCorrectAnswer(x, correctAnswrLetters[i]);
        //Change color
        changeBgDiv(x, "#FF7F7F");
      }
    }
    //Changes the text content of the quiz score and quiz length
    quizScore.textContent = this.userScore;
    quizLength.textContent = correctAnswrLetters.length;
    quizScoreBox.classList.remove("hidden");
    //pause the timer
    clearTimeout(this.timer);
  }
  storeUserAchievements() {
    // Generate current date

    // Get the current date
    const currentDate = new Date();

    // Get the current date formatted as MM/DD/YYYY
    const dateString = currentDate.toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    // Split the date string into month, day, and year
    const [month, day, year] = dateString.split("/");

    // Create a new Date object from the split values, setting time to midnight
    const formattedDate = new Date(year, month - 1, day); // Month is zero-based in JS

    // Calculate days passed from formattedDate to now

    const calcDaysPassed = (date1, date2) => {
      return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24)) - 1;
    };

    // Calculate days passed from formattedDate to now
    const daysPassed = calcDaysPassed(currentDate, formattedDate);
    console.log(daysPassed);

    // Determine the appropriate message based on days passed
    const daysWords =
      daysPassed === 0
        ? "Today"
        : daysPassed === 1
        ? "Yesterday"
        : daysPassed < 7
        ? `${daysPassed} days ago`
        : "More than a week ago"; // Adjusted for clarity

    //Save achievements in local storage
    const userObj = {
      country: this.currentCountry,
      score: this.userScore,
      liked: likeCountry.checked,
      date: daysWords,
      dateNum: daysPassed,
      testLength: this.correctAnswers.length,
    };
    let userData = JSON.parse(localStorage.getItem("myArray")) || [];
    userData.push(userObj);
    localStorage.setItem("myArray", JSON.stringify(userData));
    window.location.reload();
  }
  renderUserAchievements(data = "") {
    const result = data ? data : this.localStorageData;
    result.forEach((u) => {
      const medal =
        u.score == u.testLength
          ? `gold`
          : u.score < u.testLength && u.score > 3
          ? `silver`
          : `bronze`;

      const status =
        u.score == u.testLength
          ? `perfect`
          : u.score < u.testLength && u.score > 3
          ? `good`
          : `fair`;

      achievementsContainer.insertAdjacentHTML(
        "beforeend",
        `
          <div class="achievements-box">
          <img src="assets/${medal}Medal.png" />
          <div>
            <h1>Status: <span class="status">${status}</span></h1>
            <h1>Scored: <span class="score">${u.score}/${u.testLength}</span></h1>
            <h1>Quiz: <span class="country-quiz">${u.country}</span></h1>
            <h1 class="date-quiz">${u.date}</h1>
            
          </div>
          </div> 
        `
      );
      // //CHecks if it is checked or not
      // <img class="liked-display" src="assets/liked-country.png"></img>
      // const likedDisplay = document.querySelector(".liked-display");
      // console.log(likedDisplay);
      // console.log(u.liked);
      // if (u.liked) likedDisplay.style.display = "none";
    });
  }
  sorting(sortType) {
    achievementsContainer.innerHTML = "";
    const sortedArray =
      sortType == "byDate"
        ? this.localStorageData.sort((a, b) => b.dateNum - a.dateNum)
        : sortType == "byFave"
        ? this.localStorageData.filter((d) => d.liked == true)
        : sortType == "byHighest"
        ? this.localStorageData.sort((a, b) => b.score - a.score)
        : "";
    this.renderUserAchievements(sortedArray);
  }
}

const quiz = new QuizApp();
const start = new Start();
