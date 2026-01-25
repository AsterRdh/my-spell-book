import type {Alignment, Alignment1, Alignment2} from "../compoment/AlignmentSelector/AlignmentSelector.tsx";

export const AlignmentLang:{[key in Alignment2 | Alignment1]:string} = {
    good: '善良',
    neutral: '中立',
    evil: '邪恶',
    lawful: '守序',
    chaotic: '混乱'
}
export const getAlignment=( alignment?: Alignment)=>{
    if(alignment){
        if (alignment[0]=='neutral' && alignment[1]=='neutral'){
            return '绝对中立'
        }else {
            const alignment1 = alignment[0] && AlignmentLang[alignment[0]] ;
            const alignment2 = alignment[1] && AlignmentLang[alignment[1]] ;
            if (alignment1 && alignment2){
                return `${alignment1}${alignment2}`
            }else if (alignment1){
                return `任意${alignment1}阵营`
            }else if (alignment2){
                return `任意${alignment2}阵营`
            }
        }
    }
    return '无阵营'
}