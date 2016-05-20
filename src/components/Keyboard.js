import React, { Component, PropTypes } from 'react';

import styles from './Keyboard.css';
import { Button } from '../components';
import SymbolMap from './symbol-map';
import keyboardKeys from './keyboard-keys';

export default class Keyboard extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  getChar = (event) => {
    if (event.which == null) {
      if (event.keyCode === SymbolMap.enterCharCode) {
        return SymbolMap.assignment;
      }
      if (event.keyCode < 32) return null;
      return String.fromCharCode(event.keyCode)
    }

    if (event.which === SymbolMap.escCharCode) {
      return SymbolMap.reset;
    }

    if (event.which === SymbolMap.backspaceCharCode) {
      event.preventDefault();
      return SymbolMap.back;
    }

    if (event.which != 0 && event.charCode != 0) {
      if (event.which === SymbolMap.enterCharCode) {
        return SymbolMap.assignment;
      }
      if (event.which < 32) return null;
      return String.fromCharCode(event.which);
    }

    return null;
  };

  onKeyPress = (event) => {
    let char = this.getChar(event);
    if (['0','1','2','3','4','5','6','7','8','9',SymbolMap.dot].indexOf(char) !== -1) {
      this.props.actions.pickValue(char);
    }
    if ([SymbolMap.division, SymbolMap.multiplication, SymbolMap.subtraction, SymbolMap.addition, SymbolMap.assignment].indexOf(char) !== -1) {
      this.props.actions.pickOperator(char);
    }
  };

  onKeyDown = (event) => {
    let char = this.getChar(event);
    if ([SymbolMap.reset, SymbolMap.back].indexOf(char) !== -1) {
      this.props.actions.pickControl(char);
    }
  };

  componentWillMount() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keypress', this.onKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keypress', this.onKeyPress);
  }

  render () {
    return (
      <div className={styles.keyboard}>
        {keyboardKeys.map( (_, index) => {
          if (/^memory_/.test(_.control)) {
            if (this.props.memoryEnabled) {
              return <Button
                key={index}
                {..._}
                {...this.props.actions}
              />
            }
          } else if (_.control === SymbolMap.reset) {
            return <Button
              key={index}
              {..._}
              name={_.name[~~!!(this.props.operand || this.props.operator || this.props.prevOperand)]}
              {...this.props.actions}
            />
          } else {
            return <Button
              key={index}
              active={!this.props.operand && this.props.operator && this.props.operator === _.operator}
              {..._}
              {...this.props.actions}
            />
          }
        })}
      </div>
    );
  }
}
