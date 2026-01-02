import './App.css'
import {Button, Checkbox, Col, Form, Input, InputNumber, Modal, Row, Space} from "antd";
import {useForm} from "antd/es/form/Form";
import type {SpellType} from "./types/DataType.ts";
import {defaultBook, schoolsOptions, TestData} from "./data/TestData.ts";
import SpellCard from "./compoments/SpellCard.tsx";
import SchoolSelect from "./compoments/SchoolSelect.tsx";
import html2canvas from 'html2canvas';
import {useRef, useState} from "react";
import useNotification from "antd/es/notification/useNotification";
function App() {

    const [form] = useForm<SpellType>();
    const spellValues = Form.useWatch([], form);
    const [notification, message] = useNotification();


    const canvasRef = useRef(null);
    const handleConvert = () => {
        if (canvasRef.current){
            html2canvas(canvasRef.current, {useCORS: true,}).then((canvas) => {
                const link = document.createElement("a");
                link.download = (spellValues.name||'spell')+" "+(spellValues.cnName||'法术')+ ".png";
                link.href = canvas.toDataURL("image/png");
                link.click();
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
            const school = schoolsOptions.find(s=>s.name === schoolStr) || schoolsOptions[0];

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
                school: school,
                castingTime: castingTime,
                range: rangeStr,
                duration: durationStr,
                needVerbal: needV,
                needSomatic: needS,
                needMaterial: needM,
                material: materialStr,
                baseDescription: description.join('\n\n'),
                upgradeDescription: upgradeStr,
                fromBook: {...defaultBook}
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

    return (
      <div className={'app'}>
        <div className={'app-left'}>
            <div className={'view'}>
                <div className={'pre-view'}>
                  <SpellCard spell={spellValues} ref={canvasRef}/>
                </div>
            </div>
            <div>
            1
            </div>
        </div>
        <div className={'app-right'}>
            <div style={{textAlign: 'right',marginBottom: '1rem'}}>
                <Space>
                    <Button onClick={()=>{setOpenImportModal(true)}}>
                        快速导入
                    </Button>
                    <Button onClick={handleConvert}>
                        转换
                    </Button>
                </Space>
            </div>
            <div style={{flex: 1, overflowY: 'scroll',overflowX: 'hidden'}}>
                <Form<SpellType> form={form} initialValues={TestData}>
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
                        <Form.Item label="法术学派" name={'school'}>
                            <SchoolSelect/>
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

                        <Form.Item label="材料" name={'material'} dependencies={['needMaterial']} hidden={!spellValues?.needMaterial}>
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

                    <Form.Item label="法术描述" name={'baseDescription'} layout={'vertical'}>
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item label="法术升级描述" name={'upgradeDescription'} layout={'vertical'}>
                        <Input.TextArea/>
                    </Form.Item>

                </Form>
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
      </div>
    )
}

export default App
