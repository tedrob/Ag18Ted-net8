import { Lottery } from "./lottery";

export class LotteryParams {
  lotteryname!: string;
  description!: string;

  constructor(lottery: Lottery | null) {}
}
