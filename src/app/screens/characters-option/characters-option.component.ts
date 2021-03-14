import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/models/character.model';

@Component({
  selector: 'app-characters-option',
  templateUrl: './characters-option.component.html',
  styleUrls: ['./characters-option.component.scss']
})
export class CharactersOptionComponent implements OnInit {

  characters1: Array<Character>;
  characters2: Array<Character>;
  fighter1: Character = new Character();
  fighter2: Character = new Character();

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.charSpecs();
  }

  getSelectedChar(e: Character) {

    if (e.player == 1) {
      this.selectedChar(e, this.characters1);
      this.fighter1 = this.characters1.filter(item => item.selected && item.player == 1)[0]
    }

    if (e.player == 2) {
      this.selectedChar(e, this.characters2);
      this.fighter2 = this.characters2.filter(item => item.selected && item.player == 2)[0]
    }

  }

  selectedChar(e, arr: Array<Character>) {
    return arr.forEach(char => {
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
      this.fighter1.ready = true;
      localStorage.setItem('player1', JSON.stringify(this.fighter1));
    } else {
      this.fighter2.ready = true;
      localStorage.setItem('player2', JSON.stringify(this.fighter2));
    }

    this.createBattle();
  }

  createBattle() {
    if (this.fighter1.ready && this.fighter2.ready) {
      this.router.navigate(['battle']);
    } else {
      console.log('cant battle')
    }
  }

  charSpecs() {

    this.characters1 = [
      {
        name: 'Berserker',
        portrait: 'golem_01',
        selected: false,
        player: 0,
        ready: false,
        fighter: 1,
        hp: 200,
        fullHp: 200,
        strength: 0,
        minAtacck: 1,
        maxAtacck: 90,
        skills: [
          {
            name: 'Attack',
          },
          {
            name: 'The Struggle',
          },
          {
            name: 'Beacon',
          },
          {
            name: 'Hellrider',
          },
        ]
      },
      {
        name: 'Terminator',
        portrait: 'golem_02',
        selected: false,
        player: 0,
        ready: false,
        fighter: 2,
        hp: 500,
        fullHp: 500,
        strength: 0,
        minAtacck: 1,
        maxAtacck: 90,
        skills: [
          {
            name: 'Attack',
            icon: 'pointy-sword',
          },
          {
            name: 'The Struggle',
            icon: 'sword-in-stone',
          },
          {
            name: 'Beacon',
            icon: 'swords-emblem',
          },
          {
            name: 'Hellrider',
            icon: 'sword-slice',
          },
        ]
      },
      {
        name: 'Viking',
        portrait: 'golem_03',
        selected: false,
        player: 0,
        ready: false,
        fighter: 3,
        hp: 1000,
        fullHp: 1000,
        strength: 0,
        minAtacck: 1,
        maxAtacck: 100,
        skills: [
          {
            name: 'Attack',
          },
          {
            name: 'The Struggle',
          },
          {
            name: 'Beacon',
          },
          {
            name: 'Hellrider',
          },
        ]
      }
    ];

    this.characters2 = [
      {
        name: 'Berserker',
        portrait: 'golem_01',
        selected: false,
        player: 0,
        ready: false,
        fighter: 1,
        hp: 1000,
        fullHp: 1000,
        strength: 0,
        minAtacck: 30,
        maxAtacck: 90,
        skills: [
          {
            name: 'Attack',
          },
          {
            name: 'The Struggle',
          },
          {
            name: 'Beacon',
          },
          {
            name: 'Hellrider',
          },
        ]
      }
    ]
  }
}
