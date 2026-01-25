import {Checkbox, Col,  Input,  Popover, Row, Space} from "antd";
import { useMemo, useState} from "react";
import {SpeedTypeLang, type SpeedType, type SpeedValue} from "../../pages/Monster/Types.ts";
import {PlusCircleOutlined} from "@ant-design/icons";

type SkillSelectorProps = {
    value?: SpeedValue[]
    onChange?: (value: SpeedValue[]) => void
}

export default function SpeedSelector(props: SkillSelectorProps){
    const [checkSkills, setCheckSkills] = useState<SpeedType[]>(props.value?.map((item) => item.type)||[])

    const skillOptions = useMemo(() => {
        return Object.keys(SpeedTypeLang).map((key) => {
            return {value: key as SpeedType, label: SpeedTypeLang[key as SpeedType]}
        })
    }, []);
    const [value, setValue] = useState(props.value||[])

    const onChange = (value: SpeedValue[]) => {
        if (props.onChange){
            props.onChange(value)
        }else {
            setValue(value)
        }
    }
    const onCheckSkillChange = (checkedSkills: SpeedType[]) => {
        const trueValue = (props.value||value).filter((item) => {
            return checkedSkills.includes(item.type)
        })
        checkedSkills.filter((item) => {
            return !trueValue.some((item2) => {
                return item2.type === item
            })
        }).forEach((item) => {
            trueValue.push({type: item, value: '30 尺'})
        })
        setCheckSkills(checkedSkills)
        onChange(trueValue)

    }

    const getValues = () => {
        if (props.onChange){
            return props.value || []
        }else {
            return value
        }
    }

    const getValue = (field: SpeedType) => {
        return getValues().find((item) => item.type === field)?.value
    }

    return (
        <Row gutter={[8,8]} align={'middle'}>
           { checkSkills.map((field) => (
               <Col span={8} key={"speed-"+ field} >
                    <Space>
                        <div style={{whiteSpace: 'nowrap'}}>{SpeedTypeLang[field]}：</div>
                        <Input value={getValue(field)}
                               onChange={(e) => {
                                   const trueValue = getValues().filter((item) => item.type !== field)
                                   trueValue.push({type: field, value: e.target.value})
                                   onChange(trueValue)
                               }}/>
                    </Space>

                </Col>
            ))}
            <Col>
                <Popover
                    placement={"bottomLeft"}
                    trigger={"click"}
                    content={<div style={{width: 300}}>
                        <Checkbox.Group<SpeedType>
                            value={checkSkills}
                            onChange={onCheckSkillChange}
                            options={skillOptions}
                        />
                    </div>}
                    title={"速度选择"}>
                    <PlusCircleOutlined/>
                </Popover>
            </Col>
        </Row>
    )
}