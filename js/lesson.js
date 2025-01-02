const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get("lesson");

const lessonTitle = document.getElementById("lesson-title");
const lessonContent = document.getElementById("lesson-content");
const quizLink = document.getElementById("quiz-link");

async function fetchLessonDetails(lessonId) {
  try {
    const response = await fetch("/data/lessons.json");
    if (!response.ok) throw new Error("Could not fetch lessons data");

    const lessons = await response.json();
    return lessons.find((lesson) => lesson.id === lessonId);
  } catch (error) {
    console.error("Error fetching lesson details:", error);
    return null;
  }
}

async function renderLesson(lessonId) {
  try {
    const lesson = await fetchLessonDetails(lessonId);
    if (!lesson) throw new Error("Lesson not found");

    lessonTitle.textContent = lesson.title;

    const response = await fetch(lesson.file);
    if (!response.ok) throw new Error("Markdown file not found");

    const markdown = await response.text();
    lessonContent.innerHTML = marked.parse(markdown);

    quizLink.href = `/quiz.html?quiz=${lesson.id}`;
  } catch (error) {
    lessonTitle.textContent = "Lesson Not Found";
    lessonContent.innerHTML = `<p>Sorry, the lesson you're looking for doesn't exist.</p>`;
    console.error("Error rendering lesson:", error);
  }
}

if (lessonId) {
  renderLesson(lessonId);
} else {
  lessonTitle.textContent = "No Lesson Selected";
  lessonContent.innerHTML = `<p>Please select a lesson.</p>`;
}
