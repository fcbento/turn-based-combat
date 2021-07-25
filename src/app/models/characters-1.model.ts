import { Character } from "./character.model";

export class Characters1 {

    charactersPlayer1: Character[] = [

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
                    name: 'fire',
                    nameDisplay: 'Big Fire'
                },
                {
                    name: 'ice',
                    nameDisplay: 'Ice Damage'
                }
            ],
            items: [

            ],
            attacks: [
                {
                    name: 'Attack',
                    icon: 'pointy-sword',
                },
                {
                    name: 'The Struggle',
                    icon: 'sword-in-stone',
                }
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
            minAtacck: 800,
            maxAtacck: 800,
            skills: [
                {
                    nameDisplay: 'Soul Eater'
                },
                {
                    name: 'shadow',
                    nameDisplay: 'Shadow of the unknown'
                }
            ],
            items: [],
            attacks: [
                {
                    name: 'Attack',
                    icon: 'pointy-sword',
                },
                {
                    name: 'The Struggle',
                    icon: 'sword-in-stone',
                }
            ]
        },
    ];

}