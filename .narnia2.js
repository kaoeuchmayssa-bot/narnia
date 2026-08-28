let score = 0;
let health = 100;
let progress = 0;
let inventory = [];

const title = document.getElementById("title");
const text = document.getElementById("text");
const choices = document.getElementById("choices");
const sceneEmoji = document.getElementById("sceneEmoji");

const scoreElement = document.getElementById("score");
const healthElement = document.getElementById("health");
const itemsElement = document.getElementById("items");
const progressBar = document.getElementById("progressBar");

function updateStats() {
  scoreElement.textContent = score;
  healthElement.textContent = health;

  itemsElement.textContent =
    inventory.length > 0 ? inventory.join(" • ") : "Aucun";

  progressBar.style.width = progress + "%";

  if (health <= 0) {
    endGame(
      "❄️ Le froid éternel",
      "Tu as perdu toute ton énergie dans les terres glacées de Narnia."
    );
  }
}

function setScene(emoji, newTitle, newText, buttons) {
  sceneEmoji.textContent = emoji;
  title.textContent = newTitle;
  text.textContent = newText;

  choices.innerHTML = "";

  buttons.forEach((button, index) => {
    const btn = document.createElement("button");
    btn.textContent = button.text;
    btn.onclick = () => button.action();
    choices.appendChild(btn);
  });

  updateStats();
}

/* Début */

function choose(choice) {
  if (choice === 1) {
    score += 10;
    progress = 10;

    setScene(
      "❄️",
      "Bienvenue à Narnia",
      "Tu traverses l'armoire et arrives dans une forêt couverte de neige. Au loin, tu aperçois un mystérieux lampadaire. Quelque chose semble t'observer.",
      [
        {
          text: "🕯️ Aller vers le lampadaire",
          action: forestScene,
        },
        {
          text: "🌲 Explorer la forêt",
          action: exploreForest,
        },
      ]
    );
  } else {
    setScene(
      "🏠",
      "Une deuxième chance",
      "Tu retournes dans la maison. Mais une étrange voix murmure ton nom depuis l'armoire...",
      [
        {
          text: "🚪 Ouvrir à nouveau l'armoire",
          action: forestScene,
        },
      ]
    );
  }
}

/* Forêt */

function forestScene() {
  score += 15;
  progress = 25;

  setScene(
    "🦁",
    "Le gardien de la forêt",
    "Une silhouette majestueuse apparaît entre les arbres. Tu sens immédiatement que cette créature n'est pas un ennemi. Elle te demande de prouver ton courage.",
    [
      {
        text: "⚔️ Accepter l'épreuve",
        action: combat,
      },
      {
        text: "🏃 Fuir",
        action: () => {
          health -= 20;
          score -= 5;
          setScene(
            "🌨️",
            "La forêt te poursuit",
            "Tu cours dans la neige, mais la forêt semble changer autour de toi. Tu dois maintenant retrouver ton chemin.",
            [
              {
                text: "🧭 Continuer",
                action: puzzle,
              },
            ]
          );
        },
      },
    ]
  );
}

function exploreForest() {
  score += 10;
  progress = 20;

  inventory.push("🗺️ Carte magique");

  setScene(
    "🗺️",
    "La carte magique",
    "Sous un vieux rocher, tu trouves une carte magique. Elle révèle un chemin secret menant vers une ancienne forteresse.",
    [
      {
        text: "🏰 Suivre la carte",
        action: puzzle,
      },
      {
        text: "🌲 Continuer sans la carte",
        action: forestScene,
      },
    ]
  );
}

/* Combat */

function combat() {
  progress = 40;

  setScene(
    "🐺",
    "Le loup des glaces",
    "Un loup gigantesque surgit devant toi ! Tu dois agir rapidement.",
    [
      {
        text: "⚔️ Attaquer",
        action: attack,
      },
      {
        text: "✨ Utiliser la magie",
        action: magic,
      },
    ]
  );
}

