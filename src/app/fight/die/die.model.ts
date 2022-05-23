export class Die {
  constructor(public value = 1, public min = 1, public max = 6, public diePrefix = '-solid-small-dot', public id = Math.random()) {}
  roll(): this {
    this.value = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
    return this;
  }
}
