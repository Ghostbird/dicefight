import { Component, Input } from '@angular/core';
import { Die } from './die.model';

@Component({
  selector: 'dice-die',
  templateUrl: './die.component.html',
  styleUrls: ['./die.component.scss']
})
export class DieComponent {
  @Input() die!: Die;
}
