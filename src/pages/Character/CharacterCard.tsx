import React, {useContext, useMemo} from "react";
import type {Character} from "./Types.ts";
import {SizeScaling} from "../../types/DataType.ts";
import CharacterBase from "./card/CharacterBase.tsx";
import CharacterProficiencies from "./card/CharacterProficiencies.tsx";
import CharacterSkill from "./card/CharacterSkill.tsx";
import CharacterEquipment from "./card/CharacterEquipment.tsx";
import {AppContext} from "../../AppContext.ts";

type CharacterCardProps = {
    dataSource?: Character
}

const CharacterCard = React.forwardRef<HTMLDivElement,CharacterCardProps>((props, ref) => {
    const {setting:{pageSize,backgroundColor}} = useContext(AppContext)
    const cardSize:[number, number] = useMemo(() => {
        return [SizeScaling[0]*pageSize.width, SizeScaling[1]*pageSize.height]
    }, [pageSize]);

    const bgColor = useMemo(() => {
        console.log(backgroundColor)
        if(typeof backgroundColor === 'string'){
            return backgroundColor
        }else {
            return backgroundColor.toHexString()
        }
    }, [backgroundColor]);

    return(
        <div ref={ref} className="character-card">
            <div className={'character-card-content'}>
                <CharacterBase size={cardSize} backgroundColor={bgColor} dataSource={props.dataSource}/>
                <CharacterSkill size={cardSize} backgroundColor={bgColor} dataSource={props.dataSource}/>
            </div>
            <div className={'character-card-content'}>
                <CharacterProficiencies size={cardSize} backgroundColor={bgColor} dataSource={props.dataSource}/>
                <CharacterEquipment size={cardSize} backgroundColor={bgColor} dataSource={props.dataSource}/>
            </div>


        </div>
    )
})
export default CharacterCard;