import { $ } from '../utils/dom.js';
import Component from '../core/component.js';

import store from '../store.js';

class LottoCheckField extends Component {
  constructor(...rest) {
    super(...rest);

    this.toggle = false;
  }

  template() {
    const { lottoNumberList } = store.getState();

    return `
      <div class="d-flex">
        <label class="flex-auto my-0">총 ${lottoNumberList.length}개를 구매하였습니다.</label>
        <div class="flex-auto d-flex justify-end pr-1">
          <label class="switch">
            <input type="checkbox" class="lotto-numbers-toggle-button" ${this.toggle && 'checked'}/>
            <span class="text-base font-normal">번호보기</span>
          </label>
        </div>
      </div>
      <div class="d-flex flex-wrap">
      <ul id="lotto-icons" class="d-flex flex-wrap ${this.toggle ? 'flex-col' : ''}">
        ${lottoNumberList
          .map(
            (lottoNumber) => `
            <li class="mx-1 text-4xl lotto-wrapper">
              <span class="lotto-icon">🎟️ </span>
              <span class="lotto-detail" style="display: ${this.toggle ? 'inline' : 'none'}">
                ${lottoNumber.join(', ')}
              </span>
            </li>
        `,
          )
          .join('')}
      </ul>
    `;
  }

  componentDidMount() {
    this.registerEvent();
  }

  registerEvent() {
    const $toggleButton = $('.lotto-numbers-toggle-button', this.$target);

    $toggleButton.addEventListener('change', this.handleToggleButton.bind(this));
  }

  handleToggleButton() {
    this.toggle = !this.toggle;
    this.render();
  }
}

export default LottoCheckField;
