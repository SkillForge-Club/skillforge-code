const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get("quiz");

const quizTitle = document.getElementById("quiz-title");
const quizContainer = document.getElementById("quiz-container");
const checkButton = document.getElementById("check-quiz");
const resultElement = document.getElementById("quiz-result");
const startMenu = document.getElementById("start-menu");
const startButton = document.getElementById("start-button");
const questionCount = document.getElementById("question-count");

let currentQuestionIndex = 0;
let userAnswers = [];
let quizData = []; // Initialize the quizData
let incorrectAttempts = Array(4).fill(0); // Initialize incorrect attempts array for 5 questions

let score = 0;

let notifications = document.createElement("div");
notifications.className = "notifications";
document.body.appendChild(notifications);

async function renderStartMenu(quizId) {
  quizData = await fetchQuiz(quizId); // Fetch quiz data asynchronously
  if (!quizData) {
    quizTitle.textContent = "Test topilmadi";
    startMenu.innerHTML = "<p>Kechirasiz, siz izlayotgan testingiz topilmadi.</p>";
    return;
  }

  quizTitle.textContent = `Test: ${quizId}`;
  questionCount.textContent = `Ushbu testda ${quizData.length} ta savol mavjud.`;

  // Create progress dots based on number of questions
  const progressBar = document.getElementById("progress-bar");
  progressBar.innerHTML = "";
  for (let i = 0; i < quizData.length; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    progressBar.appendChild(dot);
  }

  startMenu.style.display = "block";
}

startButton.addEventListener("click", () => {
  startMenu.style.display = "none";
  quizContainer.style.display = "block";
  renderQuestion(currentQuestionIndex);
});

async function fetchQuiz(quizId) {
  try {
    const response = await fetch(`/quizzes/${quizId}.json`);
    if (!response.ok) throw new Error("Quiz file not found");
    const allQuestions = await response.json();
    return getRandomQuestions(allQuestions, 4);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return null;
  }
}

function renderQuestion(index) {
  const question = quizData[index]; // Access quizData after it's loaded
  quizContainer.innerHTML = "";

  const questionDiv = document.createElement("div");
  questionDiv.classList.add("quiz-question");

  let questionContent = `<h3>${index + 1}-savol: ${question.question}</h3>`;
  if (question.image) {
    questionContent += `<img src="${question.image}" alt="Savol rasmi" class="question-image">`;
  }

  const options = question.options
    .map((option, i) => {
      const value = typeof option === "string" ? option : option.value;
      return `
        <div class="option-wrapper">
          <label>
            <input type="radio" name="q${index}" value="${value}" class="quiz-option">
            ${typeof option === "object" && option.type === "image" ? `<img src="${value}" alt="Option ${i + 1}">` : value}
          </label>
          <p class="explanation" id="explanation-${value}" hidden>
            ${question.explanations[value]}
          </p>
        </div>
      `;
    })
    .join("");

  questionDiv.innerHTML = questionContent + options;
  quizContainer.appendChild(questionDiv);
  resultElement.textContent = `Savol ${index + 1}/${quizData.length}`;
  checkButton.style.display = "block";
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notifications ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("fade-out");
    setTimeout(() => notification.remove(), 500);
  }, 2500);
}

function playSound(type) {
  const audio = new Audio();
  if (type === "correct") {
    audio.src = "audio/correct.mp3";
  } else if (type === "wrong") {
    audio.src = "audio/wrong.mp3";
  }
  audio.play();
}

function handleCheck() {
  if (checkButton.textContent === "Keyingi") {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      renderQuestion(currentQuestionIndex);
      checkButton.textContent = "Tekshirish";
    } else {
      showResults();
    }
    return;
  }

  const selected = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
  if (!selected) {
    showNotification("Iltimos, javobni tanlang.", "error");
    return;
  }

  const userAnswer = selected.value;
  const correctAnswer = quizData[currentQuestionIndex].answer;
  const progressDots = document.querySelectorAll(".progress-bar .dot");

  if (userAnswer === correctAnswer) {
    // Correct answer logic
    if (!incorrectAttempts[currentQuestionIndex]) {
      score++;
      showNotification("To'g'ri! 🎉", "success");
      playSound("correct");
    } else {
      showNotification("To'g'ri, lekin oldingi urinish sababli ball berilmadi.", "info");
    }

    userAnswers[currentQuestionIndex] = userAnswer;

    // Disable all options
    document.querySelectorAll(`input[name="q${currentQuestionIndex}"]`).forEach((input) => (input.disabled = true));

    // Show all explanations for all options after the correct answer
    document.querySelectorAll(`.explanation`).forEach((explanation) => {
      explanation.classList.add("visible");
    });

    // Update the dot to green for correct answer
    progressDots[currentQuestionIndex].classList.add("correct");

    checkButton.textContent = "Keyingi";
  } else {
    // Incorrect answer logic
    incorrectAttempts[currentQuestionIndex]++;
    showNotification("Noto'g'ri, qayta urinib ko'ring!", "error");
    playSound("wrong");

    // Update the dot to blue for incorrect answer
    progressDots[currentQuestionIndex].classList.add("incorrect");

    // No explanations are revealed for incorrect attempts
  }
}

function getRandomQuestions(allQuestions, numQuestions = 4) {
  const shuffled = allQuestions.sort(() => 0.4 - Math.random());
  return shuffled.slice(0, numQuestions);
}

function showResults() {
  quizContainer.innerHTML = `
    <h2>Test yakunlandi!</h2>
    <p>Sizning ballingiz: ${score}/${quizData.length}</p>
    <p>${score === quizData.length ? "🎉 Siz testni mukammal bajardingiz!" : "Keyingi safar omad tilayman! 🌟"}</p>
    <button id="retry-button" class="retry-button">Testni qayta o'tish</button>
  `;

  checkButton.style.display = "none";

  const retryButton = document.getElementById("retry-button");
  retryButton.addEventListener("click", () => {
    location.reload();
  });
}

if (quizId) {
  renderStartMenu(quizId);
}

checkButton.addEventListener("click", handleCheck);
