import './App.css'
import {Button, ConfigProvider, Menu, Spin, theme, Tooltip} from "antd";
import useTheme from "./hooks/useTheme.ts";
import {lazy, Suspense, useState} from "react";
import {GiCharacter, GiSpellBook} from "react-icons/gi";
import {MdFeaturedPlayList} from "react-icons/md";
import {FaDragon, FaGithub} from "react-icons/fa";

import useNotification from "antd/es/notification/useNotification";
import {AppContext, defPageSetting} from "./AppContext.ts";
import {useDNDBook} from "./hooks/useDNDBook.tsx";
import {useDNDSpellSchool} from "./hooks/useDNDSpellSchool.tsx";
import LoadingPage from "./pages/Loading/LoadingPage.tsx";
import { RiLayout2Line } from "react-icons/ri";
import type {PageSetting} from "./types/DataType.ts";
import {FaShop} from "react-icons/fa6";

const SpellBook = lazy(() => import('./pages/SpellBook/SpellBook'));
const FeaturePage = lazy(() => import('./pages/Feature/FeaturePage'));
const MonsterPage = lazy(() => import('./pages/Monster/MonsterPage'));
const CharacterPage = lazy(() => import('./pages/Character/CharacterPage'));
const LayoutPage = lazy(() => import('./pages/TokenLayout/LayoutPage'));
const ShopPage = lazy(() => import('./pages/Shop/ShopPage'));



function App() {
    const {isDarkMode} = useTheme()

    const [activePage, setActivePage] = useState('SpellBook')
    const [notification, message] = useNotification();
    const [loading, setLoading] = useState(false);

    const dndBook = useDNDBook();
    const dndSpellSchool = useDNDSpellSchool();

    const showPage = () => {
        switch (activePage){
            case 'SpellBook':
                return <SpellBook/>;
            case 'Feature':
                return <FeaturePage/>;
            case 'Bestiary':
                return <MonsterPage />;
            case 'Character':
                return <CharacterPage/>;
            case 'Layout':
                return <LayoutPage/>;
            case 'Shop':
                return <ShopPage/>
            default:
                    return 404;
        }
    };

    const [pageSettings, setPageSettings] = useState<PageSetting>(defPageSetting)

    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
            <AppContext.Provider value={{notification, loading, setLoading,dndBook,dndSpellSchool,setting:pageSettings,setSetting:setPageSettings}}>
                <div className={'app'}>
                    <div style={{height:'100%',display:'flex',flexDirection:'column',position:'relative'}}>
                        <Menu
                            style={{ height: '100%' }}
                            inlineCollapsed={true}
                            selectedKeys={[activePage]}
                            items={[
                                {
                                    key: 'Character',
                                    label: '角色卡',
                                    icon:<GiCharacter />
                                },
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
                                {
                                    key: 'Layout',
                                    label: 'token排版',
                                    icon:<RiLayout2Line />
                                },
                                {
                                    key: 'Shop',
                                    label: '商店',
                                    icon:<FaShop />
                                }
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
                    <Suspense fallback={<LoadingPage/>}>
                        {showPage()}
                    </Suspense>
                </div>
            </AppContext.Provider>
            {message}
            <Spin fullscreen={true} spinning={loading}/>
        </ConfigProvider>
    )
}

export default App
