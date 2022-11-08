import { createStore } from './core/redux.js';

import lottoReducer, { initialState } from './modules/lotto.js';

export default createStore(lottoReducer, initialState);
