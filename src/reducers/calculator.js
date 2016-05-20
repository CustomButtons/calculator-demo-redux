import * as types from '../constants/ActionTypes';
import SymbolMap from '../components/symbol-map';

const initialState = {
  operations: {
    result: null,
    operator: null,
    operand: "",
    prevOperator: null,
	  prevOperand: "",
	  typingOperand: false
  },
  memory: {
    result: 0,
	  enabled: false
  }
};

export default function calculator(state = initialState, action) {
  switch (action.type) {

    case types.PICK_CONTROL:
      switch (action.control) {
        case SymbolMap.reset:
          if (state.operations.operand || state.operations.prevOperand) {
            return {
              ...state,
              operations: {
                ...state.operations,
                operand: "",
	              prevOperand: ""
              }
            }
          } else {
            return {
              ...state,
              operations: {
                ...state.operations,
                result: null,
                operator: null,
                operand: "",
	              prevOperator: null,
	              prevOperand: ""
              }
            }
          }
        case SymbolMap.back:
	        if (state.operations.operand) {
		        return {
			        ...state,
			        operations: {
				        ...state.operations,
				        operand: state.operations.operand.slice(0, state.operations.operand.length - 1)
			        }
		        }
	        } else {
		        return state;
	        }
        case SymbolMap.invert:
	        if (state.operations.operand) {
		        return {
			        ...state,
			        operations: {
				        ...state.operations,
				        operand: -state.operations.operand
			        }
		        }
	        } else {
		        return {
			        ...state,
			        operations: {
				        ...state.operations,
				        result: -state.operations.result
			        }
		        }
	        }

	      case SymbolMap.remainder:
	        if (state.operations.operand) {
		        return {
			        ...state,
			        operations: {
				        ...state.operations,
				        operand: 0.01 * state.operations.operand,
				        typingOperand: false
			        }
		        }
	        } else {
		        return state;
	        }
        case 'memory_clear':
          return {
            ...state,
            memory: {
              ...state.memory,
              result: 0
            }
          };
        case 'memory_increment':
          return {
            ...state,
            memory: {
              ...state.memory,
              result: state.memory.result + ( parseFloat(state.operations.operand) || state.operations.result )
            }
          };
        case 'memory_decrement':
          return {
            ...state,
            memory: {
              ...state.memory,
              result: state.memory.result - ( parseFloat(state.operations.operand) || state.operations.result )
            }
          };
        case 'memory_read':
	        if (state.operations.operator) {
		        if (state.operations.operand) {
			        return {
				        ...state,
				        operations: {
					        ...state.operations,
					        result: parseFloat(state.operations.operand),
					        operand: state.memory.result
				        }
			        }
		        } else {
			        return {
				        ...state,
				        operations: {
					        ...state.operations,
					        operand: state.memory.result
				        }
			        }
		        }
	        } else {
		        if (state.operations.operand) {
			        return {
				        ...state,
				        operations: {
					        ...state.operations,
					        operand: state.memory.result
				        }
			        }
		        } else {
			        return {
				        ...state,
				        operations: {
					        ...state.operations,
					        result: state.memory.result
				        }
			        }
		        }
	        }
	      default:
		      return state;
      }


    case types.PICK_OPERATOR:
      if (action.operator === SymbolMap.assignment) {
        if (state.operations.operator && state.operations.operand || state.operations.prevOperator && state.operations.prevOperand) {
          let result = state.operations.result === null ? parseFloat(state.operations.operand) : state.operations.result;
          let operand = parseFloat(state.operations.operand);
	        operand = isNaN(operand) ? parseFloat(state.operations.prevOperand) : operand;
	        const operator = state.operations.operator || state.operations.prevOperator;
	        //todo dublicate code
          switch (operator) {
            case SymbolMap.division:
              result = result / operand;
              break;
            case SymbolMap.multiplication:
              result = result * operand;
              break;
            case SymbolMap.subtraction:
              result = result - operand;
              break;
            case SymbolMap.addition:
              result = result + operand;
              break;
            default:
	            return state;
          }
          return {
            ...state,
            operations: {
              ...state.operations,
              result,
	            prevOperator: operator,
              prevOperand: operand,
              operator: null,
              operand: "",
	            typingOperand: false
            }
          }
        } else {
          return state;
        }
      } else {
        if (state.operations.operand && state.operations.operator) {
	        let result = state.operations.result;
	        const operand = parseFloat(state.operations.operand);
	        const operator = state.operations.operator || state.operations.prevOperator;
	        //todo dublicate code
          switch (operator) {
            case SymbolMap.division:
              result = result / operand;
              break;
            case SymbolMap.multiplication:
              result = result * operand;
              break;
            case SymbolMap.subtraction:
              result = result - operand;
              break;
            case SymbolMap.addition:
              result = result + operand;
              break;
            default:
              return state;
          }
          return {
            ...state,
            operations: {
              ...state.operations,
              result,
	            prevOperator: state.operations.operator,
	            prevOperand: state.operations.operand,
              operator: action.operator,
              operand: "",
	            typingOperand: false
            }
          }
        } else {
	        let result = state.operations.result;
          if (state.operations.operand === "") {
	          result = result || 0;
          }
	        return {
		        ...state,
		        operations: {
			        ...state.operations,
			        result,
			        prevOperator: state.operations.operator,
			        operator: action.operator,
			        typingOperand: false
		        }
	        }
        }
      }


    case types.PICK_VALUE:
	    if (state.operations.operator && state.operations.operand && !state.operations.typingOperand) {
		    return {
			    ...state,
			    operations: {
				    ...state.operations,
				    result: parseFloat(state.operations.operand),
				    operand: action.value,
				    typingOperand: true
			    }
		    }
	    } else {
		    if (action.value === SymbolMap.dot && state.operations.operand.indexOf(SymbolMap.dot) !== -1 ) {
			    return state;
		    }
		    if (state.operations.operand === "0") {
			    if (action.value === "0") {
				    return state;
			    }
			    if (['1','2','3','4','5','6','7','8','9'].indexOf(action.value) !== -1) {
				    return {
					    ...state,
					    operations: {
						    ...state.operations,
						    operand: action.value,
						    typingOperand: true
					    }
				    }
			    }
		    }
		    return {
			    ...state,
			    operations: {
				    ...state.operations,
				    operand: state.operations.operand + action.value,
				    typingOperand: true
			    }
		    }
	    }


	  case types.TOGGLE_MEMORY:
		  return {
			  ...state,
			  memory: {
				  ...state.memory,
				  enabled: !state.memory.enabled
			  }
		  };


    default:
      return state;

  }
}
