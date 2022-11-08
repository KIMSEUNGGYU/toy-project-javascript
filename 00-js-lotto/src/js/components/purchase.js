import { $ } from '../utils/dom.js';
import { makeRandomNumber } from '../utils/random.js';
import Component from '../core/component.js';
import { MESSAGE, PURCHASE } from '../constants.js';
import store from '../store.js';

import { purchaseLotto, updatePurchaseAmount } from '../modules/lotto.js';
import LottoCheckField from '../components/lottoCheckField.js';
import WinnerCheckField from '../components/winner-check-field.js';

class Purchase extends Component {
  constructor(...rest) {
    super(...rest);

    this.purchaseAmout = 0;
  }

  template() {
    const { purchaseAmount } = store.getState();

    return `
      <form class="mt-5">
        <label class="mb-2 d-inline-block" for="purchase-input">구입할 금액을 입력해주세요. </label>
        <div class="d-flex">
          <input id="purchase-input" type="number" class="w-100 mr-2 pl-2" placeholder="구입 금액" required min="1000" max="100000" autofocus value="${
            purchaseAmount > 0 ? purchaseAmount : ''
          }" />
          <button type="submit" class="btn btn-cyan">확인</button>
        </div>
      </form>
    `;
  }

  componentDidMount() {
    this.registerEvent();
  }

  registerEvent() {
    $('form', this.$target).addEventListener('submit', this.handlePurchase.bind(this));
  }

  handlePurchase(event) {
    event.preventDefault();
    const purchaseAmount = $('input', this.$target).value;

    if (purchaseAmount % PURCHASE.BASE_UNIT !== 0) {
      alert(MESSAGE.INVALID_UNIT_AMOUNT);
      return;
    }

    this.purchaseAmout = purchaseAmount;
    store.dispatch(updatePurchaseAmount(Number.parseInt(purchaseAmount, 10)));

    while (this.purchaseAmout > 0) {
      this.purchaseLotto();
    }

    new LottoCheckField($('#lotto-check-field'));
    new WinnerCheckField($('#winner-check-field'));
  }

  purchaseLotto() {
    // 금액을 차감한다.
    this.purchaseAmout -= PURCHASE.BASE_UNIT;
    // 로또 번호를 받는다.
    store.dispatch(purchaseLotto(this.getLottoNumber()));
  }

  getLottoNumber() {
    const lottoNumbers = [];

    while (true) {
      if (lottoNumbers.length >= 6) {
        break;
      }

      const randomValue = makeRandomNumber(1, 45);
      if (!lottoNumbers.includes(randomValue)) {
        lottoNumbers.push(randomValue);
      }
    }

    return lottoNumbers;
  }
}

export default Purchase;
