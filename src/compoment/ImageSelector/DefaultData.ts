import type {ImageSelectorType} from "./ImageSelector.tsx";

export const defaultImageSettings: ImageSelectorType = {
    from: 'url',
    url: '',
    file: [],
    position: {
        x: 0,
        y: 0
    },
    size: {
        width: 'auto',
        height: '50%'
    },
    fit: 'fill',
    mask: true,
    rotation: 0
}