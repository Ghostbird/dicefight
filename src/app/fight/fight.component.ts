import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, map, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { Die } from 'src/app/fight/die/die.model';
import { Fight } from 'src/app/fight/fight.model';
import { TeamComponent } from 'src/app/fight/team/team.component';
import { FightService } from './fight.service';

@Component({
  selector: 'dice-fight',
  templateUrl: 'fight.component.html',
  styleUrls: ['fight.component.scss'],
})
export class FightComponent {
  @ViewChild('attacker') attacker!: TeamComponent;
  @ViewChild('defender') defender!: TeamComponent;
  remote$ = this.route.paramMap.pipe(
    switchMap((paramMap) => {
      if (paramMap.has('shareId')) {
        this.fightId = paramMap.get('shareId') as string;
        this.service.join(this.fightId);
        return this.service.update.pipe(
          map((state) => ({
            ...state,
            attacker: {
              ...state.attacker,
              dice: state.attacker.dice.map(Die.fromBase),
            },
            defender: {
              ...state.defender,
              dice: state.defender.dice.map(Die.fromBase),
            },
          }))
        );
      } else {
        return of(null);
      }
    }),
    shareReplay(1)
  );
  fightId!: string;

  constructor(private route: ActivatedRoute, private service: FightService) {}

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
    this.service.share(this.fightId, this.getState(true));
  }
  applyLoss() {
    this.attacker.applyLoss();
    this.defender.applyLoss();
    this.service.share(this.fightId, this.getState());
  }
  reset() {
    this.attacker.reset();
    this.defender.reset();
    this.service.share(this.fightId, this.getState());
  }

  getState(animate = false): Fight {
    return {
      attacker: this.attacker.getState(animate),
      defender: this.defender.getState(animate),
    };
  }
}
