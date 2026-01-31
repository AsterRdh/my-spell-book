import React, {useMemo} from "react";
import {
    AttributeLang,
    type Monster,
    MonsterSizeLang,
    MonsterTypeLang, SkillLang,
    type SpeedType, SpeedTypeLang
} from "./Types.ts";
import {Space,} from "antd";
import {getAlignment} from "../../utils/AlignmentUtils.ts";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import type {BookType} from "../../types/DataType.ts";

type MonsterCardProps = {
    dataSource?: Monster
    dataSet:{
        books:{[key:string]:BookType};
    }
    size:[number, number]
}

const renderSpeed=(speed?: {type: SpeedType, value: string}[])=>{
    if (!speed) return ''
    const speedMap:{[key in SpeedType]?:string}={}
    if (speed){
        speed.forEach(item=>{
            speedMap[item.type] = item.value
        })
    }

    const speedText = speedMap.Default || speedMap.Walk
    let OtherSpeed = ''
    if (!speedMap.Default && speedMap.Walk){
        //过滤Walk
        OtherSpeed += speed?.filter(item=>!(item.type=='Default' || item.type=='Walk'))
            .map(item=>{
                return SpeedTypeLang[item.type]+" "+item.value
            })
            .join(',') || '';
    }else {
        OtherSpeed += speed?.filter(item=>item.type!=='Default')
            .map(item=>{
                return SpeedTypeLang[item.type]+" "+item.value
            })
            .join(',') || '';
    }

    return speedText + (OtherSpeed ? ('，'+OtherSpeed) : '')
}

const getModifiers=(value?:number)=>{
    if(! value) return '0'
    const v =  Math.floor((value-10)/2);
    if (v>0) return '+'+v
    else return v.toString()
}


