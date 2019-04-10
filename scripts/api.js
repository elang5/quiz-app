/* global question Question  */

'use strict';

const api = (function () {
  class QuizApi {
    constructor() {
      this.BASE_URL = 'https://opentdb.com/api.php?amount=5';
    }
  
    getItems(Quiz) {
      return fetch(this.BASE_URL)
        .then(res => res.json())
        .then(data => data.results.forEach(item => {       
          item.incorrect_answers.push(item.correct_answer);
          Quiz.unasked.push(new question.Question(item.question, item.incorrect_answers, item.correct_answer));
        })
                  
        );}
  }

  return {
    QuizApi
  };
})();