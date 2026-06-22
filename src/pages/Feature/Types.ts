import React from "react";
import type {ImageSelectorType} from "../../compoment/ImageSelector/ImageSelector.tsx";
import type {RarityType} from "../../types/DataType.ts";

export type Feature={
    id?:React.Key
    name?:string
    cnName?:string
    description?:string
    fromBook?:string
    image?:ImageSelectorType
    type?:'Ability'|'Feats'|'Item'
    itemFeature?:{
        wondrousItem?:boolean
        rarity?:RarityType
        attunement?:boolean
        attunementDescription?:string
    }
}