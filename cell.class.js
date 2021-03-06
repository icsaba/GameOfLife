export class Cell {
  constructor(value) {
    this._value = value;
  }

  set value(value) {
    this._value = value ? 1 : 0;
  }

  get value() {
    return this._value;
  }

  repr(){
    return !!this._value ? "\x1b[36m + " : "\x1b[31m . \x1b[0m";
  }
}