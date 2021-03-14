import { Character } from "./character.model";

export class Characters2 {

    charactersPlayer2: Character[] = [
        {
            name: 'Berserker',
            portrait: 'golem_01',
            selected: false,
            player: 0,
            ready: false,
            fighter: 1,
            hp: 2156,
            fullHp: 2156,
            strength: 0,
            minAtacck: 60,
            maxAtacck: 150,
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

}