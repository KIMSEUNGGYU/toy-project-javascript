import Component from '../core/component.js';
import { $ } from '../utils/dom.js';

import store from '../store.js';
import { resetState } from '../modules/lotto.js';

const LOTTO_REWARD = {
  3: 5000,
  4: 50000,
  5: 1500000,
  5.5: 3000000,
  6: 200000000,
};

class Modal extends Component {
  constructor(...rest) {
    super(...rest);

    this.winLottoResult = {
      3: 0,
      4: 0,
      5: 0,
      5.5: 0,
      6: 0,
    };

    this.$target.classList.add('open');
    this.calculateWinLotto();
  }

  template() {
    if (!this.winLottoResult) {
      return ``;
    }

    const totalRateReturn = this.getTotalRateReturn();

    return `
        <div class="modal-inner p-10">
          <div class="modal-close">
            <svg viewbox="0 0 40 40">
              <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </div>

          <h2 class="text-center">🏆 당첨 통계 🏆</h2>
          <div class="d-flex justify-center">
            <table class="result-table border-collapse border border-black">
              <thead>
                <tr class="text-center">
                  <th class="p-3">일치 갯수</th>
                  <th class="p-3">당첨금</th>
                  <th class="p-3">당첨 갯수</th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-center">
                  <td class="p-3">3개</td>
                  <td class="p-3">5,000</td>
                  <td class="p-3">${this.winLottoResult && this.winLottoResult[3]}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">4개</td>
                  <td class="p-3">50,000</td>
                  <td class="p-3">${this.winLottoResult && this.winLottoResult[4]}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">5개</td>
                  <td class="p-3">1,500,000</td>
                  <td class="p-3">${this.winLottoResult && this.winLottoResult[5]}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">5개 + 보너스볼</td>
                  <td class="p-3">30,000,000</td>
                  <td class="p-3">${this.winLottoResult && this.winLottoResult[5.5]}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">6개</td>
                  <td class="p-3">2,000,000,000</td>
                  <td class="p-3">${this.winLottoResult && this.winLottoResult[6]}개</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-center font-bold">당신의 총 수익률은 ${totalRateReturn}%입니다.</p>
          <div class="d-flex justify-center mt-5">
            <button type="button" class="btn btn-cyan">다시 시작하기</button>
          </div>
        </div>
    `;
  }

  componentDidMount() {
    if (!this.winLottoResult) {
      return;
    }

    this.registerEvent();
  }

  registerEvent() {
    const $modalClose = $('.modal-close', this.$target);
    const $restartButton = $('button', this.$target);

    $modalClose.addEventListener('click', this.handleCloseModal.bind(this));
    $restartButton.addEventListener('click', this.handleRestart.bind(this));
  }

  handleCloseModal() {
    this.$target.classList.remove('open');
  }

  calculateWinLotto() {
    const { lottoNumberList } = store.getState();

    // 로또 당첨 결과 구하기
    lottoNumberList
      .map(this.checkLottoResult.bind(this))
      .filter((correctNumber) => correctNumber >= 3)
      .forEach((correctNumber) => (this.winLottoResult[correctNumber] += 1));

    this.render();
  }

  checkLottoResult(lottoNumber) {
    const { winningNumber } = store.getState();

    const winLottoNumber = winningNumber.slice(0, 6);
    const bonusNumber = winningNumber[6];

    let correctNumber = 0;

    lottoNumber.forEach((number) => {
      if (winLottoNumber.includes(number.toString())) {
        correctNumber += 1;
      }
    });

    if (correctNumber === 5 && lottoNumber.includes(bonusNumber)) {
      correctNumber += 0.5;
    }

    return correctNumber;
  }

  getTotalRateReturn() {
    const { purchaseAmount } = store.getState();

    const totalLottoPrize = Object.entries(this.winLottoResult).reduce(
      (acc, [key, value]) => (acc += LOTTO_REWARD[key] * value),
      0,
    );

    const profitLossValue = totalLottoPrize - purchaseAmount;

    // 수익률 = `(손익(평가금액-투자원금)) / 투자원금 * 100`
    const totalRateReturn = (profitLossValue / purchaseAmount) * 100;

    return totalRateReturn;
  }

  handleRestart() {
    this.$target.classList.remove('open');
    store.dispatch(resetState());
  }
}

export default Modal;
