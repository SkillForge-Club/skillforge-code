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
let quizData = [];
let userAnswers = [];
let incorrectAttempts = [];
let score = 0; // Track the user's score
let notifications = document.createElement("div");
notifications.className = "notifications";
document.body.appendChild(notifications);

// Update to render the start menu with quiz data
async function renderStartMenu(quizId) {
  quizData = await fetchQuiz(quizId);
  if (!quizData) {
    quizTitle.textContent = "Test topilmadi";
    startMenu.innerHTML =
      "<p>Kechirasiz, siz izlayotgan testingiz topilmadi.</p>";
    return;
  }

  quizTitle.textContent = `Quiz: ${quizId}`;
  questionCount.textContent = `Ushbu testda ${quizData.length} ta savol mavjud.`;
  startMenu.style.display = "block";
}

// Handle the "Let's Go" button click
startButton.addEventListener("click", () => {
  startMenu.style.display = "none";
  quizContainer.style.display = "block";
  renderQuestion(currentQuestionIndex);
});

// Fetch the quiz data
async function fetchQuiz(quizId) {
  try {
    const response = await fetch(`/quizzes/${quizId}.json`);
    if (!response.ok) throw new Error("Quiz file not found");
    const allQuestions = await response.json();
    return getRandomQuestions(allQuestions, 5); // Select 5 random questions
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return null;
  }
}

// Render a single question
function renderQuestion(index) {
  const question = quizData[index];
  quizContainer.innerHTML = ""; // Clear the container

  const questionDiv = document.createElement("div");
  questionDiv.classList.add("quiz-question");

  let questionContent = `<h3>Savol ${index + 1}: ${question.question}</h3>`;
  if (question.image) {
    questionContent += `<img src="${question.image}" alt="Savol rasmi" class="question-image">`;
  }

  const options = question.options
    .map((option, i) => {
      const value = typeof option === "string" ? option : option.value;
      return `
        <label>
          <input type="radio" name="q${index}" value="${value}" class="quiz-option">
          ${
            typeof option === "object" && option.type === "image"
              ? `<img src="${value}" alt="Option ${i + 1}">`
              : value
          }
        </label>
      `;
    })
    .join("");

  questionDiv.innerHTML = questionContent + options;
  quizContainer.appendChild(questionDiv);
  resultElement.textContent = `Savol ${index + 1}-chi/${quizData.length}-ta`;
  checkButton.style.display = "block"; // Show check button
}

// Show custom notifications
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notifications ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  // Trigger fade-out after 2.5 seconds
  setTimeout(() => {
    notification.classList.add("fade-out");
    // Remove element after fade-out animation completes
    setTimeout(() => notification.remove(), 500);
  }, 2500);
}

// Function to play sound
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
    // Move to the next question
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      renderQuestion(currentQuestionIndex);
      checkButton.textContent = "Tekshirish"; // Reset button text to "Check"
    } else {
      showResults(); // Show results if all questions are done
    }
    return;
  }

  // Handle "Check" logic
  const selected = document.querySelector(
    `input[name="q${currentQuestionIndex}"]:checked`
  );
  if (!selected) {
    showNotification("Iltimos, tekshirishdan oldin javobni tanlang.", "error");
    return;
  }

  const userAnswer = selected.value;
  const correctAnswer = quizData[currentQuestionIndex].answer;

  if (userAnswer === correctAnswer) {
    if (!incorrectAttempts[currentQuestionIndex]) {
      score++; // Increment score only if no previous incorrect attempts
      showNotification("To'g'ri! 🎉", "success");
      playSound("correct"); // Play correct sound
    } else {
      showNotification(
        "To'g'ri, lekin oldingi urinish sababli ball berilmadi.",
        "info"
      );
    }

    userAnswers[currentQuestionIndex] = userAnswer;

    // Disable all options
    document
      .querySelectorAll(`input[name="q${currentQuestionIndex}"]`)
      .forEach((input) => (input.disabled = true));

    checkButton.textContent = "Next"; // Change button to "Next"
  } else {
    showNotification("Noto'g'ri, qayta urinib ko'ring!", "error");
    playSound("wrong"); // Play wrong sound
    incorrectAttempts[currentQuestionIndex] = true;
  }
}

function getRandomQuestions(allQuestions, numQuestions = 5) {
  // Shuffle the array
  const shuffled = allQuestions.sort(() => 0.5 - Math.random());
  // Return the first `numQuestions`
  return shuffled.slice(0, numQuestions);
}

// Display the results
function showResults() {
  quizContainer.innerHTML = `
    <h2>Test yakunlandi!</h2>
    <p>Your score: ${score}/${quizData.length}</p>
    <p>${
      score === quizData.length
        ? "🎉 Siz buni mukammal bajardingiz!"
        : "Keyingi safar omad tilayman!"
    }</p>
    <button id="retry-button" class="retry-button">Testni qayta o'tash</button>
  `;

  checkButton.style.display = "none";

  const retryButton = document.getElementById("retry-button");
  retryButton.addEventListener("click", () => {
    location.reload(); // Reload the page to retry the quiz
  });
}

// Initialize the quiz
async function renderQuiz(quizId) {
  const allQuestions = await fetchQuiz(quizId);
  if (!allQuestions) {
    quizTitle.textContent = "Test topilmadi";
    quizContainer.innerHTML =
      "<p>Kechirasiz, siz izlayotgan testingiz topilmadi.</p>";
    return;
  }

  quizData = allQuestions; // Random 5 questions
  quizTitle.textContent = `Test: ${quizId}`;
  userAnswers = Array(quizData.length).fill(null);
  incorrectAttempts = Array(quizData.length).fill(false);
  renderQuestion(currentQuestionIndex);
}

// Adjust initialization
if (quizId) {
  renderStartMenu(quizId);
}

checkButton.addEventListener("click", handleCheck);
