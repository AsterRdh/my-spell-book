import React from "react";

export type ItemComponentRuleType='tag'|'item'|'group'
export type ItemComponentRuleCondition='and'|'or'
export type ItemComponentRule={
    condition?:ItemComponentRuleCondition
    subRule?:ItemComponentRule[]
    tag?:string
    item?:string
    type?:ItemComponentRuleType
}

export type Tag={
    label:string
    value:string
    cnName?:string,
    name:string
}

export type UnitValue={
    value?:number|null,
    denominator?:number|null,
    unit?:string|null
}
export type ItemRarity="COMMON"|'UNCOMMON'|'RARE'|'EPIC'|'LEGENDARY'
export type UnitFormula={
    value?:string,
    unit?:string|null
}
export type Item={
    id?:React.Key;
    name?:string;
    cnName?:string;
    image?:string;
    rarity?:ItemRarity;
    wight?: UnitValue[],
    price?: UnitValue[],
    description?:string
    isMagicItem?:boolean,
    needAttunement?:boolean,
    attunementDescription?:string
    isComponent?:boolean
    component?:{
        weight?:{
            ifFormula?:boolean
            formula?:UnitFormula[]
        }
        price?:{
            ifFormula?:boolean
            formula?:UnitFormula[]
        }
        rule?:ItemComponentRule[]
    }
    type?:string
    tags?:string[]
    formBook?:string
}


