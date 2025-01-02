fetch("/data/courses.json")
  .then((response) => response.json())
  .then((courses) => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get("id");
    const course = courses.find((c) => c.id === courseId);

    if (!course) {
      document.body.innerHTML = "<h1>Course not found!</h1>";
      return;
    }

    document.getElementById("course-title").textContent = course.title;
    document.getElementById("course-description").textContent =
      course.description;

    const lessonsContainer = document.getElementById("lessons-container");
    course.lessons.forEach((lessonId) => {
      fetch("/data/lessons.json")
        .then((response) => response.json())
        .then((lessons) => {
          const lesson = lessons.find((l) => l.id === lessonId);
          const lessonElement = document.createElement("div");
          lessonElement.classList.add('lessonElement')

          const lessonContent = document.createElement("div");
          lessonContent.classList.add('lessonContent')

          lessonContent.innerHTML = `
            <h3>${lesson.title}</h3>
            <p>${lesson.description}</p>
            <button><a href="/lesson.html?lesson=${lesson.id}">View Lesson</a></button>
          `;
          lessonElement.appendChild(lessonContent);
          lessonsContainer.appendChild(lessonElement);
        });
    });
  });
