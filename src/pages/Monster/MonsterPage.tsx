import React, { useState} from "react";
import {Button, Col, Divider, Form, Input, InputNumber, Row, Select, Space,} from "antd";
import BasePage from "../BasePage.tsx";
import MonsterCard from "./MonsterCard.tsx";
import {useForm} from "antd/es/form/Form";
import {type BookType, type PageSetting, type SelectOptionType, SizeScaling} from "../../types/DataType.ts";
import { MinusCircleOutlined1} from '@ant-design/icons';
import {
    type Monster,
    type MonsterSize,
    MonsterSizeLang,
    type MonsterType,
    MonsterTypeLang,

} from "./Types.ts";
import {DefaultData} from "./DefaultData.ts";
import './MonsterPage.css'
import AlignmentSelector from "../../compoment/AlignmentSelector/AlignmentSelector.tsx";
import SkillSelector from "../../compoment/SkillSelector/SkillSelector.tsx";
import SpeedSelector from "../../compoment/SpeedSelector/SpeedSelector.tsx";
import SavingThrowSelector from "../../compoment/SavingThrowSelector/SavingThrowSelector.tsx";

type MonsterPageSetting=PageSetting

export const MonsterPage=()=>{

    const [form] = useForm<Monster>()
    const monsterValues = Form.useWatch([], form);
    const [books, 1etBooks] = useState<{[key:string]:BookType}>({})
    const [bookOptions, setBookOptions] = useState<SelectOptionType<BookType>[]>([])
    const [pageSize, setPageSize] = useState<[number, number]>([10,12.8])
    const [settingForm] = useForm<MonsterPageSetting>()


    return (
       <>
           <BasePage
               preViewRender={(ref) => {
                   return <MonsterCard ref={ref}
                                       dataSource={monsterValues}
                                       size={[SizeScaling[0]*pageSize[0], SizeScaling[1]*pageSize[1]]}
                                       dataSet={{
                                           books: books
                                       }}
                   />;
               }}
               exportNameGetter={() => {
                   if (monsterValues.name || monsterValues.cnName){
                       let name = ''
                       if (monsterValues.cnName) {
                           name = monsterValues.cnName ;
                       }
                       if (monsterValues.name) {
                           if ( name) name += ' '
                           name += monsterValues.name
                       }
                       return name;
                   }else {
                       return "Monster";
                   }

               }}
               preViewButtonRender={() => {
                   return [];
               }}
               settingRender={() => {
                   return <Form form={settingForm}>

                   </Form>;
               }}

               afterSettingModalOpenChange={(open) => {
                   if (!open) {
                       settingForm.resetFields();
                   }
               }}
               buttonRender={function (): React.ReactNode | React.ReactNode[] {
                  return []
               }}
               handleImport={function (inputData?: string): Promise<void> {
                   if (!inputData) return Promise.resolve();
                   return Promise.resolve();
               }}
               onSettingSave={function (): Promise<void> {
                   return Promise.resolve();
               }}
           >
               <Form form={form} initialValues={DefaultData}>
                   <Form.Item name="id" label={"ID"} hidden={ true}>
                       <Input/>
                   </Form.Item>
                   <Form.Item name="name" label={"名称"}>
                       <Input/>
                   </Form.Item>
                   <Form.Item name="cnName" label={"中文名称"}>
                       <Input/>
                   </Form.Item>
                   <Space>
                       <Form.Item name="size" label={"体型"}>
                           <Select options={Object.keys(MonsterSizeLang).map((key) => {
                               return {value: key, label: MonsterSizeLang[key as MonsterSize]}
                           })}/>
                       </Form.Item>
                       <Form.Item name="type" label={"类型"}>
                           <Select options={Object.keys(MonsterTypeLang).map((key) => {
                               return {value: key, label: MonsterTypeLang[key as MonsterType]}
                           })}/>
                       </Form.Item>
                       <Form.Item name="alignment" label={"阵营"}>
                           <AlignmentSelector/>
                       </Form.Item>
                   </Space>
                   <Row gutter={16}>
                       <Col>
                           <Form.Item name="level" label={"挑战等级"}>
                               <InputNumber precision={0}/>
                           </Form.Item>
                       </Col>
                       <Col flex={"auto"}>
                           <Form.Item name="xp" label={"经验"}>
                               <InputNumber precision={0} suffix="xp" style={{width: "100%"}}/>
                           </Form.Item>
                       </Col>
                   </Row>
                   <Form.Item name={'ac'} label={"护甲等级"}>
                       <InputNumber precision={0}/>
                   </Form.Item>
                   <Row gutter={16}>
                       <Col>
                           <Form.Item name={'hp'} label={"生命值"}>
                               <InputNumber precision={0}/>
                           </Form.Item>
                       </Col>
                       <Col flex={"auto"}>
                           <Form.Item name={'hpRoll'} label={"生命投掷"}>
                               <Input/>
                           </Form.Item>
                       </Col>
                   </Row>
                   <Form.Item name={'speed'} label={"移动速度"}>
                       <SpeedSelector/>
                   </Form.Item>
                   <Divider size={"small"} titlePlacement={"left"}>属性值</Divider>
                   <Row>
                       <Col span={8}>
                           <Form.Item name={['ability','pow']} label={"力量"}>
                               <InputNumber precision={0}/>
                           </Form.Item>
                       </Col>
                       <Col span={8}>
                           <Form.Item name={['ability','dex']} label={"敏捷"}>
                               <InputNumber precision={0}/>
                           </Form.Item>
                       </Col>
                       <Col span={8}>
                           <Form.Item name={['ability','con']} label={"体质"}>
                               <InputNumber precision={0}/>
                           </Form.Item>
                       </Col>
                       <Col span={8}>
                           <Form.Item name={['ability','int']} label={"智力"}>
                               <InputNumber precision={0}/>
                           </Form.Item>
                       </Col>
                        <Col span={8}>
                            <Form.Item name={['ability','wis']} label={"感知"}>
                                <InputNumber precision={0}/>
                            </Form.Item>
                        </Col>
                       <Col span={8}>
                           <Form.Item name={['ability','cha']} label={"魅力"}>
                               <InputNumber precision={0}/>
                           </Form.Item>
                       </Col>
                   </Row>

                   <Form.Item name={'savingThrow'} >
                       <SavingThrowSelector/>
                   </Form.Item>

                   <Form.Item name={'skills'} >
                       <SkillSelector/>
                   </Form.Item>
                   <Form.Item name={'passivePerception'} label={"被动感知"}>
                       <InputNumber/>
                   </Form.Item>
                   <Form.Item label={"感官"}>
                       <Form.List name={'senses'}>
                           {(fields, { add, remove }, { errors }) => (
                               <>
                                   {fields.map((field) => (
                                       <Row gutter={4} align={"middle"} key={'senses'+field.key} style={{marginBottom: 8}}>
                                           <Col span={8}>
                                               <Form.Item
                                                   {...field}
                                                   name={[field.name, 'type']}
                                                   noStyle
                                               >
                                                   <Input placeholder="感官类型"/>
                                               </Form.Item>
                                           </Col>
                                           <Col flex={"auto"}>
                                               <Form.Item
                                                   {...field}
                                                   name={[field.name, 'value']}
                                                   noStyle
                                               >
                                                   <Input placeholder="描述"/>
                                               </Form.Item>
                                           </Col>
                                           <Col>
                                               <MinusCircleOutlined
                                                   className="dynamic-delete-button"
                                                   onClick={() => remove(field.name)}
                                               />
                                           </Col>
                                       </Row>
                                   ))}
                                   <Form.Item>
                                       <Button
                                           type="dashed"
                                           onClick={() => add()}
                                           style={{ width: '60%' }}

                                       >
                                           添加其他感官
                                       </Button>
                                       <Form.ErrorList errors={errors} />
                                   </Form.Item>
                               </>
                           )}
                       </Form.List>
                   </Form.Item>
                   <Form.Item label={"语言"}>
                       <Form.List name={'languages'}>
                           {(fields, { add, remove }, { errors }) => (
                               <>
                                   {fields.map((field) => (
                                       <Row gutter={4} align={"middle"} key={'languages'+field.key} style={{marginBottom: 8}}>
                                           <Col flex={"auto"}>
                                               <Form.Item
                                                   {...field}
                                                   noStyle
                                               >
                                                   <Input placeholder="输入语言"  />
                                               </Form.Item>
                                           </Col>
                                           <Col>
                                               <MinusCircleOutlined
                                                   className="dynamic-delete-button"
                                                   onClick={() => remove(field.name)}
                                               />
                                           </Col>
                                       </Row>
                                   ))}
                                   <Form.Item>
                                       <Button
                                           type="dashed"
                                           onClick={() => add()}
                                           style={{ width: '60%' }}

                                       >
                                           添加其他语言
                                       </Button>
                                       <Form.ErrorList errors={errors} />
                                   </Form.Item>
                               </>
                           )}
                       </Form.List>
                   </Form.Item>

                   <Form.Item label={"特质"}>
                       <Form.List name={'feature'}>
                           {(fields, { add, remove }, { errors }) => (
                               <>
                                   {fields.map((field) => (
                                       <Row gutter={4} align={"stretch"} key={'feature'+field.key} style={{marginBottom: 8}}>
                                           <Col span={8}>
                                               <Form.Item
                                                   {...field}
                                                   name={[field.name, 'name']}
                                                   noStyle
                                               >
                                                   <Input placeholder="特质名称"/>
                                               </Form.Item>
                                           </Col>
                                           <Col flex={"auto"}>
                                               <Form.Item
                                                   {...field}
                                                   name={[field.name, 'description']}
                                                   noStyle
                                               >
                                                   <Input.TextArea placeholder="描述"/>
                                               </Form.Item>
                                           </Col>
                                           <Col>
                                               <MinusCircleOutlined
                                                   className="dynamic-delete-button"
                                                   onClick={() => remove(field.name)}
                                               />
                                           </Col>
                                       </Row>
                                   ))}
                                   <Form.Item>
                                       <Button
                                           type="dashed"
                                           onClick={() => add()}
                                           style={{ width: '60%' }}

                                       >
                                           添加特质
                                       </Button>
                                       <Form.ErrorList errors={errors} />
                                   </Form.Item>
                               </>
                           )}
                       </Form.List>
                   </Form.Item>
                   <Form.Item label={"动作"}>
                       <Form.List name={'action'}>
                           {(fields, { add, remove }, { errors }) => (
                               <>
                                   {fields.map((field) => (
                                       <Row gutter={4} align={"stretch"} key={'action'+field.key} style={{marginBottom: 8}}>
                                           <Col span={8}>
                                               <Form.Item
                                                   {...field}
                                                   name={[field.name, 'name']}
                                                   noStyle
                                               >
                                                   <Input placeholder="特质名称"/>
                                               </Form.Item>
                                           </Col>
                                           <Col flex={"auto"}>
                                               <Form.Item
                                                   {...field}
                                                   name={[field.name, 'description']}
                                                   noStyle
                                               >
                                                   <Input.TextArea placeholder="描述"/>
                                               </Form.Item>
                                           </Col>
                                           <Col>
                                               <MinusCircleOutlined
                                                   className="dynamic-delete-button"
                                                   onClick={() => remove(field.name)}
                                               />
                                           </Col>
                                       </Row>
                                   ))}
                                   <Form.Item>
                                       <Button
                                           type="dashed"
                                           onClick={() => add()}
                                           style={{ width: '60%' }}

                                       >
                                           添加特质
                                       </Button>
                                       <Form.ErrorList errors={errors} />
                                   </Form.Item>
                               </>
                           )}
                       </Form.List>
                   </Form.Item>
                   <Form.Item label={"来源"} name={'fromBook'}>
                       <Select options={bookOptions} showSearch={true}/>
                   </Form.Item>
               </Form>
           </BasePage>
       </>
    )
}