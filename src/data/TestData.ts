import type {BookType, SpellSchoolType, SpellType} from "../types/DataType.ts";

export const schools:{[key:string]:SpellSchoolType}={
    Abjuration:{
        id:"Abjuration",
        name:"防护",
        description:"抵御或逆转有害效应",
        img:""
    },
    Conjuration:{
        id:"Conjuration",
        name:" 咒法",
        description:"传送生物或物件",
        img:""
    },
    Divination:{
        id:"Divination",
        name:"预言",
        description:"揭露讯息",
        img:""
    },
    Enchantment:{
        id:"Enchantment",
        name:" 惑控",
        description:"影响心智",
        img:""
    },
    Evocation:{
        id:"Evocation",
        name:"塑能",
        description:"引导能量创造效应（通常是破坏性的）",
        img:""
    },
    Illusion:{
        id:"Illusion",
        name:" 幻术",
        description:"欺骗感官与心灵",
        img:""
    },
    Necromancy:{
        id:"Necromancy",
        name:" 死灵",
        description:"操纵生与死",
        img:""
    },
    Transmutation:{
        id:"Transmutation",
        name:" 变化",
        description:"转变生物或物件",
        img:""
    }
}

export const TestData:SpellType={
    id:1,
    name:"Chromatic Orb",
    cnName:"繁彩球",
    level:1,
    school:schools.Evocation,
    needVerbal:true,
    needSomatic:true,
    needMaterial:true,
    material:"一枚至少价值50gp的钻石",
    duration:"立即",
    range:"90尺",
    castingTime: "1 动作",
    baseDescription:"你向施法距离内某个你能看见的生物掷出一颗直径 4 寸的能量球，并从<u>强酸</u>、<u>寒冷</u>、<u>火焰</u>、<u>闪电</u>、<u>毒素</u>、<u>雷鸣</u>中选择一种类型以对该生物发动一次远程法术攻击。攻击命中时，该生物将受到 <u>3d8 点</u> 你所选类型的伤害。",
    upgradeDescription:"使用二环或更高法术位施展该法术时，你使用的法术位每比一环高一环，法术的伤害就增加 <u>1d8</u>。",
    img:"",
    fromBook: {
        id: "PHB",
        name: "玩家手册",
        engName: "Player's Handbook",
        source: "PHB",
        groupName: "core",
        published: '2014-08-19',
        author: "法师角色扮演游戏团队",
        cover: "8bb4728419064448844cc026e416b1e3"
    }
}


export const schoolsOptions:SpellSchoolType[]=[
    schools.Abjuration,
    schools.Conjuration,
    schools.Divination,
    schools.Enchantment,
    schools.Evocation,
    schools.Illusion,
    schools.Necromancy,
    schools.Transmutation
]


export const defaultBook:BookType={
    id: "PHB",
    name: "玩家手册",
    engName: "Player's Handbook",
    source: "PHB",
    groupName: "core",
    published: '2014-08-19',
    author: "法师角色扮演游戏团队",
    cover: "8bb4728419064448844cc026e416b1e3"
}
