import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DieComponent } from './die/die.component';
import { TeamComponent } from './team/team.component';
import { FightComponent } from './fight.component';
import { FightRoutingModule } from './fight.routing.module';



@NgModule({
  declarations: [
    FightComponent,
    DieComponent,
    TeamComponent
  ],
  imports: [
    FightRoutingModule,
    CommonModule
  ],
  exports: [
    FightComponent
  ]
})
export class DiceFightModule { }
