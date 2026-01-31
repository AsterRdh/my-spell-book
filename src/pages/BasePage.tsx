import React, {useRef, useState} from "react";
import html2canvas from "html2canvas";
import {Button, Col,  Input,  Modal, Row,  Slider, Space} from "antd";
import type {NotificationInstance} from "antd/es/notification/interface";
import { IoMdSettings } from "react-icons/io";

type MonsterPageProps = {
    preViewRender:(ref:React.RefObject<HTMLDivElement|null>)=>React.ReactNode
    exportNameGetter:()=>string
    preViewButtonRender:()=>React.ReactNode|React.ReactNode[]
    preViewBottomRender:()=>React.ReactNode|React.ReactNode[]
    buttonRender:()=>React.ReactNode|React.ReactNode[]
    handleImport:(inputData?:string)=>Promise<unknown>
    settingRender:()=>React.ReactNode|React.ReactNode[],
    afterSettingModalOpenChange:(open:boolean)=>void
    onSettingSave:()=>Promise<void>
    children:React.ReactNode
    notification:NotificationInstance
    setLoading:(loading:boolean)=>void
};

const BasePage=(props:MonsterPageProps)=>{
    const {preViewRender,exportNameGetter,preViewButtonRender,preViewBottomRender,buttonRender,children} = props
    const {handleImport} = props
    const {notification,setLoading} = props
    const {afterSettingModalOpenChange,onSettingSave} = props
    const {settingRender} = props



    const [scale, setScale] = useState(100)
    const canvasRef = useRef<HTMLDivElement>(null);
    const handleConvert = () => {
        if (canvasRef.current){
            setLoading(true)
            // 创建一个临时容器，不包含缩放效果
            const tempContainer = document.createElement('div');
            tempContainer.style.position = 'absolute';
            tempContainer.style.left = '-9999px';
            tempContainer.style.transform = 'scale(1)';
            document.body.appendChild(tempContainer);
            // 克隆 SpellCard 组件内容到临时容器
            const clonedComponent = canvasRef.current.cloneNode(true) as HTMLElement;
            tempContainer.appendChild(clonedComponent);
            html2canvas(clonedComponent, {
                useCORS: true,allowTaint: true,
                scrollY:0,scrollX:0,x:0,y:0
            }).then((canvas) => {
                const link = document.createElement("a");
                link.download = exportNameGetter()+ ".png";
                link.href = canvas.toDataURL("image/png");
                link.click();
                // 清理临时元素
                document.body.removeChild(tempContainer);
            }).finally(()=>{
                setLoading(false)
            });
        }
    };

    const [openImportModal, setOpenImportModal] = useState(false)
    const [importData, setImportData] = useState<string>()
    const [showSettingModal, setShowSettingModal] = useState(false)

    return (
        <>
            <div className={'app-left'}>
                <div className={'view-box'} >
                    <div className={'view'}>
                        <div className={'pre-view'} style={{transform: "scale(" + (scale / 100) + ")"}}>
                            {preViewRender(canvasRef)}
                        </div>
                    </div>
                    <div className={'view-tool'}>
                        <Space vertical>
                            {preViewButtonRender()}
                            <Button variant="filled" icon={<IoMdSettings />} onClick={()=>setShowSettingModal(true)} />
                        </Space>
                    </div>
                </div>
                <div className={'view-bottom'}>
                    <Row align={"middle"} >
                        <Col>
                            {preViewBottomRender()}
                        </Col>
                        <Col flex={"auto"}/>
                        <Col>
                            <Space>
                                缩放
                                <Slider style={{width: 200}} value={scale} onChange={(value) => setScale(value)}
                                        max={100} min={25}/>
                                <div style={{width: '3rem', textAlign: "right", paddingRight: '1rem'}}>
                                    {scale}%
                                </div>
                            </Space>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className={'app-right'}>
                <div style={{textAlign: 'right', padding: '24px'}}>
                    <Row gutter={[8, 0]} wrap={false}>
                        <Col>
                            <Button key={'import'} onClick={() => {
                                setOpenImportModal(true)
                            }}>从不全书导入</Button>
                            {buttonRender()}
                        </Col>

                        <Col flex={"auto"}/>
                        <Col>
                            <Button onClick={handleConvert}>
                                导出为图片
                            </Button>
                        </Col>
                    </Row>
                </div>
                <div style={{flex: 1, overflowY: 'scroll', overflowX: 'hidden', padding: '0 24px'}}>
                    {children}
                </div>
            </div>
            <Modal title="快速导入"
                   open={openImportModal}
                   onCancel={() => {
                       setOpenImportModal(false)
                   }}
                   onOk={()=>{
                       handleImport(importData).then(()=>{setOpenImportModal(false)})
                           .catch((e: Error)=>{
                               notification.error({
                                   title: '导入失败',
                                   description: e.message,
                               })
                           })
                   }}
                   afterClose={() => {
                       setImportData(undefined)
                   }}
                   okText={'导入'}
            >
                <div>
                    <Input.TextArea value={importData} onChange={(e) => {setImportData(e.target.value)}} rows={15}/>
                </div>
            </Modal>
            <Modal title="设置"
                   open={showSettingModal}
                   onCancel={() => {setShowSettingModal(false)}}
                   onOk={() => {
                       onSettingSave().then(() => {
                           setShowSettingModal(false)
                       }).catch((e: Error)=>{
                           notification.error({
                               title: '保存设置失败',
                               description: e.message,
                           })
                       })
                   }}
                   afterOpenChange={afterSettingModalOpenChange}
            >
                {settingRender()}
            </Modal>

        </>
    )
}
export default BasePage