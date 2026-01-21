import type {BookType, SpellType} from "../../types/DataType.ts";

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

export const defaultData:SpellType={
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
