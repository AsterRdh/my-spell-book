import type {SpellSchoolType} from "../types/DataType.ts";

import {useEffect, useMemo, useState} from "react";
import {Select} from "antd";
import {schoolsOptions} from "../data/TestData.ts";



type  SchoolSelectProps={
    value?:SpellSchoolType
    onChange?: (value?:SpellSchoolType)=>void
}


export default function SchoolSelect(props: SchoolSelectProps){
    const [innerValue, setInnerValue] = useState<string|undefined>(props.value?.id)
     useEffect(()=>{
         // eslint-disable-next-line react-hooks/set-state-in-effect
        setInnerValue(props.value?.id)
    },[props.value])

    const options = useMemo(() => {
         return schoolsOptions.map(item => {
            return {
                value: item.id,
                label: item.name
            };
        });
    }, []);
    
     return (
        <Select value={innerValue} 
                onChange={(value)=>{
                    if ( props.onChange){
                        const find = schoolsOptions.find(item=>item.id===value);
                        props.onChange(find)
                    }else {
                        setInnerValue(value)
                    }
                }}
                options={options}
        />
           
        
    )


}