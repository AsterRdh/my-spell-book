import type {Character} from "../Types.ts";

type CharacterBaseProps = {
    dataSource?: Character
    backgroundColor:string
    size: [number, number]
}

export default function CharacterEquipment(props:CharacterBaseProps){
    return(
        <div style={{width:props.size[0], height:props.size[1],backgroundColor:props.backgroundColor}} className={'character-card-page-right'}>

        </div>
    )
}