import SymbolMap from './symbol-map';

export default [
  {
    name: 'MC',
    title: 'Clear memory',
    control : 'memory_clear',
    size: 1
  },
  {
    name: 'M+',
    title: 'Add the value on the screen to the value in memory',
    control : 'memory_increment',
    size: 1
  },
  {
    name: 'M-',
    title: 'Subtract the value on the display of the values in memory',
    control : 'memory_decrement',
    size: 1
  },
  {
    name: 'MR',
    title: 'Extract the value stored in the memory',
    control : 'memory_read',
    size: 1
  },
  {
    name: ['AC', 'C'],
    title: 'Clear (Esc)',
    control : SymbolMap.reset,
    size: 1
  },
  {
    name: '⁺∕₋',
    control : SymbolMap.invert,
    size: 1
  },
  {
    name: '%',
    control : SymbolMap.remainder,
    size: 1
  },
  {
    name: '÷',
    title: 'Divide (or type "/")',
    operator : SymbolMap.division,
    size: 1
  },
  {
    name: '7',
    value : '7',
    size: 1
  },
  {
    name: '8',
    value : '8',
    size: 1
  },
  {
    name: '9',
    value : '9',
    size: 1
  },
  {
    name: '×',
    title: 'Multiply (or type "*")',
    operator : SymbolMap.multiplication,
    size: 1
  },
  {
    name: '4',
    value : '4',
    size: 1
  },
  {
    name: '5',
    value : '5',
    size: 1
  },
  {
    name: '6',
    value : '6',
    size: 1
  },
  {
    name: '－',
    title: 'Subtract (or type "-")',
    operator : SymbolMap.subtraction,
    size: 1
  },
  {
    name: '1',
    value : '1',
    size: 1
  },
  {
    name: '2',
    value : '2',
    size: 1
  },
  {
    name: '3',
    value : '3',
    size: 1
  },
  {
    name: '+',
    title: 'Add (or type "+")',
    operator : SymbolMap.addition,
    size: 1
  },
  {
    name: '0',
    value : '0',
    size: 2
  },
  {
    name: ',',
    value : SymbolMap.dot,
    size: 1
  },
  {
    name: '=',
    title: 'Calculate (or type "=" or "⏎")',
    operator : SymbolMap.assignment,
    size: 1
  }
];
