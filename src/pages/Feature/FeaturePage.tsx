import React, {useContext} from "react";
import {Checkbox, ColorPicker, Form, Input, InputNumber, Radio, Select, Space} from "antd";
import BasePage from "../BasePage.tsx";
import FeatureCard from ".//FeatureCard.tsx";
import {useForm} from "antd/es/form/Form";
import type {Feature} from "./Types.ts";
import {type PageSetting, RarityTypeOptions} from "../../types/DataType.ts";
import ImageSelector from "../../compoment/ImageSelector/ImageSelector.tsx";
import {DefaultData} from "./DefaultData.ts";
import {AppContext} from "../../AppContext.ts";
type FeaturePageSetting=PageSetting

const FeaturePage = () => {
    const {dndBook,setting,setSetting} = useContext(AppContext)
    const {pageSize} = setting;
    const {books,bookOptions} = dndBook;

    const [form] = useForm<Feature>()
    const featureValues = Form.useWatch([], form);

    const [settingForm] = useForm<FeaturePageSetting>()
    const handleImport = (inputData?: string) => {
        return Promise.resolve(inputData)
    }
    const featureType = Form.useWatch('type',form);
    const needAttunement = Form.useWatch(['itemFeature','attunement'],form);

    return(
        <>
            <BasePage
                preViewRender={(ref) => {
                    return <FeatureCard ref={ref} dataSet={{books:books}} dataSource={featureValues}/>
                }}
                preViewButtonRender={() => {return [];}}
                preViewBottomRender={()=>{
                    return <Space>
                        <div style={{marginLeft: '1rem'}}>
                            {pageSize.width}×{pageSize.height}(cm)
                        </div>
                    </Space>
                }}
                settingRender={() => {
                    return<Form<FeaturePageSetting>
                        form={settingForm}
                        initialValues={setting}
                        onFinish={setting=>{
                            setSetting(setting)
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
                        <Form.Item label={"页边距"}>
                            <Space>
                                <Form.Item label={'顶'} name={['pageSize','padding','top']} noStyle>
                                    <InputNumber prefix={"顶"} suffix={"cm"} min={0}/>
                                </Form.Item>
                                <Form.Item label={'右'} name={['pageSize','padding','right']} noStyle>
                                    <InputNumber prefix={"右"} suffix={"cm"} min={0}/>
                                </Form.Item>
                                <Form.Item label={'底'} name={['pageSize','padding','bottom']} noStyle>
                                    <InputNumber prefix={"底"} suffix={"cm"} min={0}/>
                                </Form.Item>
                                <Form.Item label={'左'} name={['pageSize','padding','left']} noStyle>
                                    <InputNumber prefix={"左"} suffix={"cm"} min={0}/>
                                </Form.Item>
                            </Space>
                        </Form.Item>
                        <Form.Item label="页面背景" name={['backgroundColor']}>
                            <ColorPicker />
                        </Form.Item>
                        <Form.Item label={"主要文本字号"} name={'baseTextSize'}>
                            <InputNumber suffix={"px"}/>
                        </Form.Item>
                        <Form.Item label={"标题文本字号"} name={'titleTextSize'}>
                            <InputNumber suffix={"px"}/>
                        </Form.Item>
                    </Form>;
                }}
                onSettingSave={()=>{
                    settingForm.submit();
                    return Promise.resolve();
                }}
                afterSettingModalOpenChange={(open) => {
                    if (!open) {
                        settingForm.setFieldsValue(setting)
                    }
                }}
                buttonRender={function (): React.ReactNode | React.ReactNode[] {return []}}
                handleImport={handleImport}
                exportNameGetter={()=>{
                    if (featureValues.name || featureValues.cnName){
                        let name = ''
                        if (featureValues.cnName) {
                            name = featureValues.cnName ;
                        }
                        if (featureValues.name) {
                            if ( name) name += ' '
                            name += featureValues.name
                        }
                        return name;
                    }else {
                        return "Feature";
                    }
                }}
            >
                <Form form={form} initialValues={DefaultData}>
                    <Form.Item label="id" name={'id'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={'类型'} name={'type'}>
                        <Radio.Group options={[
                            {label: '能力', value: 'Ability'},
                            {label: '专长', value: 'Feats'},
                            {label: '物品', value: 'Item'},
                        ]}/>
                    </Form.Item>
                    <Form.Item label={"英文名称"} name={"name"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={"名称"} name={"cnName"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={"物品特性"} hidden={featureType !== 'Item'}>
                        <Form.Item label={"奇物"} name={["itemFeature","wondrousItem"]} valuePropName="checked">
                            <Checkbox/>
                        </Form.Item>
                        <Form.Item label={"稀有度"} name={["itemFeature","rarity"]} >
                            <Select options={RarityTypeOptions} />
                        </Form.Item>
                        <Form.Item label={"需要同调"} name={["itemFeature","attunement"]} valuePropName="checked">
                            <Checkbox/>
                        </Form.Item>
                        <Form.Item label={"需要同调描述"} name={["itemFeature","attunementDescription"]} hidden={!needAttunement}>
                            <Input/>
                        </Form.Item>

                    </Form.Item>
                    <Form.Item label={"描述(支持 Markdown 格式)"} name={"description"} layout={'vertical'}>
                        <Input.TextArea rows={10}/>
                    </Form.Item>
                    <Form.Item label={"插入图片"} name={'image'}>
                        <ImageSelector name={['image']} value={featureValues?.image}/>
                    </Form.Item>
                    <Form.Item label={"来源"} name={'fromBook'}>
                        <Select options={bookOptions} showSearch={true} allowClear/>
                    </Form.Item>
                </Form>
            </BasePage>
        </>
    )
}
export default FeaturePage;