import './App.css'
import {Button, Col, Form, Input, Modal, Row, Slider, Space, Spin} from "antd";
import {useForm} from "antd/es/form/Form";
import type {SpellType} from "./types/DataType.ts";
import {bookOptions, books, defaultBook, schoolOptions, schools, TestData} from "./data/TestData.ts";
import SpellCard from "./compoments/SpellCard.tsx";
import html2canvas from 'html2canvas';
import {useRef, useState} from "react";
import useNotification from "antd/es/notification/useNotification";
import SpellForm from "./compoments/SpellForm.tsx";
function App() {

    const [form] = useForm<SpellType>();
    const spellValues = Form.useWatch([], form);
    const [notification, message] = useNotification();
    const [loading, setLoading] = useState(false)

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
            html2canvas(clonedComponent, {useCORS: true,}).then((canvas) => {
                const link = document.createElement("a");
                link.download = (spellValues.name||'spell')+" "+(spellValues.cnName||'法术')+ ".png";
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

    const handleImport = () => {
        if (!importData) {
            setOpenImportModal(false)
            return;
        }
        try{
            const lines = importData.split('\n');
            const lineIndexies:number[] = [0,1]
            const [cnName,name] = lines[0].split('｜');
            const line2 = lines[1].split( ' ');
            let level:number = 0;
            let schoolStr = line2[0];
            if (line2[0].endsWith('环')){
                const levelStr = line2[0].at(0);
                if (levelStr){
                    switch (levelStr){
                        case '一':
                            level = 1;
                            break;
                        case '二':
                            level = 2;
                            break;
                        case '三':
                            level = 3;
                            break;
                        case '四':
                            level = 4;
                            break;
                        case '五':
                            level = 5;
                            break;
                        case '六':
                            level = 6;
                            break;
                        case '七':
                            level = 7;
                            break;
                        case '八':
                            level = 8;
                            break;
                        case '九':
                            level = 9;
                            break;
                    }
                }
                schoolStr = line2[1]
            }
            schoolStr = schoolStr.substring(0,2);
            const school = schools[schoolStr]||schoolOptions[0].data;

            const time=lines.find((line,index)=>{
                if (line.startsWith('施法时间：')){
                    lineIndexies.push(index)
                    return true
                }
            })
            const castingTime = time?.substring(5)||''

            const range=lines.find((line, index)=>{
                if (line.startsWith('施法距离：')){
                    lineIndexies.push(index)
                    return true
                }
            })
            const rangeStr = range?.substring(5)||''

            const duration=lines.find((line,index)=>{
                if (line.startsWith('持续时间：')){
                    lineIndexies.push(index)
                    return true
                }
            })
            const durationStr = duration?.substring(5)||''
            const components=lines.find((line,index)=>{
                if (line.startsWith('法术成分：')){
                    lineIndexies.push(index)
                    return true
                }
            })
            const needV = !!components?.includes('V')
            const needS = !!components?.includes('S')
            const needM = !!components?.includes('M')
            let materialStr = ''
            if (components && needM){
                const materialIndex = components.indexOf('M（')
                const materialEndIndex = components.indexOf('）')
                materialStr = components.substring(materialIndex+2,materialEndIndex)
            }

            let maxIndex: number|undefined = undefined;
            const upgrade=lines.find((line,index)=>{
                if (line.startsWith('升环施法效应：')){
                    lineIndexies.push(index)
                    maxIndex = index
                    return true
                }
            })
            const upgradeStr = upgrade?.substring(7)||''

            const description:string[] = []
            lines.forEach((line,index)=>{
                if (!lineIndexies.includes( index)  && (maxIndex==undefined || index < maxIndex) ){
                    description.push(line)
                }
            })

            const spell:SpellType = {
                id: 0,
                name: name,
                cnName: cnName,
                level: level,
                school: school.id,
                castingTime: castingTime,
                range: rangeStr,
                duration: durationStr,
                needVerbal: needV,
                needSomatic: needS,
                needMaterial: needM,
                material: materialStr,
                baseDescription: description.join('\n\n'),
                upgradeDescription: upgradeStr,
                fromBook:defaultBook.id
            }
            form.setFieldsValue(spell)
            setOpenImportModal(false)
        }catch (e:any){
            notification.error({
                title: '导入失败',
                description: '请检查输入的法术信息是否正确'
            })
        }

    }

    const [scale, setScale] = useState(100)

    return (
      <div className={'app'}>
        <div className={'app-left'}>
            <div className={'view'}>
                <div className={'pre-view'} style={{transform:"scale("+(scale/100)+")"}}>
                  <SpellCard spell={spellValues} ref={canvasRef}
                             dataSet={{
                                 schools:schools,
                                 books:books
                             }}
                  />
                </div>
            </div>
            <div>
                <Row>
                    <Col flex={"auto"}/>
                    <Col>
                       <Space>
                           缩放
                           <Slider style={{width:200}} value={scale} onChange={(value)=>setScale(value)} max={100} min={25}/>
                           <div style={{width:'3rem',textAlign:"right"}}>
                               {scale}%
                           </div>
                       </Space>
                    </Col>

                </Row>
            </div>
        </div>
        <div className={'app-right'}>
            <div style={{textAlign: 'right',padding:'24px'}}>
                <Space>
                    <Button onClick={()=>{setOpenImportModal(true)}}>
                        快速导入
                    </Button>
                    <Button onClick={handleConvert}>
                        导出为图片
                    </Button>
                </Space>
            </div>
            <div style={{flex: 1, overflowY: 'scroll',overflowX: 'hidden',padding:'0 24px'}}>
                <SpellForm
                    form={form}
                    schoolOptions={schoolOptions}
                    bookOptions={bookOptions}
                    initialValues={TestData}
                />

            </div>
        </div>
          <Modal title="快速导入"
                 open={openImportModal}
                 onCancel={()=>{setOpenImportModal(false)}}
                 onOk={handleImport}
                 afterClose={()=>{setImportData(undefined)}}
                 okText={'导入'}
          >
              <div>
                  <Input.TextArea value={importData} onChange={(e)=>{setImportData(e.target.value)}}
                                  rows={15}
                  />
              </div>
          </Modal>
          {message}
          <Spin fullscreen={true} spinning={loading}/>
      </div>
    )
}

export default App
