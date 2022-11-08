import { $ } from './utils/dom.js';
import store from './store.js';
import Component from './core/component.js';

import Purchase from './components/purchase.js';

class App extends Component {
  constructor(...rest) {
    super(...rest);

    store.subscribe(this.render.bind(this));
  }

  template() {
    return `
      <div class="d-flex justify-center mt-5">
        <div class="w-100">
          <h1 class="text-center">🎱 행운의 로또</h1>
          <section id="purchase-field" class="mt-9"></section>
          <section id="lotto-check-field" class="mt-9"></section>
          <section id="winner-check-field" class="mt-9"></section>
        </div>
        <div class="modal"></div>
      </div>
    `;
  }

  componentDidMount() {
    new Purchase($('#purchase-field'));
  }
}

new App($('#app'));
