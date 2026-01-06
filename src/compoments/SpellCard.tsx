import type {BookType, SpellSchoolType, SpellType} from "../types/DataType.ts";
import {GiArcheryTarget, GiChest, GiClockwork, GiLips, GiSandsOfTime, GiSensuousness} from "react-icons/gi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {useMemo,forwardRef} from "react";
import {Space} from "antd";
import rehypeRaw from 'rehype-raw';
import {
    Abjuration,
    Conjuration,
    Divination,
    Enchantment,
    Evocation,
    Necromancy,
    Transmutation
} from "../icons/SchoolIcons.tsx";

type SpellCardProps = {
    spell?:SpellType
    dataSet:{
        schools:{[key:string]:SpellSchoolType}
        books:{[key:string]:BookType};
    }
 
}

const SpellCard =forwardRef<HTMLDivElement,SpellCardProps>((props,ref)=>{
    const {spell,dataSet:{schools,books}} = props;
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
        <div className={'spell-card'} ref={ref}>
            <div className={'spell-card-title-box'}>
                <div className={'first-litter'}>
                    {spellCardTitle[0]}
                </div>
                <div style={{flex: 1, paddingTop: '4px'}}>
                    <div className={'spell-name'}>
                        {spellCardTitle[1]}
                    </div>
                    <div className={'spell-cn-name'}>
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
                        <div style={{display: 'flex', alignItems: 'center',position: 'relative'}}>
                            <GiClockwork/>{spell?.castingTime}
                            <div style={{position: 'absolute', top: 46, left: '0',fontSize: '20px',width:'300px'}}>
                                {spell?.castingTimePS}
                            </div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center',position: 'relative'}}>
                            <GiArcheryTarget/>{spell?.range}
                            <div style={{position: 'absolute', top: 46, left: '0',fontSize: '20px',width:'300px'}}>
                                {spell?.rangePS}
                            </div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center',position: 'relative'}}>
                            <GiSandsOfTime/>{spell?.duration}
                            <div style={{position: 'absolute', top: 46, left: '0',fontSize: '20px',width:'300px'}}>
                                {spell?.durationPS}
                            </div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right', marginRight: '32px', marginTop: '8px'}}>
                        <Space>
                            {
                                spell?.needVerbal && (
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <GiLips/>语言
                                    </div>
                                )
                            }
                            {
                                spell?.needSomatic && (
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <GiSensuousness/> 姿势
                                    </div>
                                )
                            }
                            {
                                spell?.needMaterial && (
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <GiChest/>材料
                                    </div>
                                )
                            }
                        </Space>
                    </div>
                    <div style={{
                        textAlign: 'right',
                        fontSize: '24px',
                        marginRight: '32px',
                        marginTop: '16px',
                        minHeight: '1rem'
                    }}>
                        {spell?.needMaterial && spell.material }
                    </div>
                </div>
            </div>
            <div style={{flex:1,fontSize: '42px'}}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {spell?.baseDescription}
                </ReactMarkdown>

            </div>
            {
                spell?.upgradeDescription &&
                <div>
                    <div style={{fontWeight: 'bold',fontSize: '46px'}}>
                        升环施法效应:
                    </div>
                    <div style={{minHeight: '240px',fontSize: '42px'}}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                            {spell?.upgradeDescription}
                        </ReactMarkdown>
                    </div>
                </div>
            }
            <div style={{position:'absolute', top: 210, left: 200}}>
                <div style={{width: '165px'}}>{schoolIcon}</div>
            </div>
            <div style={{position:'absolute', top: 150, right: 150}}>
                {(spell?.level||0)<1?'戏法':(spell?.level+"环")}
            </div>
            <div style={{position:'absolute', bottom: 150, right: 150}}>
                {bookIcon}
            </div>
        </div>
    )
})
export default SpellCard;