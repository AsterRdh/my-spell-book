
import type {CharacterClassType} from "../../compoment/ClassInput/ClassInput.tsx";
import type {CharacterAbilityType} from "../../compoment/AbilityInput/AbilityInput.tsx";
import type { CharacterSkill } from "../../compoment/SkillInput/SkillInput.tsx";



export type Character={
    name?:string;
    playerName?:string;
    races?:string;
    classes?:CharacterClassType[];
    proficiencyBonus:number
    ability?: {
        pow: CharacterAbilityType,
        dex: CharacterAbilityType,
        con: CharacterAbilityType,
        int: CharacterAbilityType,
        wis: CharacterAbilityType,
        cha: CharacterAbilityType
    }
    skills?:{
        athletics : CharacterSkill, //运动, str

        acrobatics : CharacterSkill, //特技, dex
        sleightOfHand : CharacterSkill, //巧手,
        stealth : CharacterSkill, //隐匿,

        arcana : CharacterSkill, //奥秘,int
        history : CharacterSkill, //历史,
        investigation : CharacterSkill, //调查,
        nature : CharacterSkill, //自然,
        religion : CharacterSkill, //宗教,

        animalHandling : CharacterSkill, //驯兽,was
        insight : CharacterSkill, //洞悉,
        medicine : CharacterSkill, //医药,
        perception : CharacterSkill, //察觉,
        survival : CharacterSkill, //生存,

        deception : CharacterSkill, //欺瞒,cha
        intimidation : CharacterSkill, //威吓,
        performance : CharacterSkill, //表演,
        persuasion : CharacterSkill, //游说
    }

    ac?:number
    acPS?:string
    hp?:number
    hpMax?:number
    hpTemp?:number
    hpDice?:{
        dice?:'d6'|'d8'|'d10'|'d12'
        num?:number
    }[]
    deathSavingThrow?:{
        size?:number
        success?:number
        fail?:number
    }
    spell?:{
        keyAbility?:'pow'|'dex'|'con'|'int'|'wis'|'cha'
        hit?:number
        dc?:number
    }

    speed?:string

}