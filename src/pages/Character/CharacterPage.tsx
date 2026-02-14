
import './CharacterPage.css'
import type {Character} from "./Types.ts";
import {Button, Col, Divider, Form, Input, InputNumber, Row, Space} from "antd";
import { PlusOutlined} from "@ant-design/icons";
import ClassInput from "../../compoment/ClassInput/ClassInput.tsx";
import AbilityInput from "../../compoment/AbilityInput/AbilityInput.tsx";
import {useEffect} from "react";
import {ProficiencyBonus} from "../../data/CharacterData.tsx";
import SkillInput from "../../compoment/SkillInput/SkillInput.tsx";


export default function CharacterPage(){
    const [form] = Form.useForm<Character>()

    const classes = Form.useWatch('classes',form);
    useEffect(()=>{
        if (classes){
            let sumLevel = classes.reduce((sum, item)=>{
                return sum + (item?.level||0)
            }, 0)
            if (sumLevel>ProficiencyBonus.length){
                sumLevel = ProficiencyBonus.length-1
            }
            console.log('sumLevel', sumLevel)
            form.setFieldValue('proficiencyBonus', ProficiencyBonus[sumLevel])

        }else {
            form.setFieldValue('proficiencyBonus', 0)
        }
    }, [classes, form])


    return(
        <div style={{width:400,display:'flex', flexDirection:'column'}}>
            <Button onClick={()=>{
                console.log(form.getFieldsValue())
            }}>输出</Button>
            <div style={{flex:1, overflow:'auto', padding:'8px'}}>
                <Form<Character> form={form} labelCol={{ span: 5 }} >
                    <Form.Item label="角色姓名" name={'name'} >
                        <Input/>
                    </Form.Item>
                    <Form.Item label="玩家名" name={'playerName'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="种族" name={'races'} >
                        <Input/>
                    </Form.Item>
                    <Form.Item label={"熟练加值"} name={'proficiencyBonus'} dependencies={['classes']}>
                        <InputNumber min={0} style={{width:'100%'}} />
                    </Form.Item>
                    <Form.List name={'classes'}>
                        {(fields, {add, remove})=>{
                            return <>
                                <Divider titlePlacement={"left"} >
                                    <Space>
                                        职业
                                        <Button icon={<PlusOutlined />} shape={'circle'} onClick={()=>add()} size={'small'}/>
                                    </Space>
                                </Divider>
                                {
                                    fields.map((field,index)=>{
                                        return <Form.Item {...field} key={'class'+field.key}  >
                                            <ClassInput remove={remove} index={index}/>
                                        </Form.Item>
                                    })
                                }
                            </>
                        }}
                    </Form.List>
                    <Divider titlePlacement={"left"}>属性</Divider>
                    <Space vertical={ true} style={{width:'100%'}}>
                        <Row wrap={ false}>
                            <Col span={5}>
                            </Col>
                            <Col span={19}>
                                <Row gutter={8}>
                                    <Col span={4}  style={{textAlign:'center'}}>
                                        豁免
                                    </Col>
                                    <Col span={12} style={{textAlign:'center'}}>属性值
                                    </Col>
                                    <Col span={8}  style={{textAlign:'center'}}>调整值
                                    </Col>
                                </Row>
                            </Col>

                        </Row>
                        <Form.Item name={['ability','pow']} label={"力量"} >
                            <AbilityInput />
                        </Form.Item>
                        <Form.Item name={['ability','dex']} label={"敏捷"} >
                            <AbilityInput/>
                        </Form.Item>
                        <Form.Item name={['ability','con']} label={"体质"} >
                            <AbilityInput />
                        </Form.Item>
                        <Form.Item name={['ability','int']} label={"智力"} >
                            <AbilityInput/>
                        </Form.Item>
                        <Form.Item name={['ability','wis']} label={"感知"}  >
                            <AbilityInput />
                        </Form.Item>
                        <Form.Item name={['ability','cha']} label={"魅力"} >
                            <AbilityInput/>
                        </Form.Item>
                    </Space>

                    <Divider titlePlacement={"left"}>技能</Divider>
                    <Form.Item name={['skills','athletics']} label={"运动"}>
                        <SkillInput/>
                    </Form.Item>

                </Form>
            </div>

        </div>
    )
}