import {type BookType, SizeScaling, type SpellSchoolType, type SpellType} from "../../../types/DataType.ts";
import {GiArcheryTarget, GiChest, GiClockwork, GiLips, GiSandsOfTime, GiSensuousness} from "react-icons/gi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {useMemo, forwardRef, useContext} from "react";
import {Space} from "antd";
import rehypeRaw from 'rehype-raw';
import {
    Abjuration,
    Conjuration,
    Divination,
    Enchantment,
    Evocation, Illusion,
    Necromancy,
    Transmutation
} from "../../../icons/SchoolIcons.tsx";
import {AppContext} from "../../../AppContext.ts";

type SpellCardProps = {
    spell?:SpellType
    dataSet:{
        schools:{[key:string]:SpellSchoolType}
        books:{[key:string]:BookType};
    }
 
}

const SpellCard =forwardRef<HTMLDivElement,SpellCardProps>((props,ref)=>{
    const {spell,dataSet:{schools,books}} = props;

    const {setting:{pageSize,backgroundColor,titleTextSize,baseTextSize}} = useContext(AppContext)
    const cardSize:[number, number] = useMemo(() => {
        return [SizeScaling[0]*pageSize.width, SizeScaling[1]*pageSize.height]
    }, [pageSize]);

    const cardPadding:[number, number, number, number] = useMemo(() => {
        return [
            SizeScaling[1]*pageSize.padding.top,
            SizeScaling[0]*pageSize.padding.right,
            SizeScaling[1]*pageSize.padding.bottom,
            SizeScaling[0]*pageSize.padding.left,

        ]
    }, [pageSize.padding]);

    const bgColor = useMemo(() => {
        console.log(backgroundColor)
        if(typeof backgroundColor === 'string'){
            return backgroundColor
        }else {
            return backgroundColor.toHexString()
        }
    }, [backgroundColor]);


    const spellCardTitle = useMemo(() => {
        if (!spell || !spell.name) return ['', ''];
        return [
            spell.name.at(0),
            spell.name.slice(1)
        ]
    }, [spell]);

    const schoolIcon = useMemo(() => {
        if(!spell || !spell.schoolID) return <></>
        const schoolData = schools[spell.schoolID]
        if (!schoolData) return <></>
        switch(schoolData.id){
            case 'Abjuration':
                return <Abjuration/>
            case 'Conjuration':
                return <Conjuration/>
            case 'Divination':
                return <Divination/>
            case 'Enchantment':
                return <Enchantment/>
            case 'Evocation':
                return   <Evocation />
            case 'Transmutation':
                return <Transmutation/>
            case 'Necromancy':
                return <Necromancy/>
            case 'Illusion':
                return <Illusion/>
            default:
                return <></>
        }
    }, [schools, spell]);
    const bookIcon = useMemo(() => {
        if(!spell || !spell.fromBookID) return <></>
        const bookInfo = books[spell.fromBookID];
        if (!bookInfo) return <div>{spell.fromBookID}</div>
        return <div>{bookInfo.source}({bookInfo.name})</div>
    }, [books, spell]);

    return (
        <div className={'spell-card'} ref={ref} style={{
            width: cardSize[0], height: cardSize[1],maxWidth:cardSize[0], maxHeight:cardSize[1],backgroundColor: bgColor,
            paddingTop:cardPadding[0],
            paddingRight:cardPadding[1],
            paddingBottom:cardPadding[2],
            paddingLeft:cardPadding[3],

        }}>
            <div className={'spell-card-title-box'}>
                <div className={'first-litter'} style={{fontSize:titleTextSize,width:titleTextSize*0.925}}>
                    {spellCardTitle[0]}
                </div>
                <div style={{flex: 1, paddingTop: '4px'}}>
                    <div className={'spell-name'} style={{fontSize:titleTextSize*0.315}}>
                        {spellCardTitle[1]}
                    </div>
                    <div className={'spell-cn-name'} style={{fontSize:titleTextSize*0.28}}>
                        {spell?.cnName}
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{
                            width: '16px',
                            height: '16px',
                            backgroundColor: '#000',
                            borderRadius: '50%'
                        }}/>
                        <div style={{width: 0, flex: 1, height: '4px', backgroundColor: '#000'}}/>
                        <div style={{
                            width: '16px',
                            height: '16px',
                            backgroundColor: '#000',
                            borderRadius: '50%'
                        }}/>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'space-between',
                        marginTop: '8px',
                        marginRight: '8px'
                    }}>
                        <div style={{display: 'flex', alignItems: 'center',position: 'relative',fontSize:titleTextSize*0.11}}>
                            <GiClockwork/>{spell?.castingTime}
                            <div style={{position: 'absolute', top: titleTextSize*0.115+2, left: '0',fontSize: titleTextSize*0.06,width:'300px'}}>
                                {spell?.castingTimePS}
                            </div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center',position: 'relative',fontSize:titleTextSize*0.11}}>
                            <GiArcheryTarget/>{spell?.range}
                            <div style={{position: 'absolute', top: titleTextSize*0.115+2, left: '0',fontSize:titleTextSize*0.06,width:'300px'}}>
                                {spell?.rangePS}
                            </div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center',position: 'relative',fontSize:titleTextSize*0.11}}>
                            <GiSandsOfTime/>{spell?.duration}
                            <div style={{position: 'absolute', top: titleTextSize*0.115+2, left: '0',fontSize: titleTextSize*0.06,width:'300px'}}>
                                {spell?.durationPS}
                            </div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right', marginRight: '32px', marginTop: (spell?.durationPS || spell?.rangePS || spell?.castingTimePS) ?titleTextSize*0.075+2: '8px'}}>
                        <Space>
                            {
                                spell?.needVerbal && (
                                    <div style={{display: 'flex', alignItems: 'center',fontSize: titleTextSize*0.125}}>
                                        <GiLips/>语言
                                    </div>
                                )
                            }
                            {
                                spell?.needSomatic && (
                                    <div style={{display: 'flex', alignItems: 'center',fontSize: titleTextSize*0.125}}>
                                        <GiSensuousness/> 姿势
                                    </div>
                                )
                            }
                            {
                                spell?.needMaterial && (
                                    <div style={{display: 'flex', alignItems: 'center',fontSize: titleTextSize*0.125}}>
                                        <GiChest/>材料
                                    </div>
                                )
                            }
                        </Space>
                    </div>
                    <div style={{
                        textAlign: 'right',
                        fontSize:titleTextSize*0.07,
                        marginRight: '32px',
                        marginTop: titleTextSize*0.04,
                        minHeight: '1rem'
                    }}>
                        {spell?.needMaterial && spell.material }
                    </div>
                </div>
            </div>
            <div style={{flex:1,fontSize: baseTextSize}}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {spell?.baseDescription}
                </ReactMarkdown>

            </div>
            {
                spell?.upgradeDescription &&
                <div>
                    <div style={{fontWeight: 'bold',fontSize: baseTextSize*1.1}}>
                        升环施法效应:
                    </div>
                    <div style={{minHeight: '240px',fontSize: baseTextSize}}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                            {spell?.upgradeDescription}
                        </ReactMarkdown>
                    </div>
                </div>
            }
            <div style={{position:'absolute', top: 210, left: 200}}>
                <div style={{width: '165px'}}>{schoolIcon}</div>
            </div>
            <div style={{position:'absolute', top: 150, right: 150,fontSize:baseTextSize*0.85}}>
                {(spell?.level||0)<1?'戏法':(spell?.level+"环")}
            </div>
            <div style={{position:'absolute', bottom: 150, right: 150,fontSize:baseTextSize*0.65}}>
                {bookIcon}
            </div>
        </div>
    )
})
export default SpellCard;