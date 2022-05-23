import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FightComponent } from './fight.component'

const routes: Routes = [
  {
    path: '',
    component: FightComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FightRoutingModule { }
