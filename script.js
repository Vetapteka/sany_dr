const startScreen = document.querySelector("#startScreen");
const readyScreen = document.querySelector("#readyScreen");
const revealScreen = document.querySelector("#revealScreen");
const questionScreen = document.querySelector("#questionScreen");
const finalScreen = document.querySelector("#finalScreen");
const startButton = document.querySelector("#startButton");
const readyButton = document.querySelector("#readyButton");
const revealButton = document.querySelector("#revealButton");
const finalButton = document.querySelector("#finalButton");
const progressText = document.querySelector("#progressText");
const progressPercent = document.querySelector("#progressPercent");
const progressBar = document.querySelector("#progressBar");
const questionCategory = document.querySelector("#questionCategory");
const questionTitle = document.querySelector("#questionTitle");
const questionImageWrap = document.querySelector("#questionImageWrap");
const questionImage = document.querySelector("#questionImage");
const answersForm = document.querySelector("#answersForm");
const statusText = document.querySelector("#statusText");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");

let questions = [];
let currentQuestionIndex = 0;
let selectedAnswers = [];

function showScreen(screen) {
  startScreen.hidden = screen !== startScreen;
  readyScreen.hidden = screen !== readyScreen;
  revealScreen.hidden = screen !== revealScreen;
  questionScreen.hidden = screen !== questionScreen;
  finalScreen.hidden = screen !== finalScreen;
}

function loadQuestions() {
  const data = window.quizConfig;

  if (!data || !Array.isArray(data.questions) || data.questions.length === 0) {
    throw new Error("В questions-config.js должен быть массив questions с вопросами");
  }

  questions = data.questions;
  selectedAnswers = Array(questions.length).fill(null);
}

function renderQuestion() {
  const question = questions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;
  const totalQuestions = questions.length;
  const progress = Math.round(((questionNumber - 1) / totalQuestions) * 100);

  progressText.textContent = `Вопрос ${questionNumber} из ${totalQuestions}`;
  progressPercent.textContent = `${progress}%`;
  progressBar.style.width = `${progress}%`;
  questionCategory.textContent = question.category || "Тест";
  questionTitle.textContent = question.text;
  statusText.textContent = "";
  answersForm.innerHTML = "";

  if (question.image) {
    questionImage.src = question.image;
    questionImage.alt = question.imageAlt || question.text;
    questionImageWrap.hidden = false;
  } else {
    questionImage.removeAttribute("src");
    questionImage.alt = "";
    questionImageWrap.hidden = true;
  }

  question.answers.forEach((answer, index) => {
    const optionId = `answer-${currentQuestionIndex}-${index}`;
    const label = document.createElement("label");
    label.className = "answer";
    label.setAttribute("for", optionId);

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.id = optionId;
    input.value = answer.id;
    input.checked = selectedAnswers[currentQuestionIndex] === answer.id;

    input.addEventListener("change", () => {
      selectedAnswers[currentQuestionIndex] = answer.id;
      statusText.textContent = "";
    });

    const text = document.createElement("span");
    text.className = "answer__text";
    text.textContent = answer.text;

    label.append(input, text);
    answersForm.append(label);
  });

  prevButton.disabled = currentQuestionIndex === 0;
  nextButton.disabled = false;
  nextButton.textContent = currentQuestionIndex === questions.length - 1 ? "Завершить" : "Далее";
}

function startQuiz() {
  currentQuestionIndex = 0;
  renderQuestion();
  showScreen(questionScreen);
}

function goToPreviousQuestion() {
  if (currentQuestionIndex === 0) {
    return;
  }

  currentQuestionIndex -= 1;
  renderQuestion();
}

function goToNextQuestion() {
  if (!selectedAnswers[currentQuestionIndex]) {
    statusText.textContent = "Выберите вариант ответа, чтобы продолжить.";
    return;
  }

  if (currentQuestionIndex === questions.length - 1) {
    showResult();
    return;
  }

  currentQuestionIndex += 1;
  renderQuestion();
}

function showResult() {
  launchConfetti();
  showScreen(finalScreen);
}

function launchConfetti() {
  document.querySelectorAll(".confetti").forEach((container) => {
    container.innerHTML = "";

    for (let index = 0; index < 22; index += 1) {
      const piece = document.createElement("span");
      piece.style.setProperty("--delay", `${index * 0.08}s`);
      piece.style.setProperty("--distance", `${80 + (index % 7) * 16}px`);
      piece.style.setProperty("--fall", `${120 + (index % 5) * 18}px`);
      container.append(piece);
    }
  });
}

startButton.addEventListener("click", () => {
  showScreen(readyScreen);
});
readyButton.addEventListener("click", () => {
  showScreen(revealScreen);
});
revealButton.addEventListener("click", startQuiz);
finalButton.addEventListener("click", () => {
  finalButton.textContent = "Очень прикольно";
});
prevButton.addEventListener("click", goToPreviousQuestion);
nextButton.addEventListener("click", goToNextQuestion);

try {
  loadQuestions();
  showScreen(startScreen);
} catch (error) {
  showScreen(questionScreen);
  questionCategory.textContent = "Ошибка";
  questionTitle.textContent = "Не получилось загрузить вопросы";
  questionImageWrap.hidden = true;
  answersForm.innerHTML = "";
  statusText.textContent = "Проверьте файл questions-config.js.";
  prevButton.disabled = true;
  nextButton.disabled = true;
  console.error(error);
}
