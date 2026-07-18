import type {Character} from "../Types.ts";
import type {ReactNode} from "react";
import {
    GiD10,
    GiD12,
    GiDeathSkull, GiDiceEightFacesEight,
    GiHealthIncrease,
    GiHearts,
    GiMagicShield, GiPerspectiveDiceSix
} from "react-icons/gi";
import {Col, Row, Space} from "antd";
import { IoFootsteps, IoShield, IoSkullOutline } from "react-icons/io5";
import {FaHeartCircleBolt} from "react-icons/fa6";
import {RiSwordFill} from "react-icons/ri";
import { BiSolidMagicWand } from "react-icons/bi";
import {FaRegHeart} from "react-icons/fa";
import {IoIosRadioButtonOff, IoIosRadioButtonOn} from "react-icons/io";
import type {CharacterSkillType} from "../../../compoment/SkillInput/SkillInput.tsx";
import {PiCircleBold, PiCircleFill, PiCircleHalfTiltFill} from "react-icons/pi";
import {MdOutlineAir} from "react-icons/md";

type CharacterBaseProps = {
    dataSource?: Character
    size: [number, number]
    backgroundColor:string

}
type OtherAttributeBoxProps={
    icon:ReactNode|ReactNode[],
    name?:string,
    children?:ReactNode|ReactNode[]
    multiLine?:boolean
    
}
const OtherAttributeBox=({icon,name,children,multiLine}:OtherAttributeBoxProps)=>{

    const childrenNode:ReactNode[] = (children && (Array.isArray( children)?children : [ children])) || []

    return(
        <div className={'character-card-page-other-attribute'}>
            <div className={'other-attribute-value-box'}>
                {
                    icon && (
                        Array.isArray( icon)?
                            icon.map((icon,index)=>(
                               <>
                                   <div className={'other-attribute-icon-box'+(index==0?' first':'') } key={"other-attribute-"+index} >
                                       {icon}
                                   </div>
                                   <div className={'other-attribute-value-text-box'} key={"other-attribute-value"+index}>
                                       {childrenNode[index]}
                                   </div>
                               </>
                            ))
                        : (
                            <>
                                <div className={'other-attribute-icon-box first'}>
                                    {icon}
                                </div>
                                {multiLine?
                                    childrenNode.map((child,index)=>(
                                        <div className={'other-attribute-value-text-box'+(Array.isArray(childrenNode)? ' multi-line':'')} key={ index}>
                                            {child}
                                        </div>
                                    ))
                                    :
                                    <div className={'other-attribute-value-text-box'}>
                                        {childrenNode}
                                    </div>
                                }
                            </>
                        )
                    )
                }


            </div>
            {
                name && (
                    <div className={'other-attribute-name-box'}>
                        {name}
                    </div>
                )
            }
        </div>
    )
}
const randerSkill=(name: string,skill?:CharacterSkillType)=>{
    let skillProficiencyIcon = <PiCircleBold />
    if (skill?.proficiency){
        switch ( skill.proficiency){
            case 'proficiency':skillProficiencyIcon = <IoIosRadioButtonOn /> ;break;
            case 'expertise': skillProficiencyIcon = <PiCircleFill />;break;
            case 'JAT': skillProficiencyIcon = <PiCircleHalfTiltFill />;break;
        }
    }
    return(
        <div className={'skill-table-row'}>
            <div className={'skill-table-cell radio-cell'}>{skillProficiencyIcon}</div>
            <div className={'skill-table-cell name-cell'}>{name}</div>
            <div className={'skill-table-cell value-cell'}>{skill?.value}</div>
            <div className={'skill-table-cell other-value-cell'} >{skill?.otherValue}</div>
        </div>
    )
}

