import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersOptionComponent } from './characters-option/characters-option.component';
import { CharacterComponent } from './character/character.component';
import { BattleComponent } from './battle/battle.component';
import { AnimateActionsComponent } from './battle/animate-actions/animate-actions.component';

@NgModule({
  declarations: [
    CharactersOptionComponent,
    CharacterComponent,
    BattleComponent,
    AnimateActionsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ScreensModule { }
