import type {BookType, SpellSchoolType, SpellType} from "../types/DataType.ts";
import type {BaseOptionType} from "@rc-component/select/lib/Select";
export type SelectOptionType<DataType>=BaseOptionType&{
    data:DataType
}

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


export const schoolOptions:SelectOptionType<SpellSchoolType>[]=Object.values(schools).map(school=>{
    return{
        label:school.name,
        value:school.id,
        data:school
    }
});
export const books:{[key:string]:BookType}={
    PHB:{
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
export const bookOptions:SelectOptionType<BookType>[]=Object.values(books).map(book=>{
    return{
        label:book.name+"("+book.source+")",
        value:book.id,
        data:book
    }
});

export const TestData:SpellType={
    id:-9999,
    name:"Spell",
    cnName:"示例法术",
    level:1,
    schoolID:'Evocation',
    needVerbal:true,
    needSomatic:true,
    needMaterial:true,
    duration:"立即",
    range:"90尺",
    castingTime: "1 动作",
    baseDescription:"示例法术",
    upgradeDescription:"示例法术",
    img:"",
    fromBookID: "PHB"
}

//
// export const schoolsOptions:SpellSchoolType[]=[
//     schools.Abjuration,
//     schools.Conjuration,
//     schools.Divination,
//     schools.Enchantment,
//     schools.Evocation,
//     schools.Illusion,
//     schools.Necromancy,
//     schools.Transmutation
// ]


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
