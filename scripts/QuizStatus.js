/* global Renderer */

'use strict';

class QuizStatus extends Renderer {    // eslint-disable-line no-unused-vars
  template() {
    const progress = `<span>Progress: ${6 - this.model.unasked.length} of 5</span>`;
    if(this.model.active) {
      return `
      <div class = 'status-bar'>
        <span>Score: ${this.model.score}</span>
        <span>High Score: ${this.model.scoreHistory}</span>
        ${progress}
      </div>
    `;
    } else {
      return `
      <div class = 'status-bar'>
        <span>Score: ${this.model.score}</span>
        <span>High Score: ${this.model.scoreHistory}</span>
        <span>Progress: inactive</span>
      </div>
      `;
    }

  }
}
