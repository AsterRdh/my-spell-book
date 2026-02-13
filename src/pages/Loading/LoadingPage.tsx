import {Button, Col, Row, Skeleton, Slider, Space, Spin} from "antd";
import {IoMdSettings} from "react-icons/io";
import {useLocalStorageState} from "ahooks";

export default function LoadingPage(){
    const [scale, setScale] = useLocalStorageState('scale', {defaultValue: 100});
    return<>
        <div className={'app-left'}>
            <div className={'view-box'} >
                <div className={'view'}>
                    <div className={'pre-view'} style={{transform: "scale(" + (scale / 100) + ")"}}>
                        <Skeleton.Image active={true} style={{width: '100%', height: '100%'}} />
                    </div>
                </div>
                <div className={'view-tool'}>
                    <Space vertical>
                        <Button variant="filled" icon={<IoMdSettings />} />
                    </Space>
                </div>
            </div>
            <div className={'view-bottom'}>
                <Row align={"middle"} >
                    <Col>
                        1
                    </Col>
                    <Col flex={"auto"}/>
                    <Col>
                        <Space>
                            缩放
                            <Slider style={{width: 200}} value={scale} onChange={(value) => setScale(value)}
                                    max={100} min={25}/>
                            <div style={{width: '3rem', textAlign: "right", paddingRight: '1rem'}}>
                                {scale}%
                            </div>
                        </Space>
                    </Col>
                </Row>
            </div>
        </div>
        <div className={'app-right'}>
            <Skeleton active={true} />
        </div>
        <Spin fullscreen={true} spinning={true}/>
    </>
}