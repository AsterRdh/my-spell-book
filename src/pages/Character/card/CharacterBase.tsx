import {type Character, CharacterSensesOptions} from "../Types.ts";
import ClassIcon from "../../../icons/ClassIcons.tsx";
import {Col, Row, Space} from "antd";
import Strength from '../../../assets/icons/ability/strength.webp'
import Dexterity from '../../../assets/icons/ability/dexterity.webp'
import Constitution from '../../../assets/icons/ability/constitution.webp'
import Intelligence from '../../../assets/icons/ability/intelligence.webp'
import Wisdom from '../../../assets/icons/ability/wisdom.webp'
import Charisma from '../../../assets/icons/ability/charisma.webp'
import type {CharacterClassType} from "../../../compoment/ClassInput/ClassInput.tsx";
import {useMemo} from "react";
import type {ImageSelectorType} from "../../../compoment/ImageSelector/ImageSelector.tsx";
import {defaultImageSettings} from "../../../compoment/ImageSelector/DefaultData.ts";


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




const getModifier =(modifier?:number)=>{
    return modifier!==undefined ? modifier<0? modifier:("+"+modifier) : ''
}

export default function CharacterBase(props:CharacterBaseProps){
    const characterData = props.dataSource

    const [image,imageURL] = useMemo(() => {
        const image:ImageSelectorType = {...(characterData?.image || defaultImageSettings)};
        if (image.size){
            //如果为数字则添加默认单位px 使用正则判断
            let {width,height} = image.size;

            if (width && (width+"").match(/^[\d.]+$/)) width = `${(width+"")}px`;
            if (height && (height+"").match(/^[\d.]+$/)) height = `${(height+"")}px`;
            image.size={width, height}
        }


        let imageURL:string|undefined;
        if (!image || !image.from) {
            imageURL = undefined
        }
        if (image.from==='url'){
            imageURL = image.url
        }
        if (image.from==='local'){
            if (image.file && image.file.length>0 ){
                if (image.file[0].originFileObj)
                    imageURL = URL.createObjectURL(image.file[0].originFileObj)
            }
        }
        return [image,imageURL]
    }, [characterData?.image]);


    return(
        <div style={{width:props.size[0], height:props.size[1],backgroundColor:props.backgroundColor}} className={'character-card-page-left'}>
            <div className={'character-card-base-page'} style={{position:'relative',zIndex:50}}>
                <div style={{position:'absolute',left:0,top:-100}}>{characterData?.playerName}</div>
                <Space vertical={ true}>
                    {
                        characterData?.classes?.map((clazz,index)=>{
                            return (
                                <div className={'character-card-page-header-icon-box'} key={index}>
                                    <ClassBox clazz={clazz}/>
                                </div>
                            )
                        })
                    }
                </Space>
                <div className={'character-card--base-page-left'}>
                    <div className={'character-card-page-header-name-box'}>
                        <div className={'character-card-page-header-name2'} >
                            {characterData?.name2}
                        </div>
                        <div className={'character-card-page-header-name'} >
                            {characterData?.name}
                        </div>

                    </div>

                    <div className={'character-card-page-header-ability-box'}>
                        <Row gutter={[10,10]}>
                            <Col span={6}>
                                <div className={'character-card-page-header-ability-box-item'}>
                                    <div style={{position:'relative',width:'90%'}}>
                                        <img src={Strength} alt={'Strength'} style={{width:214,objectFit:'fill',position:'relative',top:14}}/>
                                        <div className={'character-card-page-header-ability-box-item-value'} >
                                            <div className={'modifier-box'}  style={{borderStyle:characterData?.ability?.str?.saving?'solid': 'double'}}>{getModifier(characterData?.ability?.str?.modifier)}</div>
                                            <div className={'score-box'}  style={{borderStyle:characterData?.ability?.str?.saving?'solid': 'double'}}>{characterData?.ability?.str?.score}</div>
                                        </div>
                                    </div>
                                    <div style={{position:'relative',top:-20}}>STR</div>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className={'character-card-page-header-ability-box-item'}>
                                    <div style={{position:'relative',width:'90%'}}>
                                        <img src={Dexterity} alt={'Dexterity'} style={{width:200,objectFit:'fill'}}/>
                                        <div className={'character-card-page-header-ability-box-item-value'} >
                                            <div className={'modifier-box'}  style={{borderStyle:characterData?.ability?.dex?.saving?'solid': 'double'}}>{getModifier(characterData?.ability?.dex?.modifier)}</div>
                                            <div className={'score-box'}  style={{borderStyle:characterData?.ability?.dex?.saving?'solid': 'double'}}>{characterData?.ability?.dex?.score}</div>
                                        </div>
                                    </div>
                                    <div style={{position:'relative',top:-45}}>DEX</div>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className={'character-card-page-header-ability-box-item'}>
                                    <div style={{position:'relative',width:'90%'}}>
                                        <img src={Constitution} alt={'Constitution'} style={{width:200,top:10,position:'relative',objectFit:'fill'}}/>
                                        <div className={'character-card-page-header-ability-box-item-value'} >
                                            <div className={'modifier-box'}  style={{borderStyle:characterData?.ability?.con?.saving?'solid': 'double'}}>{getModifier(characterData?.ability?.con?.modifier)}</div>
                                            <div className={'score-box'}  style={{borderStyle:characterData?.ability?.con?.saving?'solid': 'double'}}>{characterData?.ability?.con?.score}</div>
                                        </div>
                                    </div>
                                    <div style={{position:'relative',top:-14}}>CON</div>
                                </div>
                            </Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                            <Col span={6}>
                                <div className={'character-card-page-header-ability-box-item'}>
                                    <div style={{position:'relative',width:'90%'}}>
                                        <img src={Intelligence} alt={'Intelligence'} style={{width:200,objectFit:'fill'}}/>
                                        <div className={'character-card-page-header-ability-box-item-value'} >
                                            <div className={'modifier-box'}  style={{borderStyle:characterData?.ability?.int?.saving?'solid': 'double'}}>{getModifier(characterData?.ability?.int?.modifier)}</div>
                                            <div className={'score-box'}  style={{borderStyle:characterData?.ability?.int?.saving?'solid': 'double'}}>{characterData?.ability?.int?.score}</div>
                                        </div>
                                    </div>
                                    <div style={{position:'relative',top:-44}}>INT</div>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className={'character-card-page-header-ability-box-item'}>
                                    <div style={{position:'relative',width:'90%'}}>
                                        <img src={Wisdom} alt={'Wisdom'} style={{width:200,objectFit:'fill'}}/>
                                        <div className={'character-card-page-header-ability-box-item-value'} >
                                            <div className={'modifier-box'}  style={{borderStyle:characterData?.ability?.wis?.saving?'solid': 'double'}}>{getModifier(characterData?.ability?.wis?.modifier)}</div>
                                            <div className={'score-box'}  style={{borderStyle:characterData?.ability?.wis?.saving?'solid': 'double'}}>{characterData?.ability?.wis?.score}</div>
                                        </div>
                                    </div>
                                    <div style={{position:'relative',top:-44}}>WIS</div>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className={'character-card-page-header-ability-box-item'}>
                                    <div style={{position:'relative',width:'90%'}}>
                                        <img src={Charisma} alt={'Charisma'} style={{width:200,position:'relative',top:15,objectFit:'fill'}}/>
                                        <div className={'character-card-page-header-ability-box-item-value'} >
                                            <div className={'modifier-box'}  style={{borderStyle:characterData?.ability?.cha?.saving?'solid': 'double'}}>{getModifier(characterData?.ability?.cha?.modifier)}</div>
                                            <div className={'score-box'}  style={{borderStyle:characterData?.ability?.cha?.saving?'solid': 'double'}}>{characterData?.ability?.cha?.score}</div>
                                        </div>
                                    </div>
                                    <div style={{position:'relative',top:-30}}>CHA</div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div style={{textAlign:'right'}}> {characterData?.races}</div>
                    <div style={{textAlign:'right',justifyItems:'flex-end'}}>
                        <div style={{textAlign:'left',width:'fit-content'}}>
                            {characterData?.senses?.map((sense) => {
                                return <div key={sense.type}>{CharacterSensesOptions.find((option) => option.value === sense.type)?.label}: {sense.range}</div>
                            })}
                            {characterData?.others?.split('\n')?.map((line) => <div>{line}</div>)}
                        </div>
                    </div>


                </div>
            </div>
            {
                image.mask &&  <div style={{position:'absolute', bottom: 0, right: 0,top:0,left:0,backgroundColor:props.backgroundColor,zIndex:20,opacity:0.5}}/>
            }
            <div style={{position:'absolute',
                bottom: (image.position?.y||0),
                left:  (image.position?.x||0),
                zIndex:1}}>
                {
                    characterData && imageURL && (
                        <img src={imageURL} alt={characterData.name}
                             crossOrigin={'anonymous'}
                             style={{
                                 width: image.size &&  image.size.width || 'auto',
                                 height:  image.size &&  image.size.height || '50%',
                                 objectFit: image.fit ||'cover',
                                 transform: `rotate(${image.rotation||0}deg)`
                             }}
                        />
                    )
                }

            </div>

        </div>
    )
}