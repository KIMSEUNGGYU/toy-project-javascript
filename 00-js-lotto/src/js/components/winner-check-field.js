import Component from '../core/component.js';
import { $, $$ } from '../utils/dom.js';
import { MESSAGE } from '../constants.js';
import store from '../store.js';

import { updateWinningNumber } from '../modules/lotto.js';
import Modal from './modal.js';

class WinnerCheckField extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    const { winningNumber } = store.getState();
    const lottoNumber = winningNumber.slice(0, 6);
    const bonusNumber = winningNumber[6];

    return `
      <form class="mt-9">
        <label class="flex-auto d-inline-block mb-3">지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label>
        <div class="d-flex">
          <div>
            <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
            <div>
            ${
              lottoNumber.length === 6
                ? lottoNumber
                    .map(
                      (number, index) => `
                        <input type="number" class="winning-number mx-1 text-center" data-index-num="${index}" required min="1" max="45" value="${number}" />
                      `,
                    )
                    .join('')
                : `
                  <input type="number" class="winning-number mx-1 text-center" data-index-num="0" required min="1" max="45" />
                  <input type="number" class="winning-number mx-1 text-center" data-index-num="1" required min="1" max="45" />
                  <input type="number" class="winning-number mx-1 text-center" data-index-num="2" required min="1" max="45" />
                  <input type="number" class="winning-number mx-1 text-center" data-index-num="3" required min="1" max="45" />
                  <input type="number" class="winning-number mx-1 text-center" data-index-num="4" required min="1" max="45" />
                  <input type="number" class="winning-number mx-1 text-center" data-index-num="5" required min="1" max="45" />
                `
            }
            </div>
          </div>
          <div class="bonus-number-container flex-grow">
            <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
            <div class="d-flex justify-center">
              ${
                bonusNumber
                  ? `<input type="number" class="bonus-number text-center" data-index-num="5" required min="1" max="45" value="${bonusNumber}"/>`
                  : `<input type="number" class="bonus-number text-center" data-index-num="5" required min="1" max="45" />`
              }
            </div>
          </div>
        </div>
        <button type="submit" class="open-result-modal-button mt-5 btn btn-cyan w-100">결과 확인하기</button>
    </form>
    `;
  }

  componentDidMount() {
    this.registerEvent();
  }

  registerEvent() {
    const $lottoResultForm = $('form', this.$target);

    $lottoResultForm.addEventListener('submit', this.handleLottoResultSubmit.bind(this));
  }

  handleLottoResultSubmit(event) {
    event.preventDefault();

    const $winningInputs = $$('input', this.$target);

    const winningNumber = this.getWinningNumber($winningInputs);
    if (winningNumber.length !== 7) {
      return;
    }

    store.dispatch(updateWinningNumber(winningNumber));
    new Modal($('.modal'));
    // $('.modal').classList.add('open');
  }

  getWinningNumber($inputs) {
    const winningNumber = [];
    let isOverlapNumber = false;

    $inputs.forEach(($input) => {
      if (winningNumber.includes($input.value)) {
        isOverlapNumber = true;
        return;
      }
      winningNumber.push($input.value);
    });

    if (isOverlapNumber) {
      alert(MESSAGE.INVALID_OVERLAP_LOTTO_NUMBER);
      return [];
    }

    return winningNumber;
  }
}

export default WinnerCheckField;
