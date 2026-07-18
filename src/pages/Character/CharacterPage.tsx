
import './CharacterPage.css'
import type {Character} from "./Types.ts";
import {Form, InputNumber, Space} from "antd";
import CharacterCard from "./CharacterCard.tsx";
import BasePage from "../BasePage.tsx";
import {type PageSetting} from "../../types/DataType.ts";
import CharacterForm from "./CharacterForm.tsx";
import {useContext} from "react";
import {useForm} from "antd/es/form/Form";
import {AppContext} from "../../AppContext.ts";
import { ColorPicker } from 'antd';

type CharacterPageSetting=PageSetting
export default function CharacterPage(){
    const [form] = Form.useForm<Character>()
    // const [pageSize, setPageSize] = useState<[number, number]>([10,12.8])
    const data = Form.useWatch([],form);
    const [settingForm] = useForm<CharacterPageSetting>()
    const {setting,setSetting} = useContext(AppContext)
    const {pageSize} = setting;



    const handleImport = (inputData?: string) => {
        return Promise.resolve(inputData)
    }

    return (
        <BasePage
            preViewRender={(ref) => {
                return(
                    <CharacterCard ref={ref} dataSource={data}/>
                )
            }}
            exportNameGetter={() => {
                return data.name || "Character";
            }}
            preViewButtonRender={() => {
                return [];
            }}
            preViewBottomRender={()=>{
                return <Space>
                    <div style={{marginLeft: '1rem'}}>
                        {pageSize.width}×{pageSize.height}(cm)
                    </div>
                </Space>
            }}
            settingRender={() => {
                return<Form<CharacterPageSetting>
                    form={settingForm}
                    initialValues={setting}
                    onFinish={setting=>{setSetting(setting)}}
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
                    <Form.Item label="页面背景" name={['backgroundColor']}>
                        <ColorPicker />
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
            buttonRender={()=>{return <></>}}
            handleImport={handleImport}
        >
            <CharacterForm form={form}/>
        </BasePage>
    )
}