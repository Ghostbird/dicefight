import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FightComponent } from './fight.component'

const routes: Routes = [
  {
    path: ':shareId',
    component: FightComponent,
  },
  {
    path: '',
    redirectTo: Math.random().toString(36).substring(2)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FightRoutingModule { }
