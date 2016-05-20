import * as types from '../constants/ActionTypes';

export function pickControl(control) {
  return {
    type: types.PICK_CONTROL,
    control
  };
}

export function pickOperator(operator) {
  return {
    type: types.PICK_OPERATOR,
    operator
  };
}

export function pickValue(value) {
  return {
    type: types.PICK_VALUE,
    value
  };
}


export function toggleMemory(enabled) {
  return {
    type: types.TOGGLE_MEMORY,
    enabled
  };
}
