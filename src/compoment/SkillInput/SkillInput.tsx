import {Button, Col, InputNumber, Row, Tooltip} from "antd";
import {useMemo, useState} from "react";
import {PiCircleBold, PiCircleFill, PiCircleHalfTiltFill} from "react-icons/pi";
import {IoIosRadioButtonOn} from "react-icons/io";

export type CharacterSkillType={
    value: number
    otherValue: number|string
    proficiency?: false| 'JAT' |'proficiency'|'expertise'
}

type SkillInput={
    baseValue?: number
    proficiencyBonus?: number
    value?:CharacterSkillType
    onChange?: (value?:CharacterSkillType)=>void
}

export const computeSkillValue=(value?:CharacterSkillType, baseValue?:number, proficiencyBonus?: number)=>{
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

        return {...value} as CharacterSkillType
    }
    return value
}
export const computeSkillValue2=(value?:CharacterSkillType, baseValue?:number, proficiencyBonus?: number)=>{
    if (baseValue===undefined && proficiencyBonus===undefined) return value
    const value2 = value || {} as CharacterSkillType
    return computeSkillValue(value2, baseValue, proficiencyBonus)
}

export default function SkillInput(props:SkillInput){
    const {value,onChange,baseValue,proficiencyBonus} = props

    const [classData, setClassData] = useState<CharacterSkillType>()

    const onChangeInner = (value?:CharacterSkillType) => {
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
            return value || {} as CharacterSkillType
        } else {
            return classData || {} as CharacterSkillType
        }
    }, [classData, onChange, value]);

    const [proficiencyIcon ,proficiencyText] = useMemo(() => {

        let skillProficiencyIcon = <PiCircleBold />
        let tooltipText = '不熟练'
        if (trueValue?.proficiency){
            switch ( trueValue.proficiency){
                case 'proficiency':skillProficiencyIcon = <IoIosRadioButtonOn /> ;tooltipText='熟练';break;
                case 'expertise': skillProficiencyIcon = <PiCircleFill />;tooltipText='专精';break;
                case 'JAT': skillProficiencyIcon = <PiCircleHalfTiltFill />;tooltipText='1/2熟练';break;
            }
        }

        return [skillProficiencyIcon,tooltipText]
    }, [trueValue.proficiency]);

    const switchProficiency = ()=>{
        if (!trueValue || !trueValue.proficiency) {
            onChangeInner({proficiency: 'proficiency'} as CharacterSkillType)
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