import {Button, Checkbox, Col, Divider, Drawer, Form, Input, InputNumber, Radio, Row, Select, Space, Tag} from "antd";
import type {Item, ItemComponentRule, ItemComponentRuleType, UnitFormula, UnitValue} from "./Types.ts";
import {useForm, useWatch} from "antd/es/form/Form";
import {ItemComponentRuleTypeOptions, ItemRarities, priceUnit, tags, weightUnit} from "./DemoData.ts";
import React, {forwardRef, useEffect, useImperativeHandle, useMemo, useState} from "react";
import type { DefaultOptionType} from "@rc-component/select/lib/Select";
import {RiDeleteRow} from "react-icons/ri";
import {GoNumber} from "react-icons/go";
import {TbNumber123} from "react-icons/tb";

type ItemAttunementTagInputProps={
    value?:string,
    onChange?:(newValue:string)=>void
}
const ItemAttunementTagInput=(props:ItemAttunementTagInputProps)=>{
    const {value,onChange}=props
    const removeTag=(tag:string)=>{
        const tagNames=(value && value.split(",") || [])
        const newTags = tagNames.filter(tagName=> tagName !== tag)
        onChange?.(newTags.join(","))
    }
    const tags = useMemo(() => {
        const tagNames=(value && value.split(",") || [])
        return tagNames.map(tag=>{
            return (
                <Tag key={'item-tag-'+tag} closable onClose={()=>removeTag(tag)}>
                    {tag}
                </Tag>
            )
        })
    }, [value,removeTag]);

    const [inputValue, setInputValue] = useState<string>()

    const submitTag=()=>{
        if (!inputValue || !inputValue.trim()){
            setInputValue(undefined)
            return
        }

        const hasInputTags=value && value.split(",") || []
        if (hasInputTags.find(tagName=>tagName == inputValue)){
            setInputValue(undefined)
            return
        }else {
            onChange?.(value ? (value+","+inputValue) : inputValue)
            setInputValue(undefined)
        }
    }

    return (
        <div>
            <Input value={inputValue}
                   onChange={(e)=>setInputValue(e.target.value)}
                   prefix={<Space>{tags}</Space>}
                   onPressEnter={submitTag}
                   onBlur={()=>{
                       setInputValue(undefined)
                   }}
            />
        </div>
    )
}

type UnitValuesInputProps={
    unitOptions:DefaultOptionType[],
    defUnit:string
    value?:UnitValue
    onChange?:((values:UnitValue)=>void)
    remove: (index: (number | number[])) => void
    index:number
}
const ItemUnitValuesInput=(props:UnitValuesInputProps)=>{
    const {unitOptions,value,onChange,defUnit} = props

    useEffect(()=>{
        onChange?.({
            unit:defUnit,
            value:0,
            denominator:1
        })
    },[])

    const [isFraction,integral,numerator,denominator] = useMemo(() => {
        const denominator = value && value.denominator ;
        const valeValue = value && value.value ;
        const isFraction = denominator !==null && denominator !== undefined && denominator !== 1
        const integral = isFraction ? (
            (denominator && valeValue) ? Math.floor(valeValue / denominator) : valeValue
        ) : valeValue
        const numerator = isFraction?(
            (denominator && valeValue) ? valeValue % denominator : null
        ) : null

        return [isFraction,integral,numerator,denominator]
    }, [value]);

    const submitChange=(newValue:{integral?:number|null,numerator?:number|null,denominator?:number|null,unit?:string})=>{
        const  submitNewValue ={...value};

        const keys= Object.keys(newValue)

        keys.forEach(key=>{
            if (key=='unit'){
                submitNewValue.unit = newValue.unit
            }else if (key=='denominator') {
                submitNewValue.denominator = newValue.denominator
            }else if (key == 'integral') {
                const denominator = submitNewValue.denominator
                const newIntegral = newValue.integral
                if (newIntegral){
                    if (denominator && denominator>1){
                        const numerator = (submitNewValue.value || 0) % denominator
                        submitNewValue.value = newIntegral * denominator + numerator
                    }else {
                        submitNewValue.value = newIntegral
                    }
                }else {
                    submitNewValue.value = null
                }
            }else if (key == 'numerator') {
                const denominator = submitNewValue.denominator
                const value = submitNewValue.value || 0
                const newNumerator = newValue.numerator || 0
                if ( denominator && denominator > 1){
                    const oldIntegral = Math.floor(value / denominator)
                    const oldNumerator = value - oldIntegral * denominator
                    const newtTempNumerator = newNumerator - oldNumerator
                    submitNewValue.value = value + newtTempNumerator
                }else {
                    return
                }
            }
        })

        onChange?.(submitNewValue)
    }

    return(
        <div style={{display:"flex"}}>
            <div style={{display:"flex",marginRight:4,alignItems:"center",justifyContent:'center'}}>
                <div style={{marginRight:4}}>
                    <InputNumber style={{textAlign:'center'}} variant={"filled"} value={integral} onChange={(newValue)=>{submitChange({integral:newValue})}}/>
                </div>

                <div style={{marginRight:4}}>
                    {
                        isFraction?(
                            <div>
                                <div>
                                    <InputNumber style={{textAlign:'center'}} variant={"filled"} value={numerator} onChange={(value)=> submitChange({numerator:value})}/>
                                </div>
                                <Divider style={{marginTop:4,marginBottom:4}}/>
                                <div>
                                    <InputNumber style={{textAlign:'center'}} variant={"filled"}
                                                 value={denominator}
                                                 onChange={(value)=> submitChange({denominator:value||1})}/>
                                </div>
                            </div>
                        ):''
                    }
                </div>
            </div>
            <div  style={{display:"flex",marginRight:4,flex:1}}>
                <Select variant={'filled'} options={unitOptions} value={value?.unit}
                        onChange={(newUnit)=>{submitChange({unit:newUnit})}}
                        defaultValue={props.defUnit}
                        style={{width:'6rem'}}
                />
            </div>
            <Space>
                <Button icon={<RiDeleteRow/>} onClick={()=>props.remove(props.index)}/>
                <Button icon={isFraction?<TbNumber123 /> :<GoNumber />} onClick={()=>{
                    if (isFraction) {
                        const newValue=value?.value != undefined && value.value
                        if (newValue) {
                            if (value?.denominator) {
                                submitChange({denominator: 1,integral:Math.floor(newValue/value.denominator)})
                            }else {
                                submitChange({denominator: 1})
                            }
                        }else {
                            submitChange({denominator: 1})
                        }
                    }else {
                        const newValue=value?.value != undefined  && value.value
                        if (newValue) {
                            submitChange({denominator: 2,integral:newValue,numerator:0})
                        }else {
                            submitChange({denominator: 2})
                        }
                    }
                }}/>
            </Space>
        </div>
    )
}