export default function CharacterSkill(props:CharacterBaseProps){
    const characterData = props.dataSource

    const getDiceIcon=(dice:'d6'|'d8'|'d10'|'d12'|undefined)=>{
        let icon:ReactNode|undefined = undefined;
        switch ( dice){
            case 'd6':icon = <GiPerspectiveDiceSix />;break;
            case 'd8':icon = <GiDiceEightFacesEight />;break;
            case 'd10': icon = <GiD10 />;break;
            case 'd12':icon = <GiD12 />;break;
        }
        return icon
    }

    return(
        <div style={{width:props.size[0], height:props.size[1],backgroundColor:props.backgroundColor}} className={'character-card-page-right'}>
            <div>
                熟练加值：{characterData?.proficiencyBonus}
            </div>
            <div style={{display:'flex'}}>
                <div style={{flex:1,paddingRight:10}}>
                    <Row gutter={[20,20]}>
                        <Col span={24}> <OtherAttributeBox icon={<IoShield />} multiLine={true}>
                            {characterData?.ac }
                            {characterData?.acPS }
                        </OtherAttributeBox></Col>
                        <Col span={24}> <OtherAttributeBox icon={<IoFootsteps />}>
                            <div >
                                {characterData?.speed?.split("\n").map((item,index, array)=>(
                                    <div key={index} style={{fontSize:array.length>1?'2rem':undefined}}>{item}</div>
                                ))}
                            </div>

                        </OtherAttributeBox></Col>
                        <Col span={24}> <OtherAttributeBox icon={<RiSwordFill />}>{characterData?.initiative}</OtherAttributeBox></Col>
                        {
                            characterData?.spell?.hit && (
                                <Col span={24}> <OtherAttributeBox icon={[<BiSolidMagicWand />,<GiMagicShield />]}>
                                    <div>{characterData?.spell?.hit}</div>
                                    <div>{characterData?.spell?.dc}</div>
                                </OtherAttributeBox></Col>
                            )
                        }
                        {
                            characterData?.monk?.martialArtsDie && (
                                <Col span={24}> <OtherAttributeBox icon={<MdOutlineAir />} multiLine>
                                    <div>{
                                        getDiceIcon(characterData?.monk?.martialArtsDie)
                                    }</div>
                                    <div style={{lineHeight:'1.5rem',padding:'0.5rem'}}>{
                                        characterData?.monk?.qi && Array.from({length:characterData?.monk?.qi},()=><IoIosRadioButtonOff style={{fontSize:'1.5rem'}}/>)
                                    }</div>
                                </OtherAttributeBox></Col>
                            )
                        }

                    </Row>
                </div>
                <div style={{flex:1,paddingLeft:10}}>
                    <Row gutter={[20,20]}>
                        <Col span={24}> <OtherAttributeBox icon={<GiHearts />} multiLine>
                            <div>{characterData?.hp }</div>
                            <div>{characterData?.hpMax }</div>
                        </OtherAttributeBox></Col>

                        <Col span={24}> <OtherAttributeBox icon={<FaHeartCircleBolt />}>{characterData?.hpTemp}</OtherAttributeBox></Col>

                        <Col span={24}> <OtherAttributeBox icon={<GiHealthIncrease />} multiLine={true}>
                            {characterData?.hpDice?.map(({dice,num},index)=>{
                                const icon=getDiceIcon(dice)
                                return(
                                    <Space key={"hpDice"+index} align={'center'}>
                                        <div style={{position:'relative',top:10}}>{icon}</div>
                                        <div style={{lineHeight:'1.5rem',padding:'0.5rem'}}>{
                                            num && Array.from({length:num},()=><IoIosRadioButtonOff style={{fontSize:'1.5rem'}}/>)
                                        }</div>
                                    </Space>
                                )
                            })}
                        </OtherAttributeBox></Col>

                        <Col span={24}> <OtherAttributeBox icon={<GiDeathSkull />}>
                            <IoSkullOutline />
                            <IoSkullOutline />
                            <IoSkullOutline />
                            <FaRegHeart />
                            <FaRegHeart />
                            <FaRegHeart />
                        </OtherAttributeBox></Col>
                    </Row>
                </div>

            </div>
            <div className={'character-card-page-skill-box'}>
                <div className={'skill-box-col'}>
                    <div className={'skill-table'}>
                        <div className={'skill-table-title skill-table-row'}>力量系</div>
                        {randerSkill("运动",characterData?.skills?.athletics)}
                    </div>

                    <div className={'skill-table'}>
                        <div className={'skill-table-title skill-table-row'}>敏捷系</div>
                        {randerSkill("特技",characterData?.skills?.acrobatics)}
                        {randerSkill("巧手",characterData?.skills?.sleightOfHand)}
                        {randerSkill("隐匿",characterData?.skills?.stealth)}

                    </div>
                    <div className={'skill-table'}>
                        <div className={'skill-table-title skill-table-row'}>智力系</div>
                        {randerSkill("奥秘",characterData?.skills?.arcana)}
                        {randerSkill("历史",characterData?.skills?.history)}
                        {randerSkill("调查",characterData?.skills?.investigation)}
                        {randerSkill("自然",characterData?.skills?.nature)}
                        {randerSkill("宗教",characterData?.skills?.religion)}

                    </div>
                </div>
                <div className={'skill-box-col'}>
                    <div className={'skill-table'}>
                        <div className={'skill-table-title skill-table-row'}>感知系</div>
                        {randerSkill("洞悉",characterData?.skills?.insight)}
                        {randerSkill("察觉",characterData?.skills?.perception)}
                        {randerSkill("生存",characterData?.skills?.survival)}
                        {randerSkill("驯兽",characterData?.skills?.animalHandling)}
                        {randerSkill("医药",characterData?.skills?.medicine)}

                    </div>
                    <div className={'skill-table'}>
                        <div className={'skill-table-title skill-table-row'}>魅力系</div>
                        {randerSkill("欺瞒",characterData?.skills?.deception)}
                        {randerSkill("威吓",characterData?.skills?.intimidation)}
                        {randerSkill("表演",characterData?.skills?.performance)}
                        {randerSkill("游说",characterData?.skills?.persuasion)}


                    </div>
                </div>
            </div>
        </div>
    )
}