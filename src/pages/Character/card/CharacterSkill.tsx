import type {Character} from "../Types.ts";
import type {ReactNode} from "react";
import {GiD10, GiDeathSkull, GiHealthIncrease, GiHearts, GiMagicShield} from "react-icons/gi";
import {Col, Row, Space} from "antd";
import { IoFootsteps, IoShield, IoSkullOutline } from "react-icons/io5";
import {FaHeartCircleBolt} from "react-icons/fa6";
import {RiSwordFill} from "react-icons/ri";
import { BiSolidMagicWand } from "react-icons/bi";
import {FaRegHeart} from "react-icons/fa";

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
                                   <div className={'other-attribute-icon-box'+(index==0?' first':'') } key={index} >
                                       {icon}
                                   </div>
                                   <div className={'other-attribute-value-text-box'} key={ index}>
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

export default function CharacterSkill(props:CharacterBaseProps){
    return(
        <div style={{width:props.size[0], height:props.size[1],backgroundColor:props.backgroundColor}} className={'character-card-page-right'}>
            <div>
                熟练加值：
            </div>
            <div>
                <Row gutter={[20,20]}>
                    <Col span={12}> <OtherAttributeBox icon={<IoShield />}>

                    </OtherAttributeBox></Col>
                    <Col span={12}> <OtherAttributeBox icon={<GiHearts />} multiLine>
                        <div></div>
                        <div></div>
                    </OtherAttributeBox></Col>
                    <Col span={12}> <OtherAttributeBox icon={<IoFootsteps />}></OtherAttributeBox></Col>
                    <Col span={12}> <OtherAttributeBox icon={<FaHeartCircleBolt />}></OtherAttributeBox></Col>
                    <Col span={12}> <OtherAttributeBox icon={<RiSwordFill />}></OtherAttributeBox></Col>
                    <Col span={12}> <OtherAttributeBox icon={<GiHealthIncrease />} multiLine={true}>
                        <Space><GiD10 /> 10</Space>
                        <Space><GiD10 /> 5</Space>
                    </OtherAttributeBox></Col>
                    <Col span={12}> <OtherAttributeBox icon={[<BiSolidMagicWand />,<GiMagicShield />]}>
                        <div></div>
                        <div></div>
                    </OtherAttributeBox></Col>
                    <Col span={12}> <OtherAttributeBox icon={<GiDeathSkull />}>
                        <IoSkullOutline />
                        <IoSkullOutline />
                        <IoSkullOutline />
                        <FaRegHeart />
                        <FaRegHeart />
                        <FaRegHeart />
                    </OtherAttributeBox></Col>
                </Row>
            </div>
            <div className={'character-card-page-skill-box'}>
                <div>技能</div>
                <div>力量系</div>
                <table>
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td style={{width:'4rem',textAlign:'center'}}></td>
                        <td style={{width:'10rem',textAlign:'center'}}>运动</td>
                        <td style={{width:'10rem',textAlign:'center'}}> </td>
                        <td > </td>
                    </tr>
                    </tbody>
                </table>
                <div>力量系</div>
                <table>
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td style={{width:'4rem',textAlign:'center'}}></td>
                        <td style={{width:'10rem',textAlign:'center'}}>运动</td>
                        <td > </td>
                        <td > </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}