// Abstract Class
class Janken {
  constructor() {
    this.rock = document.getElementsByClassName("rock");
    this.paper = document.getElementsByClassName("paper");
    this.scissors = document.getElementsByClassName("scissors");
  }
}

const Computer = (Base) =>
  class extends Base {
    randomPick = (max) => Math.floor(Math.random() * max);
  };

// Inheritance
class Player_1 extends Janken {
  constructor(rock, paper, scissors) {
    super(rock, paper, scissors);
    this.#initiation();
  }

  // Encapsulation
  #initiation() {
    this.rock[0].id = "rock-player";
    this.paper[0].id = "paper-player";
    this.scissors[0].id = "scissors-player";
  }
}

// Polymorphism
class Player_2 extends Computer(Janken) {
  constructor(rock, paper, scissors) {
    super(rock, paper, scissors);
    this.#initiation();
  }

  #initiation() {
    this.rock[1].id = "rock-com";
    this.paper[1].id = "paper-com";
    this.scissors[1].id = "scissors-com";
  }
}

class Rules {
  constructor() {
    this.resultText = document.createElement("H1");
    this.resultContainer = document.getElementById("vs_result");
    this.user_choice;
    this.com_choice;
  }

  logger = (text) => {
    console.log("----------");
    console.log(text);
  };

  _defaultState = () => {
    this.resultContainer.classList.remove("draw");
    this.resultContainer.classList.remove("versus_result");
    this.resultText.innerHTML = "VS";
    this.resultContainer.appendChild(this.resultText);
  };

  _winResult = () => {
    this.resultContainer.classList.remove("draw");
    this.resultContainer.classList.add("versus_result");
    this.resultText.innerHTML = "PLAYER WIN";
    this.resultContainer.appendChild(this.resultText);
    this.logger("Result : PLAYER Win, great ! :)");
  };

  _loseResult = () => {
    this.resultContainer.classList.remove("draw");
    this.resultContainer.classList.add("versus_result");
    this.resultText.innerHTML = "COM WIN";
    this.resultContainer.appendChild(this.resultText);
    this.logger("Result : COM Win, YOU lose :(");
  };

  _drawResult = () => {
    this.resultContainer.classList.add("versus_result");
    this.resultContainer.classList.add("draw");
    this.resultText.innerHTML = "DRAW";
    this.resultContainer.appendChild(this.resultText);
    this.logger("Result : Draw, GG !");
  };

  decision = (userChoice, botChoice) => {
    if (
      (userChoice === "rock" && botChoice === "rock") ||
      (userChoice === "paper" && botChoice === "paper") ||
      (userChoice === "scissors" && botChoice === "scissors")
    ) {
      return this._drawResult();
    } else if (
      (userChoice === "rock" && botChoice === "scissors") ||
      (userChoice === "paper" && botChoice === "rock") ||
      (userChoice === "scissors" && botChoice === "paper")
    ) {
      return this._winResult();
    } else if (
      (userChoice === "rock" && botChoice === "paper") ||
      (userChoice === "paper" && botChoice === "scissors") ||
      (userChoice === "scissors" && botChoice === "rock")
    ) {
      return this._loseResult();
    }
  };
}

class Game extends Rules {
  constructor(user_choice, com_choice) {
    super(user_choice, com_choice);
    this.resetResult = document.getElementById("reset");
    this.#initiation();
  }

  #initiation() {
    this.user = new Player_1();
    this.com = new Player_2();
    this._defaultState();
    this.resetButton();
  }

  getUserPick = (choice) => {
    this.user_choice = choice;
    this.logger(`Player choose: ${this.user_choice}`);
    return this.user_choice;
  };

  getComPick = (choice) => {
    this.com_choice = choice;
    this.logger(`Com choose: ${this.com_choice}`);
    return this.com_choice;
  };

  setPlayerListener = () => {
    this.user.rock[0].onclick = () => {
      this.getUserPick("rock");
      this.user.rock[0].classList.add("active_choice");
      this.user.paper[0].classList.remove("active_choice");
      this.user.scissors[0].classList.remove("active_choice");
      this.removePlayerListener();
      this.decideResult();
    };

    this.user.paper[0].onclick = () => {
      this.getUserPick("paper");
      this.user.rock[0].classList.remove("active_choice");
      this.user.paper[0].classList.add("active_choice");
      this.user.scissors[0].classList.remove("active_choice");
      this.removePlayerListener();
      this.decideResult();
    };

    this.user.scissors[0].onclick = () => {
      this.getUserPick("scissors");
      this.user.rock[0].classList.remove("active_choice");
      this.user.paper[0].classList.remove("active_choice");
      this.user.scissors[0].classList.add("active_choice");
      this.removePlayerListener();
      this.decideResult();
    };
  };

  setComListener(choice) {
    switch (choice) {
      case "rock":
        this.getComPick("rock");
        this.com.rock[1].classList.add("active_choice");
        this.com.paper[1].classList.remove("active_choice");
        this.com.scissors[1].classList.remove("active_choice");
        break;
      case "paper":
        this.getComPick("paper");
        this.com.rock[1].classList.remove("active_choice");
        this.com.paper[1].classList.add("active_choice");
        this.com.scissors[1].classList.remove("active_choice");
        break;
      case "scissors":
        this.getComPick("scissors");
        this.com.rock[1].classList.remove("active_choice");
        this.com.paper[1].classList.remove("active_choice");
        this.com.scissors[1].classList.add("active_choice");
        break;
      default:
        break;
    }
  }

  removePlayerListener = () => {
    document.getElementsByClassName("rock")[0].disabled = true;
    document.getElementsByClassName("paper")[0].disabled = true;
    document.getElementsByClassName("scissors")[0].disabled = true;
  };

  result = () => {
    setInterval(() => {
      if (this.user_choice && this.com_choice) {
        this.decision(this.user_choice, this.com_choice);
      }
      this.user_choice = null;
      this.com_choice = null;
    }, 400);
  };

  decideResult() {
    switch (this.com.randomPick(3)) {
      case 2:
        this.setComListener("rock");
        this.result();
        break;
      case 1:
        this.setComListener("paper");
        this.result();
        break;
      case 0:
        this.setComListener("scissors");
        this.result();
        break;
      default:
        break;
    }
  }

  resetButton() {
    this.resetResult.onclick = () => {
      this.logger("Game restarted !");
      this._defaultState();
      document.querySelectorAll(".choice").forEach((userButton) => {
        userButton.classList.remove("active_choice");
        userButton.disabled = false;
      });
    };
  }

  play() {
    this.logger("Lets play traditional games!");
    this.setPlayerListener();
  }
}

const game = new Game();
game.play();
