import type {SelectOptionType} from "../types/DataType.ts";


export type CharacterClass = 'artificer'|'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard';
type CharacterClassType={
    id:CharacterClass;
    name:string;
    chName:string;
    icon:string;
    description?:string;
}
export const CharacterClasses:Record<string, CharacterClassType>={
    artificer:{id:'artificer', name:'artificer', chName:'奇械师', icon:'artificer',},
    barbarian:{id:'barbarian', name:'barbarian', chName:'野蛮人', icon:'barbarian',},
    bard:{id:'bard', name:'bard', chName:'吟游诗人', icon:'bard',},
    cleric:{id:'cleric', name:'cleric', chName:'牧师', icon:'cleric',},
    druid:{id:'druid', name:'druid', chName:'德鲁伊', icon:'druid',},
    fighter:{id:'fighter', name:'fighter', chName:'战士', icon:'fighter',},
    monk:{id:'monk', name:'monk', chName:'武僧', icon:'monk',},
    paladin:{id:'paladin', name:'paladin', chName:'圣骑士', icon:'paladin',},
    ranger:{id:'ranger', name:'ranger', chName:'游侠', icon:'ranger',},
    rogue:{id:'rogue', name:'rogue', chName:'游荡者', icon:'rogue',},
    sorcerer:{id:'sorcerer', name:'sorcerer', chName:'术士', icon:'sorcerer',},
    warlock:{id:'warlock', name:'warlock', chName:'魔契师', icon:'warlock',},
    wizard:{id:'wizard', name:'wizard', chName:'法师', icon:'wizard',},
}
export const CharacterOptions:SelectOptionType<CharacterClassType>[]=Object.values(CharacterClasses).map((item)=>{
    return {
        value:item.id,
        label:item.chName,
        data:item,
    }
})


export default function useCharacterClass(){
    return {CharacterClasses, CharacterOptions}
}