fetch("/data/quizzes.json")
  .then((response) => response.json())
  .then((courses) => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get("id");
    const course = courses.find((c) => c.id === courseId);

    if (!course) {
      document.body.innerHTML = "<h1>Kurs topilmadi!</h1>";
      return;
    }

    document.getElementById("course-title").textContent = course.title;
    document.getElementById("course-description").textContent = course.description;

    const lessonsContainer = document.getElementById("quiz-container");
    course.units.forEach((unit) => {
      const unitElement = document.createElement("div");
      unitElement.classList.add("unit");

      const unitHeader = document.createElement("div");
      unitHeader.classList.add("unit-header");
      unitHeader.innerHTML = `
        <h2>${unit.title}</h2>
        <p>${unit.description}</p>
      `;
      unitElement.appendChild(unitHeader);

      const unitLessonsContainer = document.createElement("div");
      unitLessonsContainer.classList.add("unit-quiz");

      unit.quizzes.forEach((quiz) => {
        if (!quiz) return;

        const lessonElement = document.createElement("div");
        lessonElement.classList.add("quiz");

        lessonElement.innerHTML = `
              <h3>${quiz.title}</h3> 
              <button><a href="/quiz.html?quiz=${quiz.file}">Testni yechish</a></button>
            `;
        unitLessonsContainer.appendChild(lessonElement);
      });

      unitElement.appendChild(unitLessonsContainer);
      lessonsContainer.appendChild(unitElement);
    });
  });
