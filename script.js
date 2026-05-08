const startScreen = document.querySelector("#startScreen");
const readyScreen = document.querySelector("#readyScreen");
const revealScreen = document.querySelector("#revealScreen");
const questionScreen = document.querySelector("#questionScreen");
const finalScreen = document.querySelector("#finalScreen");
const rotateScreen = document.querySelector("#rotateScreen");
const gameScreen = document.querySelector("#gameScreen");
const secondIntroScreen = document.querySelector("#secondIntroScreen");
const secondWarningScreen = document.querySelector("#secondWarningScreen");
const secondTestScreen = document.querySelector("#secondTestScreen");
const thirdIntroScreen = document.querySelector("#thirdIntroScreen");
const thirdTestScreen = document.querySelector("#thirdTestScreen");
const brandResultScreen = document.querySelector("#brandResultScreen");
const talentScreen = document.querySelector("#talentScreen");
const giftQuestionScreen = document.querySelector("#giftQuestionScreen");
const teamFarewellScreen = document.querySelector("#teamFarewellScreen");
const startButton = document.querySelector("#startButton");
const readyButton = document.querySelector("#readyButton");
const revealButton = document.querySelector("#revealButton");
const finalButton = document.querySelector("#finalButton");
const boydButton = document.querySelector("#boydButton");
const gameWorld = document.querySelector("#gameWorld");
const hero = document.querySelector("#hero");
const enemiesLayer = document.querySelector("#enemiesLayer");
const effectsLayer = document.querySelector("#effectsLayer");
const healthBar = document.querySelector("#healthBar");
const waveLabel = document.querySelector("#waveLabel");
const gameOverOverlay = document.querySelector("#gameOverOverlay");
const gameWinOverlay = document.querySelector("#gameWinOverlay");
const restartButton = document.querySelector("#restartButton");
const continueButton = document.querySelector("#continueButton");
const secondIntroButton = document.querySelector("#secondIntroButton");
const secondWarningButton = document.querySelector("#secondWarningButton");
const thirdIntroButton = document.querySelector("#thirdIntroButton");
const brandResultButton = document.querySelector("#brandResultButton");
const talentButton = document.querySelector("#talentButton");
const giftUnderstoodButton = document.querySelector("#giftUnderstoodButton");
const giftNotUnderstoodButton = document.querySelector("#giftNotUnderstoodButton");
const secondProgressText = document.querySelector("#secondProgressText");
const secondProgressPercent = document.querySelector("#secondProgressPercent");
const secondProgressBar = document.querySelector("#secondProgressBar");
const secondQuestionTitle = document.querySelector("#secondQuestionTitle");
const secondQuestionImageWrap = document.querySelector("#secondQuestionImageWrap");
const secondQuestionImage = document.querySelector("#secondQuestionImage");
const secondAnswerInput = document.querySelector("#secondAnswerInput");
const secondStatusText = document.querySelector("#secondStatusText");
const secondPrevButton = document.querySelector("#secondPrevButton");
const secondNextButton = document.querySelector("#secondNextButton");
const thirdProgressText = document.querySelector("#thirdProgressText");
const thirdProgressPercent = document.querySelector("#thirdProgressPercent");
const thirdProgressBar = document.querySelector("#thirdProgressBar");
const thirdQuestionTitle = document.querySelector("#thirdQuestionTitle");
const thirdAnswersForm = document.querySelector("#thirdAnswersForm");
const thirdStatusText = document.querySelector("#thirdStatusText");
const thirdPrevButton = document.querySelector("#thirdPrevButton");
const thirdNextButton = document.querySelector("#thirdNextButton");
const moveLeftButton = document.querySelector("#moveLeftButton");
const moveRightButton = document.querySelector("#moveRightButton");
const shootButton = document.querySelector("#shootButton");
const flamethrower = document.querySelector(".hero__flamethrower");
const debugPanel = document.querySelector(".debug-panel");
const debugToggle = document.querySelector("#debugToggle");
const debugButtons = document.querySelectorAll("[data-debug-screen]");
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
let heroX = 0;
let heroDirection = 1;
let lastFrameTime = 0;
let isGameRunning = false;
let gameState = "idle";
let heroHealth = 100;
let currentWaveIndex = 0;
let enemies = [];
let flames = [];
let lastShotTime = 0;
let currentSecondQuestionIndex = 0;
let secondAnswers = [];
let currentThirdQuestionIndex = 0;
let thirdAnswers = [];