type ItemComponentRuleInputProps={
    key?:React.Key
    value?:ItemComponentRule
    onChange?:((values:ItemComponentRule)=>void)
    index:number
    remove?: (index:number)=>void,
    handleAddSubRule?:()=>void
    handleRemoveSubRule?:(index:number)=>void
}

const ItemComponentRuleInput=(props:ItemComponentRuleInputProps)=>{
    const {value,onChange,key} = props
    const {index,remove,handleAddSubRule,handleRemoveSubRule} = props
    // const [ruleType, setRuleType] = useState<ItemComponentRuleType>()
    const submitChange=(newValue:ItemComponentRule)=>{
        onChange?.({...value,...newValue})
    }

    useEffect(() => {
        onChange?.({condition:'and',type:'tag'})
    }, []);

    const {type,condition,subRule} = value || {}


    
    const addRule = () => {
        if (handleAddSubRule){
            handleAddSubRule()
        }else {
            submitChange({subRule:[...(subRule || []),{}]})
        }
    }

    const removeRule = (index:number) => {
        if (handleRemoveSubRule){
            handleRemoveSubRule(index)
        }else {
            remove?.(index)
        }
    }


    return(
        <div>
            <Row wrap={false} gutter={[8,4]} style={{minWidth:500}} align={'middle'}>
                <Col flex={'5rem'}>
                    {
                        index > 0 && <Select options={[{label:'&&', value:'and'},{label:'||', value:'or'}]}
                                             variant={"filled"}
                                             value={condition}
                                             onChange={(newValue)=>{submitChange({condition:newValue})}}
                        />
                    }
                </Col>
                <Col flex={'auto'}>
                    <Radio.Group options={ItemComponentRuleTypeOptions}
                                 value={type}
                                 onChange={(newValue)=>{submitChange({type:(newValue.target.value as ItemComponentRuleType)})}}
                    />
                </Col>
                <Col>
                    <Button icon={<RiDeleteRow/>} onClick={()=>removeRule(props.index)}/>
                </Col>
            </Row>

            <div style={{marginTop:8,marginLeft:'5rem'}}>
                {
                    type === 'tag' && <Select/>
                }
                {
                    type === 'item' && <Select/>
                }
                {
                    type === 'group' && (
                        <div>
                            {subRule?.map((rule,index)=>{
                                return (<div style={{margin:'4px 0'}}>
                                <ItemComponentRuleInput
                                    key={key+"-"+index}
                                    value={rule}
                                    onChange={(newValue)=>{
                                        const newSubRule = [...subRule]
                                        newSubRule[index] = newValue
                                        submitChange({subRule:newSubRule})
                                    }}
                                    index={index}
                                    handleAddSubRule={()=>{
                                        const newRules = subRule?.map((subRule,subIndex)=>{
                                            if (subIndex == index){
                                                return {...subRule,subRule:[...(subRule.subRule||[]),{}]}
                                            }else {
                                                return subRule
                                            }
                                        })

                                        submitChange({subRule:newRules})
                                    }}
                                    handleRemoveSubRule={()=>{
                                        const newRules = subRule?.filter((_,subIndex)=>subIndex!=index)
                                        submitChange({subRule:newRules})
                                    }}
                                />
                                </div>)
                            })}
                            <Button onClick={addRule}>添加</Button>
                        </div>
                    )
                }
            </div>
        </div>

    )
}

