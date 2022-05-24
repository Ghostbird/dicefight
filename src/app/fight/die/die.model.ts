import { concatWith, interval, map, of, shareReplay, startWith, Subject, switchMap, take } from 'rxjs';

export class Die {
  _roll$ = new Subject<number>();
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
    public id = Math.random()
  ) {}
  roll(): this {
    this.value = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
    this._roll$.next(this.value);
    return this;
  }
}
