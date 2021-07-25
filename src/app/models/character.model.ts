export class Character {
    name: string;
    portrait: string;
    selected: boolean;
    player: number;
    ready: boolean;
    fighter: number;

    hp: number;
    fullHp: number;
    strength: number;
    minAtacck: number;
    maxAtacck: number;

    skills: Array<any>;
    attacks: Array<any>;
    items: Array<any>;
}