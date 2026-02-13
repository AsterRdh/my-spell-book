import React from "react";
import type {NotificationInstance} from "antd/es/notification/interface";
import type {BookType, SelectOptionType, SpellSchoolType} from "./types/DataType.ts";
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
    }
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
    }
});