import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from 'src/app/models/character.model';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {

  player1: Character = new Character();
  player2: Character = new Character();

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.retrieveData();
  }

  retrieveData() {
    
    const player1 = JSON.parse(localStorage.getItem('player1'));
    const player2 = JSON.parse(localStorage.getItem('player2'));

    if (player1) {
      this.player1 = player1;
    }

    if (player2) {
      this.player2 = player2;
      console.log(this.player2)
    }
  }
}
