import {Button, Col, Form, Input, InputNumber, Radio, Row, Select, Switch, Upload, type UploadFile} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useMemo} from "react";
export type ImageSelectorType={
    from?:'url'|'local'
    url?:string
    file?:	UploadFile[]
    position?:{
        x?:number,
        y?:number
    },
    size?:{
        width?: string,
        height?:string,
    }
    fit?: 'cover'|'contain'|'fill'|'none'|'scale-down'
    rotation?:number
    mask?:boolean
}
type ImageSelectorProps<E extends ImageSelectorType> = {
    name: string | string[]
    value?: E
}

export default function ImageSelector<E extends ImageSelectorType> (props:ImageSelectorProps<E>){
    const {value} = props
    const namePath = useMemo(() => {
        const path = props.name
        if (path === undefined) return []
        if (Array.isArray(path)) {
            return path
        }
        return [path]
    }, [props.name]);
    const normFile = (e: unknown) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && (e as {fileList:UploadFile[]}).fileList;
    };


    return <>
        <Form.Item label={"图片来源"} name={[...namePath,'from']} initialValue={'url'} >
            <Radio.Group options={[
                {
                    label: '图片URL',
                    value: 'url'
                },
                {
                    label: '从本地选择',
                    value: 'local'
                }
            ]} />
        </Form.Item>
        <Form.Item label={"图片URL"} name={[...namePath,'url']}
                   dependencies={[...namePath,'from']}
                   hidden={value?.from==='local'}>
            <Input/>
        </Form.Item>
        <Form.Item
            name={[...namePath,'file']}
            label="从本地选择"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            dependencies={[...namePath,'from']}
            hidden={value?.from==='url'}
        >
            <Upload name="logo" listType="picture" accept="image/*" maxCount={1}
                    beforeUpload={()=>{
                        return Promise.reject()
                    }}
            >
                <Button icon={<UploadOutlined />}>点击选择图片</Button>
            </Upload>
        </Form.Item>
        <Form.Item label={"图片位置"} extra={"距离右下角"}>
            <Row>
                <Col span={12}>
                    <Form.Item name={[...namePath,'position','x']} label={"X"}>
                        <InputNumber/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name={[...namePath,'position','y']} label={"Y"}>
                        <InputNumber/>
                    </Form.Item>
                </Col>
            </Row>
        </Form.Item>
        <Form.Item label={"图片大小"}>
            <Row>
                <Col span={12}>
                    <Form.Item name={[...namePath,'size','width']} label={"宽度"}>
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name={[...namePath,'size','height']} label={"高度"}>
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>
        </Form.Item>
        <Form.Item name={[...namePath,'rotation']} label="图片旋转" extra={"单位：度"}>
            <InputNumber/>
        </Form.Item>
        <Form.Item name={[...namePath,'mask']} label="背景遮罩" valuePropName={"checked"} >
            <Switch/>
        </Form.Item>
        <Form.Item name={[...namePath,'fit']} label={"图片填充模式"}>
            <Select options={[
                {
                    label: '填充',
                    value: 'fill'
                },
                {
                    label: '适应',
                    value: 'contain'
                },
                {
                    label: '适应并填充',
                    value: 'cover'
                },
                {
                    label: '不填充',
                    value: 'none'
                },
                {
                    label: '原比例填充',
                    value: 'scale-down'
                }
            ]}
            />
        </Form.Item>
    </>
}