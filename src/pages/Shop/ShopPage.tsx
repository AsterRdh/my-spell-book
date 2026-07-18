import ItemBuilder, {type ItemBuilderRef} from "./ItemBuilder.tsx";
import './index.css'
import {Button, Col, Input, Row, Space, Table} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {ReloadOutlined} from "@ant-design/icons";
import type {Item} from "./Types.ts";
import type {AjaxResultType} from "../../types/DataType.ts";

type PagingConfig = {
    current: number;
    pageSize: number;
    total: number;
}

export default function ShopPage(){


    const itemBuilder = useRef<ItemBuilderRef>(null);

    const onAddItem = () => {
        itemBuilder.current?.open()
    }

    const [itemData, setItemData] = useState<Item[]>([])
    const [selectedItems, setSelectedItems] = useState<React.Key[]>()
    const [pagingConfig, setPagingConfig] = useState<PagingConfig>({
        current: 0,
        pageSize: 10,
        total: 0
    })

    const [searchValue, setSearchValue] = useState<string>()

    const onLoadTable = (currentPage: number, pageSize: number, condition?: string) => {
        fetch(`/SpellBook/dnd/shop/listItem?currentPage=${currentPage-1}&pageSize=${pageSize}&condition=${condition||''}`,{
            method: 'POST',
        })
            .then((response) => response.json())
            .then((res: AjaxResultType<{
                content: Item[],
                total: number,size: number, number: number
            }>) => {
                const {content, total, size, number} = res.data
                console.log("loadTable", res)
                setItemData(content)
                setPagingConfig({
                    current: number+1,
                    pageSize:size,
                    total:total
                })
            })

    }


    const onDeleteItem = () => {
    }

    useEffect(() => {
        onLoadTable(pagingConfig.current, pagingConfig.pageSize, searchValue)
    }, []);

    const onSearch = (value: string) => {
        onLoadTable(pagingConfig.current, pagingConfig.pageSize, value)
    }

    const onRefresh = () => {
        onLoadTable(pagingConfig.current, pagingConfig.pageSize, searchValue)
    }

    const onEditItem = (item: Item) => {
        itemBuilder.current?.open(item)
    }

    return(
        <div className={'shop-page'}>
            <div className={'working'}>
                制作中
            </div>
            <div>
                <Table
                    title={() => (
                        <Row gutter={[8,8]} align={'middle'}>
                            <Col>物品列表</Col>
                            <Col>
                                <Input.Search placeholder="输入物品名称" enterButton="搜索" onSearch={onSearch}
                                              value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}}
                                              allowClear
                                              size={'small'} variant={'underlined'}/>
                            </Col>
                            <Col flex={'auto'}/>
                            <Col>
                                <Space>
                                    <Button type={'primary'} onClick={onAddItem}>添加物品</Button>
                                    <Button color={'danger'} onClick={onDeleteItem} disabled={!selectedItems || selectedItems.length === 0}>删除</Button>
                                    <Button icon={<ReloadOutlined/>} onClick={onRefresh}/>
                                </Space>
                            </Col>
                        </Row>
                    )}
                    rowSelection={{
                        type: 'checkbox',
                        selectedRowKeys: selectedItems,
                        onChange: (selectedRowKeys) => {
                            setSelectedItems(selectedRowKeys)
                        },
                    }}
                    columns={[
                        {
                            key: '_index',
                            fixed: 'left',
                            width: 50,
                            render: (_, __,index) => {
                                return (
                                    <div style={{textAlign: 'center'}}>{index+1+(pagingConfig.current-1)*pagingConfig.pageSize}</div>
                                )
                            }
                        },
                        {
                            dataIndex: 'image',
                            key: 'image',
                            width: 50,
                            fixed: 'left',
                            render: (text) => {
                                return (
                                    <img src={text} alt={''} style={{width: '100%', height: '100%'}}/>
                                )
                            }
                        },
                        {
                            title: '物品名称',
                            dataIndex: 'name',
                            key: 'name',
                            fixed: 'left',
                            render: (text,record) => {
                                return (
                                    <div style={{textAlign: 'left'}}>
                                        <Button type={'link'} onClick={()=>onEditItem(record)}>{record.cnName || text}</Button>
                                        <div>{text!==record.cnName ? text : ''}</div>
                                    </div>
                                )
                            }
                        },
                        {
                            key: '_blank',
                        },
                        {
                            title: '操作',
                            key: 'action',
                        },
                    ]}
                    pagination={{
                        hideOnSinglePage:false,
                        ...pagingConfig,
                        onChange: (current, pageSize) => {
                            onLoadTable(current, pageSize, searchValue)
                        },

                    }}
                    dataSource={itemData}
                    rowKey={'id'}
                />
            </div>
            <ItemBuilder ref={itemBuilder}/>

        </div>
    )
}