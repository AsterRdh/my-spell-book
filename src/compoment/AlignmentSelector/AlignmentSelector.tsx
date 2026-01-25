import {Button, Col, Input, Popover, Space} from "antd";
import {useState} from "react";
import {getAlignment} from "../../utils/AlignmentUtils.ts";

export type Alignment1 = 'lawful'|'neutral'|'chaotic';
export type Alignment2 = 'good'|'neutral'|'evil';
export type Alignment = [Alignment1|null|undefined, Alignment2|null|undefined];
type AlignmentSelectorProps={
    value?:Alignment
    onChange?: (value?:Alignment)=>void
}


export default function AlignmentSelector(props:AlignmentSelectorProps) {

    const [value, setValue] = useState<Alignment|undefined>(props.value)

    const onChange = (alignment?:Alignment)=>{
        debugger
        if (props.onChange){
            props.onChange(alignment)
        }else {
            setValue(alignment)
        }
        setOpen(false)
    }
    const [open, setOpen] = useState(false)

    const PopoverContent = <div>
            <Space vertical>
                <Space>
                    <Col span={8}>
                        <Button style={{width:'3rem',height:'3rem'}} title={'守序善良 lawful good'} onClick={() => {onChange(['lawful', 'good'])}}>
                            <div><div>守序</div><div>善良</div></div>
                        </Button>
                    </Col>
                    <Col span={8}>
                        <Button style={{width:'3rem',height:'3rem'}} title={'中立善良 neutral good'} onClick={() => {onChange(['neutral', 'good'])}}>
                            <div><div>中立</div><div>善良</div></div>
                        </Button>
                    </Col>
                    <Col span={8}><Button style={{width:'3rem',height:'3rem'}} title={'混乱善良 chaotic good' } onClick={() => {onChange(['chaotic', 'good'])}}>
                        <div><div>混乱</div><div>善良</div></div>
                    </Button></Col>
                </Space>
                <Space>
                    <Col span={8}><Button style={{width:'3rem',height:'3rem'}} title={'守序中立 lawful neutral'} onClick={() => {onChange(['lawful', 'neutral'])}}>
                        <div><div>守序</div><div>中立</div></div>
                    </Button></Col>
                    <Col span={8}><Button style={{width:'3rem',height:'3rem'}} title={'绝对中立 neutral'} onClick={() => {onChange(['neutral', 'neutral'])}}>
                        <div><div>绝对</div><div>中立</div></div>
                    </Button></Col>
                    <Col span={8}><Button style={{width:'3rem',height:'3rem'}} title={'混乱中立 chaotic neutral'} onClick={() => {onChange(['chaotic', 'neutral'])}}>
                        <div><div>混乱</div><div>中立</div></div>
                    </Button></Col>
                </Space>
                <Space>
                    <Col span={8}><Button style={{width:'3rem',height:'3rem'}} title={'守序邪恶 lawful evil'} onClick={() => {onChange(['lawful', 'evil'])}}>
                        <div><div>守序</div><div>邪恶</div></div>
                    </Button></Col>
                    <Col span={8}><Button style={{width:'3rem',height:'3rem'}} title={'中立邪恶 neutral evil'} onClick={() => {onChange(['neutral', 'evil'])}}>
                        <div><div>中立</div><div>邪恶</div></div>
                    </Button></Col>
                    <Col span={8}><Button style={{width:'3rem',height:'3rem'}} title={'混乱邪恶 chaotic evil'} onClick={() => {onChange(['chaotic', 'evil'])}}>
                        <div><div>混乱</div><div>邪恶</div></div>
                    </Button></Col>
                </Space>
                <Button style={{width:'100%',height:'3rem'}} onClick={() => {onChange([undefined, undefined])}}>
                    无阵营
                </Button>
            </Space>



    </div>

    return <div>
        <Popover content={PopoverContent} trigger="click" placement="bottomLeft" open={open} onOpenChange={()=>{
            setOpen(!open)
        }}>
            <Input value= {getAlignment(props.onChange?props.value:value)} readOnly={true}/>
        </Popover>
    </div>
}