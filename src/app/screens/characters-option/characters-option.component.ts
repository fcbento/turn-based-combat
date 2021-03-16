import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/models/character.model';
import { Characters1 } from 'src/app/models/characters-1.model';
import { Characters2 } from 'src/app/models/characters-2.model';

@Component({
  selector: 'app-characters-option',
  templateUrl: './characters-option.component.html',
  styleUrls: ['./characters-option.component.scss']
})
export class CharactersOptionComponent implements OnInit {

  characters1: Characters1 = new Characters1();
  characters2: Characters2 = new Characters2();
  fighter1: Character = new Character();
  fighter2: Character = new Character();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  getSelectedChar(e: any) {

    if (e.player == 1) {
      this.selectedChar(1, e, this.characters1);
      this.fighter1 = this.characters1.charactersPlayer1.filter(item => item.selected && item.player == 1)[0]
    }

    if (e.player == 2) {
      this.selectedChar(2, e, this.characters2);
      this.fighter2 = this.characters2.charactersPlayer2.filter(item => item.selected && item.player == 2)[0]
    }

  }

  selectedChar(player, e, arr) {

    let newArr = [];
    player === 1 ? newArr = arr.charactersPlayer1 : newArr = arr.charactersPlayer2;

    return newArr.forEach(char => {
      if (e.name === char.name) {
        char.player = e.player;
        char.selected = e.selected;
      } else {
        char.selected = false
      }
    });
  }

  readyForBattle(player: number) {
    if (player === 1) {
      this.setStoragePlayer(player, this.fighter1)
    } else {
      this.setStoragePlayer(player, this.fighter2)
    }

    this.createBattle();
  }

  createBattle() {
    if (this.fighter1.ready && this.fighter2.ready) {
      this.router.navigate(['battle']);
    }
  }

  setStoragePlayer(player, fighter) {
    fighter.ready = true;
    localStorage.setItem(`player${player}`, JSON.stringify(fighter));
  }

}
