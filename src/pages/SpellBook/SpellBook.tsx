import {useForm} from "antd/es/form/Form";
import {
    type AjaxResultType,
    type SpellType,
    type SelectOptionType,
    type PageSetting
} from "../../types/DataType.ts";
import {Button, Col, ColorPicker, Form, InputNumber, Select, Space} from "antd";
import { useContext, useMemo, useState} from "react";
import {defaultBook, defaultData} from "./DefaultData.ts";

import SpellCard from "./compoments/SpellCard.tsx";
import SpellForm from "./compoments/SpellForm.tsx";
import './SpellBook.css'
import BasePage from "../BasePage.tsx";
import {AppContext} from "../../AppContext.ts";

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
    const {notification,dndBook,dndSpellSchool,setting,setSetting} = useContext(AppContext)

    const [form] = useForm<SpellType>();
    const spellValues = Form.useWatch([], form);
    const okSave = useMemo(() => {return  !spellValues || spellValues.name !== 'Spell'}, [spellValues]);

    const handleImport = (importData?:string) => {
        if (!importData) {
            return Promise.resolve();
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
            return Promise.resolve();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }catch  (_unused_error: unknown){

            notification?.error({
                title: '导入失败',
                description: '请检查输入的法术信息是否正确'
            })
            return Promise.reject()
        }

    }
    const {books,bookOptions} = dndBook;
    const {schools,schoolOptions} = dndSpellSchool;

    const [searchData, setSearchData] = useState<SelectOptionType<SpellType>[]>([]);
    const [searchValue, setSearchValue] = useState<string>();
    const handleSearch = (newValue: string) => {fetchSearchData(newValue, setSearchData);};
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


    const [settingForm] = useForm<SpellBookSetting>()
    const {pageSize} = setting;

    return (
        <>
            <BasePage
                preViewRender={(ref) => {
                    return <SpellCard spell={spellValues}
                               ref={ref}
                               dataSet={{schools: schools, books: books}}
                    />
                }}
                exportNameGetter={() => {
                    return spellValues.name + " " + spellValues.cnName
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
                    return<Form<SpellBookSetting>
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
                buttonRender={()=>{
                    return <>
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

                    </>
                }}
                handleImport={handleImport}

            >
                <SpellForm
                    form={form}
                    schoolOptions={schoolOptions}
                    bookOptions={bookOptions}
                    initialValues={defaultData}
                />
            </BasePage>
        </>
    )
}