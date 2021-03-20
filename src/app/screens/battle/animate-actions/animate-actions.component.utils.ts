export class AnimateUtils {

    player;
    tID;
    attackStarted;
    img;

    constructor(public p) {
        this.player = p;
    }

    public idle() {
        this.animate('idle', 0, 11, 30, this.setFirstPosition(this.player.player), this.player.fighter);
    }

    public attack(player, fighter) {
        this.animate('attacks', 0, 11, 31, this.setFirstPosition(player), fighter);
        this.movePlayerWhenAtaccking(player);
    }

    hurt(player, fighter) {
        this.animate('hurt', 0, 11, 30, this.setFirstPosition(player), fighter);
    }

    dying(player, fighter) {
        this.animate('dying', 0, 14, 80, this.setFirstPosition(player), fighter);
    }

    taunt() {
        this.animate('taunt', 0, 17, 50, this.setFirstPosition(this.player.player), this.player.fighter);
    }

    walking() {
        this.animate('walking', 0, 17, 50, this.setFirstPosition(this.player.player), this.player.fighter);
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
        document.getElementById('attack_p1')['src'] = `/assets/idle/${fighter1}/0.png`;
        document.getElementById('attack_p2')['src'] = `/assets/idle/${fighter2}/0.png`;
    }
}