import Checkbox from 'inquirer/lib/prompts/checkbox';
import ScreenManager from 'inquirer/lib/utils/screen-manager';
import chalk from 'chalk';
import figures from 'figures';
import util from 'util';

const defaultStatus = function() {
  return "";
};

const statusPrefix =
  chalk.cyan(figures.pointerSmall + figures.pointerSmall) + " ";

class CustomScreen extends ScreenManager {
  render(getBottomContent, message, bottomContent) {
    const _bottomInfo = getBottomContent();

    if (!bottomContent && _bottomInfo) {
      bottomContent = `${statusPrefix}${_bottomInfo}`;
    }

    ScreenManager.prototype.render.call(this, message, bottomContent);
  }
}

export default class CheckboxStatusPrompt extends Checkbox {
  constructor(...args) {
    super(...args);

    // Bottom info updater
    if (!this.opt.status) {
      this.opt.status = defaultStatus;
    }

    this._bottomInfo = this.opt.status(this.opt.choices);
    this.screen = new CustomScreen(this.rl);
    this.screen.render = this.screen.render.bind(
      this.screen,
      () => this._bottomInfo
    );
  }

  toggleChoice() {
    Checkbox.prototype.toggleChoice.apply(this, arguments);
    this._bottomInfo = this.opt.status(this.opt.choices);
  }
}
