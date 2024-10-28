import { Player } from './player';

export class PlayerParams {
  playername!: string;
  description!: string;

  constructor(player: Player | null) {}
}
