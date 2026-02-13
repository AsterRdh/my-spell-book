import type {AjaxResultType, SelectOptionType, SpellSchoolType} from "../types/DataType.ts";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../AppContext.ts";

const useDNDSpellSchool=()=>{
    const {notification} = useContext(AppContext)
    const [schools, setSchools] = useState<{[key:string]:SpellSchoolType}>({})
    const [schoolOptions, setSchoolOptions] = useState<SelectOptionType<SpellSchoolType>[]>([])
    const loadSchool = () => {
        return fetch('/SpellBook/dnd/getSpellSchool')
            .then(res=>res.json())
            .then( (data:AjaxResultType<{[key:string]:SpellSchoolType}>)=>{
                if (data.success){
                    const schoolData = data.data
                    setSchools(schoolData)
                    const options:SelectOptionType<SpellSchoolType>[]=Object.values(schoolData).map(school=>{
                        const option:SelectOptionType<SpellSchoolType> = {
                            label:school.name,
                            value:school.id,
                            data:school
                        }
                        return option
                    });
                    setSchoolOptions(options)
                }
            })
    };

    useEffect(()=>{
        loadSchool().catch((e)=>{
            if (notification){
                notification.error({
                    title:"加载数据失败",
                    description:e.message
                })
            }else{
                console.error(e)
            }
        })
    },[])

    return {schools, schoolOptions}
}
export {useDNDSpellSchool}