const MonsterCard = React.forwardRef((props: MonsterCardProps, ref: React.Ref<HTMLDivElement>) => {
    const {size,dataSet:{books}} = props;
    const dataSource = props.dataSource;
    const bookIcon = useMemo(() => {
        if(!dataSource || !dataSource.fromBook) return <></>
        const bookInfo = books[dataSource.fromBook];
        if (!bookInfo) return <div>{dataSource.fromBook}</div>
        return <div>{bookInfo.source}({bookInfo.name})</div>
    }, [books, dataSource]);

    const {imagePosition,imageSize,imageFit,imageRotation}=dataSource||{}
    const imageURL = useMemo(() => {
        if (!dataSource) return undefined;
        if (!dataSource.imageForm) return undefined;
        if (dataSource.imageForm==='url'){
            return dataSource.imageURL
        }
        if (dataSource.imageForm==='local'){
            if (dataSource.image && dataSource.image.length>0 ){
                if (dataSource.image[0].originFileObj)
                    return URL.createObjectURL(dataSource.image[0].originFileObj)
            }
        }
        return undefined
    }, [dataSource]);

    return(
        <div className={'bestiary-card'} ref={ref} style={{width: size[0], height: size[1],maxWidth:size[0], maxHeight:size[1]}}>
            <div style={{position:'absolute', top:120, right:120,fontSize:'36px',zIndex:30}}>
                CR {dataSource?.level}({dataSource?.xp}XP)
            </div>
            <div style={{position:'relative',zIndex:500}}>
                <div className={'bestiary-card-title-box'}>
                    <div className={'bestiary-card-title'}>
                        {dataSource?.name}
                    </div>
                    <div className={'bestiary-card-title-sub-box'}>
                        <div className={'bestiary-card-title-sub'}>
                            {dataSource?.cnName}
                        </div>
                        <Space>
                            {dataSource?.size && <div className={'bestiary-tag'}>{MonsterSizeLang[dataSource?.size]}</div>}
                            {dataSource?.type && <div className={'bestiary-tag'}>{MonsterTypeLang[dataSource?.type]}</div>}
                            <div className={'bestiary-tag'}>{getAlignment(dataSource?.alignment)}</div>

                        </Space>
                    </div>
                </div>

                <div style={{marginBottom: 10}}>
                    <div>护甲等级：{dataSource?.ac}</div>
                    <div>生命值：{dataSource?.hp}({dataSource?.hpRoll})</div>
                    <div>速度：{renderSpeed(dataSource?.speed)}</div>
                </div>
                <div style={{marginBottom: 10}}>
                    <table style={{width:'100%'}}>
                        <tbody>
                        <tr>
                            <td style={{textAlign:'right'}}>力量：</td><td>{dataSource?.ability?.pow}</td><td>({getModifiers(dataSource?.ability?.pow)})</td>
                            <td style={{textAlign:'right'}}>敏捷：</td><td>{dataSource?.ability?.dex}</td><td>({getModifiers(dataSource?.ability?.dex)})</td>
                            <td style={{textAlign:'right'}}>体质：</td><td>{dataSource?.ability?.con}</td><td>({getModifiers(dataSource?.ability?.con)})</td>
                        </tr>
                        <tr>
                            <td style={{textAlign:'right'}}>智力：</td><td>{dataSource?.ability?.int}</td><td>({getModifiers(dataSource?.ability?.int)})</td>
                            <td style={{textAlign:'right'}}>感知：</td><td>{dataSource?.ability?.wis}</td><td>({getModifiers(dataSource?.ability?.wis)})</td>
                            <td style={{textAlign:'right'}}>魅力：</td><td>{dataSource?.ability?.cha}</td><td>({getModifiers(dataSource?.ability?.cha)})</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{marginBottom: 10}}>
                    <table >
                        <tbody>
                        {dataSource?.savingThrow && dataSource?.savingThrow.length>0 &&
                            <tr><td style={{textAlign:'right'}}>豁免：</td><td>{dataSource?.savingThrow?.map(item=>{return AttributeLang[item.type]+' '+(item.value>0 &&'+'||'')+item.value}).join(', ')}</td></tr>
                        }
                        {dataSource?.skills && dataSource?.skills.length>0 &&
                            <tr><td style={{textAlign:'right'}}>技能：</td><td>{dataSource?.skills?.map(item=>{return SkillLang[item.type]+' '+(item.value>0 &&'+'||'')+item.value}).join(', ')}</td></tr>
                        }
                        <tr><td style={{textAlign:'right'}}>感官：</td>
                            <td>

                                {dataSource?.senses?.map(item=>{
                                    return item.type+' '+item.value
                                }).join(', ')}
                                {dataSource?.senses && dataSource?.senses.length>0 && '，'}
                                被动感知 {dataSource?.passivePerception}
                            </td>
                        </tr>
                        <tr><td style={{textAlign:'right'}}>语言：</td><td>{dataSource?.languages?.join(', ') || '——'}</td></tr>
                        </tbody>
                    </table>
                </div>
                {
                    (dataSource?.feature?.length || 0)>0 &&(
                        <div style={{marginBottom: 10}}>
                            <table style={{width:'100%'}}>
                                <tbody>
                                {dataSource?.feature?.map((item,index)=>{
                                    return (
                                        <tr key={index}>
                                            <td style={{textAlign:'right',paddingRight:'1rem',verticalAlign:'top'}}>
                                                <p style={{minWidth:'84px'}}> {item.name}</p>
                                                <p style={{marginBlock:0,fontSize:28}}> {item.nameSub}</p>
                                            </td>
                                            <td style={{verticalAlign:'top'}}><p>：</p></td>
                                            <td style={{verticalAlign:'top'}}>
                                                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                                    {item.description}
                                                </ReactMarkdown>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    )
                }
                {
                    (dataSource?.action?.length || 0 )>0&&(
                        <div style={{marginBottom: 10}}>
                            <div className={'bestiary-card-action'}>动作</div>
                            <div>
                                <table style={{width:'100%'}}>
                                    <tbody>
                                    {dataSource?.action?.map((item,index)=>{
                                        return (
                                            <tr key={index}>
                                                <td style={{textAlign:'right',paddingRight:'1rem',verticalAlign:'top'}}>
                                                    <p style={{minWidth:'84px'}}> {item.name}</p>
                                                    <p style={{marginBlock:0,fontSize:28}}> {item.nameSub}</p>
                                                </td>
                                                <td style={{verticalAlign:'top'}}><p>：</p></td>
                                                <td style={{verticalAlign:'top'}}>
                                                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                                        {item.description}
                                                    </ReactMarkdown>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                }
                {
                    dataSource?.otherDescription && (
                        <div style={{marginBottom: 10}}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                {dataSource?.otherDescription}
                            </ReactMarkdown>
                        </div>
                    )
                }
            </div>
            <div style={{position:'absolute', bottom: 150, right: 150,zIndex:30}}>
                {bookIcon}
            </div>
            <div style={{position:'absolute', bottom: 0, right: 0,top:0,left:0,backgroundColor:'rgba(255,255,255,0.5)',zIndex:20}}/>
            <div style={{position:'absolute',
                bottom: (imagePosition?.y||0) + 100,
                right:  (imagePosition?.x||0) + 100,
                zIndex:1}}>
                {
                    dataSource && imageURL && (
                        <img src={imageURL} alt={dataSource.name}
                             crossOrigin={'anonymous'}
                             style={{
                                 width: imageSize && imageSize.width || 'auto',
                                 height: imageSize && imageSize.height || '50%',
                                 objectFit: imageFit ||'cover',
                                 transform: `rotate(${imageRotation||0}deg)`
                        }}
                        />
                    )
                }

            </div>
        </div>
    )
})
export default MonsterCard;