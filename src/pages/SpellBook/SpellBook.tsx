import {useForm} from "antd/es/form/Form";
import {
    type AjaxResultType,
    type SpellSchoolType,
    type SpellType,
    type SelectOptionType,
    type PageSetting, SizeScaling
} from "../../types/DataType.ts";
import {Button, Col, Form, Input, InputNumber, Modal, Row, Select, Slider, Space, Spin} from "antd";
import {useEffect, useMemo, useRef, useState} from "react";
import useNotification from "antd/es/notification/useNotification";
import html2canvas from "html2canvas";
import {defaultBook, defaultData} from "./DefaultData.ts";

import SpellCard from "./compoments/SpellCard.tsx";
import SpellForm from "./compoments/SpellForm.tsx";
import './SpellBook.css'
import {IoMdSettings} from "react-icons/io";
import {useDNDBook} from "../../hooks/useDNDBook.tsx";
let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;
type mapType= Record<string, string>;
const toURLSearchParams = <T extends mapType>(record: T) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(record)) {
        params.append(key, value);
    }
    return params;
};
type SpellBookSetting = PageSetting


export default function SpellBook() {
    const [form] = useForm<SpellType>();
    const spellValues = Form.useWatch([], form);
    const okSave = useMemo(() => {
        return  !spellValues || spellValues.name !== 'Spell'
    }, [spellValues]);

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
                schoolID: school.id,
                castingTime: castingTime,
                range: rangeStr,
                duration: durationStr,
                needVerbal: needV,
                needSomatic: needS,
                needMaterial: needM,
                material: materialStr,
                baseDescription: description.join('\n\n'),
                upgradeDescription: upgradeStr,
                fromBookID:defaultBook.id
            }
            form.setFieldsValue(spell)
            setOpenImportModal(false)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }catch  (_unused_error: unknown){
            notification.error({
                title: '导入失败',
                description: '请检查输入的法术信息是否正确'
            })
        }

    }

    const [scale, setScale] = useState(100)


    const {books,bookOptions} = useDNDBook(notification);

    const [schools, setSchools] = useState<{[key:string]:SpellSchoolType}>({})
    const [schoolOptions, setSchoolOptions] = useState<SelectOptionType<SpellSchoolType>[]>([])
    const loadSchool = () => {
        return fetch('/SpellBook/dnd/getSpellSchool')
            .then(res=>res.json())
            .then( (data:AjaxResultType<{[key:string]:SpellSchoolType}>)=>{
                if (data.success){
                    const schoolData = data.data
                    setSchools(schoolData)
                    const options:SelectOptionType<SpellSchoolType>[]=Object.values(schoolData).map(school=>{
                        const option:SelectOptionType<SpellSchoolType> = {
                            label:school.name,
                            value:school.id,
                            data:school
                        }
                        return option
                    });
                    setSchoolOptions(options)
                }
            })

    };

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true)
        Promise.all([
            loadSchool(),
        ]).finally(()=>{
            setLoading(false)
        })
    },[])


    const [searchData, setSearchData] = useState<SelectOptionType<SpellType>[]>([]);
    const [searchValue, setSearchValue] = useState<string>();

    const handleSearch = (newValue: string) => {
        fetchSearchData(newValue, setSearchData);
    };

    const fetchSearchData = (value: string, callback: (data: SelectOptionType<SpellType>[]) => void) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        const params = toURLSearchParams({ name: value });

        const fake = () => {
            fetch(`/SpellBook/dnd/getSpells?${params.toString()}`)
                .then((response) => response.json())
                .then((res: AjaxResultType<SpellType[]>) => {
                    if (currentValue === value) {
                        const data = (res.data||[]).map(spell=> {
                            return {
                                label: spell.name + " " + spell.cnName,
                                value: spell.id,
                                data: spell
                            } as SelectOptionType<SpellType>
                        })
                        console.log("/dnd/getSpells", data)
                        callback(data);
                    }
                });
        };
        if (value) {
            timeout = setTimeout(fake, 300);
        } else {
            callback([]);
        }
    };

    const handleChange = (newValue: string,option?: SelectOptionType<SpellType> | SelectOptionType<SpellType> []) => {
        setSearchValue(newValue);
        if(option){
            let spell:SpellType
            if (Array.isArray(option)){
                spell = option[0].data
            }else {
                spell = option.data
            }
            if ( spell){
                form.resetFields()
                form.setFieldsValue(spell)
            }

        }
    };
    const [showSettingModal, setShowSettingModal] = useState(false)
    const [pageSize, setPageSize] = useState<[number, number]>([10,12.8])
    const [settingForm] = useForm<SpellBookSetting>()

    return (
        <>
            <div className={'app-left'}>
                <div className={'view-box'} >
                    <div className={'view'}>
                        <div className={'pre-view'} style={{transform: "scale(" + (scale / 100) + ")"}}>
                            <SpellCard spell={spellValues}
                                       ref={canvasRef}
                                       dataSet={{
                                           schools: schools,
                                           books: books
                                       }}
                                       size={[SizeScaling[0]*pageSize[0], SizeScaling[1]*pageSize[1]]}
                            />
                        </div>
                    </div>
                    <div className={'view-tool'}>
                        <Space vertical={true} >
                            <Button variant="filled" icon={<IoMdSettings />} onClick={()=>setShowSettingModal(true)} />
                        </Space>
                    </div>
                </div>
                <div>
                    <Row align={"middle"} >
                        <Col >
                            <div style={{marginLeft: '1rem'}}>
                                {pageSize[0]}×{pageSize[1]}(cm)
                            </div>
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
                    <Row gutter={[8, 0]}>
                        <Col>
                            <Button onClick={() => {
                                form.submit()
                            }} disabled={!okSave}>
                                上传
                            </Button>
                        </Col>
                        <Col>
                            <Button onClick={() => {
                                form.resetFields();
                                setSearchValue(undefined)
                            }}>
                                重置
                            </Button>
                        </Col>
                        <Col flex={"auto"}>
                            <Select
                                showSearch={{filterOption: false, onSearch: handleSearch}}
                                value={searchValue}
                                placeholder={"搜索法术"}
                                style={{width: '100%', minWidth: '200px'}}
                                defaultActiveFirstOption={false}
                                suffixIcon={null}
                                onChange={handleChange}
                                notFoundContent={null}
                                options={searchData}
                                variant={"underlined"}
                                allowClear={true}
                            />

                        </Col>
                        <Col>
                            <Button onClick={() => {
                                setOpenImportModal(true)
                            }}>
                                快速导入
                            </Button>
                        </Col>
                        <Col>
                            <Button onClick={handleConvert}>
                                导出为图片
                            </Button>
                        </Col>
                    </Row>
                </div>
                <div style={{flex: 1, overflowY: 'scroll', overflowX: 'hidden', padding: '0 24px'}}>
                    <SpellForm
                        form={form}
                        schoolOptions={schoolOptions}
                        bookOptions={bookOptions}
                        initialValues={defaultData}
                    />

                </div>
            </div>
            <Modal title="快速导入"
                   open={openImportModal}
                   onCancel={() => {
                       setOpenImportModal(false)
                   }}
                   onOk={handleImport}
                   afterClose={() => {
                       setImportData(undefined)
                   }}
                   okText={'导入'}
            >
                <div>
                    <Input.TextArea value={importData} onChange={(e) => {
                        setImportData(e.target.value)
                    }}
                                    rows={15}
                    />
                </div>
            </Modal>
            <Modal title="设置"
                   open={showSettingModal}
                   onCancel={() => {
                       setShowSettingModal(false)
                   }}
                   onOk={() => {
                       settingForm.submit()
                   }}
                   afterOpenChange={() => {
                       settingForm.setFieldsValue({
                           pageSize: {width: pageSize[0], height: pageSize[1]}
                       })
                   }}
            >
                <Form<SpellBookSetting>
                    form={settingForm}
                    initialValues={{pageSize: {width: 10, height: 12.8}}}
                    onFinish={setting=>{
                        const {width, height} = setting.pageSize;
                        setPageSize([width, height])
                        setShowSettingModal(false)
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
                </Form>
            </Modal>
            {message}
            <Spin fullscreen={true} spinning={loading}/>
        </>
    )
}