const waveSizes = [20, 20, 20];
const secondQuestions = [
  {
    text: "Каким бизнесом занималась семья Фогги Нейльсана?",
    image: "public/mem_2.jpg",
    imageAlt: "Мем к первому вопросу второго теста",
  },
  {
    text: "Сколько линчевателей ты знаешь в сериале Сорвиголова?",
    image: "public/mem_3.jpg",
    imageAlt: "Мем ко второму вопросу второго теста",
  },
  {
    text: "Какое блюдо Кингпинк ест на завтрак?",
    image: "public/mem_4.jpg",
    imageAlt: "Мем к третьему вопросу второго теста",
  },
  {
    text: "Какой персонаж является самым горячим в сериале Сорвиголова?",
  },
  {
    text: "Какую часть тела стик избавился, чтобы сбежать из западни красной руки?",
    image: "public/mem_1.jpg",
    imageAlt: "Мем к пятому вопросу второго теста",
  },
  {
    text: "Представь ты повар мэра Фиска, и от твоего блюда зависела твоя жизнь, то чтобы ты приготовил на ужин?",
  },
  {
    text: "Какой порт был важен для Фикса, в сериале Сорвиголова: рожденный заново?",
  },
];
const thirdQuestions = [
  {
    text: "Как ты обычно решаешь проблемы?",
    answers: [
      "Долго терплю, коплю в себе, а потом срываюсь одним мощным взрывом.",
      "Думаю о том, как мои действия повлияют на других, и ищу компромисс.",
      "Методично и холодно ищу решение, шаг за шагом, пока проблема не исчезнет.",
      "Быстро реагирую и импровизирую, даже если это приводит к хаосу вокруг.",
    ],
  },
  {
    text: "Какой стиль общения тебе ближе?",
    answers: [
      "Я немногословен, но если уж говорю, то прямо и обжигающе, люди обижаются.",
      "Стараюсь быть душой компании, чтобы все \"горели\" энтузиазмом.",
      "Говорю по делу, не терплю пустой болтовни, она меня \"выжигает\" изнутри.",
      "Обожаю спорить, подкидывать дровишки в чужой конфликт и смотреть, как разгорается пламя.",
    ],
  },
  {
    text: "Какая цитата тебе ближе всего?",
    answers: [
      "\"Ты можешь быть хоть водой, но я заставлю тебя закипеть и испариться\".",
      "\"Огонь в моей душе не погаснет, даже если весь мир будет против\".",
      "\"Я родился в пламени и не боюсь сгореть в нем снова\".",
      "\"Там, где прошел я, остается только пепел\".",
    ],
  },
  {
    text: "Что выводит тебя из себя быстрее всего?",
    answers: [
      "Когда меня игнорируют или недооценивают. Они еще увидят мой фитиль!",
      "Предательство близких. Месть будет долгой и мучительной.",
      "Тупые правила и бюрократия. Хочется просто все сжечь.",
      "Когда трогают мои вещи или нарушают мои планы.",
    ],
  },
  {
    text: "Что бы ты предпочел в бою/споре?",
    answers: [
      "Подождать, пока соперники устанут ссориться друг с другом, а потом поджечь фитиль.",
      "Ослепить противника своей харизмой и добить эффектной фразой.",
      "Поджарить всех скопом, не вникая, кто прав, кто виноват.",
      "Сконцентрироваться на одной цели и прожигать ее, пока не останется углей.",
    ],
  },
  {
    text: "Какая стихия тебе ближе по духу?",
    answers: [
      "Терпение земли.",
      "Ярость урагана.",
      "Чистое, всепоглощающее пламя.",
      "Магия проклятого.",
    ],
  },
  {
    text: "Что ты чувствуешь, когда очень зол?",
    answers: [
      "Мне кажется, что мои руки и слова буквально жгут все, к чему прикасаются.",
      "Я становлюсь очень громким и неконтролируемым.",
      "Внешне я спокоен, но внутри все превращается в пепел.",
      "Я чувствую странное воодушевление, хочется, чтобы мир горел вместе со мной.",
    ],
  },
  {
    text: "Какова твоя роль в команде друзей?",
    answers: [
      "Затворник-одиночка, которого все немного побаиваются, но ценят за мощь в трудную минуту.",
      "Зажигалка, без меня всем скучно, я инициатор движа.",
      "Судья в последней инстанции. Если я вмешался - все сгорит, мало не покажется никому.",
      "Философ, который любит напоминать, что все тлен и все там будем.",
    ],
  },
  {
    text: "Опиши свой идеальный гнев...",
    answers: [
      "Когда у тебя внутри полыхает пожар, который ты контролируешь, пока не направишь его на обидчика.",
      "Эмоциональный, но короткий.",
      "Бесконечный. Ты можешь гореть обидой вечность.",
      "Красивый и устрашающий.",
    ],
  },
  {
    text: "Если бы ты был духом, заключенным в темнице, что бы ты делал?",
    answers: [
      "Спал бы тысячелетиями, накапливая ярость для побега.",
      "Пытался бы докричаться до тех, кто проходит мимо, манипулируя ими.",
      "Горел бы в собственном огне, мечтая вырваться и сжечь тюремщика.",
      "Терпеливо ждал бы дурака, который снимет печать.",
    ],
  },
];
const pressedKeys = {
  left: false,
  right: false,
};

