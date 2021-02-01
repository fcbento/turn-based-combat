import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BattleComponent } from './screens/battle/battle.component';
import { CharactersOptionComponent } from './screens/characters-option/characters-option.component';

const routes: Routes = [
  {
    path: '', component: CharactersOptionComponent,
  },
  {
    path: 'battle', component: BattleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
