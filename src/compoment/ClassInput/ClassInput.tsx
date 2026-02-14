import {Button, Col, Input, InputNumber, Row, Select} from "antd";
import {type CharacterClass, CharacterOptions} from "../../hooks/useCharacterClass.ts";
import { useMemo,  useState} from "react";
import {MinusOutlined} from "@ant-design/icons";

type ClassInputProps={
    index:number
    value?:CharacterClassType
    onChange?:(value?:CharacterClassType)=>void
    remove: (index: (number | number[])) => void
}
export type CharacterClassType={
    classID?:CharacterClass|null|string
    level?:number|null
    subClass?:string|null
}

export default function ClassInput(props:ClassInputProps){
    const {index,value,onChange,remove} = props

    const [classData, setClassData] = useState<CharacterClassType>()

    const onChangeInner = (value?:CharacterClassType) => {
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


    return (
        <div>
            <Row gutter={8} align={'middle'} style={{width:'100%'}} wrap={false}>
                <Col span={5} style={{textAlign:'right'}}>
                    {index==0?'主职业':('兼职'+index)}:
                </Col>
                <Col span={10}>
                    <Select<CharacterClass> options={CharacterOptions}
                                            onChange={(value) => {
                                                onChangeInner({...trueValue,classID:value})
                                            }}
                                            value={trueValue?.classID && trueValue?.classID as CharacterClass ||  undefined}
                    />
                </Col>
                <Col span={3} style={{textAlign:'right'}}>
                    等级:
                </Col>
                <Col span={5} >
                    <InputNumber style={{width:'100%'}}
                                 value={trueValue?.level}
                                 onChange={(value) => {
                                     onChangeInner({...trueValue,level:value || 1})
                                 }}
                                 min={1} max={20}
                    />
                </Col>
                <Col span={1}>
                    {index==0?'': <Button type={'text'} icon={<MinusOutlined />} onClick={()=>remove(index)}/>}
                </Col>
            </Row>
            <Row gutter={8} align={'middle'} style={{marginTop:'0.5rem',width:'100%'}}>
                <Col span={5} style={{textAlign:'right'}}>
                    子职业:
                </Col>
                <Col span={18}>
                    <Input value={trueValue?.subClass || undefined} onChange={(e) => {
                        onChangeInner({...trueValue,subClass:e.target.value})
                    }}/>
                </Col>
                <Col span={1}>

                </Col>
            </Row>
        </div>
    )
}