import { AfterViewChecked, Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { AudioService } from 'src/app/shared/audio.service';
import { AnimateUtils } from './animate-actions.component.utils';

@Component({
  selector: 'app-animate-actions',
  templateUrl: './animate-actions.component.html',
  styleUrls: ['./animate-actions.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AnimateActionsComponent implements OnInit {

  @Input() player: Character;
  @Input() initAnimation: boolean;

  img;
  player1: Character;
  player2: Character;
  damage1: number = 0;
  damage2: number = 0;
  hideBtn = true;
  realDamage1;
  realDamage2;
  displayMenu = false;
  au: AnimateUtils;
  menuAttack: boolean = false;
  menuSkills: boolean = false;
  menuItem: boolean;

  public element: string;
  constructor(private audio: AudioService, private elementRef: ElementRef) {
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

    this.checkAttack();

    this.au.stopAnimation();
    this.au.walking(1, this.player1.fighter);
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

  attackSkill(player, skillName) {

    this.checkSkill();
    this.hideBtn = false;

    this.skillAnimation(skillName);

    setTimeout(() => {
      this.element = null;
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
    }, 1500);

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

  skillAnimation(skillName: string) {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'black';
    this.element = `<img src="assets/skills/${skillName}.png" class="img"/>`;
  }

  checkAttack() {
    this.player1.strength = this.player1.minAtacck;
    this.realDamage1 = this.player1.strength;
  }

  checkSkill() {
    this.player1.strength = this.player1.minAtacck;
    this.realDamage1 = this.player1.strength;
  }

  checkBossSkill() {

    this.player2.strength = this.player2.minAtacck;
    this.realDamage2 = this.player2.strength + (100 * 0.1)
    setTimeout(() => {
      //document.getElementById('damage-1').textContent = this.realDamage2;
    }, 1200)
  }

  boosAttack() {

    this.checkBossSkill();
    this.au.stopAnimation();
    this.au.walking(2, this.player2.fighter);
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
    }, 1550)

    setTimeout(() => {
      this.au.stopAnimation();
    }, 1500)

    setTimeout(() => {
      this.hideBtn = true;
      this.menuAttack = false;
      this.menuSkills = false;
    }, 3500)

  }

  battleStats(player) {

    if (player == 1)
      this.playerOneStats();
    else
      this.playerTwoStats();
  }

  playerOneStats() {
    this.player2.hp = this.player2.hp - this.realDamage1;
    this.calculatePlayerHp(1, this.player2.fullHp, this.player2.hp);
    document.getElementById('health-2').textContent = this.player2.hp.toString() + '/' + this.player2.fullHp;
  }

  playerTwoStats() {
    this.player1.hp = this.player1.hp - this.realDamage2;
    this.calculatePlayerHp(2, this.player1.fullHp, this.player1.hp);
    document.getElementById('health-1').textContent = this.player1.hp.toString() + '/' + this.player1.fullHp;
  }

  //calculate damage based on strength and hp properties
  //REFACTOR
  calculatePlayerHp(player, fullHp, currentHp) {

    let damage: any;
    let element: any;

    if (player === 1) {
      damage = ((currentHp / fullHp) * 100);
      element = <HTMLElement>document.getElementsByClassName(`hp-bar-2`)[0];
      player = 2;
      this.changeHealthBarColor(currentHp, fullHp, element);
    } else {
      damage = ((currentHp / fullHp) * 100);
      element = <HTMLElement>document.getElementsByClassName(`hp-bar-1`)[0];
      player = 1;
      this.changeHealthBarColor(currentHp, fullHp, element);
    }

    element.style.width = `${damage}%`;

    this.prepareToFinish(player, element)
  }

  prepareToFinish(player, element) {
    if (this.player1.hp < 0 || this.player2.hp < 0) {
      this.finishBattle(player === 1 ? this.player1 : this.player2);
      element.style.width = '0';
      element.style.backgroundColor = 'white';
      player === 1 ? this.player1.hp = 0 : this.player2.hp = 0;
      this.hideBtn = false;
    }
  }

  changeHealthBarColor(currentHp, fullHp, element) {

    if (currentHp < (fullHp / 2)) {
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
      document.getElementById(`attack_p${fighter.player}`)['src'] = `/assets/dying/${fighter.fighter}/${fighter.fighter == 5 ? "9" : "14"}.png`;
      this.hideBtn = false;
    }, 2100)

  }

  openMenu() {
    this.displayMenu = !this.displayMenu;
  }

  displayMenuAttack() {
    this.menuAttack = !this.menuAttack;
    this.menuSkills = false;
    this.menuItem = false;
  }

  displayMenuSkill() {
    this.menuSkills = !this.menuSkills;
    this.menuAttack = false;
    this.menuItem = false;
  }

  displayMenuItem() {
    this.menuItem = !this.menuItem;
    this.menuSkills = false;
    this.menuAttack = false;
  }

}


