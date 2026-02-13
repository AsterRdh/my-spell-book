import React, {useMemo} from "react";
import type {BookType} from "../../types/DataType.ts";
import type {Feature} from "./Types.ts";
import './FeatureCard.css'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {defaultImageSettings} from "../../compoment/ImageSelector/DefaultData.ts";

type FeatureCardProps = {
    dataSource?: Feature
    dataSet:{
        books:{[key:string]:BookType};
    }
    size:[number, number]
};

const FeatureCard =React.forwardRef((props: FeatureCardProps, ref: React.Ref<HTMLDivElement>) => {
    const {dataSource,size,dataSet:{books}} = props;

    const featureCardTitle = useMemo(() => {
        if (!dataSource || !dataSource.name) return ['', ''];
        return [
            dataSource.name.at(0),
            dataSource.name.slice(1)
        ]
    }, [dataSource]);

    const bookIcon = useMemo(() => {
        if(!dataSource || !dataSource.fromBook) return <></>
        const bookInfo = books[dataSource.fromBook];
        if (!bookInfo) return <div>{dataSource.fromBook}</div>
        return <div>{bookInfo.source}({bookInfo.name})</div>
    }, [books, dataSource]);

    const FeatureImage = useMemo(() => {
        if (dataSource?.type){
            switch (dataSource.type) {
                case 'Ability':
                    return '能力'
                case 'Feats':
                    return '专长'
            }
        }
        return ''
    }, [dataSource]);

    const [image,imageURL] = useMemo(() => {
        const image = {...(dataSource?.image || defaultImageSettings)};
        if (image.size){
            //如果为数字则添加默认单位px 使用正则判断
            let {width,height} = image.size;

            if (width && (width+"").match(/^[\d.]+$/)) width = `${(width+"")}px`;
            if (height && (height+"").match(/^[\d.]+$/)) height = `${(height+"")}px`;
            image.size={width, height}
        }


        let imageURL:string|undefined;
        if (!image || !image.from) {
            imageURL = undefined
        }
        if (image.from==='url'){
            imageURL = image.url
        }
        if (image.from==='local'){
            if (image.file && image.file.length>0 ){
                if (image.file[0].originFileObj)
                    imageURL = URL.createObjectURL(image.file[0].originFileObj)
            }
        }
        return [image,imageURL]
    }, [dataSource]);



    return (
        <div className={'feature-card'} ref={ref} style={{width: size[0], height: size[1],maxWidth:size[0], maxHeight:size[1]}}>
            <div style={{position:'absolute', top:120, right:120,fontSize:'36px',zIndex:30}}>
                {FeatureImage}
            </div>
            <div style={{position:'relative',zIndex:500}}>
            <div className={'feature-card-title-box'}>
                <div className={'first-litter'}>
                    {featureCardTitle[0]}
                </div>
                <div style={{flex: 1, paddingTop: '4px'}}>
                    <div className={'name'}>
                        {featureCardTitle[1]}
                    </div>
                    <div className={'cn-name'}>
                        {dataSource?.cnName}
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{
                            width: '16px',
                            height: '16px',
                            backgroundColor: '#000',
                            borderRadius: '50%'
                        }}/>
                        <div style={{width: 0, flex: 1, height: '4px', backgroundColor: '#000'}}/>
                        <div style={{
                            width: '16px',
                            height: '16px',
                            backgroundColor: '#000',
                            borderRadius: '50%'
                        }}/>
                    </div>
                </div>
            </div>
                <div>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                        {dataSource?.description}
                    </ReactMarkdown>
                </div>

            </div>
            <div style={{position:'absolute', bottom: 150, right: 150,zIndex:30}}>
                {bookIcon}
            </div>
            {
                image.mask &&  <div style={{position:'absolute', bottom: 0, right: 0,top:0,left:0,backgroundColor:'rgba(255,255,255,0.5)',zIndex:20}}/>
            }

            <div style={{position:'absolute',
                bottom: (image.position?.y||0) + 100,
                right:  (image.position?.x||0) + 100,
                zIndex:1}}>
                {
                    dataSource &&  image && imageURL && (
                        <img src={imageURL} alt={dataSource.name}
                             crossOrigin={'anonymous'}
                             style={{
                                 width: image.size && image.size.width || 'auto',
                                 height: image.size && image.size.height || '50%',
                                 objectFit: image.fit ||'cover',
                                 transform: `rotate(${image.rotation||0}deg)`
                             }}
                        />
                    )
                }

            </div>
        </div>
    )
})
export default FeatureCard;