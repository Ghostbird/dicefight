import { BaseDie } from '../die/die.model';

export interface Team {
  dice: BaseDie[];
  losses: number;
  name: string;
  color: string;
}
