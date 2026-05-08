const startScreen = document.querySelector("#startScreen");
const readyScreen = document.querySelector("#readyScreen");
const revealScreen = document.querySelector("#revealScreen");
const questionScreen = document.querySelector("#questionScreen");
const finalScreen = document.querySelector("#finalScreen");
const rotateScreen = document.querySelector("#rotateScreen");
const gameScreen = document.querySelector("#gameScreen");
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
const moveLeftButton = document.querySelector("#moveLeftButton");
const moveRightButton = document.querySelector("#moveRightButton");
const shootButton = document.querySelector("#shootButton");
const flamethrower = document.querySelector(".hero__flamethrower");
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

const waveSizes = [20, 20, 20];
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
      speed: 132 + currentWaveIndex * 42 + index * 3,
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
  continueButton.textContent = "Продолжение скоро";
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
