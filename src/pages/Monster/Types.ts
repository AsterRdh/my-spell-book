import type {Alignment} from "../../compoment/AlignmentSelector/AlignmentSelector.tsx";
import type {UploadFile} from "antd";

export type MonsterType='Aberration'|'Beast'|'Celestial'|'Construct'|'Dragon'|'Elemental'|'Fey'|'Fiend'|'Giant'|'Humanoid'|'Monstrosity'|'Ooze'|'Plant'|'Undead';
export type MonsterSize = 'Tiny'|'Small'|'Medium'|'Large'|'Huge'|'Gargantuan'|'Varies';
export type SpeedType = 'Burrow'|'Climb'|'Fly'|'Hover'|'Swim'|'Walk'|'Default';

export type SpeedValue = {
    type: SpeedType,
    value: string
}
export type SensesValue = {
    type: string,
    value: string
}

export type SkillType = 'Athletics'|'Acrobatics'|'SleightOfHand'|'Stealth'|'Arcana'|'History'|'Investigation'|'Nature'|'Religion'|'AnimalHandling'|'Insight'|'Medicine'|'Perception'|'Survival'|'Deception'|'Intimidation'|'Performance'|'Persuasion';
export type AbilityType = 'pow'|'dex'|'con'|'int'|'wis'|'cha'
export type SkillValue = {
    type: SkillType,
    value: number
}
export type MonsterSavingThrow = {
    type: AbilityType,
    value: number
}
export type Monster={
    id?:number
    name?:string
    cnName?:string
    type?:MonsterType
    size?:MonsterSize
    level?:number
    xp?:number
    alignment?:Alignment
    ac?: number
    hp?: number
    hpRoll?: string
    speed?: SpeedValue[]
    ability?: {
        pow: number,
        dex: number,
        con: number,
        int: number,
        wis: number,
        cha: number
    }
    savingThrow?: MonsterSavingThrow[]
    skills?:SkillValue[]
    senses?:SensesValue[]
    passivePerception?:number,
    languages?:string[]
    feature?:{name:string,nameSub?:string,description:string}[]
    action?:{name:string,nameSub?:string,description:string}[]
    imageURL?:string
    image?:	UploadFile[]
    imageForm?:	'url'|'local'
    imagePosition?:{
        x?:number,
        y?:number
    },
    imageSize?:{
        width?:number,
        height?:number
    }
    imageFit?: 'cover'|'contain'|'fill'|'none'|'scale-down'
    imageRotation?:number
    otherDescription?:string
    fromBook?:string
}

export const AttributeLang:{[key in AbilityType]:string} = {
    pow: '力量',
    dex: '敏捷',
    con: '体质',
    int: '智力',
    wis: '感知',
    cha: '魅力'
}
export const SkillLang:{[key in SkillType]:string} = {
    Athletics : '运动',
    Acrobatics : '特技',
    SleightOfHand : '巧手',
    Stealth : '隐匿',
    Arcana : '奥秘',
    History : '历史',
    Investigation : '调查',
    Nature : '自然',
    Religion : '宗教',
    AnimalHandling : '驯兽',
    Insight : '洞悉',
    Medicine : '医药',
    Perception : '察觉',
    Survival : '生存',
    Deception : '欺瞒',
    Intimidation : '威吓',
    Performance : '表演',
    Persuasion : '游说'
}
export const MonsterSizeLang:{[key in MonsterSize]:string} = {
    Tiny: '微型',
    Small: '小型',
    Medium: '中型',
    Large: '大型',
    Huge: '巨型',
    Gargantuan: '超巨型',
    Varies: '不定'
}
export const SpeedTypeLang:{[key in SpeedType]:string}={
    Burrow: '掘穴',
    Climb: '攀爬',
    Fly: '飞行',
    Hover: '悬浮',
    Swim: '游泳',
    Walk: '步行',
    Default: '默认'
}
export const MonsterTypeLang:{[key in MonsterType]:string} = {
    Aberration: '异怪',
    Beast: '野兽',
    Celestial: '天族',
    Construct: '构装',
    Dragon: '龙',
    Elemental: '元素',
    Fey: '妖精',
    Fiend: '邪魔',
    Giant: '巨人',
    Humanoid: '类人',
    Monstrosity: '怪兽',
    Ooze: '泥怪',
    Plant: '植物',
    Undead: '亡灵'
}