import { concatWith, interval, map, of, ReplaySubject, shareReplay, startWith, switchMap, take } from 'rxjs';

export interface BaseDie {
  min: number;
  max: number;
  value: number;
  diePrefix: string;
  id: number;
}

export class Die implements BaseDie {
  static fromBase(base: BaseDie) {
    return new Die(base.value, base.min, base.max, base.diePrefix, base.id, true);
  }
  _roll$ = new ReplaySubject<number>(1);
  animatedValue$ = this._roll$.pipe(
    switchMap((value) =>
      interval(50 + 10 * this.id).pipe(
        take(6),
        map((i) => i % this.max + 1),
        concatWith(of(value))
      ),
    ),
    startWith(this.value),
    shareReplay(1)
  );
  constructor(
    public value = 1,
    public min = 1,
    public max = 6,
    public diePrefix = '-solid-small-dot',
    public id = Math.random(),
    animate = false
  ) {
    if (animate) {
      this._roll$.next(this.value);
    }
  }

  roll(): this {
    this.value = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
    this._roll$.next(this.value);
    return this;
  }

  getState(): BaseDie {
    return {
      value: this.value,
      max: this.max,
      min: this.min,
      diePrefix: this.diePrefix,
      id: this.id
    }
  }
}
