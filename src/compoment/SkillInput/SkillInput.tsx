import {Checkbox, Col, Row} from "antd";
import {useState} from "react";

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

export default function SkillInput(props:SkillInput){
    const {value,onChange} = props

    const [classData, setClassData] = useState<CharacterSkill>()

    const onChangeInner = (value?:CharacterSkill) => {

        if (onChange){
            onChange(value)
        }else {
            setClassData(value)
        }
    }

    return <Row gutter={8} align={'middle'}>
        <Col span={4} style={{textAlign:'center'}}>
            <Checkbox />
        </Col>
    </Row>

}