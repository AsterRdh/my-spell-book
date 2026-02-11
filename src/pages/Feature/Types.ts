import React from "react";
import type {ImageSelectorType} from "../../compoment/ImageSelector/ImageSelector.tsx";

export type Feature={
    id?:React.Key
    name?:string
    cnName?:string
    description?:string
    fromBook?:string
    image?:ImageSelectorType
}