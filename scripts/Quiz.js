/* global Model QuizApi */
'use strict';

class Quiz extends Model {         

  constructor() {
    super();
    this.unasked=[];
    this.asked=[];
    this.activeQuestion={};
    this.score=0;
    this.scoreHistory=0;
    this.active=false;
  }

  generateQuizApi() {
    const quizApi = new QuizApi();
    return quizApi.getItems(this);
  }

  start() {
    this.active = true;
  }

  end() {
    this.active = false;
  }

  nextQuestion() {
    this.activeQuestion = this.unasked.shift();

  }

  submitAnswer(userAnswer) {
    if (this.unasked.length > 0) {
      this.asked.push(this.activeQuestion);
    }

    this.unasked[0].submitAnswer(userAnswer);
    let currentScore = parseInt(this.unasked[0].answerStatus());
    this.score += currentScore;

    if(this.unasked.length === 1) {
      if(this.score > this.scoreHistory) {
        this.scoreHistory = this.score;
      }
      this.end();
    }

  }

  resetGame()
  {
    this.unasked = [];
    this.score = 0;
    this.start();
    return this.generateQuizApi();
  }
}
