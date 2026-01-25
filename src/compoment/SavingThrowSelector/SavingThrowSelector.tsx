import {Checkbox, Col, Divider, InputNumber, Popover, Row, Space} from "antd";
import {useMemo, useState} from "react";
import {
    AttributeLang,
    type AbilityType,
    type MonsterSavingThrow
} from "../../pages/Monster/Types.ts";
import {PlusCircleOutlined} from "@ant-design/icons";

type SkillSelectorProps = {
    value?: MonsterSavingThrow[]
    onChange?: (value: MonsterSavingThrow[]) => void
}

export default function SavingThrowSelector(props: SkillSelectorProps){
    const [checkSkills, setCheckSkills] = useState<AbilityType[]>(props.value?.map((item) => item.type)||[])

    const skillOptions = useMemo(() => {
        return Object.keys(AttributeLang).map((key) => {
            return {value: key as AbilityType, label: AttributeLang[key as AbilityType]}
        })
    }, []);
    const [value, setValue] = useState(props.value||[])


    const onChange = (value: MonsterSavingThrow[]) => {
        if (props.onChange){
            props.onChange(value)
        }else {
            setValue(value)
        }
    }
    const onCheckSkillChange = (checkedSkills: AbilityType[]) => {
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

    const getValue = (field: AbilityType) => {
        return getValues().find((item) => item.type === field)?.value
    }

    return (
        <div>
            <Divider size={"small"} titlePlacement={"left"} >
                <Space>
                    <div>豁免</div>
                    <Popover
                        placement={"bottomLeft"}
                        trigger={"click"}
                        content={<div style={{width: 300}}>
                            <Checkbox.Group<AbilityType>
                                value={checkSkills}
                                onChange={onCheckSkillChange}
                                options={skillOptions}
                            />
                        </div>}
                        title={"豁免选择"}>
                        <PlusCircleOutlined/>
                    </Popover>
                </Space>
            </Divider>
            {
                <Row gutter={8}>
                    {
                        checkSkills.map((field) => (
                            <Col span={8} key={"savingThrow-"+ field} >
                                {AttributeLang[field]}：
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