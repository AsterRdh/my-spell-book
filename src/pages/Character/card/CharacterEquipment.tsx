import type {Character} from "../Types.ts";
import {GiSwapBag} from "react-icons/gi";

import PlatinumPieces from '../../../assets/icons/currency/platinum.webp'
import CopperPieces from '../../../assets/icons/currency/copper.webp'
import SilverPieces from '../../../assets/icons/currency/silver.webp'
import GoldPieces from '../../../assets/icons/currency/gold.webp'
import ElectrumPieces from '../../../assets/icons/currency/electrum.webp'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";


type CharacterBaseProps = {
    dataSource?: Character
    backgroundColor:string
    size: [number, number]
}

export default function CharacterEquipment(props:CharacterBaseProps){
    const equipments = props.dataSource?.equipments

    return(
        <div style={{width:props.size[0], height:props.size[1],backgroundColor:props.backgroundColor}} className={'character-card-page-right'}>
            <div className={'character-card-page-title'}>
                Equipment 装备
            </div>
            <div className={'character-card-equipment-wallet'}>
                <div className={'wallet-title'}>
                    <GiSwapBag  style={{fontSize:160}}/>
                    <div>
                        Wallet 钱包
                    </div>
                </div>
                <div className={'wallet-content'}>
                    <div className={'wallet-content-item'}>
                        <div className={'wallet-content-item-title'}>
                            <img src={PlatinumPieces} alt={'Platinum Pieces'}  style={{width:64, height:64}} />
                            <div>白金币 </div>
                        </div>
                        <div className={'wallet-content-item-value'}>
                            {equipments?.coins?.platinum}
                        </div>
                    </div>
                    <div className={'wallet-content-item'}>
                        <div className={'wallet-content-item-title'}>
                            <img src={GoldPieces} alt={'Gold Pieces'}  style={{width:64, height:64}} />
                            <div>金币 </div>
                        </div>
                        <div className={'wallet-content-item-value'}>
                            {equipments?.coins?.gold}
                        </div>
                    </div>
                    <div className={'wallet-content-item'}>
                        <div className={'wallet-content-item-title'}>
                            <img src={ElectrumPieces} alt={'Electrum Pieces'} style={{width:64, height:64}} />
                            <div> 金银币 </div>
                        </div>
                        <div className={'wallet-content-item-value'}>
                            {equipments?.coins?.electrum}
                        </div>
                    </div>
                    <div className={'wallet-content-item'}>
                        <div className={'wallet-content-item-title'}>
                            <img src={SilverPieces} alt={'Silver Pieces'}  style={{width:64, height:64}} />
                            <div>银币 </div>
                        </div>
                        <div className={'wallet-content-item-value'}>
                            {equipments?.coins?.silver}
                        </div>
                    </div>
                    <div className={'wallet-content-item'}>
                        <div className={'wallet-content-item-title'}>
                            <img src={CopperPieces} alt={'Copper Pieces'}  style={{width:64, height:64}} />
                            <div>铜币 </div>
                        </div>
                        <div className={'wallet-content-item-value'}>
                            {equipments?.coins?.copper}
                        </div>
                    </div>
                </div>
            </div>
            <div className={'character-card-equipment-items'}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {equipments?.items}
                </ReactMarkdown>
            </div>

        </div>
    )
}