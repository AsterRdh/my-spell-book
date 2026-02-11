import useNotification from "antd/es/notification/useNotification";
import React, { useState} from "react";
import {useDNDBook} from "../../hooks/useDNDBook.tsx";
import {Form, Input, InputNumber, Select, Space, Spin} from "antd";
import BasePage from "../BasePage.tsx";
import FeatureCard from "./FeatureCard.tsx";
import {useForm} from "antd/es/form/Form";

import type {Feature} from "./Types.ts";
import {type PageSetting, SizeScaling} from "../../types/DataType.ts";
import ImageSelector from "../../compoment/ImageSelector/ImageSelector.tsx";
type FeaturePageSetting=PageSetting


const FeaturePage = () => {

    const [notification, message] = useNotification();
    const [loading, setLoading] = useState(false);
    const [pageSize, setPageSize] = useState<[number, number]>([10,12.8])
    const {books,bookOptions} = useDNDBook(notification);

    const [form] = useForm<Feature>()
    const featureValues = Form.useWatch([], form);

    const [settingForm] = useForm<FeaturePageSetting>()
    const handleImport = (inputData?: string) => {
        return Promise.resolve(inputData)
    }
    return(
        <>
            <BasePage
                preViewRender={(ref) => {
                    return <FeatureCard ref={ref} dataSet={{books:books}} dataSource={featureValues} size={[SizeScaling[0]*pageSize[0], SizeScaling[1]*pageSize[1]]}/>
                }}
                preViewButtonRender={() => {return [];}}
                preViewBottomRender={()=>{
                    return <Space>
                        <div style={{marginLeft: '1rem'}}>
                            {pageSize[0]}×{pageSize[1]}(cm)
                        </div>
                    </Space>
                }}
                settingRender={() => {
                    return<Form<FeaturePageSetting>
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
                notification={ notification} setLoading={setLoading}
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
                <Form form={form}>
                    <Form.Item label="id" name={'id'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={"英文名称"} name={"name"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={"名称"} name={"cnName"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={"描述(支持 Markdown 格式)"} name={"description"} layout={'vertical'}>
                        <Input.TextArea rows={10}/>
                    </Form.Item>
                    <Form.Item label={"插入图片"} name={'image'} >
                        <ImageSelector name={['image']} value={featureValues?.image}/>
                    </Form.Item>

                    <Form.Item label={"来源"} name={'fromBook'}>
                        <Select options={bookOptions} showSearch={true}/>
                    </Form.Item>
                </Form>
            </BasePage>


            {message}
            <Spin fullscreen={true} spinning={loading}/>
        </>
    )
}
export default FeaturePage;