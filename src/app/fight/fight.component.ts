import { Component, ViewChild } from '@angular/core';
import { TeamComponent } from 'src/app/fight/team/team.component';
import { Die } from './die/die.model';

interface Losses {
  attacker: number;
  defender: number;
}

@Component({
  selector: 'dice-fight',
  templateUrl: 'fight.component.html',
  styleUrls: ['fight.component.scss'],
})
export class FightComponent {
  @ViewChild('attacker') attacker!: TeamComponent;
  @ViewChild('defender') defender!: TeamComponent;

  fight() {
    this.attacker.rollAndSort();
    this.defender.rollAndSort();
    const losses = Array.from(
      {
        length: Math.min(this.attacker.dice.length, this.defender.dice.length),
      },
      (_, i) => ({
        attack: this.attacker.dice[i].value,
        defence: this.defender.dice[i].value,
      })
    ).reduce(
      (losses, { attack, defence }) => {
        attack > defence ? (losses.defender += 1) : (losses.attacker += 1);
        return losses;
      },
      {
        attacker: 0,
        defender: 0,
      }
    );
    this.attacker.losses = losses.attacker;
    this.defender.losses = losses.defender;
  }
  applyLoss() {
    this.attacker.applyLoss();
    this.defender.applyLoss();
  }
  reset() {
    this.attacker.reset();
    this.defender.reset();
  }
}
