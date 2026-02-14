import {useMemo, useState} from "react";
import {Checkbox, Col, InputNumber, Row} from "antd";

export type CharacterAbilityType={
    score?:number
    modifier?:number
    saving?:boolean
}
type AbilityInput ={
    value?:CharacterAbilityType
    onChange?: (value?:CharacterAbilityType)=>void
}

export default function AbilityInput(props:AbilityInput){

    const {value,onChange} = props

    const [classData, setClassData] = useState<CharacterAbilityType>()

    const onChangeInner = (value?:CharacterAbilityType) => {
        if (value?.score!==undefined){
            value.modifier = Math.floor((value.score-10)/2)
        }else if (value){
            value.modifier = undefined
        }
        if (onChange){
            onChange(value)
        }else {
            setClassData(value)
        }
    }

    const trueValue = useMemo(() => {
        if (onChange) {
            return value
        } else {
            return classData
        }
    }, [classData, onChange, value]);

    return <Row gutter={8} align={'middle'}>
        <Col span={4} style={{textAlign:'center'}}>
            <Checkbox checked={trueValue?.saving} onChange={(e) => {
                onChangeInner({...trueValue,saving:e.target.checked})
            }} />
        </Col>
        <Col span={12}>
            <InputNumber style={{width:'100%'}}
                         value={trueValue?.score}
                         onChange={(value) => {
                             onChangeInner({...trueValue,score:value || 0})
                         }}
                         min={0}
            />
        </Col>
        <Col span={8}  style={{textAlign:'center'}}>
            {trueValue?.modifier!=undefined && (trueValue.modifier<0 ?'-':'+')+Math.abs(trueValue.modifier) ||''}
        </Col>

    </Row>
}