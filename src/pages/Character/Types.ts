
import type {CharacterClassType} from "../../compoment/ClassInput/ClassInput.tsx";
import type {CharacterAbilityType} from "../../compoment/AbilityInput/AbilityInput.tsx";
import type { CharacterSkillType } from "../../compoment/SkillInput/SkillInput.tsx";
import type {ImageSelectorType} from "../../compoment/ImageSelector/ImageSelector.tsx";
import React from "react";
type AbilityType='pow'|'dex'|'con'|'int'|'wis'|'cha'
type SensesType='Normal'|'Blindsight'|'DarkVision'|'TremorSense'|'TrueSight';
export type CharacterSensesOptionType={
    value:SensesType,
    label:string
    description:string|React.ReactNode
}

export const CharacterSensesOptions:CharacterSensesOptionType[]=[
    {
        value:'Normal',
        label:'正常',
        description:'正常'
    },
    {
        value:'Blindsight',
        label:'盲视',
        description:'具有盲视感官的怪物在不依赖视觉的情况下，依然可以感觉一定的半径范围。\n' +
            '没有眼睛的生物，如石盲蛮族grimlock和灰泥怪gray ooze是典型的盲视物种。从另种意义来讲，使用回声定位以及高敏感官的生物也视为具有盲视感官，如蝙蝠bat和真龙true dragons。\n' +
            '如果怪物天生目盲，在其盲视描述后有补充说明标明其最大的盲视感官半径。'
    },
    {
        value:'DarkVision',
        label:'黑暗视觉',
        description:'具有黑暗视觉的怪物在黑暗中可以看清一定的半径范围。该生物在微光环境中视物时视为处于明亮光照环境，而在黑暗环境时则视为处于微光光照环境中。该生物无法在黑暗环境中分辨颜色，只能看见以灰度显现的形状。许多生活在地底的生物都具有黑暗视觉。'
    },
    {
        value:'TremorSense',
        label:' 颤动感知',
        description:'具有颤动感知的怪物可以对一定半径范围内的、与其自身接触同一地面或物质的震动源进行精确感知。颤动感知无法探知飞行生物和虚体生物。许多掘穴生物如掘地虫ankheg和土巨怪umber hulk 都具有颤动感知。'
    },
    {
        value:'TrueSight',
        label:'真实视觉',
        description:'具有真实视觉的怪物在一定半径范围内，可以看透魔法或非魔法产生的黑暗，可以看见隐形的生物与物品，可以自动侦查出视觉幻象并直接通过其豁免检定，还可以直接看穿变形生物或用魔法进行变形时的真实形态。此外，该怪物还可以看到同样范围内以太位面的情况。'
    }
]
export type CharacterSenses={
    type:'Normal'|'Blindsight'|'DarkVision'|'TremorSense'|'TrueSight',
    range?:string

}

export type Character={
    name?:string;
    name2?:string;
    playerName?:string;
    races?:string;
    classes?:CharacterClassType[];
    proficiencyBonus:number
    image?:	ImageSelectorType,
    ability?: {
        str: CharacterAbilityType,
        dex: CharacterAbilityType,
        con: CharacterAbilityType,
        int: CharacterAbilityType,
        wis: CharacterAbilityType,
        cha: CharacterAbilityType
    },
    senses?: CharacterSenses[],
    skills?:{
        athletics ?: CharacterSkillType, //运动, str

        acrobatics ?: CharacterSkillType, //特技, dex
        sleightOfHand ?: CharacterSkillType, //巧手,
        stealth ?: CharacterSkillType, //隐匿,

        arcana ?: CharacterSkillType, //奥秘,int
        history ?: CharacterSkillType, //历史,
        investigation ?: CharacterSkillType, //调查,
        nature ?: CharacterSkillType, //自然,
        religion ?: CharacterSkillType, //宗教,

        animalHandling ?: CharacterSkillType, //驯兽,was
        insight ?: CharacterSkillType, //洞悉,
        medicine ?: CharacterSkillType, //医药,
        perception ?: CharacterSkillType, //察觉,
        survival ?: CharacterSkillType, //生存,

        deception ?: CharacterSkillType, //欺瞒,cha
        intimidation ?: CharacterSkillType, //威吓,
        performance ?: CharacterSkillType, //表演,
        persuasion ?: CharacterSkillType, //游说
    }
    monk?:{
        martialArtsDie?:'d6'|'d8'|'d10'|'d12',
        qi?:number,
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
        keyAbility?:AbilityType[]
        hit?:number
        dc?:number
    }

    speed?:string
    initiative?:number

    proficiencies?:{
        languages?:string[]
        armor?:string[]
        weapons?:string[]
        tools?:string[]
        others?:string[]
    },
    equipments?:{
        coins?:{
            copper?:number
            silver?:number
            electrum?:number
            gold?:number
            platinum?:number
        },
        items?:string
    },
    others?:string


}