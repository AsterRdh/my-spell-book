import type {Character} from "../Types.ts";
import {useMemo} from "react";
import ClassIcon from "../../../icons/ClassIcons.tsx";
import {Col, Row, Space} from "antd";
import Strength from '../../../assets/icons/ability/strength.svg'
import Dexterity from '../../../assets/icons/ability/dexterity.svg'
import Constitution from '../../../assets/icons/ability/constitution.svg'
import Intelligence from '../../../assets/icons/ability/intelligence.svg'
import Wisdom from '../../../assets/icons/ability/wisdom.svg'
import Charisma from '../../../assets/icons/ability/charisma.svg'
import DemoPalyerImg from '../../../assets/图片1.png'
import type {CharacterAbilityType} from "../../../compoment/AbilityInput/AbilityInput.tsx";
import type {CharacterClassType} from "../../../compoment/ClassInput/ClassInput.tsx";


type CharacterBaseProps = {
    dataSource?: Character
    backgroundColor:string
    size: [number, number]
}
type ClassBoxProps = {
    clazz?: CharacterClassType
}
const ClassBox=({clazz}:ClassBoxProps)=>{
    const classIcon = clazz && clazz.classID || undefined
    return (
        <div className={'character-card-page-header-icon-box'}>
            <ClassIcon clazz={classIcon} className={'character-card-page-header-icon'}/>
            <div className={'character-card-page-header-icon-level'}>
                {clazz?.level}
            </div>
            <div style={{position:'relative',top:'-3rem'}}>
                {clazz?.subClass}
            </div>
        </div>
    )
}



type AttributeProps = {
    name:string
    ability?: CharacterAbilityType
}
const Attribute=({name, ability}:AttributeProps)=>{
    const modifier = ability && ability.modifier ?
        ability.modifier<0? ability.modifier:("+"+ability.modifier) : ''
    const icon = useMemo(() => {
        switch (name) {
            case 'STR':
                return Strength
            case 'DEX':
                return Dexterity
            case 'CON':
                return Constitution
            case 'INT':
                return Intelligence
            case 'WIS':
                return Wisdom
            case 'CHA':
                return Charisma
        }
    }, [name]);

    return (
        <div className={'character-card-page-header-ability-box-item'}>
            <div style={{position:'relative'}}>
                <img src={icon} alt={name} style={{height:'15rem',width:'15rem'}}/>
                <div className={'character-card-page-header-ability-box-item-value'} >
                    <div className={'modifier-box'}  style={{borderStyle:ability?.saving?'solid': 'double'}}>{modifier}</div>
                    <div className={'score-box'}  style={{borderStyle:ability?.saving?'solid': 'double'}}>{ability?.score}</div>
                </div>
            </div>
            <div>{name}</div>
        </div>
    )
}

export default function CharacterBase(props:CharacterBaseProps){
    // const {dataSource} = props

    return(
        <div style={{width:props.size[0], height:props.size[1],backgroundColor:props.backgroundColor}} className={'character-card-page-left'}>
            <div className={'character-card-base-page'}>
                <Space vertical={ true}>
                    <div className={'character-card-page-header-icon-box'}>
                        <ClassBox clazz={{classID:'wizard',level:1,subClass:'塑能学派'}}/>
                    </div>
                    <div className={'character-card-page-header-icon-box'}>
                        <ClassBox clazz={{classID:'ranger',level:1}}/>
                    </div>
                </Space>
                <div className={'character-card--base-page-left'}>
                    <div className={'character-card-page-header-name'} >
                        Miserans 弥瑟兰
                    </div>
                    <div className={'character-card-page-header-ability-box'}>
                        <Row gutter={[10,10]}>
                            <Col span={6}>
                                <Attribute name={'STR'}/>
                            </Col>
                            <Col span={6}>
                                <Attribute name={'DEX'}/>
                            </Col>
                            <Col span={6}>
                                <Attribute name={'CON'}/>
                            </Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                            <Col span={6}>
                                <Attribute name={'INT'}/>
                            </Col>
                            <Col span={6}>
                                <Attribute name={'WIS'}/>
                            </Col>
                            <Col span={6}>
                                <Attribute name={'CHA'}/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <img style={{position:'absolute',left:0,bottom:0,width:'50%'}}
                 alt={'character-card-page-left-background'}
                 src={DemoPalyerImg}
            />

        </div>
    )
}