function showScreen(screen) {
  startScreen.hidden = screen !== startScreen;
  readyScreen.hidden = screen !== readyScreen;
  revealScreen.hidden = screen !== revealScreen;
  questionScreen.hidden = screen !== questionScreen;
  finalScreen.hidden = screen !== finalScreen;
  rotateScreen.hidden = screen !== rotateScreen;
  gameScreen.hidden = screen !== gameScreen;
  secondIntroScreen.hidden = screen !== secondIntroScreen;
  secondWarningScreen.hidden = screen !== secondWarningScreen;
  secondTestScreen.hidden = screen !== secondTestScreen;
  thirdIntroScreen.hidden = screen !== thirdIntroScreen;
  thirdTestScreen.hidden = screen !== thirdTestScreen;
  brandResultScreen.hidden = screen !== brandResultScreen;
  talentScreen.hidden = screen !== talentScreen;
  giftQuestionScreen.hidden = screen !== giftQuestionScreen;
  teamFarewellScreen.hidden = screen !== teamFarewellScreen;
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

function startGame() {
  prepareMobileGameView();
  showScreen(gameScreen);
  resetGame();

  if (!isGameRunning) {
    isGameRunning = true;
    lastFrameTime = performance.now();
    requestAnimationFrame(updateGame);
  }
}

async function prepareMobileGameView() {
  if (!isMobileDevice()) {
    document.body.classList.remove("is-mobile-game");
    return;
  }

  document.body.classList.add("is-mobile-game");

  try {
    if (!document.fullscreenElement && gameScreen.requestFullscreen) {
      await gameScreen.requestFullscreen();
    }
  } catch (error) {
    console.info("Fullscreen mode is not available on this device.", error);
  }

  try {
    if (screen.orientation && screen.orientation.lock) {
      await screen.orientation.lock("landscape");
    }
  } catch (error) {
    console.info("Landscape orientation lock is not available on this device.", error);
  }
}

function isMobileDevice() {
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(max-width: 820px)").matches ||
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  );
}