function attack() {
  const damage = Math.floor(Math.random() * 25) + 15;

  score += damage;
  health -= 10;

  setScene(
    "⚔️",
    "Le combat",
    `Ton attaque touche le loup et lui inflige ${damage} points de dégâts. Le combat est presque terminé.`,
    [
      {
        text: "🔥 Donner le coup final",
        action: victory,
      },
    ]
  );
}

function magic() {
  score += 30;
  inventory.push("✨ Cristal magique");

  setScene(
    "✨",
    "La magie ancienne",
    "Tu lèves la main et le cristal magique s'illumine. Une lumière puissante repousse le loup dans la forêt.",
    [
      {
        text: "🏰 Continuer vers la forteresse",
        action: puzzle,
      },
    ]
  );
}

function victory() {
  score += 50;
  progress = 55;

  inventory.push("🗡️ Épée ancienne");

  setScene(
    "🏆",
    "Victoire !",
    "Le loup disparaît dans la neige. Tu trouves une ancienne épée abandonnée près du champ de bataille.",
    [
      {
        text: "🏰 Aller à la forteresse",
        action: puzzle,
      },
    ]
  );
}

/* Puzzle */

function puzzle() {
  progress = 70;

  setScene(
    "🧩",
    "La porte enchantée",
    "Tu arrives devant une immense porte. Une inscription apparaît : « Je grandis quand on me partage. Qu'est-ce que je suis ? »",
    [
      {
        text: "❤️ L'amour",
        action: puzzleCorrect,
      },
      {
        text: "💰 L'or",
        action: puzzleWrong,
      },
      {
        text: "🌑 L'ombre",
        action: puzzleWrong,
      },
    ]
  );
}

function puzzleCorrect() {
  score += 100;
  inventory.push("🔑 Clé enchantée");
  progress = 85;

  setScene(
    "🔑",
    "La porte s'ouvre",
    "Bonne réponse ! La porte s'ouvre lentement et révèle une immense salle remplie de lumière.",
    [
      {
        text: "👑 Entrer dans la salle",
        action: finalScene,
      },
    ]
  );
}

function puzzleWrong() {
  health -= 15;

  setScene(
    "❌",
    "Mauvaise réponse",
    "La porte reste fermée. Une rafale glaciale te repousse. Essaie encore.",
    [
      {
        text: "🧩 Réessayer",
        action: puzzle,
      },
    ]
  );
}

/* Fin */

function finalScene() {
  score += 150;
  progress = 100;

  setScene(
    "🦁",
    "Le royaume est sauvé",
    "Tu entres dans la salle royale. Le royaume de Narnia est enfin libéré. Ton courage restera gravé dans les légendes.",
    [
      {
        text: "🏆 Voir mon résultat",
        action: showEnd,
      },
    ]
  );
}

function showEnd() {
  endGame(
    "👑 Héros de Narnia",
    "Ton aventure est terminée. Tu as traversé la forêt, affronté le danger et résolu l'énigme magique."
  );
}

function endGame(endTitle, endText) {
  document.getElementById("gameOver").classList.remove("hidden");

  document.getElementById("endTitle").textContent = endTitle;
  document.getElementById("endText").textContent = endText;
  document.getElementById("finalScore").textContent = score;
}

function restart() {
  score = 0;
  health = 100;
  progress = 0;
  inventory = [];

  document.getElementById("gameOver").classList.add("hidden");

  sceneEmoji.textContent = "🚪";

  title.textContent = "L'armoire mystérieuse";

  text.textContent =
    "Tu explores une vieille maison lorsqu'une étrange armoire attire ton attention. Tu l'ouvres... et derrière les manteaux se cache un passage couvert de neige. Une lumière mystérieuse brille au loin.";

  choices.innerHTML = `
    <button onclick="choose(1)">❄️ Entrer dans le passage</button>
    <button onclick="choose(2)">🚪 Retourner dans la maison</button>
  `;

  updateStats();
}

updateStats();
