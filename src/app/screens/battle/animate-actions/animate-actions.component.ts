import { AfterViewChecked, Component, HostListener, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { AudioService } from 'src/app/shared/audio.service';
import { AnimateUtils } from './animate-actions.component.utils';

@Component({
  selector: 'app-animate-actions',
  templateUrl: './animate-actions.component.html',
  styleUrls: ['./animate-actions.component.scss']
})
export class AnimateActionsComponent implements OnInit {

  @Input() player: Character;
  @Input() initAnimation: boolean;

  tID;
  animationDone: boolean = false;
  img;
  attackStarted: boolean = false;
  player1: Character;
  player2: Character;
  damage1: number = 0;
  damage2: number = 0;
  hideBtn = true;
  realDamage1;
  realDamage2;
  displayMenu = false;
  au: AnimateUtils;

  constructor(private audio: AudioService) {
  }

  ngOnInit(): void {

    const player1 = JSON.parse(localStorage.getItem('player1'));
    const player2 = JSON.parse(localStorage.getItem('player2'));

    this.player1 = player1;
    this.player2 = player2;

    if (this.player.player == 1) {
      this.img = "attack_p1"
    } else {
      this.img = "attack_p2"
    }

    this.au = new AnimateUtils(this.player);

  }

  attackBtn(player, skill) {

    this.checkSkill(skill);

    this.au.stopAnimation();
    this.au.walking();
    this.hideBtn = false;

    setTimeout(() => {
      this.au.stopAnimation();
    }, 1000)

    setTimeout(() => {
      this.au.attack(1, this.player1.fighter);
    }, 1100)

    setTimeout(() => {

      if (player == 1) {
        this.au.hurt(2, this.player2.fighter);
        setTimeout(() => {
          this.au.stopAnimation();
          this.au.resetPosition(this.player1.fighter, this.player2.fighter);
          this.au.movePlayer(1, '0px');
        }, 1300)
      }

      this.audio.play('punch');

      this.battleStats(player);
    }, 1550)

    setTimeout(() => {
      this.au.stopAnimation();
    }, 1500)

    setTimeout(() => {
      if (this.player2.hp > 0)
        this.boosAttack();
    }, 2000);

  }

  handleSkillPercentage(skill) {
    switch (skill) {
      case 1:
        return this.calculatePercentage(55, 20);
      case 2:
        return this.calculatePercentage(35, 50);
      case 3:
        return this.calculatePercentage(25, 90);
      case 4:
        return this.calculatePercentage(15, 190);
    }
  }

  handleSkillAttack(skill) {
    switch (skill) {
      case 1:
        return this.calculateAttack(1, 5);
      case 2:
        return this.calculateAttack(10, 20);
      case 3:
        return this.calculateAttack(20, 70);
      case 4:
        return this.calculateAttack(30, 95);
    }
  }

  checkSkill(skill) {
    this.player1.strength = this.calculateAttack(this.player1.minAtacck, this.player1.maxAtacck);
    this.realDamage1 = this.player1.strength + (this.handleSkillAttack(skill) + this.handleSkillPercentage(skill))
  }

  checkBossSkill(skill) {

    switch (skill) {

      case 1:
        this.player2.strength = this.calculateAttack(this.player2.minAtacck, this.player2.maxAtacck);
        this.realDamage2 = this.player2.strength + (100 * 0.1)
        setTimeout(() => {
          //document.getElementById('damage-1').textContent = this.realDamage2;
        }, 1200)
        break;

      case 2:
        this.player2.strength = this.calculateAttack(this.player2.minAtacck, this.player2.maxAtacck);
        this.realDamage2 = this.player2.strength + (100 * 0.5)
        setTimeout(() => {
          //document.getElementById('damage-1').textContent = this.realDamage2;
        }, 1200)
        break;

      case 3:
        this.player2.strength = this.calculateAttack(this.player2.minAtacck, this.player2.maxAtacck);
        this.realDamage2 = this.player2.strength + (100 * 0.6)
        setTimeout(() => {
          //document.getElementById('damage-1').textContent = this.realDamage2;
        }, 1200)
        break;

      case 4:
        this.player2.strength = this.calculateAttack(this.player2.minAtacck, this.player2.maxAtacck);
        this.realDamage2 = this.player2.strength + (100 * 0.8)
        setTimeout(() => {
          // document.getElementById('damage-1').textContent = this.realDamage2;
        }, 1200)
        break;

    }
  }

  calculateAttack(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  calculatePercentage(min, max) {
    let random = Math.floor(Math.random() * (max - min + 1) + min);
    let result = (random / 100) * 100;
    return result;
  }

  boosAttack() {
    this.checkBossSkill(2);
    //action init
    let start = new Date().getTime();

    this.au.stopAnimation();
    this.hideBtn = false;

    setTimeout(() => {
      this.au.stopAnimation();
    }, 1000)

    setTimeout(() => {
      this.au.attack(2, this.player2.fighter);
    }, 1100)

    setTimeout(() => {

      this.au.hurt(1, this.player1.fighter);
      setTimeout(() => {
        this.au.stopAnimation();
        this.au.resetPosition(this.player1.fighter, this.player2.fighter);
        this.au.movePlayer(2, '0px');
      }, 1300)

      this.audio.play('punch');

      this.battleStats(2);
      this.hideBtn = true;
    }, 1550)

    setTimeout(() => {
      this.au.stopAnimation();
    }, 1500)

  }

  battleStats(player) {
    //player 1 starts attacking ; player 2 starts attacking
    if (player == 1) {
      let fullHp = this.player2.hp;
      this.player2.hp = this.player2.hp - this.realDamage1;
      this.calculatePlayerHp(player, this.player2.fullHp, this.player2.hp);
      document.getElementById('health-2').textContent = this.player2.hp.toString() + '/' + this.player2.fullHp

    } else {

      let fullHp = this.player1.hp;
      this.player1.hp = this.player1.hp - this.realDamage2;
      this.calculatePlayerHp(player, this.player1.fullHp, this.player1.hp);
      document.getElementById('health-1').textContent = this.player1.hp.toString() + '/' + this.player1.fullHp
    }

  }

  //calculate damage based on strength and hp properties 
  calculatePlayerHp(player, fullHp, currentHp) {

    let damage: any;
    let fighter: any;
    let element: any;

    if (player === 1) {
      this.damage2 = ((currentHp / fullHp) * 100);
      damage = this.damage2;
      fighter = this.player2;
      element = <HTMLElement>document.getElementsByClassName(`hp-bar-2`)[0];
      player = 2;
      this.changeHealthBarColor(currentHp, fullHp, element);
    } else {
      this.damage1 = ((currentHp / fullHp) * 100);
      damage = this.damage1;
      fighter = this.player1;
      element = <HTMLElement>document.getElementsByClassName(`hp-bar-1`)[0];
      player = 1;
      this.changeHealthBarColor(currentHp, fullHp, element);
    }

    element.style.width = `${damage}%`;

    if (this.player1.hp < 0) {
      this.finishBattle(this.player1);
      element.style.width = '0';
      element.style.backgroundColor = 'white';
      this.player1.hp = 0
      this.hideBtn = false;
    }

    if (this.player2.hp < 0) {
      this.finishBattle(this.player2);
      element.style.width = '0';
      element.style.backgroundColor = 'white';
      this.player2.hp = 0
      this.hideBtn = false;
    }

  }

  changeHealthBarColor(currentHp, fullHp, element) {
    const x = fullHp / 2;

    if (currentHp < x) {
      element.style.borderColor = 'orange';
    }

    if (currentHp < 100) {
      element.style.borderColor = 'red';
    }

  }

  finishBattle(fighter) {

    setTimeout(() => {
      this.au.dying(fighter.player, fighter.fighter);
    }, 2000)


    setTimeout(() => {
      this.au.stopAnimation();
      const element = <HTMLElement>document.getElementsByClassName(`hp-bar-${fighter.player}`)[0];
      element.style.borderColor = 'transparent'
      document.getElementById(`attack_p${fighter.player}`)['src'] = `/assets/dying/${fighter.fighter}/14.png`;
      this.hideBtn = false;
    }, 2100)

  }

  openMenu() {
    this.displayMenu = !this.displayMenu;
  }

}



