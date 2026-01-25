import type {Monster} from "./Types.ts";

export const DefaultData:Monster={
    id:1,
    name:'Raven',
    cnName:'渡鸦',
    type:'Beast',
    size:'Tiny',
    level:0,
    xp:10,
    alignment:undefined,
    ac:12,
    hp:1,
    hpRoll:'1d4',
    speed:[
        {type:'Walk',value:'10 尺'},
        {type:'Fly',value:'50 尺'},
    ],
    ability:{
        pow:2,
        dex:14,
        con:9,
        int:2,
        wis:12,
        cha:6
    },
    skills:[
        {type:'Perception', value:3}
    ],
    passivePerception:13,
    feature:[
        {name:'拟声 Mimicry',description:'渡鸦可以模仿听到的简单声音，比如人的低语声、婴儿的哭声、动物的交谈声等。听到该声音的生物可以进行一次DC 10的感知（洞悉）检定，检定成功则发现其是模仿的声音。'}
    ],
    action:[
        {name:'喙啄 Beak',description:'近战武器攻击：命中+4，触及5尺，单一目标。命中：1点穿刺伤害。'}
    ],
}