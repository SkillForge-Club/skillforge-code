fetch("/data/courses.json")
  .then((response) => response.json())
  .then((courses) => {
    const container = document.querySelector(".course-content");
    courses.forEach((course) => {
      const courseElement = document.createElement("div");
      courseElement.classList.add("course-container");

      courseElement.innerHTML = `
        <h2>${course.title}</h2>
        <p>${course.description}</p>
        <button>
          <a href="/course.html?id=${course.id}">Kursni ko'rish</a>
        </button>
      `;

      container.appendChild(courseElement);
    });
  });
