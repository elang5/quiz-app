/* global question */

'use strict';

const question = (function () {
  class Question {
    constructor(text, answers, correctAnswer) {
      this.text=text;
      this.answers = answers;
      this.correctAnswer = correctAnswer;
      this.userAnswer ='';
    }

    submitAnswer(answer) {
      this.userAnswer = answer;
    } 
    answerStatus() {
      if (this.userAnswer === this.correctAnswer) {
        return 1;
      }
      if (this.userAnswer === '') {
        return -1;
      }
      else {
        return 0;
      }
    }

  }
  return {
    Question
  };
})();