function resetGame() {
  gameState = "playing";
  heroHealth = 100;
  currentWaveIndex = 0;
  enemies = [];
  flames = [];
  pressedKeys.left = false;
  pressedKeys.right = false;
  enemiesLayer.innerHTML = "";
  effectsLayer.innerHTML = "";
  gameOverOverlay.hidden = true;
  gameWinOverlay.hidden = true;
  hero.classList.remove("hero--dead");
  resetHeroPosition();
  updateHealthBar();
  spawnWave();
}

function resetHeroPosition() {
  const worldWidth = gameWorld.clientWidth;
  const heroWidth = hero.offsetWidth;

  heroX = Math.max(0, (worldWidth - heroWidth) / 2);
  heroDirection = 1;
  updateHeroPosition();
}

function updateHeroPosition() {
  hero.style.transform = `translateX(${heroX}px)`;
  hero.classList.toggle("hero--facing-left", heroDirection === -1);
  hero.classList.toggle("hero--facing-right", heroDirection === 1);
}

function spawnWave() {
  const worldWidth = gameWorld.clientWidth;
  const count = waveSizes[currentWaveIndex];

  waveLabel.textContent = `Волна ${currentWaveIndex + 1}/3`;

  for (let index = 0; index < count; index += 1) {
    const side = index % 2 === 0 ? "left" : "right";
    const enemy = document.createElement("div");
    const x = side === "left" ? -120 - index * 56 : worldWidth + 80 + index * 56;

    enemy.className = "enemy";
    enemiesLayer.append(enemy);
    enemies.push({
      element: enemy,
      x,
      width: 184,
      health: 1,
      side,
      speed: 82 + currentWaveIndex * 26 + index * 2,
    });
  }
}

function shootFire() {
  const now = performance.now();

  if (gameState !== "playing" || now - lastShotTime < 260) {
    return;
  }

  const worldRect = gameWorld.getBoundingClientRect();
  const flamethrowerRect = flamethrower.getBoundingClientRect();
  const flame = document.createElement("div");
  const startX =
    heroDirection === 1
      ? flamethrowerRect.right - worldRect.left - 6
      : flamethrowerRect.left - worldRect.left - 154;
  const startY = flamethrowerRect.top - worldRect.top + flamethrowerRect.height / 2 - 36;

  flame.className = "flame";
  flame.style.top = `${startY}px`;
  effectsLayer.append(flame);
  flames.push({
    element: flame,
    x: startX,
    direction: heroDirection,
    distance: 0,
    width: 160,
    speed: 860,
  });
  lastShotTime = now;
}

function updateGame(timestamp) {
  const deltaSeconds = Math.min((timestamp - lastFrameTime) / 1000, 0.05);

  lastFrameTime = timestamp;

  if (gameState === "playing") {
    updateHero(deltaSeconds);
    updateFlames(deltaSeconds);
    updateEnemies(deltaSeconds);
    checkCollisions();
    checkWaveProgress();
  }

  requestAnimationFrame(updateGame);
}

function updateHero(deltaSeconds) {
  const worldWidth = gameWorld.clientWidth;
  const heroWidth = hero.offsetWidth;
  const speed = worldWidth * 0.42;
  let movement = 0;

  if (pressedKeys.left) {
    movement -= speed * deltaSeconds;
    heroDirection = -1;
  }

  if (pressedKeys.right) {
    movement += speed * deltaSeconds;
    heroDirection = 1;
  }

  heroX = Math.min(Math.max(heroX + movement, 0), worldWidth - heroWidth);
  hero.classList.toggle("hero--walking", movement !== 0);
  updateHeroPosition();
}

function updateFlames(deltaSeconds) {
  flames.forEach((flame) => {
    flame.x += flame.speed * flame.direction * deltaSeconds;
    flame.distance += flame.speed * deltaSeconds;
    flame.element.style.transform = `translateX(${flame.x}px) scaleX(${flame.direction})`;
  });

  flames = flames.filter((flame) => {
    const isAlive = flame.distance < 430;

    if (!isAlive) {
      flame.element.remove();
    }

    return isAlive;
  });
}

