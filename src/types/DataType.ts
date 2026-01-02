
export type SpellType={
    id:number,
    name:string,
    cnName:string,
    level:number,
    school:SpellSchoolType,
    needVerbal:boolean,
    needSomatic:boolean,
    needMaterial:boolean,
    material?:string,
    duration:string
    durationPS?:string
    range:string
    rangePS?:string
    castingTime: string,
    castingTimePS?: string
    isRituals?:boolean
    baseDescription:string,
    upgradeDescription:string,
    img?:string,
    fromBook?:BookType
}

export type SpellSchoolType={
    id:string,
    name:string
    description:string
    img:string
}

export type BookType={
    id:string,
    name:string,
    engName:string,
    source:string,
    groupName:string,
    published:string,
    author:string,
    cover:string,
}