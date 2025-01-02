const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get("quiz");

const quizTitle = document.getElementById("quiz-title");
const quizContainer = document.getElementById("quiz-container");
const checkButton = document.getElementById("check-quiz");
const resultElement = document.getElementById("quiz-result");

async function fetchQuiz(quizId) {
  try {
    const response = await fetch(`/quizzes/${quizId}.json`);
    if (!response.ok) throw new Error("Quiz file not found");
    return await response.json();
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return null;
  }
}

function renderQuizQuestion(question, index) {
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("quiz-question");

  // Render question text and image if present
  let questionContent = `<h3>Question ${index + 1}: ${question.question}</h3>`;
  if (question.image) {
    questionContent += `<img src="${question.image}" alt="Question Image" style="max-width: 100%; height: auto;">`;
  }

  // Render options
  const options = question.options
    .map((option, i) => {
      if (typeof option === "object") {
        // Handle options as objects
        if (option.type === "image") {
          return `
            <label>
              <input type="radio" name="q${index}" value="${option.value}">
              <img src="${option.value}" alt="Option ${
            i + 1
          }" style="width: 50px; height: 50px;">
            </label>
          `;
        } else if (option.type === "text") {
          return `
            <label>
              <input type="radio" name="q${index}" value="${option.value}"> ${option.value}
            </label>
          `;
        }
      } else {
        // Handle options as plain strings
        return `
          <label>
            <input type="radio" name="q${index}" value="${option}"> ${option}
          </label>
        `;
      }
    })
    .join("");

  questionDiv.innerHTML = questionContent + options;
  return questionDiv;
}

async function renderQuiz(quizId) {
  const quiz = await fetchQuiz(quizId);
  if (!quiz) {
    quizTitle.textContent = "Quiz Not Found";
    quizContainer.innerHTML =
      "<p>Sorry, the quiz you're looking for doesn't exist.</p>";
    return;
  }

  quizTitle.textContent = `Quiz: ${quizId}`;
  quiz.forEach((question, index) => {
    const questionElement = renderQuizQuestion(question, index);
    quizContainer.appendChild(questionElement);
  });

  checkButton.style.display = "block";
}

checkButton.addEventListener("click", async () => {
  const quiz = await fetchQuiz(quizId);
  if (!quiz) return;

  let score = 0;
  quiz.forEach((question, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === question.answer) {
      score++;
    }
  });

  // Clear existing result
  resultElement.textContent = `Your score: ${score}/${quiz.length}`;
});

if (quizId) {
  renderQuiz(quizId);
}
