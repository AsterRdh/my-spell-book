import type {AjaxResultType, BookType, SelectOptionType} from "../types/DataType.ts";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../AppContext.ts";

const useDNDBook=()=>{
    const {notification} = useContext(AppContext)
    const [books, setBooks] = useState<{[key:string]:BookType}>({})
    const [bookOptions, setBookOptions] = useState<SelectOptionType<BookType>[]>([])
    const loadBook = () => {
        return fetch('/SpellBook/dnd/getBooks')
            .then(res=>res.json())
            .then( (data:AjaxResultType<{[key:string]:BookType}>)=>{
                if (data.success){
                    const schoolData = data.data
                    setBooks(schoolData)
                    const options:SelectOptionType<BookType>[]=Object.values(schoolData).map(book=>{
                        const option:SelectOptionType<BookType> = {
                            label:book.id+" "+book.name,
                            value:book.id,
                            data:book
                        }
                        return option
                    });
                    setBookOptions(options)
                }
            })

    };

    useEffect(()=>{
        loadBook().catch((e)=>{
            if (notification){
                notification.error({
                    title:"加载数据失败",
                    description:e.message
                })
            }else{
                console.error(e)
            }
        })
    },[])

    return {books, bookOptions}
}
export {useDNDBook}