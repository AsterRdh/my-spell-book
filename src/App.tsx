import './App.css'
import {Button, ConfigProvider, Menu, theme, Tooltip} from "antd";
import useTheme from "./hooks/useTheme.ts";
import SpellBook from "./pages/SpellBook/SpellBook.tsx";
import {useMemo, useState} from "react";
import {GiSpellBook} from "react-icons/gi";
import {MdFeaturedPlayList} from "react-icons/md";
import {FaDragon, FaGithub} from "react-icons/fa";
import {MonsterPage} from "./pages/Monster/MonsterPage.tsx";
import FeaturePage from "./pages/FeaturePage/FeaturePage.tsx";

function App() {
    const {isDarkMode} = useTheme()

    const [activePage, setActivePage] = useState('SpellBook')

    const showPage = useMemo(() => {
        switch (activePage){
            case 'SpellBook':
                return <SpellBook/>;
            case 'Feature':
                return <FeaturePage/>;
            case 'Bestiary':
                return <MonsterPage />;
            default:
                    return 404;
        }
    }, [activePage]);

    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
            <div className={'app'}>
                <div style={{height:'100%',display:'flex',flexDirection:'column',position:'relative'}}>
                    <Menu
                        style={{ height: '100%' }}
                        inlineCollapsed={true}
                        selectedKeys={[activePage]}
                        items={[
                            {
                                key: 'SpellBook',
                                label: '法术书',
                                icon:<GiSpellBook />
                            },
                            {
                                key: 'Feature',
                                label: '特性',
                                icon:<MdFeaturedPlayList />
                            },
                            {
                                key: 'Bestiary',
                                label: '怪物',
                                icon:<FaDragon />
                            },
                        ]}
                        onClick={(item)=> {
                            const {key}  = item
                            // window.location.href = `/SpellBook/${key}`
                            setActivePage( key)
                        }}
                    />
                    <div style={{position:'absolute',bottom:0,left:0,right:0,textAlign:'center',padding:10}}>
                        <Tooltip title={'项目地址'}>
                            <Button icon={<FaGithub />} type={"text"} size={'large'} shape={'circle'}
                                    href={'https://github.com/AsterRdh/my-spell-book'} target={'_blank'}
                            />
                        </Tooltip>



                    </div>
                </div>
                {showPage}
            </div>
        </ConfigProvider>
    )
}

export default App
