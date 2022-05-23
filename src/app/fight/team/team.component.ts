import { Component, HostBinding, Input, TrackByFunction } from '@angular/core';
import { Die } from '../die/die.model';

@Component({
  selector: 'dice-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent {
  @HostBinding('style.color') @Input() color: string = 'inherit';
  @Input() name!: string;
  losses: number = 0;
  dice: Die[] = [new Die()];

  rollAndSort() {
    this.dice.forEach(die => die.roll())
    this.dice.sort((a, b) => b.value - a.value);
  }

  addDie() {
    this.dice = [...this.dice, new Die()];
  }

  removeDie() {
    this.dice = this.dice.slice(0, -1);
  }

  applyLoss() {
    if (this.losses > 0) {
      this.dice = this.dice.slice(0, -this.losses);
      this.losses = 0;
    }
  }
  reset() {
    this.dice = [new Die()];
    this.losses = 0;
  }

  trackById: TrackByFunction<Die> = (_, die) => die.id;
}
