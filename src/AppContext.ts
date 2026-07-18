import React from "react";
import type {NotificationInstance} from "antd/es/notification/interface";
import type {BookType, PageSetting, SelectOptionType, SpellSchoolType} from "./types/DataType.ts";
type AppContextType = {
    notification?:NotificationInstance,
    loading: boolean,
    setLoading: (loading:boolean)=>void
    dndBook:{
        books:Record<string, BookType>
        bookOptions:SelectOptionType<BookType>[]
    },
    dndSpellSchool:{
        schools:Record<string, SpellSchoolType>
        schoolOptions:SelectOptionType<SpellSchoolType>[]
    },
    setting:PageSetting
    setSetting: (newSetting:PageSetting)=>void
};
export const defPageSetting:PageSetting = {
    pageSize:{height: 12.8, width: 10,
        padding:{
            top:1.68,
            right:0.94,
            bottom:1.68,
            left:2,
        }
    },
    backgroundColor:'#fff',
    titleTextSize: 400,
    baseTextSize:42
}
export const AppContext = React.createContext<AppContextType>({
    notification: undefined,
    loading: false,
    setLoading: ()=>{},
    dndBook:{
        books:{},
        bookOptions:[]
    },
    dndSpellSchool:{
        schools:{},
        schoolOptions:[]
    },
    setting: defPageSetting,
    setSetting: ()=>{}
});