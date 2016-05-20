import React, { Component, PropTypes } from 'react';
import styles from './CalculatorApp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as CalculatorActions from '../actions/CalculatorActions';
import { Display, Keyboard } from '../components';

@connect(state => {
  return {
  operations: state.calculator.operations,
  memory: state.calculator.memory
}})
export default class CalculatorApp extends Component {

  static propTypes = {
    operations: PropTypes.object.isRequired,
    memory: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  render () {
    const { operations: { result, operand, operator, prevOperand }, dispatch } = this.props;
    const memoryIsEmpty = !this.props.memory.result;
    const memoryEnabled = this.props.memory.enabled;
    const value = (operand || result || ( !isFinite(result) ? result : 0 )).toString();
    const actions = bindActionCreators(CalculatorActions, dispatch);

    return (
      <div className={styles.calculatorApp}>
        <Display value={value} memoryEnabled={memoryEnabled} memoryIsEmpty={memoryIsEmpty} actions={actions} />
        <Keyboard operand={operand} operator={operator} prevOperand={prevOperand} memoryEnabled={memoryEnabled} actions={actions} />
      </div>
    );
  }
}
