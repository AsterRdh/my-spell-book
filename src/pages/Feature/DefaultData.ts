import type {Feature} from "./Types.ts";
import {defaultImageSettings} from "../../compoment/ImageSelector/DefaultData.ts";

export const DefaultData:Feature={
    name:'Arcane Recovery',
    cnName:'奥术回想',
    type:'Ability',
    description:`你学会了通过研读法术书来恢复魔法能量的办法。你可以每日使用一次奥术回想，以在你完成一次短休后恢复若干已消耗的法术位，所恢复的法术位环阶总和不得大于你法师等级的一半（向上取整），且任何一枚法术位的环阶都必须小于6环。

例如，作为一名4级法师时，你可恢复环阶总数最多为2的法术位。你可以选择恢复一枚2环法术位或两枚1环法术位。`,
    fromBook:'PHB',
    image:defaultImageSettings
}