import {Checkbox, Col, Divider, InputNumber, Popover, Row, Space} from "antd";
import {useMemo, useState} from "react";
import {SkillLang, type SkillType, type SkillValue} from "../../pages/Monster/Types.ts";
import {PlusCircleOutlined} from "@ant-design/icons";

type SkillSelectorProps = {
    value?: SkillValue[]
    onChange?: (value: SkillValue[]) => void
}

export default function SkillSelector(props: SkillSelectorProps){
    const [checkSkills, setCheckSkills] = useState<SkillType[]>(props.value?.map((item) => item.type)||[])

    const skillOptions = useMemo(() => {
        return Object.keys(SkillLang).map((key) => {
            return {value: key as SkillType, label: SkillLang[key as SkillType]}
        })
    }, []);
    const [value, setValue] = useState(props.value||[])


    const onChange = (value: SkillValue[]) => {
        if (props.onChange){
            props.onChange(value)
        }else {
            setValue(value)
        }
    }
    const onCheckSkillChange = (checkedSkills: SkillType[]) => {
        const trueValue = (props.value||value).filter((item) => {
            return checkedSkills.includes(item.type)
        })
        checkedSkills.filter((item) => {
            return !trueValue.some((item2) => {
                return item2.type === item
            })
        }).forEach((item) => {
            trueValue.push({type: item, value: 0})
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

    const getValue = (field: SkillType) => {
        return getValues().find((item) => item.type === field)?.value
    }

    return (
        <div>
            <Divider size={"small"} titlePlacement={"left"} >
                <Space>
                    <div>技能</div>
                    <Popover
                        placement={"bottomLeft"}
                        trigger={"click"}
                        content={<div style={{width: 300}}>
                            <Checkbox.Group<SkillType>
                                value={checkSkills}
                                onChange={onCheckSkillChange}
                                options={skillOptions}
                            />
                        </div>}
                        title={"技能选择"}>
                        <PlusCircleOutlined/>
                    </Popover>
                </Space>
            </Divider>
            {
                <Row gutter={8}>
                    {
                        checkSkills.map((field) => (
                            <Col span={8} key={"skills-"+ field} >
                                {SkillLang[field]}：
                                <InputNumber precision={0} value={getValue(field)}
                                             onChange={(value) => {
                                                 const trueValue = getValues().filter((item) => item.type !== field)
                                                 trueValue.push({type: field, value: value||0})
                                                 onChange(trueValue)
                                             }}
                                />
                            </Col>
                        ))
                    }
                </Row>
            }
        </div>
    )
}