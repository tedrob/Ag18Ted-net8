import { Routes } from "@angular/router";
import { PlayersComponent } from "./players.component";

export const playersRoutes: Routes = [{
  path: 'players',
  title: 'PlayersTop',
  component: PlayersComponent,
  children: [
    {}]
}];

