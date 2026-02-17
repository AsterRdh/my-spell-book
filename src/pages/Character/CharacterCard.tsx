import React, {useContext} from "react";
import type {Character} from "./Types.ts";
import {SizeScaling} from "../../types/DataType.ts";
import CharacterBase from "./card/CharacterBase.tsx";
import CharacterProficiencies from "./card/CharacterEquipment.tsx";
import CharacterSkill from "./card/CharacterSkill.tsx";
import CharacterEquipment from "./card/CharacterEquipment.tsx";
import {AppContext} from "../../AppContext.ts";

type CharacterCardProps = {
    dataSource?: Character
}
//  size={[SizeScaling[0]*pageSize[0], SizeScaling[1]*pageSize[1]]}
const CharacterCard = React.forwardRef<HTMLDivElement,CharacterCardProps>((props, ref) => {
    const {setting:{pageSize,backgroundColor}} = useContext(AppContext)
    const size:[number,number] = [SizeScaling[0]*pageSize.width, SizeScaling[1]*pageSize.height]

    return(
        <div ref={ref} className="character-card">
            <div className={'character-card-content'}>
                <CharacterBase size={size} backgroundColor={backgroundColor} dataSource={props.dataSource}/>
                <CharacterSkill size={size} backgroundColor={backgroundColor} dataSource={props.dataSource}/>
            </div>
            <div className={'character-card-content'}>
                <CharacterProficiencies size={size} backgroundColor={backgroundColor} dataSource={props.dataSource}/>
                <CharacterEquipment size={size} backgroundColor={backgroundColor} dataSource={props.dataSource}/>
            </div>


        </div>
    )
})
export default CharacterCard;