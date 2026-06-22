import {Button, Col, Collapse, Divider, Form, Input, InputNumber, Row, Select, Space} from "antd";
import {type Character, CharacterSensesOptions} from "./Types.ts";
import type {FormInstance} from "antd/lib";
import {useEffect} from "react";
import {DemoCharacter, ProficiencyBonus} from "../../data/CharacterData.tsx";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import ClassInput from "../../compoment/ClassInput/ClassInput.tsx";
import AbilityInput from "../../compoment/AbilityInput/AbilityInput.tsx";
import SkillInput, {computeSkillValue2} from "../../compoment/SkillInput/SkillInput.tsx";
import ImageSelector from "../../compoment/ImageSelector/ImageSelector.tsx";
type CharacterFormProps = {
    form?: FormInstance<Character>
}
export default function CharacterForm(props:CharacterFormProps){
    const [form] = Form.useForm<Character>(props.form)

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
            form.setFieldValue('proficiencyBonus', sumLevel ==0 ? undefined:ProficiencyBonus[sumLevel])

        }else {
            form.setFieldValue('proficiencyBonus', null)
        }
    }, [classes, form])

    const proficiencyBonus = Form.useWatch('proficiencyBonus',form);
    const pow = Form.useWatch(['ability','pow'],form);
    const dex = Form.useWatch(['ability','dex'],form);
    // const con = Form.useWatch(['ability','con'],form);
    const int = Form.useWatch(['ability','int'],form);
    const wis = Form.useWatch(['ability','wis'],form);
    const cha = Form.useWatch(['ability','cha'],form);

    const athletics = Form.useWatch(['skills','athletics'],form);
    useEffect(() => {form.setFieldValue(['skills','athletics'],  computeSkillValue2(athletics, pow?.modifier, proficiencyBonus))}, [ pow?.modifier, proficiencyBonus, athletics, form]);

    const acrobatics = Form.useWatch(['skills','acrobatics'],form);
    useEffect(() => {form.setFieldValue(['skills','acrobatics'],  computeSkillValue2(acrobatics, dex?.modifier, proficiencyBonus))}, [ dex?.modifier, proficiencyBonus, acrobatics, form]);
    const sleightOfHand = Form.useWatch(['skills','sleightOfHand'],form);
    useEffect(() => {form.setFieldValue(['skills','sleightOfHand'],  computeSkillValue2(sleightOfHand, dex?.modifier, proficiencyBonus))}, [ dex?.modifier, proficiencyBonus, sleightOfHand, form])
    const stealth = Form.useWatch(['skills','stealth'],form);
    useEffect(() => {form.setFieldValue(['skills','stealth'],  computeSkillValue2(stealth, dex?.modifier, proficiencyBonus))}, [ dex?.modifier, proficiencyBonus, stealth, form])

    const arcana = Form.useWatch(['skills','arcana'],form);
    useEffect(() => {form.setFieldValue(['skills','arcana'],  computeSkillValue2(arcana, int?.modifier, proficiencyBonus))}, [ int?.modifier, proficiencyBonus, arcana, form])
    const history = Form.useWatch(['skills','history'],form);
    useEffect(() => {form.setFieldValue(['skills','history'],  computeSkillValue2(history, int?.modifier, proficiencyBonus))}, [ int?.modifier, proficiencyBonus, history, form])
    const investigation = Form.useWatch(['skills','investigation'],form);
    useEffect(() => {form.setFieldValue(['skills','investigation'],  computeSkillValue2(investigation, int?.modifier, proficiencyBonus))}, [ int?.modifier, proficiencyBonus, investigation, form])
    const nature = Form.useWatch(['skills','nature'],form);
    useEffect(() => {form.setFieldValue(['skills','nature'],  computeSkillValue2(nature, int?.modifier, proficiencyBonus))}, [ int?.modifier, proficiencyBonus, nature, form])
    const religion = Form.useWatch(['skills','religion'],form);
    useEffect(() => {form.setFieldValue(['skills','religion'],  computeSkillValue2(religion, int?.modifier, proficiencyBonus))}, [ int?.modifier, proficiencyBonus, religion, form])

    const animalHandling = Form.useWatch(['skills','animalHandling'],form);
    useEffect(() => {form.setFieldValue(['skills','animalHandling'],  computeSkillValue2(animalHandling, wis?.modifier, proficiencyBonus))}, [ wis?.modifier, proficiencyBonus, animalHandling, form])
    const insight = Form.useWatch(['skills','insight'],form);
    useEffect(() => {form.setFieldValue(['skills','insight'],  computeSkillValue2(insight, wis?.modifier, proficiencyBonus))}, [ wis?.modifier, proficiencyBonus, insight, form])
    const medicine = Form.useWatch(['skills','medicine'],form);
    useEffect(() => {form.setFieldValue(['skills','medicine'],  computeSkillValue2(medicine, wis?.modifier, proficiencyBonus))}, [ wis?.modifier, proficiencyBonus, medicine, form])
    const perception = Form.useWatch(['skills','perception'],form);
    useEffect(() => {form.setFieldValue(['skills','perception'],  computeSkillValue2(perception, wis?.modifier, proficiencyBonus))}, [ wis?.modifier, proficiencyBonus, perception, form])
    const survival = Form.useWatch(['skills','survival'],form);
    useEffect(() => {form.setFieldValue(['skills','survival'],  computeSkillValue2(survival, wis?.modifier, proficiencyBonus))}, [ wis?.modifier, proficiencyBonus, survival, form])

    const deception = Form.useWatch(['skills','deception'],form);
    useEffect(() => {form.setFieldValue(['skills','deception'],  computeSkillValue2(deception, cha?.modifier, proficiencyBonus))}, [ cha?.modifier, proficiencyBonus, deception, form])
    const intimidation = Form.useWatch(['skills','intimidation'],form);
    useEffect(() => {form.setFieldValue(['skills','intimidation'],  computeSkillValue2(intimidation, cha?.modifier, proficiencyBonus))}, [ cha?.modifier, proficiencyBonus, intimidation, form])
    const performance = Form.useWatch(['skills','performance'],form);
    useEffect(() => {form.setFieldValue(['skills','performance'],  computeSkillValue2(performance, cha?.modifier, proficiencyBonus))}, [ cha?.modifier, proficiencyBonus, performance, form])
    const persuasion = Form.useWatch(['skills','persuasion'],form);
    useEffect(() => {form.setFieldValue(['skills','persuasion'],  computeSkillValue2(persuasion, cha?.modifier, proficiencyBonus))}, [ cha?.modifier, proficiencyBonus, persuasion, form])

    return (
        <Form<Character> form={form} labelCol={{ span: 5 }} initialValues={ DemoCharacter}>
            <Form.Item label="角色姓名" name={'name'} >
                <Input/>
            </Form.Item>
            <Form.Item label="角色姓名" name={'name2'} >
                <Input/>
            </Form.Item>
            <Form.Item label="玩家名" name={'playerName'}>
                <Input/>
            </Form.Item>
            <Form.Item label="种族" name={'races'} >
                <Input/>
            </Form.Item>
            <Form.Item label="其他描述" name={'others'} >
                <Input.TextArea/>
            </Form.Item>
            <Collapse  ghost size={'small'}  items={[
                {
                    key: 'image',
                    label: '插入图片',
                    forceRender: true,
                    children: (
                        <Form.Item name={'image'} noStyle>
                            <ImageSelector name={['image']} />
                        </Form.Item>
                    )
                }
                ]}/>

            <Divider />
            <Form.List name={['senses']}>
                {(fields, {add, remove})=>{
                    return <Row>
                        <Col span={5} style={{textAlign:'right'}}>
                            感官：
                        </Col>
                        <Col span={19}>
                            <Row align={"middle"} gutter={[8,8]}>
                                {fields.map((field, index)=>(
                                    <>
                                        <Col span={5} key={"hpRoll-dice"+field.key+index}>
                                            <Form.Item {...field} noStyle name={[field.name, 'type']}>
                                                <Select options={CharacterSensesOptions} style={{width:'100%'}}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={16} key={"hpRoll-num"+field.key+index}>
                                            <Form.Item {...field} noStyle name={[field.name, 'range']}>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={2} key={"hpRoll-opt"+field.key+index}>
                                            <MinusCircleOutlined onClick={()=>remove(index)}/>
                                        </Col>
                                    </>
                                ))}
                                <Col span={24} key={"hpRoll-add"}>
                                    <Form.Item >
                                        <Button type="dashed" onClick={()=>add()} block>
                                            <PlusOutlined />
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>

                        </Col>

                    </Row>
                }}
            </Form.List>
            <Form.Item label={"熟练加值"} name={'proficiencyBonus'} dependencies={['classes']}>
                <InputNumber min={0} style={{width:'100%'}} />
            </Form.Item>
            <Form.Item label={"护甲值"} name={['ac']}>
                <InputNumber min={0} style={{width:'100%'}} />
            </Form.Item>
            <Form.Item label={"护甲值备注"} name={['acPS']}>
                <Input />
            </Form.Item>
            <Form.Item label={"速度"} name={'speed'}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item label={"先攻加值"} name={'initiative'}>
                <InputNumber min={0} style={{width:'100%'}}/>
            </Form.Item>
            <Form.Item label={"武艺骰"} name={["monk",'martialArtsDie']}>
                <Select options={ [
                    {value:'d6',label:'d6'},
                    {value:'d8',label:'d8'},
                    {value:'d10',label:'d10'},
                    {value:'d12',label:'d12'},
                ]} style={{width:'100%'}}/>
            </Form.Item>
            <Form.Item label={"功力点"} name={["monk",'qi']}>
                <InputNumber min={0} max={20} style={{width:'100%'}}/>
            </Form.Item>

            <Divider />
            <Form.Item label={"生命值"} name={['hp']}>
                <InputNumber min={0} style={{width:'100%'}}/>
            </Form.Item>
            <Form.Item label={"最大生命值"} name={['hpMax']}>
                <InputNumber min={0} style={{width:'100%'}}/>
            </Form.Item>
            <Form.Item label={"临时生命值"} name={['hpTemp']}>
                <InputNumber min={0} style={{width:'100%'}}/>
            </Form.Item>
            <Form.List name={['hpDice']}>
                {(fields, {add, remove})=>{
                    return <Row>
                        <Col span={5} style={{textAlign:'right'}}>
                            生命骰：
                        </Col>
                        <Col span={19}>
                            <Row align={"middle"} gutter={[8,8]}>
                                {fields.map((field, index)=>(
                                    <>
                                        <Col span={5} key={"hpRoll-dice"+field.key+index}>
                                            <Form.Item {...field} noStyle name={[field.name, 'dice']}>
                                                <Select options={ [
                                                    {value:'d6',label:'d6'},
                                                    {value:'d8',label:'d8'},
                                                    {value:'d10',label:'d10'},
                                                    {value:'d12',label:'d12'},
                                                ]} style={{width:'100%'}}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={16} key={"hpRoll-num"+field.key+index}>
                                            <Form.Item {...field} noStyle name={[field.name, 'num']}>
                                                <InputNumber min={0} style={{width:'100%'}}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={2} key={"hpRoll-opt"+field.key+index}>
                                            <MinusCircleOutlined onClick={()=>remove(index)}/>
                                        </Col>
                                    </>
                                ))}
                                <Col span={24} key={"hpRoll-add"}>
                                    <Form.Item >
                                        <Button type="dashed" onClick={()=>add()} block>
                                            <PlusOutlined />
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>

                        </Col>

                    </Row>
                }}
            </Form.List>
            <Divider />
            <Form.Item label={"施法关键属性"} name={['spell','keyAbility']}>
                <Select options={[
                    {value:'str',label:'力量'},
                    {value:'dex',label:'敏捷'},
                    {value:'con',label:'体质'},
                    {value:'int',label:'智力'},
                    {value:'wis',label:'感知'},
                    {value:'cha',label:'魅力'}
                ]} mode={'multiple'}/>
            </Form.Item>
            <Form.Item label={"法术攻击加值"} name={['spell','hit']}>
                <InputNumber min={0} style={{width:'100%'}}/>
            </Form.Item>
            <Form.Item label={"法术DC"} name={['spell','dc']}>
                <InputNumber min={0} style={{width:'100%'}}/>
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
                                return <Form.Item {...field} key={'class'+field.key+index}  >
                                    <ClassInput remove={remove} index={index}/>
                                </Form.Item>
                            })
                        }
                    </>
                }}
            </Form.List>

            <Divider titlePlacement={"left"} >
                详细属性
            </Divider>

            <Collapse  ghost size={'small'}  items={[
                {
                    key: 'ability',
                    label: '属性',
                    forceRender:true,
                    children:   <Space vertical={ true} style={{width:'100%'}}>
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
                        <Form.Item name={['ability','str']} label={"力量"} >
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
                },
                {
                    key: 'skill',
                    label: '技能',
                    forceRender:true,
                    children: <div>
                        <Collapse ghost collapsible="icon" items={[
                            {
                                label: <a onClick={()=>{form.scrollToField(['ability','pow'],{behavior:'smooth',focus:true})}} >力量</a>,
                                key: 'pow',forceRender:true,
                                children: <div>
                                    <Row wrap={ false}>
                                        <Col span={5}></Col>
                                        <Col span={19}>
                                            <Row gutter={8}>
                                                <Col span={4}  style={{textAlign:'center'}}>熟练</Col>
                                                <Col span={8} style={{textAlign:'center'}}>总值</Col>
                                                <Col span={12}  style={{textAlign:'center'}}>修正值</Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Form.Item name={['skills','athletics']} label={"运动"}>
                                        <SkillInput baseValue={pow?.modifier} proficiencyBonus={proficiencyBonus}/>
                                    </Form.Item>
                                </div>
                            },
                            {
                                label: <a onClick={()=>{form.scrollToField(['ability','dex'],{behavior:'smooth',focus:true})}} >敏捷</a>,
                                key: 'dex',forceRender:true,
                                children: <div>
                                    <Row wrap={ false}>
                                        <Col span={5}></Col>
                                        <Col span={19}>
                                            <Row gutter={8}>
                                                <Col span={4}  style={{textAlign:'center'}}>熟练</Col>
                                                <Col span={8} style={{textAlign:'center'}}>总值</Col>
                                                <Col span={12}  style={{textAlign:'center'}}>修正值</Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Form.Item name={['skills','acrobatics']} label={"特技"}>
                                        <SkillInput baseValue={dex?.modifier} proficiencyBonus={proficiencyBonus}/>
                                    </Form.Item>
                                    <Form.Item name={['skills','sleightOfHand']} label={"巧手"}>
                                        <SkillInput baseValue={dex?.modifier} proficiencyBonus={proficiencyBonus}/>
                                    </Form.Item>
                                    <Form.Item name={['skills','stealth']} label={"隐匿"}>
                                        <SkillInput baseValue={dex?.modifier} proficiencyBonus={proficiencyBonus}/>
                                    </Form.Item>
                                </div>
                            },
                            {
                                label: <a onClick={()=>{form.scrollToField(['ability','int'],{behavior:'smooth',focus:true})}} >智力</a>,
                                key: 'int',forceRender:true,
                                children: <div>
                                    <Row wrap={ false}>
                                        <Col span={5}></Col>
                                        <Col span={19}>
                                            <Row gutter={8}>
                                                <Col span={4}  style={{textAlign:'center'}}>熟练</Col>
                                                <Col span={8} style={{textAlign:'center'}}>总值</Col>
                                                <Col span={12}  style={{textAlign:'center'}}>修正值</Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Form.Item name={['skills','arcana']} label={"奥秘"}>
                                        <SkillInput baseValue={int?.modifier} proficiencyBonus={proficiencyBonus}/>
                                    </Form.Item>
                                    <Form.Item name={['skills','history']} label={"历史"}>
                                        <SkillInput baseValue={int?.modifier} proficiencyBonus={proficiencyBonus}/>
                                    </Form.Item>
                                    <Form.Item name={['skills','investigation']} label={"调查"}>
                                        <SkillInput baseValue={int?.modifier} proficiencyBonus={proficiencyBonus}/>
                                    </Form.Item>
                                    <Form.Item name={['skills','nature']} label={"自然"}>
                                        <SkillInput baseValue={int?.modifier} proficiencyBonus={proficiencyBonus}/>
                                    </Form.Item>
                                    <Form.Item name={['skills','religion']} label={"宗教"}>
                                        <SkillInput baseValue={int?.modifier} proficiencyBonus={proficiencyBonus}/>
                                    </Form.Item>
                                </div>
                            },
                            {
                                label: <a onClick={()=>{form.scrollToField(['ability','wis'],{behavior:'smooth',focus:true})}} >感知</a>,
                                key: 'wis',forceRender:true,
                                children: <div>
                                    <Row wrap={ false}>
                                        <Col span={5}></Col>
                                        <Col span={19}>
                                            <Row gutter={8}>
                                                <Col span={4}  style={{textAlign:'center'}}>熟练</Col>
                                                <Col span={8} style={{textAlign:'center'}}>总值</Col>
                                                <Col span={12}  style={{textAlign:'center'}}>修正值</Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Form.Item name={['skills','animalHandling']} label={"驯兽"}>
                                        <SkillInput baseValue={wis?.modifier} proficiencyBonus={proficiencyBonus}/>
                                    </Form.Item>
                                    <Form.Item name={['skills','insight']} label={"洞悉"}>
                                        <SkillInput baseValue={wis?.modifier} proficiencyBonus={proficiencyBonus}/>
                                    </Form.Item>
                                    <Form.Item name={['skills','medicine']} label={"医药"}>
                                        <SkillInput baseValue={wis?.modifier} proficiencyBonus={proficiencyBonus}/>
                                    </Form.Item>
                                    <Form.Item name={['skills','perception']} label={"察觉"}>
                                        <SkillInput baseValue={wis?.modifier} proficiencyBonus={proficiencyBonus}/>
                                    </Form.Item>
                                    <Form.Item name={['skills','survival']} label={"生存"}>
                                        <SkillInput baseValue={wis?.modifier} proficiencyBonus={proficiencyBonus}/>
                                    </Form.Item>
                                </div>
                            },
                            {
                                label: <a onClick={()=>{form.scrollToField(['ability','cha'],{behavior:'smooth',focus:true})}} >魅力</a>,
                                key: 'cha',forceRender:true,
                                children: <div>
                                    <Row wrap={ false}>
                                        <Col span={5}></Col>
                                        <Col span={19}>
                                            <Row gutter={8}>
                                                <Col span={4}  style={{textAlign:'center'}}>熟练</Col>
                                                <Col span={8} style={{textAlign:'center'}}>总值</Col>
                                                <Col span={12}  style={{textAlign:'center'}}>修正值</Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Form.Item name={['skills','deception']} label={"欺瞒"}>
                                        <SkillInput baseValue={cha?.modifier} proficiencyBonus={proficiencyBonus}/>
                                    </Form.Item>
                                    <Form.Item name={['skills','intimidation']} label={"威吓"}>
                                        <SkillInput baseValue={cha?.modifier} proficiencyBonus={proficiencyBonus}/>
                                    </Form.Item>
                                    <Form.Item name={['skills','performance']} label={"表演"}>
                                        <SkillInput baseValue={cha?.modifier} proficiencyBonus={proficiencyBonus}/>
                                    </Form.Item>
                                    <Form.Item name={['skills','persuasion']} label={"游说"}>
                                        <SkillInput baseValue={cha?.modifier} proficiencyBonus={proficiencyBonus}/>
                                    </Form.Item>
                                </div>
                            }
                        ]} size={"small"} />
                    </div>
                },
                {
                    key: 'proficiencies',
                    label: '熟练',
                    forceRender: true,
                    children: <div>
                        <Form.List name={['proficiencies','armor']}>
                            {(fields, { add, remove }) => (
                                <Row gutter={[8,8]} align={'middle'}>

                                    {
                                        fields.map((field, index) => (
                                            <>
                                                {index==0 && <Col span={5} style={{textAlign:'right'}}>护甲:</Col>}
                                                <Col span={17} offset={index==0?0:5}>
                                                    <Form.Item
                                                        {...field}
                                                        key={"armor"+field.key+index}
                                                        noStyle
                                                    >
                                                        <Input placeholder="请输入护甲" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={2}>
                                                    <MinusCircleOutlined onClick={() => {
                                                        remove(field.name);
                                                    }} />
                                                </Col>
                                            </>
                                        ))
                                    }
                                    <Col span={17} offset={5}>
                                        <Form.Item >
                                            <Button type="dashed" onClick={() => {
                                                add();
                                            }} block icon={<PlusOutlined />}>
                                                添加护甲
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>


                            )}
                        </Form.List>
                        <Form.List name={['proficiencies','weapons']}>
                            {(fields, { add, remove }) => (
                                <Row gutter={[8,8]} align={'middle'}>

                                    {
                                        fields.map((field, index) => (
                                            <>
                                                {index==0 && <Col span={5} style={{textAlign:'right'}}>武器:</Col>}
                                                <Col span={17} offset={index==0?0:5}>
                                                    <Form.Item
                                                        {...field}
                                                        key={"weapons"+field.key+index}
                                                        noStyle
                                                    >
                                                        <Input placeholder="请输入武器" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={2}>
                                                    <MinusCircleOutlined onClick={() => {
                                                        remove(field.name);
                                                    }} />
                                                </Col>
                                            </>
                                        ))
                                    }
                                    <Col span={17} offset={5}>
                                        <Form.Item >
                                            <Button type="dashed" onClick={() => {
                                                add();
                                            }} block icon={<PlusOutlined />}>
                                                添加武器
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>


                            )}
                        </Form.List>
                        <Form.List name={['proficiencies','tools']}>
                            {(fields, { add, remove }) => (
                                <Row gutter={[8,8]} align={'middle'}>

                                    {
                                        fields.map((field, index) => (
                                            <>
                                                {index==0 && <Col span={5} style={{textAlign:'right'}}>工具:</Col>}
                                                <Col span={17} offset={index==0?0:5}>
                                                    <Form.Item
                                                        {...field}
                                                        key={"tools"+field.key+index}
                                                        noStyle
                                                    >
                                                        <Input placeholder="请输入工具" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={2}>
                                                    <MinusCircleOutlined onClick={() => {
                                                        remove(field.name);
                                                    }} />
                                                </Col>
                                            </>
                                        ))
                                    }
                                    <Col span={17} offset={5}>
                                        <Form.Item >
                                            <Button type="dashed" onClick={() => {
                                                add();
                                            }} block icon={<PlusOutlined />}>
                                                添加工具
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>


                            )}
                        </Form.List>
                        <Form.List name={['proficiencies','languages']}>
                            {(fields, { add, remove }) => (
                                <Row gutter={[8,8]} align={'middle'}>

                                    {
                                        fields.map((field, index) => (
                                            <>
                                                {index==0 && <Col span={5} style={{textAlign:'right'}}>语言:</Col>}
                                                <Col span={17} offset={index==0?0:5}>
                                                    <Form.Item
                                                        {...field}
                                                        key={"languages"+field.key+index}
                                                        noStyle
                                                    >
                                                        <Input placeholder="请输入语言" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={2}>
                                                    <MinusCircleOutlined onClick={() => {
                                                        remove(field.name);
                                                    }} />
                                                </Col>
                                            </>
                                        ))
                                    }
                                    <Col span={17} offset={5}>
                                        <Form.Item >
                                            <Button type="dashed" onClick={() => {
                                                add();
                                            }} block icon={<PlusOutlined />}>
                                                添加语言
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>


                            )}
                        </Form.List>
                        <Form.List name={['proficiencies','others']}>
                            {(fields, { add, remove }) => (
                                <Row gutter={[8,8]} align={'middle'}>

                                    {
                                        fields.map((field, index) => (
                                            <>
                                                {index==0 && <Col span={5} style={{textAlign:'right'}}>其他:</Col>}
                                                <Col span={17} offset={index==0?0:5}>
                                                    <Form.Item
                                                        {...field}
                                                        key={"languages"+field.key+index}
                                                        noStyle
                                                    >
                                                        <Input placeholder="请其他熟练内容" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={2}>
                                                    <MinusCircleOutlined onClick={() => {
                                                        remove(field.name);
                                                    }} />
                                                </Col>
                                            </>
                                        ))
                                    }
                                    <Col span={17} offset={5}>
                                        <Form.Item >
                                            <Button type="dashed" onClick={() => {
                                                add();
                                            }} block icon={<PlusOutlined />}>
                                                添加其他熟练
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>


                            )}
                        </Form.List>
                    </div>
                },
                {
                    key: 'equipment ',
                    label: '装备',
                    forceRender: true,
                    children: <div>
                        <Collapse ghost size={"small"}
                                  items={[
                                      {
                                          key: 'coins',
                                          label: '钱包',
                                          forceRender: true,
                                          children: <div>
                                              <Form.Item name={['equipments','coins','copper']} label={'铜币'}>
                                                  <InputNumber min={0} style={{width:'100%'}} />
                                              </Form.Item>
                                              <Form.Item name={['equipments','coins','silver']} label={'银币'}>
                                                  <InputNumber min={0} style={{width:'100%'}}  />
                                              </Form.Item>
                                              <Form.Item name={['equipments','coins','electrum']} label={'金银币'}>
                                                  <InputNumber min={0} style={{width:'100%'}} />
                                              </Form.Item>
                                              <Form.Item name={['equipments','coins','gold']} label={'金币'}>
                                                  <InputNumber min={0} style={{width:'100%'}} />
                                              </Form.Item>
                                              <Form.Item name={['equipments','coins','platinum']} label={'白金币'}>
                                                  <InputNumber min={0} style={{width:'100%'}} />
                                              </Form.Item>
                                          </div>
                                      },
                                  ]}/>
                        <Form.Item name={['equipments','items']} label={'其他物品'}>
                            <Input.TextArea rows={5} />
                        </Form.Item>
                    </div>
                },
            ]}/>
        </Form>
    )

}