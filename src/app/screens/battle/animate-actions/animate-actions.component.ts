import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewChecked, Component, HostListener, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { AudioService } from 'src/app/shared/audio.service';

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

  constructor(private audio: AudioService) { }

  ngOnInit(): void {

    if (this.player.player == 1) {
      this.img = "attack_p1"
    } else {
      this.img = "attack_p2"
    }

    if (this.initAnimation) {
      //this.idleBlink();
    }

    const player1 = JSON.parse(localStorage.getItem('player1'));
    const player2 = JSON.parse(localStorage.getItem('player2'));

    if (player1) {
      this.player1 = player1;
    }

    if (player2) {
      this.player2 = player2;
    }

  }

  idle() {
    this.animate('idle', 0, 11, 30, 1000, this.img, this.player.fighter);
  }

  idleBlink() {
    this.animate('idle_blink', 0, 12, 30, 6000, this.img, this.player.fighter);
  }

  attack() {
    this.animate('attacks', 0, 11, 31, 1000, this.img, this.player.fighter);

    if (this.player.player === 1) {
      document.getElementById(this.img).style.marginLeft = '900px';
    }

    if (this.player.player === 2) {
      document.getElementById(this.img).style.marginLeft = '-1500px';
    }

  }

  hurt() {
    this.animate('hurt', 0, 11, 30, 1000, this.img, this.player.fighter);
  }

  dying() {
    this.animate('dying', 0, 14, 100, 1000, this.img, this.player.fighter);
  }

  jumpLoop() {
    this.animate('jump_loop', 0, 5, 30, 1000, this.img, this.player.fighter);
  }

  jumpStart() {
    this.animate('jump_start', 0, 5, 100, 1000, this.img, this.player.fighter);
  }

  taunt() {
    this.animate('taunt', 0, 17, 50, 1000, this.img, this.player.fighter);
  }

  walking() {
    this.animate('walking', 0, 17, 50, 1000, this.img, this.player.fighter);

  }

  animate(action, size, range, interval, duration, img, fighter) {
    if (!this.attackStarted) {

      this.tID = setInterval(() => {

        this.setImage(img, action, fighter, size);

        if (size < range) {
          size = size + 1;
        } else {
          size = 0;
        }

      }, interval);
    }
  }

  checkStop(startTime, duration) {
    this.stopAnimation();
    if (new Date().getTime() - startTime > duration) {
      document.getElementById(this.img).style.marginLeft = '0';
    }

  }

  stopAnimation() {
    clearInterval(this.tID);
    this.animationDone = true;
    this.reset();
    this.attackStarted = false;
  }

  attackBtn(player, skill) {
    document.getElementById('damage-1').textContent = '';
    this.checkSkill(skill);

    //action init
    let start = new Date().getTime();

    //start walking
    this.walking();
    this.hideBtn = false;
    //stop walking
    setTimeout(() => {
      this.checkStop(start, 1000)
    }, 1000)

    // start attacking
    setTimeout(() => {
      this.attack();
    }, 1100)


    setTimeout(() => {

      //player 1 hits player 2; start hurt animation
      if (player == 1) {
        this.animate('hurt', 0, 11, 30, 1000, 'attack_p2', this.player2.fighter);
        this.attackStarted = true;
      }

      //player 2 hits player 1; start hurt animation
      if (player == 2) {
        this.animate('hurt', 0, 11, 30, 1000, 'attack_p1', this.player1.fighter);
        this.attackStarted = true;
      }

      //stop hurt animation
      setTimeout(() => {
        this.checkStop(start, 600)
      }, 500);

      //play audio after hurt animation stops
      this.audio.play('punch');
      //set battle stats
      this.battleStats(player);
    }, 1550)

    //stop attack animation
    setTimeout(() => {
      this.checkStop(start, 1500)
    }, 1500)

    setTimeout(() => {
      if (this.player2.hp > 0)
        this.boosAttack();
    }, 1600)

  }

  handleSkillPercentage(skill) {
    switch (skill) {
      case 1:
        return this.calculatePercentage(5, 10);
      case 2:
        return this.calculatePercentage(5, 30);
      case 3:
        return this.calculatePercentage(5, 60);
      case 4:
        return this.calculatePercentage(5, 90);
    }
  }

  handleSkillAttack(skill) {
    switch (skill) {
      case 1:
        return this.calculateAttack(1, 5);
      case 2:
        return this.calculateAttack(10, 20);
      case 3:
        return this.calculateAttack(10, 70);
      case 4:
        return this.calculateAttack(10, 90);
    }
  }

  checkSkill(skill) {
    this.player1.strength = this.calculateAttack(this.player1.minAtacck, this.player1.maxAtacck);
    this.realDamage1 = this.player1.strength + (this.handleSkillAttack(skill) + this.handleSkillPercentage(skill))
    setTimeout(() => {
      document.getElementById('damage-2').textContent = this.realDamage1;
    }, 1200)

  }

  checkBossSkill(skill) {

    switch (skill) {

      case 1:
        this.player2.strength = this.calculateAttack(this.player2.minAtacck, this.player2.maxAtacck);
        this.realDamage2 = this.player2.strength + (100 * 0.1)
        setTimeout(() => {
          document.getElementById('damage-1').textContent = this.realDamage2;
        }, 1200)
        break;

      case 2:
        this.player2.strength = this.calculateAttack(this.player2.minAtacck, this.player2.maxAtacck);
        this.realDamage2 = this.player2.strength + (100 * 0.5)
        setTimeout(() => {
          document.getElementById('damage-1').textContent = this.realDamage2;
        }, 1200)
        break;

      case 3:
        this.player2.strength = this.calculateAttack(this.player2.minAtacck, this.player2.maxAtacck);
        this.realDamage2 = this.player2.strength + (100 * 0.6)
        setTimeout(() => {
          document.getElementById('damage-1').textContent = this.realDamage2;
        }, 1200)
        break;

      case 4:
        this.player2.strength = this.calculateAttack(this.player2.minAtacck, this.player2.maxAtacck);
        this.realDamage2 = this.player2.strength + (100 * 0.8)
        setTimeout(() => {
          document.getElementById('damage-1').textContent = this.realDamage2;
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
    document.getElementById('damage-2').textContent = '';
    this.checkBossSkill(2);
    //action init
    let start = new Date().getTime();

    //start walking
    this.walking();

    //stop walking
    setTimeout(() => {
      this.checkStop(start, 1000)
    }, 1000)

    // start attacking
    setTimeout(() => {
      document.getElementById('attack_p2').style.marginLeft = '-1500px';
      this.animate('attacks', 0, 11, 30, 1000, 'attack_p2', this.player2.fighter);
    }, 1100)

    setTimeout(() => {

      //player 2 hits player 1; start hurt animation
      this.animate('hurt', 0, 11, 30, 1000, 'attack_p1', this.player1.fighter);
      this.attackStarted = true;

      //stop hurt animation
      setTimeout(() => {
        document.getElementById('attack_p2').style.marginLeft = '0px';
        this.checkStop(start, 600)
      }, 500);

      //play audio after hurt animation stops
      this.audio.play('punch');

      //set battle stats
      this.battleStats(2);
    }, 1550)

    //stop attack animation
    setTimeout(() => {
      this.checkStop(start, 1500);
    }, 1500)

    setTimeout(() => {
      this.hideBtn = true;
      document.getElementById('damage-2').textContent = '';
      document.getElementById('damage-1').textContent = '';
    }, 1950)
  }

  setImage(player, action, fighter, img) {
    document.getElementById(player)['src'] = `/assets/${action}/${fighter}/${img}.png`;
  }

  //reset both player 1 and player 2 positions
  reset() {

    setTimeout(() => {
      this.setImage('attack_p1', 'attacks', this.player1.fighter, '0');
      this.setImage('attack_p2', 'attacks', this.player2.fighter, '0');
    }, 300)

  }


  battleStats(player) {

    //player 1 starts attacking ; player 2 starts attacking
    if (player == 1) {
      let fullHp = this.player.hp;
      this.player2.hp = this.player2.hp - this.realDamage1;
      this.calculateHp(player, fullHp, this.player2.hp);
      document.getElementById('health-2').textContent = this.player2.hp.toString()

    } else {

      let fullHp = this.player.hp;
      this.player1.hp = this.player1.hp - this.realDamage2;
      this.calculateHp(player, fullHp, this.player1.hp);
      document.getElementById('health-1').textContent = this.player1.hp.toString()
    }

  }

  //calculate damage based on strength and hp properties 
  calculateHp(player, fullHp, currentHp) {

    if (player === 1) {

      this.damage2 = ((currentHp / fullHp) * 100);
      const element = <HTMLElement>document.getElementsByClassName('hp-bar-2')[0];
      console.log(this.damage2)
      element.style.width = `${this.damage2}%`;

      if (this.player2.hp < 0) {
        this.finishBattle(2, this.player2.fighter);
        element.style.width = '0';
        element.style.backgroundColor = 'white';
        this.player2.hp = 0
        this.hideBtn = false;
      }

    } else {

      this.damage1 = ((currentHp / fullHp) * 100);
      const element = <HTMLElement>document.getElementsByClassName('hp-bar-1')[0];
      element.style.width = `${this.damage1}%`;

      if (this.player1.hp < 0) {
        this.finishBattle(1, this.player1.fighter);
        element.style.width = '0';
        element.style.backgroundColor = 'white';
        this.player1.hp = 0
        this.hideBtn = false;
      }
      
    }

  }

  finishBattle(player, fighter) {

    setTimeout(() => {
      this.animate('dying', 0, 14, 30, 1000, `attack_p${player}`, fighter);
    }, 1000);

    setTimeout(() => {
      clearInterval(this.tID)
    }, 1000);

    setTimeout(() => {
      const element = <HTMLElement>document.getElementsByClassName(`hp-bar-${player}`)[0];
      element.style.borderColor = 'transparent'
      document.getElementById(`attack_p${player}`)['src'] = `/assets/dying/${fighter}/14.png`;
      document.getElementById(`damage-${player}`).textContent = '';
      this.hideBtn = false;
    }, 1100)

  }

}