type UnitValuesFormulaInputProps={
    unitOptions:DefaultOptionType[],
    defUnit:string
    value?:UnitFormula
    onChange?:((values:UnitFormula)=>void)
    remove: (index: (number | number[])) => void
    index:number
}
const UnitValuesFormulaInput=(props:UnitValuesFormulaInputProps)=>{
    const {unitOptions,onChange,defUnit} = props
    const {unit,value} = props.value || {}

    useEffect(()=>{
        onChange?.({
            unit:defUnit,
        })
    },[])

    const submitChange=(newValue:{value?:string,unit?:string})=>{
        onChange?.({...(props.value || {}), ...newValue})
    }

    return(
        <div style={{display:"flex"}}>
            <div style={{display:"flex",marginRight:4,alignItems:"center",justifyContent:'center'}}>
                <div  style={{display:"flex",marginRight:4,flex:1}}>
                    <Select variant={'filled'} options={unitOptions} value={unit}
                            onChange={(newUnit)=>{submitChange({unit:newUnit})}}
                            defaultValue={props.defUnit}
                            style={{width:'6rem'}}
                    />
                </div>
                <div style={{marginRight:4}}>
                    <Input variant={"filled"} value={value} onChange={(newValue)=>{submitChange({value:newValue.target.value})}}/>
                </div>

            <Space>
                <Button icon={<RiDeleteRow/>} onClick={()=>props.remove(props.index)}/>
            </Space>
        </div>
        </div>
    )
}


type ItemBuilderProps={

}

export type ItemBuilderRef={
    open:(initialValues?:Item)=>void
}


