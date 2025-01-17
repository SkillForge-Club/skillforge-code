fetch("/data/course-quizzes.json")
  .then((response) => response.json())
  .then((courses) => {
    const container = document.querySelector(".tests-content");
    courses.forEach((course) => {
      const courseElement = document.createElement("div");
      courseElement.classList.add("tests-continer");

      courseElement.innerHTML = `
        <h2>${course.title}</h2>
        <p>${course.description}</p>
        <button>
          <a href="/course-quizzes.html?id=${course.id}">Kursga oid testlarni ko'rish</a>
        </button>
      `;

      container.appendChild(courseElement);
    });
  });
