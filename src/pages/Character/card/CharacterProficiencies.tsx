import type {Character} from "../Types.ts";
import {Divider, Space} from "antd";
import {GrLanguage} from "react-icons/gr";
import {GiAnvilImpact, GiArmorVest, GiAxeSword} from "react-icons/gi";

type CharacterBaseProps = {
    dataSource?: Character
    backgroundColor:string
    size: [number, number]
}

export default function CharacterProficiencies(props:CharacterBaseProps){
    const proficiencies = props.dataSource?.proficiencies
    return(
        <div style={{width:props.size[0], height:props.size[1],backgroundColor:props.backgroundColor}} className={'character-card-page-left proficiencies' }>
            <div className={'character-card-page-title'}>
                Proficiencies 熟练
            </div>
            <div className={'character-card-proficiencies'}>
                <div className={'character-card-proficiencies-card'}>
                    <div className={'card-icon'}>
                        <GiArmorVest style={{fontSize:180}}/>
                    </div>
                    <div className={'card-content'}>
                        <div className={'card-title'}>Armors 护甲</div>
                        <div className={'card-content-text'}>
                            <Space wrap separator={<Divider vertical />}>
                                {proficiencies?.armor?.map((item, index) => <span key={'character-armor-proficiencies'+index}>{item}</span>)}
                            </Space>
                        </div>
                    </div>
                </div>
                <div className={'character-card-proficiencies-card'}>
                    <div className={'card-icon'}>
                        <GiAxeSword style={{fontSize:180}}/>
                    </div>
                    <div className={'card-content'}>
                        <div className={'card-title'}>Weapons 武器</div>
                        <div className={'card-content-text'}>
                            <Space wrap separator={<Divider vertical />}>
                                {proficiencies?.weapons?.map((item, index) => <span key={'character-languages'+index}>{item}</span>)}
                            </Space>
                        </div>
                    </div>
                </div>
                <div className={'character-card-proficiencies-card'}>
                    <div className={'card-icon'}>
                        <GiAnvilImpact style={{fontSize:180}}/>
                    </div>
                    <div className={'card-content'}>
                        <div className={'card-title'}>Tools 工具</div>
                        <div className={'card-content-text'}>
                            <Space wrap separator={<Divider vertical />}>
                                {proficiencies?.tools?.map((item, index) => <span key={'character-languages'+index}>{item}</span>)}
                            </Space>
                        </div>
                    </div>
                </div>
                <div className={'character-card-proficiencies-card'}>
                    <div className={'card-icon'}>
                        <GrLanguage style={{fontSize:180}}/>
                    </div>
                    <div className={'card-content'}>
                        <div className={'card-title'}>Languages 语言</div>
                        <div className={'card-content-text'}>
                            <Space wrap separator={<Divider vertical />}>
                                {proficiencies?.languages?.map((item, index) => <span key={'character-languages'+index}>{item}</span>)}
                            </Space>
                        </div>
                    </div>
                </div>
                <div className={'character-card-proficiencies-card'} style={{flex:1}}>
                    <div className={'card-title'} style={{marginRight:16}}>Other 其他</div>
                    <div className={'card-content-text'}>
                        <Space>
                            {proficiencies?.others?.map((item, index) => <span key={'character-languages'+index}>{item}</span>)}
                        </Space>
                    </div>
                </div>

            </div>
        </div>
    )
}