const ItemBuilder=forwardRef<ItemBuilderRef, ItemBuilderProps>((_, ref)=>{
    const [itemForm]=useForm<Item>()
    const [showItemBuilder, setShowItemBuilder] = useState(false)

    useImperativeHandle(ref, () => ({
        open: (initialValues?:Item) => {
            itemForm.resetFields()
            if (initialValues) itemForm.setFieldsValue(initialValues)
            setShowItemBuilder(true)
        },
    }));

    const isMagicItem = useWatch('isMagicItem',itemForm)
    const needAttunement = useWatch('needAttunement',itemForm)
    const isComponent = useWatch('isComponent',itemForm)
    const isFormulaPrice = useWatch(['component','price','ifFormula'],itemForm)
    const isFormulaWeight = useWatch(['component','weight','ifFormula'],itemForm)

    useEffect(()=>{
        if (!isMagicItem){
            itemForm.setFieldValue(['needAttunement'],false)
        }
    },[isMagicItem, itemForm])
    useEffect(()=>{
        if (!needAttunement){
            itemForm.setFieldValue(['attunementDescription'],null)
        }
    },[needAttunement, itemForm])

    const [itemValue, setItemValue] = useState<string>()

    return (
        <Drawer open={showItemBuilder} title="物品生成器"
                onClose={()=>setShowItemBuilder(false)}
                size={720}
                extra={ <Space>
                    <Button type={'primary'} onClick={()=>itemForm.submit()}> 保存 </Button>
                </Space>}
        >
            <div className={'item-builder'}>
                <Form<Item> form={itemForm} onFinish={(values)=>{setItemValue(JSON.stringify(values))}}>

                    <Form.Item name={['id']} label={"ID"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={['name']} label={"名称"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={['cnName']} label={"中文名称"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={['rarity']} label={"稀有度"}>
                        <Select options={ItemRarities}
                                showSearch={{ optionFilterProp: 'label' }}

                        />
                    </Form.Item>
                    <Form.Item name={['tag']} label={"标签"}>
                        <Select options={tags} mode={"tags"}/>
                    </Form.Item>
                    <Form.Item name={'isMagicItem'} label={'魔法物品'} valuePropName={'checked'}>
                        <Checkbox />
                    </Form.Item>
                    <Form.Item name={'needAttunement'} label={'需要同调'} valuePropName={'checked'} hidden={!isMagicItem}>
                        <Checkbox />
                    </Form.Item>
                    <Form.Item name={'attunementDescription'} label={'同调者标签'} hidden={!isMagicItem||!needAttunement}>
                        <ItemAttunementTagInput />
                    </Form.Item>
                    <Form.Item name={'isComponent'} label={'组合物品'} valuePropName={'checked'}>
                        <Checkbox />
                    </Form.Item>
                    <Form.Item label={'物品组合规则'} hidden={!isComponent}>
                        <Form.List name={['component','rule']}>
                            {(fields,  {add, remove})=>{
                                return [...fields.map((field,index)=>{
                                    return(
                                        <Form.Item {...field} key={'component'+field.key} >
                                            <ItemComponentRuleInput {...field} index={index} remove={remove}/>
                                        </Form.Item>
                                    )
                                }),(
                                    <Form.Item>
                                        <Button onClick={add}>添加</Button>
                                    </Form.Item>
                                )]
                            }}
                        </Form.List>
                    </Form.Item>
                    <Form.Item label={'重量'}>
                        <Form.Item label={'公式'} name={['component','weight','ifFormula']} hidden={!isComponent} valuePropName={'checked'}>
                            <Checkbox />
                        </Form.Item>
                        <Form.Item hidden={isFormulaWeight}>
                            <Form.List name={'wight'}>
                                {(fields,  {add, remove})=>{
                                    return [...fields.map((field,index)=>{
                                        return <Form.Item {...field} key={'class'+field.key} >
                                            <ItemUnitValuesInput remove={remove} index={index} unitOptions={weightUnit} defUnit='lb'/>
                                        </Form.Item>
                                    }),(
                                        <Form.Item>
                                            <Button onClick={add}>添加</Button>
                                        </Form.Item>
                                    )]
                                }}
                            </Form.List>
                        </Form.Item>

                        <Form.Item hidden={!isFormulaWeight}>
                            <Form.List name={['component','weight','formula']} >
                                {(fields,  {add, remove})=>{
                                    return [...fields.map((field,index)=>{
                                        return <Form.Item {...field} key={'weight-formula'+field.key} >
                                            <UnitValuesFormulaInput {...field} index={index} remove={remove}  unitOptions={weightUnit} defUnit='lb'/>
                                        </Form.Item>
                                    }),(
                                        <Form.Item>
                                            <Button onClick={add}>添加</Button>
                                        </Form.Item>
                                    )]
                                }}
                            </Form.List>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label={'价格'}>
                        <Form.Item label={'公式'} name={['component','price','ifFormula']} hidden={!isComponent} valuePropName={'checked'}>
                            <Checkbox />
                        </Form.Item>
                        <Form.Item hidden={isFormulaPrice}>
                            <Form.List name={'price'} >
                                {(fields,  {add, remove})=>{
                                    return [...fields.map((field,index)=>{
                                        return <Form.Item {...field} key={'class'+field.key} >
                                            <ItemUnitValuesInput remove={remove} index={index} unitOptions={priceUnit} defUnit='gp'/>
                                        </Form.Item>
                                    }),(
                                        <Form.Item>
                                            <Button onClick={add}>添加</Button>
                                        </Form.Item>
                                    )]
                                }}
                            </Form.List>
                        </Form.Item>

                        <Form.Item hidden={!isFormulaPrice}>
                            <Form.List name={['component','price','formula']} >
                                {(fields,  {add, remove})=>{
                                    return [...fields.map((field,index)=>{
                                        return (
                                            <Form.Item {...field} key={'price-formula'+field.key} >
                                                <UnitValuesFormulaInput {...field} index={index} remove={remove}  unitOptions={priceUnit} defUnit='gp'/>
                                            </Form.Item>
                                        )
                                    }),(
                                        <Form.Item>
                                            <Button onClick={add}>添加</Button>
                                        </Form.Item>
                                    )]
                                }}
                            </Form.List>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label={'描述'} name={'description'}>
                        <Input.TextArea/>
                    </Form.Item>
                </Form>
                <div>
                    {itemValue}
                </div>
            </div>
        </Drawer>
    )

})
export default  ItemBuilder