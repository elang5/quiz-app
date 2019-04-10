/* global $ Renderer */

'use strict';

class QuizDisplay extends Renderer {    // eslint-disable-line no-unused-vars
  getEvents() {
    return {
      'click .start': 'handleStart',
      'click .submit-btn': 'handleAnswerSubmit',
      'click .next-question': 'handleNextQuestion',
      'click .play-again': 'handleReset'
    };
  }

  _generateIntro() {
    return `
      <div>
        <p>
          Welcome to the Trivia Quiz
        </p>
      </div>
      <div>
        <button class="start">Start</button>
      </div>
    `;
  }

  _generateQuestion() {
    let answers = this.model.unasked[0].answers.map(item => {
      return `
      <br><input type = "radio" name = "radioBtn" id = "radioBtn" value = "${item}"><label for = "radioBtn">${item}</label>
      `;
    
    });
    return `
      <div>
        ${this.model.unasked[0].text}<br>
        ${answers.join('').toString()}<br>
        <button class = "submit-btn">Continue</button>
      </div>
    `;
  }

  _generateResponse() {
    if (this.model.unasked[0].userAnswer === this.model.unasked[0].correctAnswer) {
      return `
    <h2>${this.model.unasked[0].text}</h2><br>
    <p>You got it!<br>The correct answer was: ${this.model.unasked[0].correctAnswer}</p>
    <button class = "next-question">Continue to next question</button>
    `; } else {
      return `
    <h2>${this.model.unasked[0].text}</h2><br>
    <p>Sorry, that's incorrect. You answered: ${this.model.unasked[0].userAnswer}<br>The correct answer was: ${this.model.unasked[0].correctAnswer}</p>
    <button class = "next-question">Continue to next question</button>
      `;
    }
  }

  _generateEndPage() {
    if(this.model.score > this.model.scoreHistory) {
      return `
      <h2>Good job!</h2><br>
      <h2>Your final score was ${this.model.score} out of 5.</h2>
      <h3>That's a new high score!<h3>
      <button class = "play-again">Play again</button>
    `;
    } else {
      return `
      <h2>Good job!</h2><br>
      <h2>Your final score was ${this.model.score} out of 5.</h2>
      <button class = "play-again">Play again</button>
      `;
    }
    
  }

  template() {
    if (this.model.active) {
      if(this.model.unasked[0].userAnswer) {
        return this._generateResponse();
      }
      return this._generateQuestion();

    } else {
      if (this.model.unasked.length === 1) {
        return this._generateEndPage();
      }
      return this._generateIntro();
    }
  }

  handleStart() {
    this.model.start();
    this.model.update();
  }

  handleAnswerSubmit() {
    let userAnswer = $('input[name=radioBtn]:checked').val();
    console.log(userAnswer);
    this.model.submitAnswer(userAnswer);
    this._generateResponse();
    this.model.update();
  }

  handleNextQuestion() {
    this.model.nextQuestion();
    this.model.update();
  }

  handleReset() {
    this.model.resetQuiz()
      .then(() => {
        this.model.update();
      });
  }
}