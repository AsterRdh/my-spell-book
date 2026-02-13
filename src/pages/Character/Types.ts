import type {CharacterClass} from "../../hooks/useCharacterClass.ts";
import type {SkillType} from "../Monster/Types.ts";
type CharacterAbility={
    value?:number
    Saving?:boolean
}
type CharacterSkill={
    type: SkillType,
    proficiency?: false| 'JAT' |'proficiency'|'expertise'
    otherValue: number
}
export type Character={
    name?:string;
    classes?:{
        classID:CharacterClass
        level:number
    };
    proficiencyBonus:number
    ability?: {
        pow: CharacterAbility,
        dex: CharacterAbility,
        con: CharacterAbility,
        int: CharacterAbility,
        wis: CharacterAbility,
        cha: CharacterAbility
    }
    skills?:CharacterSkill[]
}