import {Button, Col, InputNumber, Row, Tooltip} from "antd";
import {useMemo, useState} from "react";
import {FaCircleHalfStroke} from "react-icons/fa6";
import {FaCircle, FaRegCircle, FaRegDotCircle} from "react-icons/fa";

export type CharacterSkill={
    value: number
    otherValue: number
    proficiency?: false| 'JAT' |'proficiency'|'expertise'
}

type SkillInput={
    baseValue?: number
    proficiencyBonus?: number
    value?:CharacterSkill
    onChange?: (value?:CharacterSkill)=>void
}

export const computeSkillValue=(value?:CharacterSkill, baseValue?:number, proficiencyBonus?: number)=>{
    if (value){
        value.value = 0
        if (baseValue!==undefined){
            value.value = baseValue
        }
        if (proficiencyBonus!==undefined && value.proficiency){
            let addValue ;
            switch (value.proficiency) {
                case 'proficiency':
                    addValue = proficiencyBonus
                    break;
                case 'expertise':
                    addValue = proficiencyBonus*2
                    break;
                case 'JAT':
                    addValue = Math.floor(proficiencyBonus/2)
                    break;
                default:
                    addValue = 0
            }
            value.value += addValue
        }
        if (value.otherValue!==undefined){
            value.value += value.otherValue
        }
        return {...value} as CharacterSkill
    }
    return value
}
export const computeSkillValue2=(value?:CharacterSkill, baseValue?:number, proficiencyBonus?: number)=>{
    if (baseValue===undefined && proficiencyBonus===undefined) return value
    const value2 = value || {} as CharacterSkill
    return computeSkillValue(value2, baseValue, proficiencyBonus)
}

export default function SkillInput(props:SkillInput){
    const {value,onChange,baseValue,proficiencyBonus} = props

    const [classData, setClassData] = useState<CharacterSkill>()

    const onChangeInner = (value?:CharacterSkill) => {
        value = computeSkillValue(value, baseValue, proficiencyBonus)
        console.log('value', value)
        if (onChange){
            onChange(value)
        }else {
            setClassData(value)
        }
    }
    const trueValue = useMemo(() => {
        if (onChange) {
            return value || {} as CharacterSkill
        } else {
            return classData || {} as CharacterSkill
        }
    }, [classData, onChange, value]);

    const [proficiencyIcon ,proficiencyText] = useMemo(() => {
        switch (trueValue?.proficiency){
            case 'proficiency':
                return [<FaCircle />,'熟练']
            case 'expertise':
                return [<FaRegDotCircle />,'专精']
            case 'JAT':
                return [<FaCircleHalfStroke />,'1/2熟练']
            default:
                return [<FaRegCircle />,'不熟练']
        }
    }, [trueValue.proficiency]);

    const switchProficiency = ()=>{
        if (!trueValue || !trueValue.proficiency) {
            onChangeInner({proficiency: 'proficiency'} as CharacterSkill)
        }else {
            let newValue:false| 'JAT' |'proficiency'|'expertise';
            switch (trueValue.proficiency) {
                case 'proficiency':
                    newValue = 'expertise'
                    break;
                case 'expertise':
                    newValue = 'JAT'
                    break;
                case 'JAT':
                    newValue = false
                    break;
                default:
                    newValue = 'proficiency'
            }
            onChangeInner({...trueValue,proficiency:newValue})
        }

    }

    return <Row gutter={8} align={'middle'}>
        <Col span={4} style={{textAlign:'center'}}>
            <Tooltip title={proficiencyText}>
                <Button icon={proficiencyIcon} type={'text'} shape={'circle'} onClick={switchProficiency}/>
            </Tooltip>
        </Col>
        <Col span={8} style={{textAlign:'center'}}>
            <InputNumber style={{width:'100%'}} value={trueValue?.value} onChange={(value) => {
                onChangeInner({...trueValue,value:value || 0})
            }}/>
        </Col>
        <Col span={12} style={{textAlign:'center'}}>
            <InputNumber style={{width:'100%'}} value={trueValue?.otherValue} onChange={(value) => {
                onChangeInner({...trueValue,otherValue:value || 0})
            }}/>
        </Col>
    </Row>

}