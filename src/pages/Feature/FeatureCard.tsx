import React from "react";
import type {BookType} from "../../types/DataType.ts";
import type {Feature} from "./Types.ts";

type FeatureCardProps = {
    dataSource?: Feature
    dataSet:{
        books:{[key:string]:BookType};
    }
    size:[number, number]
};

const FeatureCard =React.forwardRef((props: FeatureCardProps, ref: React.Ref<HTMLDivElement>) => {
    const {size,dataSet:{books}} = props;
    return (
        <div  className={'feature-card'} ref={ref} style={{width: size[0], height: size[1],maxWidth:size[0], maxHeight:size[1]}}>

        </div>
    )
})
export default FeatureCard;