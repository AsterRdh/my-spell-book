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
};
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
    setting: {
        pageSize:{height: 12.8, width: 10},
        backgroundColor:'#fff'
    },
});