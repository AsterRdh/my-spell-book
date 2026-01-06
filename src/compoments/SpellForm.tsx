import {useForm} from "antd/es/form/Form";
import type {BookType, SpellSchoolType, SpellType} from "../types/DataType.ts";
import type {FormInstance} from "antd/lib";
import {Checkbox, Col, Form, Input, InputNumber, Row, Select, Space, Spin} from "antd";
import {type SelectOptionType} from "../data/TestData.ts";
import {useState} from "react";

type SpellFormProps={
    form: FormInstance<SpellType>
    schoolOptions:SelectOptionType<SpellSchoolType>[];
    bookOptions:SelectOptionType<BookType>[];
    initialValues?:SpellType
}

export default function SpellForm(props:SpellFormProps){
    const [form] = useForm(props.form);
    const {schoolOptions,bookOptions,initialValues}=props

    const needMaterial = Form.useWatch("needMaterial",form);

    const submit = (values: SpellType) => {
        setLoading( true)
        //发送post请求
        fetch("/SpellBook/dnd/saveSpell",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(values)
        }).then(res=>res.json()).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{
            setLoading(false)
        })
    };
    const [loading, setLoading] = useState(false)

    return <>
        <Spin spinning={loading}>
            <Form<SpellType> form={form} initialValues={initialValues} onFinish={submit}>
                <Form.Item label="法术ID" name={'id'} hidden={ true}>
                    <InputNumber/>
                </Form.Item>
                <Form.Item label="法术名称" name={'name'}>
                    <Input/>
                </Form.Item>
                <Form.Item label="法术中文名称" name={'cnName'}>
                    <Input/>
                </Form.Item>
                <Space>
                    <Form.Item label="法术等级" name={'level'}>
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item label="法术学派" name={'schoolID'}>
                        <Select options={schoolOptions} style={{width:'100%',minWidth:'200px'}}/>
                    </Form.Item>
                </Space>
                <Row gutter={12}>
                    <Col span={8}>
                        <Form.Item label="施法时间" name={'castingTime'}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item  name={'castingTimePS'} noStyle>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col span={8}>
                        <Form.Item label="施法距离" name={'range'}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item  name={'rangePS'} noStyle>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="法术成分">
                    <Space>
                        <Form.Item label="V" name={'needVerbal'} valuePropName={'checked'} >
                            <Checkbox />
                        </Form.Item>
                        <Form.Item label="S" name={'needSomatic'} valuePropName={'checked'}>
                            <Checkbox />
                        </Form.Item>
                        <Form.Item label="M" name={'needMaterial'} valuePropName={'checked'}>
                            <Checkbox />
                        </Form.Item>
                    </Space>

                    <Form.Item label="材料" name={'material'} dependencies={['needMaterial']} hidden={!needMaterial}>
                        <Input/>
                    </Form.Item>
                </Form.Item>

                <Row gutter={12}>
                    <Col span={8}>
                        <Form.Item label="持续时间" name={'duration'}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item  name={'durationPS'} noStyle>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="法术描述(支持Markdown语法)" name={'baseDescription'} layout={'vertical'}>
                    <Input.TextArea rows={10}/>
                </Form.Item>
                <Form.Item label="法术升级描述(支持Markdown语法)" name={'upgradeDescription'} layout={'vertical'}>
                    <Input.TextArea/>
                </Form.Item>

                <Form.Item label={"来源"} name={'fromBookID'}>
                    <Select options={bookOptions} showSearch={true}/>
                </Form.Item>
            </Form>
        </Spin>

    </>
}