function updateEnemies(deltaSeconds) {
  const heroCenter = heroX + hero.offsetWidth / 2;

  enemies.forEach((enemy) => {
    const enemyCenter = enemy.x + enemy.width / 2;
    const direction = enemyCenter < heroCenter ? 1 : -1;

    enemy.x += direction * enemy.speed * deltaSeconds;
    enemy.element.style.transform = `translateX(${enemy.x}px) scaleX(${direction === 1 ? 1 : -1})`;
  });
}

function checkCollisions() {
  enemies.forEach((enemy) => {
    flames.forEach((flame) => {
      const flameLeft = flame.x;
      const flameRight = flame.x + flame.width;
      const enemyLeft = enemy.x + 24;
      const enemyRight = enemy.x + enemy.width - 24;

      if (flameRight >= enemyLeft && flameLeft <= enemyRight) {
        enemy.health = 0;
        enemy.element.classList.add("enemy--burned");
        flame.distance = 999;
      }
    });

    const heroLeft = heroX + 36;
    const heroRight = heroX + hero.offsetWidth - 36;
    const enemyLeft = enemy.x + 36;
    const enemyRight = enemy.x + enemy.width - 36;

    if (enemy.health > 0 && enemyRight >= heroLeft && enemyLeft <= heroRight) {
      loseGame();
    }
  });

  enemies = enemies.filter((enemy) => {
    if (enemy.health > 0) {
      return true;
    }

    setTimeout(() => enemy.element.remove(), 160);
    return false;
  });
}

function checkWaveProgress() {
  if (enemies.length > 0 || gameState !== "playing") {
    return;
  }

  if (currentWaveIndex < waveSizes.length - 1) {
    currentWaveIndex += 1;
    gameState = "between-waves";
    waveLabel.textContent = `Волна ${currentWaveIndex + 1}/3`;
    setTimeout(() => {
      if (gameState === "between-waves") {
        gameState = "playing";
        spawnWave();
      }
    }, 700);
    return;
  }

  winGame();
}

function updateHealthBar() {
  healthBar.style.width = `${heroHealth}%`;
}

function loseGame() {
  gameState = "lost";
  heroHealth = 0;
  updateHealthBar();
  hero.classList.remove("hero--walking");
  hero.classList.add("hero--dead");
  gameOverOverlay.hidden = false;
}

function winGame() {
  gameState = "won";
  hero.classList.remove("hero--walking");
  gameWinOverlay.hidden = false;
}

function startSecondTest() {
  currentSecondQuestionIndex = 0;

  if (secondAnswers.length !== secondQuestions.length) {
    secondAnswers = Array(secondQuestions.length).fill("");
  }

  renderSecondQuestion();
  showScreen(secondTestScreen);
  secondAnswerInput.focus();
}

function renderSecondQuestion() {
  const questionNumber = currentSecondQuestionIndex + 1;
  const totalQuestions = secondQuestions.length;
  const question = secondQuestions[currentSecondQuestionIndex];
  const progress = Math.round(((questionNumber - 1) / totalQuestions) * 100);

  secondProgressText.textContent = `Вопрос ${questionNumber} из ${totalQuestions}`;
  secondProgressPercent.textContent = `${progress}%`;
  secondProgressBar.style.width = `${progress}%`;
  secondQuestionTitle.textContent = question.text;
  secondAnswerInput.value = secondAnswers[currentSecondQuestionIndex] || "";
  secondStatusText.textContent = "";

  if (question.image) {
    secondQuestionImage.src = question.image;
    secondQuestionImage.alt = question.imageAlt || question.text;
    secondQuestionImageWrap.hidden = false;
  } else {
    secondQuestionImage.removeAttribute("src");
    secondQuestionImage.alt = "";
    secondQuestionImageWrap.hidden = true;
  }

  secondPrevButton.disabled = currentSecondQuestionIndex === 0;
  secondNextButton.textContent =
    currentSecondQuestionIndex === secondQuestions.length - 1 ? "Завершить" : "Далее";
}

