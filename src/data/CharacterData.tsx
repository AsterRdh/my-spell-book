import type {Character} from "../pages/Character/Types.ts";
import {defaultImageSettings} from "../compoment/ImageSelector/DefaultData.ts";


export const ProficiencyBonus = [
    0,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6
]
export const DemoCharacter:Character = {
    name:'Demo',
    playerName:'DemoPlayer',
    races:'Human',
    classes:[
        {
            classID:'artificer',
            level:4
        },
        {
            classID:'ranger',
            level:1
        }
    ],
    proficiencyBonus:2,
    ability:{
        str:{
            score:16,
            modifier:3
        },
        dex:{
            score:14,
            modifier:2
        },
        con:{
            score:12,
            modifier:1
        },
        int:{
            score:10,
            modifier:0
        },
        wis:{
            score:8,
            modifier:-1
        },
        cha:{
            score:8,
            modifier:-1
        }
    },
    ac:10,
    acPS:'+2',
    hp:10,
    hpMax:10,
    hpTemp:0,
    hpDice:[
        {dice:'d10', num:12},
        {dice:'d12', num:1},
        {dice:'d6', num:1},
    ],
    speed:'30 ft.',
    initiative:1,
    spell:{
        keyAbility:['int'],
        hit:1,
        dc:10
    },
    image:defaultImageSettings,
    skills:{
        athletics:{
            proficiency:'proficiency',
            value:16,
            otherValue:0
        },
        acrobatics:{
            proficiency:'JAT',
            value:16,
            otherValue:0
        },
        sleightOfHand:{
            proficiency:'expertise',
            value:16,
            otherValue:0
        },
    },
    proficiencies:{
        languages:['Common'],
        armor:['Light Armor'],
        weapons:['Simple Weapons'],
        tools:['Herbalism Kit'],
        others:['Carpenter\'s Tools']
    },
    equipments:{
        coins:{
            copper:0,
            silver:0,
            electrum:0,
            gold:0,
            platinum:0
        },
        items:'Ambar'
    },

}