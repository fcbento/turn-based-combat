export class AnimateUtils {

    player;
    tID;
    attackStarted;
    img;

    constructor(public p) {
        this.player = p;
    }

    public idle() {
        this.stopAnimation();
        this.animate('idle', 0, 11, 30, this.setFirstPosition(this.player.player), this.player.fighter);
    }

    public attack(player, fighter) {
        let loop = 11;
        
        if (fighter === 4) {
            loop = 11;
        }

        if (fighter === 5 || fighter === 6 || fighter === 7) {
            loop = 9;
        }
        this.animate('attacks', 0, loop, 31, this.setFirstPosition(player), fighter);
        //this.animate('attacks', 0, 11, 31, this.setFirstPosition(player), fighter);
        this.movePlayerWhenAtaccking(player);
    }

    hurt(player, fighter) {
        let loop = 11;
       
        if (fighter === 4) {
            loop = 11;
        }

        if (fighter === 5 || fighter === 6 || fighter === 7) {
            loop = 9;
        }
        this.stopAnimation();
        this.animate('hurt', 0, loop, 30, this.setFirstPosition(player), fighter);
        //this.animate('hurt', 0, 11, 30, this.setFirstPosition(player), fighter);
    }

    dying(player, fighter) {
        let loop = 14;
   
        if (fighter === 5 || fighter === 6 || fighter === 7) {
            loop = 9;
        }
        this.stopAnimation();
        this.animate('dying', 0, loop, 80, this.setFirstPosition(player), fighter);
    }

    taunt() {
        this.animate('taunt', 0, 17, 50, this.setFirstPosition(this.player.player), this.player.fighter);
    }

    walking(player, fighter) {

        let loop = 17;

        if (fighter === 4) {
            loop = 11;
        }

        if (fighter === 5 || fighter === 6 || fighter === 7) {
            loop = 9;
        }
        this.stopAnimation();
        this.animate('walking', 0, loop, 50, this.setFirstPosition(player), fighter);
    }

    private animate(action, size, range, interval, player, fighter) {
        if (!this.attackStarted) {
            this.tID = setInterval(() => {
                this.setImage(player, action, fighter, size);
                if (size < range) { size++ } else {
                    size = 0;
                }
            }, interval);
        }
    }

    public setImage(player, action, fighter, img) {
        document.getElementById(player)['src'] = `/assets/${action}/${fighter}/${img}.png`;
    }

    public setFirstPosition(player): string {
        let firstPosition: string = '';
        player && player == 1 ? firstPosition = 'attack_p1' : firstPosition = 'attack_p2';
        return firstPosition;
    }

    public stopAnimation() {
        clearInterval(this.tID);
    }

    private movePlayerWhenAtaccking(player) {

        if (player === 1) {
            this.movePlayer(1, '900px');
        } else {
            this.movePlayer(2, '-1500px');
        }
    }

    public movePlayer(player, distance: string): void {
        document.getElementById(this.setFirstPosition(player)).style.marginLeft = distance;
    }

    public resetPosition(fighter1, fighter2) {
        this.idle();
        document.getElementById('attack_p1')['src'] = `/assets/idle/${fighter1}/0.png`;
        document.getElementById('attack_p2')['src'] = `/assets/idle/${fighter2}/0.png`;
    }
}