function saveSecondAnswer() {
  secondAnswers[currentSecondQuestionIndex] = secondAnswerInput.value.trim();
}

function goToPreviousSecondQuestion() {
  if (currentSecondQuestionIndex === 0) {
    return;
  }

  saveSecondAnswer();
  currentSecondQuestionIndex -= 1;
  renderSecondQuestion();
  secondAnswerInput.focus();
}

function goToNextSecondQuestion() {
  saveSecondAnswer();

  if (!secondAnswers[currentSecondQuestionIndex]) {
    secondStatusText.textContent = "Введи ответ, чтобы продолжить.";
    return;
  }

  if (currentSecondQuestionIndex === secondQuestions.length - 1) {
    showScreen(thirdIntroScreen);
    return;
  }

  currentSecondQuestionIndex += 1;
  renderSecondQuestion();
  secondAnswerInput.focus();
}

function startThirdTest() {
  currentThirdQuestionIndex = 0;

  if (thirdAnswers.length !== thirdQuestions.length) {
    thirdAnswers = Array(thirdQuestions.length).fill(null);
  }

  renderThirdQuestion();
  showScreen(thirdTestScreen);
}

function renderThirdQuestion() {
  const questionNumber = currentThirdQuestionIndex + 1;
  const totalQuestions = thirdQuestions.length;
  const question = thirdQuestions[currentThirdQuestionIndex];
  const progress = Math.round(((questionNumber - 1) / totalQuestions) * 100);

  thirdProgressText.textContent = `Вопрос ${questionNumber} из ${totalQuestions}`;
  thirdProgressPercent.textContent = `${progress}%`;
  thirdProgressBar.style.width = `${progress}%`;
  thirdQuestionTitle.textContent = question.text;
  thirdStatusText.textContent = "";
  thirdAnswersForm.innerHTML = "";

  question.answers.forEach((answer, index) => {
    const optionId = `third-answer-${currentThirdQuestionIndex}-${index}`;
    const answerId = ["a", "b", "c", "d"][index];
    const label = document.createElement("label");
    label.className = "answer";
    label.setAttribute("for", optionId);

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "third-answer";
    input.id = optionId;
    input.value = answerId;
    input.checked = thirdAnswers[currentThirdQuestionIndex] === answerId;

    input.addEventListener("change", () => {
      thirdAnswers[currentThirdQuestionIndex] = answerId;
      thirdStatusText.textContent = "";
    });

    const text = document.createElement("span");
    text.className = "answer__text";
    text.textContent = `${answerId.toUpperCase()}) ${answer}`;

    label.append(input, text);
    thirdAnswersForm.append(label);
  });

  thirdPrevButton.disabled = currentThirdQuestionIndex === 0;
  thirdNextButton.textContent =
    currentThirdQuestionIndex === thirdQuestions.length - 1 ? "Завершить" : "Далее";
}

function goToPreviousThirdQuestion() {
  if (currentThirdQuestionIndex === 0) {
    return;
  }

  currentThirdQuestionIndex -= 1;
  renderThirdQuestion();
}

function goToNextThirdQuestion() {
  if (!thirdAnswers[currentThirdQuestionIndex]) {
    thirdStatusText.textContent = "Выбери вариант ответа, чтобы продолжить.";
    return;
  }

  if (currentThirdQuestionIndex === thirdQuestions.length - 1) {
    showBrandResult();
    return;
  }

  currentThirdQuestionIndex += 1;
  renderThirdQuestion();
}

function showBrandResult() {
  launchConfetti();
  showScreen(brandResultScreen);
}

