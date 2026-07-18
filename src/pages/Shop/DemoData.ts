import type {ItemComponentRuleType, ItemRarity, Tag} from "./Types.ts";
import type {DefaultOptionType} from "@rc-component/select/lib/Select";
//="COMMON"|'UNCOMMON'|'RARE'|'EPIC'|'LEGENDARY'
export const ItemRarities:{label:string,value:ItemRarity}[]=[
    {
        value:"COMMON",
        label:"普通"
    },
    {
        value:"UNCOMMON",
        label:"非普通"
    },
    {
        value:"RARE",
        label:"珍惜"
    },
    {
        value:"EPIC",
        label:"极珍惜"
    },
    {
        value:"LEGENDARY",
        label:"传说"
    },
]

export const tags:Tag[]=[
    {
        label: "弹药",
        value: "Ammo",
        cnName: "弹药",
        name: "Ammo"
    },
    {
        label: "护甲",
        value: "Armor",
        cnName: "护甲",
        name: "Armor"
    },
    {
        label: "箭",
        value: "Arrow",
        cnName: "箭",
        name: "Arrow"
    },
    {
        label: "战斧",
        value: "BattleAxe",
        cnName: "战斧",
        name: "Battle Axe"
    },
    {
        label: "吹箭筒",
        value: "Blowgun",
        cnName: "吹箭筒",
        name: "Blowgun"
    },
    {
        label: "胸甲",
        value: "Breastplate",
        cnName: "胸甲",
        name: "Breastplate"
    },
    {
        label: "链甲",
        value: "ChainMail",
        cnName: "链甲",
        name: "Chain Mail"
    },
    {
        label: "链甲衫",
        value: "ChainShirt",
        cnName: "链甲衫",
        name: "Chain Shirt"
    },
    {
        label: "短棒",
        value: "Club",
        cnName: "短棒",
        name: "Club"
    },
    {
        label: "轻弩",
        value: "CrossbowLight",
        cnName: "轻弩",
        name: "Crossbow Light"
    },
    {
        label: "匕首",
        value: "Dagger",
        cnName: "匕首",
        name: "Dagger"
    },
    {
        label: "飞镖",
        value: "Dart",
        cnName: "飞镖",
        name: "Dart"
    },
    {
        label: "链枷",
        value: "Flail",
        cnName: "链枷",
        name: "Flail"
    },
    {
        label: "长柄刀",
        value: "Glaive",
        cnName: "长柄刀",
        name: "Glaive"
    },
    {
        label: "巨斧",
        value: "GreatAxe",
        cnName: "巨斧",
        name: "Great Axe"
    },
    {
        label: "巨棒",
        value: "GreatClub",
        cnName: "巨棒",
        name: "Great Club"
    },
    {
        label: "巨剑",
        value: "GreatSword",
        cnName: "巨剑",
        name: "Great Sword"
    },
    {
        label: "戟",
        value: "Halberd",
        cnName: "戟",
        name: "Halberd"
    },
    {
        label: "半身板甲",
        value: "HalfPlate",
        cnName: "半身板甲",
        name: "Half Plate"
    },
    {
        label: "手斧",
        value: "HandAxe",
        cnName: "手斧",
        name: "Hand Axe"
    },
    {
        label: "手弩",
        value: "HandCrossbow",
        cnName: "手弩",
        name: "Hand Crossbow"
    },
    {
        label: "重甲",
        value: "HeavyArmor",
        cnName: "重甲",
        name: "HeavyArmor"
    },
    {
        label: "重弩",
        value: "HeavyCrossbow",
        cnName: "重弩",
        name: "Heavy Crossbow"
    },
    {
        label: "兽皮甲",
        value: "Hide",
        cnName: "兽皮甲",
        name: "Hide"
    },
    {
        label: "标枪",
        value: "Javelin",
        cnName: "标枪",
        name: "Javelin"
    },
    {
        label: "骑枪",
        value: "Lance",
        cnName: "骑枪",
        name: "Lance"
    },
    {
        label: "皮甲",
        value: "Leather",
        cnName: "皮甲",
        name: "Leather"
    },
    {
        label: "轻甲",
        value: "LightArmor",
        cnName: "轻甲",
        name: "Light Armor"
    },
    {
        label: "轻锤",
        value: "LightHammer",
        cnName: "轻锤",
        name: "Light Hammer"
    },
    {
        label: "长弓",
        value: "Longbow",
        cnName: "长弓",
        name: "Longbow"
    },
    {
        label: "长剑",
        value: "Longsword",
        cnName: "长剑",
        name: "Longsword"
    },
    {
        label: "硬头锤",
        value: "Mace",
        cnName: "硬头锤",
        name: "Mace"
    },
    {
        label: "军用",
        value: "Martial",
        cnName: "军用",
        name: "Martial"
    },
    {
        label: "军用近战武器",
        value: "MartialMeleeWeapons",
        cnName: "军用近战武器",
        name: "Martial Melee Weapons"
    },
    {
        label: "军用远程武器",
        value: "MartialRangedWeapons",
        cnName: "军用远程武器",
        name: "Martial Ranged Weapons"
    },
    {
        label: "巨锤",
        value: "Maul",
        cnName: "巨锤",
        name: "Maul"
    },
    {
        label: "中甲",
        value: "MediumArmor",
        cnName: "中甲",
        name: "MediumArmor"
    },
    {
        label: "近战",
        value: "Melee",
        cnName: "近战",
        name: "Melee"
    },
    {
        label: "金属",
        value: "Metal",
        cnName: "金属",
        name: "Metal"
    },
    {
        label: "金属护甲",
        value: "MetalArmor",
        cnName: "金属护甲",
        name: "Metal Armor"
    },
    {
        label: "钉头锤",
        value: "Morningstar",
        cnName: "钉头锤",
        name: "Morningstar"
    },
    {
        label: "捕网",
        value: "Net",
        cnName: "捕网",
        name: "Net"
    },
    {
        label: "布甲",
        value: "Padded",
        cnName: "布甲",
        name: "Padded"
    },
    {
        label: "长矛",
        value: "Pike",
        cnName: "长矛",
        name: "Pike"
    },
    {
        label: "板甲",
        value: "Plate",
        cnName: "板甲",
        name: "Plate"
    },
    {
        label: "药水",
        value: "Potion",
        cnName: "药水",
        name: "Potion"
    },
    {
        label: "长棍",
        value: "Quarterstaff",
        cnName: "长棍",
        name: "Quarterstaff"
    },
    {
        label: "远程",
        value: "Ranged",
        cnName: "远程",
        name: "Ranged"
    },
    {
        label: "刺剑",
        value: "Rapier",
        cnName: "刺剑",
        name: "Rapier"
    },
    {
        label: "戒指",
        value: "Ring",
        cnName: "戒指",
        name: "Ring"
    },
    {
        label: "环甲",
        value: "RingMail",
        cnName: "环甲",
        name: "Ring Mail"
    },
    {
        label: "权杖",
        value: "Rod",
        cnName: "权杖",
        name: "Rod"
    },
    {
        label: "鳞甲",
        value: "ScaleMail",
        cnName: "鳞甲",
        name: "Scale Mail"
    },
    {
        label: "弯刀",
        value: "Scimitar",
        cnName: "弯刀",
        name: "Scimitar"
    },
    {
        label: "卷轴",
        value: "Scroll",
        cnName: "卷轴",
        name: "Scroll"
    },
    {
        label: "盾牌",
        value: "Shield",
        cnName: "盾牌",
        name: "Shield"
    },
    {
        label: "短弓",
        value: "Shortbow",
        cnName: "短弓",
        name: "Shortbow"
    },
    {
        label: "短剑",
        value: "Shortsword",
        cnName: "短剑",
        name: "Shortsword"
    },
    {
        label: "镰刀",
        value: "Sickle",
        cnName: "镰刀",
        name: "Sickle"
    },
    {
        label: "简易",
        value: "Simple",
        cnName: "简易",
        name: "Simple"
    },
    {
        label: "简易近战武器",
        value: "SimpleMeleeWeapons",
        cnName: "简易近战武器",
        name: "Simple Melee Weapons"
    },
    {
        label: "简易远程武器",
        value: "SimpleRangedWeapons",
        cnName: "简易远程武器",
        name: "Simple Ranged Weapons"
    },
    {
        label: "投石索",
        value: "Sling",
        cnName: "投石索",
        name: "Sling"
    },
    {
        label: "矛",
        value: "Spear",
        cnName: "矛",
        name: "Spear"
    },
    {
        label: "板条甲",
        value: "Splint",
        cnName: "板条甲",
        name: "Splint"
    },
    {
        label: "法杖",
        value: "Staff",
        cnName: "法杖",
        name: "Staff"
    },
    {
        label: "镶钉皮甲",
        value: "StuddedLeather",
        cnName: "镶钉皮甲",
        name: "Studded Leather"
    },
    {
        label: "剑",
        value: "Sword",
        cnName: "剑",
        name: "Sword"
    },
    {
        label: "刺青",
        value: "Tattoo",
        cnName: "刺青",
        name: "Tattoo"
    },
    {
        label: "三叉戟",
        value: "Trident",
        cnName: "三叉戟",
        name: "Trident"
    },
    {
        label: "魔杖",
        value: "Wand",
        cnName: "魔杖",
        name: "Wand"
    },
    {
        label: "战锤",
        value: "Warhammer",
        cnName: "战锤",
        name: "Warhammer"
    },
    {
        label: "战镐",
        value: "WarPick",
        cnName: "战镐",
        name: "War Pick"
    },
    {
        label: "武器",
        value: "Weapon",
        cnName: "武器",
        name: "Weapon"
    },
    {
        label: "鞭",
        value: "Whip",
        cnName: "鞭",
        name: "Whip"
    },
    {
        label: "奇物",
        value: "Wondrous",
        cnName: "奇物",
        name: "Wondrous"
    }
]

export const weightUnit:DefaultOptionType[]=[
    {
        label:'磅',
        value:'lb'
    },
    {
        label:'盎司',
        value:'oz'
    },
]

export const priceUnit:DefaultOptionType[]=[

    {
        label:'铜币',
        value:'cp'
    },
    {
        label:'银币',
        value:'sp'
    },
    {
        label:'金银币',
        value:'ep'
    },
    {
        label:'金币',
        value:'gp'
    },
    {
        label:'铂金币',
        value:'pp'
    },
]

export const ItemComponentRuleTypeOptions:{label:string, value:ItemComponentRuleType}[]=[
    {label:'标签', value:'tag'},
    {label:'物品', value:'item'},
    {label:'组合', value:'group'}
]