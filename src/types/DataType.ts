import type {BaseOptionType} from "@rc-component/select/lib/Select";
import type {SingleValueType} from "antd/es/color-picker/interface";


export type SelectOptionType<DataType>=BaseOptionType&{
    data:DataType
}
export type RarityType = 'None'|'Common'|'Uncommon'|'Rare'|'Very Rare'|'Legendary'|'Artifact'|'Varies'|'Unknown(Magic)'|'Other'|'Unknown'
export type RarityTypeOptionsType={value:RarityType,label:string}
export const RarityTypeOptions:RarityTypeOptionsType[]=[
    {label: '无', value: 'None'},
    {label: '常见', value: 'Common'},
    {label: '不常见', value: 'Uncommon'},
    {label: '珍惜', value: 'Rare'},
    {label: '极珍惜', value: 'Very Rare'},
    {label: '传说', value: 'Legendary'},
    {label: '神器', value: 'Artifact'},
    {label: '不明', value: 'Unknown'},
    {label: '其他', value: 'Other'},
    {label: '未知(魔法)', value: 'Unknown(Magic)'},
]

export type SpellType={
    id:number,
    name:string,
    cnName:string,
    level:number,
    schoolID:string,
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
    fromBookID?:string
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

export type AjaxResultType<E>={
    code:number,
    success:boolean,
    message?:string,
    data:E
}


export type PageSetting = {
    pageSize: {
        width: number,
        height: number,
        padding:{
            left:number,
            right:number,
            top:number,
            bottom:number
        }

    },
    backgroundColor: SingleValueType,
    titleTextSize: number
    baseTextSize:number
}
export const SizeScaling=[125,125]