const UPDATE_PURCHASE_AMOUNT = 'UPDATE_PURCHASE_AMOUNT';
const PURCHASE_LOTTO = 'PURCHASE_LOTTO';
const UPDATE_WINNING_NUMBER = 'UPDATE_WINNING_NUMBER';
const RESET_STATE = 'RESET_STATE';

export const updatePurchaseAmount = (payload) => ({ type: UPDATE_PURCHASE_AMOUNT, payload });
export const purchaseLotto = (payload) => ({ type: PURCHASE_LOTTO, payload });
export const updateWinningNumber = (payload) => ({ type: UPDATE_WINNING_NUMBER, payload });
export const resetState = () => ({ type: RESET_STATE });

export const initialState = {
  purchaseAmount: 0,
  lottoNumberList: [],
  winningNumber: [],
};

export default function lottoReducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_PURCHASE_AMOUNT:
      return {
        ...state,
        purchaseAmount: payload,
      };
    case PURCHASE_LOTTO:
      return {
        ...state,
        lottoNumberList: [...state.lottoNumberList, payload],
      };
    case UPDATE_WINNING_NUMBER:
      return {
        ...state,
        winningNumber: payload,
      };
    case RESET_STATE:
      return {
        purchaseAmount: 0,
        lottoNumberList: [],
        winningNumber: [],
      };
    default:
      return state;
  }
}
