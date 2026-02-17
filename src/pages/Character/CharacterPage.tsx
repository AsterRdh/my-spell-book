
import './CharacterPage.css'
import type {Character} from "./Types.ts";
import {Button, Form} from "antd";
import CharacterCard from "./CharacterCard.tsx";


export default function CharacterPage(){
    const [form] = Form.useForm<Character>()

    const data = Form.useWatch([],form);


    return(
        <div style={{width:'100vw',display:'flex', flexDirection:'column',overflow:'hidden'}}>
            <Button onClick={()=>{
                console.log(form.getFieldsValue())
            }}>输出</Button>
            <div style={{flex:'auto',height:0, overflow:'auto', padding:'8px'}}>
                <div style={{transform:'scale(0.5)',transformOrigin:'top left',width:'stretch',height:'stretch'}}>
                    <CharacterCard
                        dataSource={data}
                    />
                </div>
            </div>

        </div>
    )
}