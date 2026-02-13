import React from "react";
import type {Character} from "./Types.ts";
type CharacterCardProps = {
    dataSource?: Character
}
const CharacterCard = React.forwardRef<HTMLDivElement,CharacterCardProps>((props, ref) => {

    const {name} = props.dataSource || {}
    return(
        <div ref={ref} className="character-card">
            {name}
        </div>
    )
})
export default CharacterCard;