function setMove(direction, isPressed) {
  if (gameState !== "playing") {
    pressedKeys[direction] = false;
    return;
  }

  pressedKeys[direction] = isPressed;
}

function bindHoldButton(button, onPress, onRelease) {
  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    onPress();
  });
  button.addEventListener("pointerup", onRelease);
  button.addEventListener("pointerleave", onRelease);
  button.addEventListener("pointercancel", onRelease);
}

startButton.addEventListener("click", () => {
  showScreen(readyScreen);
});
readyButton.addEventListener("click", () => {
  showScreen(revealScreen);
});
revealButton.addEventListener("click", startQuiz);
finalButton.addEventListener("click", () => {
  showScreen(rotateScreen);
});
boydButton.addEventListener("click", startGame);
restartButton.addEventListener("click", resetGame);
continueButton.addEventListener("click", () => {
  showScreen(secondIntroScreen);
});
secondIntroButton.addEventListener("click", () => {
  showScreen(secondWarningScreen);
});
secondWarningButton.addEventListener("click", startSecondTest);
thirdIntroButton.addEventListener("click", startThirdTest);
thirdPrevButton.addEventListener("click", goToPreviousThirdQuestion);
thirdNextButton.addEventListener("click", goToNextThirdQuestion);
brandResultButton.addEventListener("click", () => {
  showScreen(talentScreen);
});
talentButton.addEventListener("click", () => {
  showScreen(giftQuestionScreen);
});
debugToggle.addEventListener("click", () => {
  debugPanel.classList.toggle("is-hidden");
});
giftUnderstoodButton.addEventListener("click", () => {
  showScreen(teamFarewellScreen);
});
giftNotUnderstoodButton.addEventListener("click", () => {
  showScreen(teamFarewellScreen);
});
secondPrevButton.addEventListener("click", goToPreviousSecondQuestion);
secondNextButton.addEventListener("click", goToNextSecondQuestion);
secondAnswerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    goToNextSecondQuestion();
  }
});

bindHoldButton(moveLeftButton, () => setMove("left", true), () => setMove("left", false));
bindHoldButton(moveRightButton, () => setMove("right", true), () => setMove("right", false));
shootButton.addEventListener("click", shootFire);
shootButton.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  shootFire();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    setMove("left", true);
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    setMove("right", true);
  }

  if (event.code === "Space") {
    event.preventDefault();
    shootFire();
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") {
    setMove("left", false);
  }

  if (event.key === "ArrowRight") {
    setMove("right", false);
  }
});

window.addEventListener("resize", () => {
  if (!gameScreen.hidden) {
    const maxHeroX = gameWorld.clientWidth - hero.offsetWidth;

    heroX = Math.min(heroX, maxHeroX);
    updateHeroPosition();
  }
});

debugButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const screenName = button.dataset.debugScreen;

    if (screenName === "start") {
      showScreen(startScreen);
    }

    if (screenName === "ready") {
      showScreen(readyScreen);
    }

    if (screenName === "reveal") {
      showScreen(revealScreen);
    }

    if (screenName === "question") {
      currentQuestionIndex = 0;
      renderQuestion();
      showScreen(questionScreen);
    }

    if (screenName === "final") {
      launchConfetti();
      showScreen(finalScreen);
    }

    if (screenName === "rotate") {
      showScreen(rotateScreen);
    }

    if (screenName === "game") {
      startGame();
    }

    if (screenName === "test2") {
      startSecondTest();
    }

    if (screenName === "test3") {
      startThirdTest();
    }

    if (screenName === "after-game") {
      showScreen(secondIntroScreen);
    }

    if (screenName === "after-test2") {
      showScreen(thirdIntroScreen);
    }

    if (screenName === "brand") {
      showBrandResult();
    }

    if (screenName === "talent") {
      showScreen(talentScreen);
    }

    if (screenName === "gift") {
      showScreen(giftQuestionScreen);
    }

    if (screenName === "farewell") {
      showScreen(teamFarewellScreen);
    }
  });
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
