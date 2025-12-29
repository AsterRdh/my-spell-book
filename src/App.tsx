import './App.css'
import { GiSandsOfTime,GiArcheryTarget,GiClockwork,GiLips,GiSensuousness,GiChest } from "react-icons/gi";
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import {Form} from "antd";

function App() {
  return (
    <div className={'app'}>
        <div className={'app-left'}>
            <div className={'view'}>
                <div className={'pre-view'}>
                    <div className={'spell-card'}>
                        <div className={'spell-card-title-box'}>
                            <div className={'first-litter'}>
                                C
                            </div>
                            <div style={{flex: 1, paddingTop: '4px'}}>
                                <div className={'spell-name'}>
                                    hromatic Orb
                                </div>
                                <div className={'spell-cn-name'}>
                                    繁彩球
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
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <GiClockwork/>1 动作
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <GiArcheryTarget/>90尺
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <GiSandsOfTime/>立即
                                    </div>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'baseline',
                                    justifyContent: 'right',
                                    marginTop: '8px',
                                    marginRight: '8px'
                                }}>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <GiLips/>
                                        语言
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginLeft: '16px',
                                        marginRight: '16px'
                                    }}>
                                        <GiSensuousness/>姿势
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <GiChest/>材料
                                    </div>
                                </div>
                                <div style={{
                                    textAlign: 'right',
                                    fontSize: '24px',
                                    marginRight: '32px',
                                    marginTop: '16px'
                                }}>一枚至少价值50gp的钻石
                                </div>
                            </div>
                        </div>
                        <div style={{flex:1,fontSize: '32px'}}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                111
                            </ReactMarkdown>

                        </div>
                        <div>
                            <div style={{fontWeight: 'bold'}}>
                                升环施法效应:
                            </div>
                            <div style={{minHeight: '240px',fontSize: '32px'}}>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    使用2环或更高法术位施放本法术时，你使用的法术位每比1环高一环，法术的伤害就增加 **1d8**。
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            1
            </div>
        </div>
        <div className={'app-right'}>
            <div style={{color: '#fff', flex: 1}}>
                <Form>

                </Form>
            </div>
        </div>

    </div>
  )
}

export default App
