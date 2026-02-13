import React, {useContext, useState} from "react";
import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Space,
} from "antd";
import BasePage from "../BasePage.tsx";
import MonsterCard from "./MonsterCard.tsx";
import {useForm} from "antd/es/form/Form";
import {type PageSetting, SizeScaling} from "../../types/DataType.ts";
import {MinusCircleOutlined} from '@ant-design/icons';
import {
    type AbilityType,
    AttributeLang,
    type Monster, type MonsterSavingThrow,
    type MonsterSize,
    MonsterSizeLang,
    type MonsterType,
    MonsterTypeLang, type SensesValue, SkillLang, type SkillType, type SkillValue,
    type SpeedType,
    SpeedTypeLang,
    type SpeedValue,
} from "./Types.ts";
import {DefaultData} from "./DefaultData.ts";
import './MonsterPage.css'
import AlignmentSelector, {
    type Alignment1,
    type Alignment2
} from "../../compoment/AlignmentSelector/AlignmentSelector.tsx";
import SkillSelector from "../../compoment/SkillSelector/SkillSelector.tsx";
import SpeedSelector from "../../compoment/SpeedSelector/SpeedSelector.tsx";
import SavingThrowSelector from "../../compoment/SavingThrowSelector/SavingThrowSelector.tsx";
import {AlignmentLang} from "../../utils/AlignmentUtils.ts";
import ImageSelector from "../../compoment/ImageSelector/ImageSelector.tsx";
import {AppContext} from "../../AppContext.ts";

type MonsterPageSetting=PageSetting

const getDataNoPS=(splitters:string[],data?:string)=>{
    if (! data) return undefined
    let number=-1
    splitters.find(splitter=>{
        number = data.indexOf(splitter);
        if (number>=0) return number
    })
    return data.substring(number + 1)
}

const getDataWithPS=(data?:string)=>{
    if (! data) return [undefined,undefined]
    const acRow = getDataNoPS(['：',':'],data);
    if (!acRow) return [undefined,undefined]
    let number = acRow.indexOf("（");
    if (number<0) number = acRow.indexOf("(");
    if (number<0) number = acRow.length;
    const ac = acRow.substring(0, number);
    const acPS = number<acRow.length && acRow.substring(number+1,acRow.length-1) || '';
    return [ac,acPS]
}

