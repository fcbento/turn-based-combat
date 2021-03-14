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
  diff = 256;
  tID;
  spriteAnimation;
  isAtaccking: boolean = false;
  isWalking: boolean = false;
  animationDone: boolean = false;

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
    }
  }

  attack() {
    this.isAtaccking = !this.isAtaccking;
    this.animateConfig('dying');
  }

  animateConfig(type) {
    let size, interval;

    switch (type) {

      case "walk":
        size = 17;
        interval = 30;
        type = 'walk';
        this.isWalking = true;
        this.isAtaccking = false;
        return this.animateAction(type, size, interval);

      case "attack":
        size = 11;
        interval = 30;
        type = 'attack'
        this.isAtaccking = true;
        this.isWalking = false;
        return this.animateAction(type, size, interval);

      case "dying":
        size = 14;
        interval = 30;
        type = 'attack'
        this.isAtaccking = true;
        this.isWalking = false;
        return this.animateAction(type, size, interval);
    }

  }


  animateAction(type, size, interval) {

    let startTime = new Date().getTime();
    let action;
    let range;

    switch (type) {

      case "walk":
        action = "walking";
        range = 17;
        break;

      case "attack":
        action = "attacks";
        range = 11;
        break;
    }

    this.tID = setInterval(() => {
      this.checkStop(type, startTime);
      document.getElementById("attack_p1")['src'] = `/assets/${action}/${this.player1.fighter}/${size}.png`;
      document.getElementById("attack_p1").style.marginLeft = '850px';
      if (size < range) {
        size = size + 1;
      } else {
        size = 1;
      }
    }, interval);

  }

  checkStop(type, startTime) {

    if (new Date().getTime() - startTime > 1000) {

      this.isAtaccking = false;
      this.isWalking = false;
      this.stopAnimation();

      //Starts attacking after fighter has walked
      if (type === 'walk') {
        //this.animateConfig('attack');
      }

    }

  }

  stopAnimation() {
    clearInterval(this.tID);
  }


}
