import { MatchingNumbers } from "./matchingNumbers"

export interface Lottery {
  id: number;
  lotteryname: string;
  state: string;
  created: Date;
  matchingnumbers: MatchingNumbers[];
}