const MonsterPage=()=>{
    const {setLoading,dndBook} = useContext(AppContext)
    const [pageSize, setPageSize] = useState<[number, number]>([10,12.8])
    const {books,bookOptions} = dndBook;

    const [form] = useForm<Monster>()
    const monsterValues = Form.useWatch([], form);

    const [settingForm] = useForm<MonsterPageSetting>()

    const handleImport = (imputData?: string) => {
        setLoading( true)
        return new Promise((resolve,reject) => {
            if(!imputData) return resolve(true)
            try{
                //清除空行
                let rows = imputData.split('\n');
                rows = rows.filter(row => row && row.trim()).map(row => row.trim());
                if (rows.length == 0) return resolve(true);
                const data: Monster = {}
                const nameRow = rows[0];
                //分割名称，寻找第一个英文字母位置，切割未两个部分
                const nameParts = nameRow.split(/[a-zA-Z]/);
                const cnName = nameParts[0];
                const name = nameRow.substring(cnName.length)
                data.name = name
                data.cnName = cnName
                //微型野兽，无阵营
                const typeRow = rows[1];
                const sizeIndex = typeRow.indexOf("型")+1;
                //获取大小
                const sizeStr = typeRow.substring(0, sizeIndex);
                const size = Object.keys(MonsterSizeLang).find(key => MonsterSizeLang[key as MonsterSize] == sizeStr);
                if (size){data.size = size as MonsterSize;}

                // 类型
                const typeStr = typeRow.substring(sizeIndex, sizeIndex+2);
                const type = Object.keys(MonsterTypeLang).find(key => MonsterTypeLang[key as MonsterType] == typeStr);
                if (type){data.type = type as MonsterType;}

                //阵营
                const alignmentStr = typeRow.substring(sizeIndex+3);
                if (!alignmentStr || alignmentStr=='无阵营'){
                    data.alignment = undefined
                }else {
                    const alignmentStr1 = alignmentStr.substring(0,2);
                    const alignment1 = Object.keys(AlignmentLang).find(key => AlignmentLang[key as (Alignment2 | Alignment1)] == alignmentStr1);
                    const alignmentStr2 = alignmentStr.substring(2);
                    const alignment2 = Object.keys(AlignmentLang).find(key => AlignmentLang[key as (Alignment2 | Alignment1)] == alignmentStr2);
                    data.alignment=[alignment1 as Alignment1,alignment2 as Alignment2]
                }
                //护甲等级：16（天生护甲）
                const acRow = rows[2]
                const [ac] = getDataWithPS(acRow)
                if (ac) data.ac = parseInt(ac)

                //生命值：32（5d8+10）
                const hpRow = rows[3]
                const [hp,hpPS] = getDataWithPS(hpRow)
                if (hp) data.hp = parseInt(hp)
                if (hpPS) data.hpRoll = hpPS

                const speedRow = rows[4]
                const speedRow1 = getDataNoPS(['：',':'],speedRow);
                if (speedRow1){//在中文或英文逗号处切割
                    const speeds = speedRow1.split(/[,，]/).map((speed, index)=>{
                        if (index==0){
                            return {
                                type: 'Default',
                                value: speed
                            } as SpeedValue
                        }else {
                            //"攀爬30尺" 分割为[攀爬,30尺]
                            //寻找第一个数字
                            const number = speed.match(/[\d.]+/);
                            if ( number && number.index!=undefined){
                                const numberIndex = number.index;
                                const speedTypeStr = speed.substring(0, numberIndex);
                                const speedType = Object.keys(SpeedTypeLang).find(key => SpeedTypeLang[key as SpeedType] == speedTypeStr);
                                if (speedType){
                                    const speedValue = speed.substring(numberIndex);
                                    return {
                                        type: speedType as SpeedType,
                                        value: speedValue
                                    } as SpeedValue
                                }
                            }
                        }
                    }).filter(speed=>!!speed);
                    data.speed = speeds
                }

                //属性
                const ability ={pow:0,dex:0,con:0,int:0,wis:0,cha:0}
                data.ability=ability
                const abilityRow = (rows[5]+rows[6]).replaceAll("（",'(').replaceAll("）",')')
                const abilitiesStr = abilityRow.split(")");
                abilitiesStr.forEach(abilityStr=>{
                    let abilityStr1 = abilityStr.trim();
                    const number1 = abilityStr1.indexOf("(");
                    abilityStr1 = abilityStr1.substring(0,number1)
                    const abilityName = abilityStr1.substring(0,2);
                    const find = Object.keys(AttributeLang).find(key => AttributeLang[key as AbilityType] == abilityName);
                    if (find){
                        const abilityValue = parseInt(abilityStr1.substring(2));
                        switch ( find){
                            case 'pow':ability.pow = abilityValue;break;
                            case 'dex':ability.dex = abilityValue;break;
                            case 'con':ability.con = abilityValue;break;
                            case 'int':ability.int = abilityValue;break;
                            case 'wis':ability.wis = abilityValue;break;
                            case 'cha':ability.cha = abilityValue;break;
                        }
                    }
                })

                //7
                let otherIndex = rows.findIndex(row=>row.includes('。'));
                let actionIndex = rows.findIndex(row=>row.trim()=='动作');
                if (actionIndex>0){
                    if (otherIndex > actionIndex) otherIndex = actionIndex;
                }

                if (otherIndex<0) otherIndex = rows.length;
                for (let i = 7; i < otherIndex; i++) {
                    const row = rows[i].replaceAll("：",':').replaceAll("，",',');
                    const rowArray = row.split(':');
                    const rowType  = rowArray[0];
                    const rowInfo = rowArray[1].split(',');
                    switch (rowType){
                        case '豁免':{
                            const savingThrow: MonsterSavingThrow[] = []
                            rowInfo.map(savingThrowStr=>{
                                const abilityName = savingThrowStr.substring(0,2);
                                const value = parseInt(savingThrowStr.substring(2));
                                const name = Object.keys(AttributeLang).find(key => AttributeLang[key as AbilityType] == abilityName);
                                if ( name){
                                    savingThrow.push( {
                                        type: name as AbilityType,
                                        value: value
                                    })
                                }
                            })
                            data.savingThrow = savingThrow
                            break ;
                        }
                        case '技能':{
                            const skillValues: SkillValue[] = []
                            rowInfo.map(skillValueStr=>{
                                const skillName = skillValueStr.substring(0,2);
                                const value = parseInt(skillValueStr.substring(2));
                                const name = Object.keys(SkillLang).find(key => SkillLang[key as SkillType] == skillName);
                                if ( name){
                                    skillValues.push( {
                                        type: name as SkillType,
                                        value: value
                                    })
                                }
                            })
                            data.skills = skillValues
                            break ;
                        }
                        case '感官':{
                            const ppStr = rowInfo.find(item=>item.startsWith("被动察觉"))
                            if (ppStr){
                                data.passivePerception = parseInt(ppStr.substring(4))
                            }
                            data.senses = rowInfo.filter(item=>!item.startsWith("被动察觉"))
                                .map(item=>{
                                    //找数字
                                    const number = item.match(/[\d.]+/);
                                    if ( number && number.index!=undefined){
                                        const numberIndex = number.index;
                                        return {
                                            type: item.substring(0,numberIndex),
                                            value: item.substring(numberIndex)
                                        } as SensesValue
                                    }else {
                                        return {
                                            type: item,
                                            value:''
                                        } as SensesValue
                                    }
                                })

                            break;
                        }
                        case '语言':{
                            data.languages = rowInfo[0].split(",")
                                .filter(language => language &&  language!='——')
                                .map(language => language.trim());
                            break;
                        }
                        case '挑战等级':{
                            const strings = rowInfo.join("").replaceAll("（",'(').split("(");
                            data.level = parseInt(strings[0]);
                            data.xp = parseInt(strings[1].substring(0,strings[1].length-3).replaceAll(",",''));
                            break
                        }
                    }
                }
                if (actionIndex<0) actionIndex = rows.length;
                //特性
                const feature:{name:string,nameSub?:string,description:string}[] = []
                if (otherIndex<actionIndex){
                    for (let i = otherIndex; i < actionIndex; i++) {
                        const row = rows[i];
                        const number2 = row.indexOf("。");
                        const title = row.substring(0,number2);
                        const nameParts = title.split(/[a-zA-Z]/);
                        const cnName = nameParts[0];
                        const enName = title.substring(cnName.length)
                        const dataValue = row.substring(number2+1);
                        feature.push( {
                            name: cnName,
                            nameSub: enName,
                            description: dataValue
                        })
                    }
                }
                data.feature = feature

                //动作
                const action:{name:string,nameSub?:string,description:string}[] = []
                for (let i = actionIndex+1; i < rows.length; i++) {
                    const row = rows[i];
                    const number2 = row.indexOf("。");
                    const title = row.substring(0,number2);
                    const nameParts = title.split(/[a-zA-Z]/);
                    const cnName = nameParts[0];
                    const enName = title.substring(cnName.length)

                    const dataValue = row.substring(number2+1);
                    action.push( {
                        name: cnName,
                        nameSub: enName,
                        description: dataValue
                    })
                }
                data.action = action
                data.fromBook ="PHB"
                form.resetFields()
                form.setFieldsValue(data)

                return resolve(true)
            }catch (e:unknown){
                console.error(e)
                return reject(e)
            }

        }).finally(() => {
            setLoading(false)
        })
    }



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
               preViewBottomRender={()=>{
                   return <Space>
                       <div style={{marginLeft: '1rem'}}>
                           {pageSize[0]}×{pageSize[1]}(cm)
                       </div>
                   </Space>
               }}
               settingRender={() => {
                   return<Form<MonsterPageSetting>
                           form={settingForm}
                           initialValues={{pageSize: {width: 10, height: 12.8}}}
                           onFinish={setting=>{
                               const {width, height} = setting.pageSize;
                               setPageSize([width, height])
                           }}
                       >
                           <Form.Item label="页面大小" >
                               <Space>
                                   <Form.Item label={'宽'} name={['pageSize','width']} noStyle>
                                       <InputNumber prefix="宽：" suffix="CM" style={{width: '8rem'}} />
                                   </Form.Item>
                                   <Form.Item label={'高'} name={['pageSize','height']} noStyle>
                                       <InputNumber prefix="高：" suffix="CM"  style={{width: '8rem'}} />
                                   </Form.Item>
                               </Space>
                           </Form.Item>
                       </Form>;
               }}
               onSettingSave={()=>{
                   settingForm.submit();
                   return Promise.resolve();
               }}
               afterSettingModalOpenChange={(open) => {
                   if (!open) {
                       settingForm.setFieldsValue({
                           pageSize: {width: pageSize[0], height: pageSize[1]}
                       })
                   }
               }}
               buttonRender={function (): React.ReactNode | React.ReactNode[] {return []}}
               handleImport={handleImport}
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
                                                   key={'senses'+field.key+".type"}
                                                   name={[field.name, 'type']}
                                                   noStyle
                                               >
                                                   <Input placeholder="感官类型"/>
                                               </Form.Item>
                                           </Col>
                                           <Col flex={"auto"}>
                                               <Form.Item
                                                   {...field}
                                                   key={'senses'+field.key+".value"}
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
                                                   key={'languages'+field.key+".value"}
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
                                                   key={'feature'+field.key+".name"}
                                                   name={[field.name, 'name']}
                                                   noStyle
                                               >
                                                   <Input placeholder="特质名称"/>
                                               </Form.Item>
                                               <Form.Item
                                                   {...field}
                                                   key={'feature'+field.key+".nameSub"}
                                                   name={[field.name, 'nameSub']}
                                                   noStyle
                                               >
                                                   <Input placeholder="特质名称2"/>
                                               </Form.Item>
                                           </Col>
                                           <Col flex={"auto"}>
                                               <Form.Item
                                                   {...field}
                                                   key={'feature'+field.key+".description"}
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
                                                   key={'action'+field.key+".name"}
                                                   name={[field.name, 'name']}
                                                   noStyle
                                               >
                                                   <Input placeholder="动作名称"/>
                                               </Form.Item>
                                               <Form.Item
                                                   {...field}
                                                   key={'action'+field.key+".nameSub"}
                                                   name={[field.name, 'nameSub']}
                                                   noStyle
                                               >
                                                   <Input placeholder="动作名称2"/>
                                               </Form.Item>
                                           </Col>
                                           <Col flex={"auto"}>
                                               <Form.Item
                                                   {...field}
                                                   key={'action'+field.key+".description"}
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
                   <Form.Item label={"其他描述"} name={'otherDescription'}>
                       <Input.TextArea/>
                   </Form.Item>
                   <Form.Item label={"来源"} name={'fromBook'}>
                       <Select options={bookOptions} showSearch={true}/>
                   </Form.Item>

                   <Divider size={"small"} titlePlacement={"left"}>配图</Divider>
                   <Form.Item label={"插入图片"} name={'image'}>
                       <ImageSelector name={['image']} />
                   </Form.Item>
               </Form>
           </BasePage>
       </>

    )
}
export default MonsterPage;