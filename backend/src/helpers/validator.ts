import { double } from "drizzle-orm/mysql-core"
import { AddNewColumn, ColumnNew, InputMaybe } from "../graphql/graphql-types"
import { BadRequest } from "./errorHandler"

export const validateColumnNames= (items: string[])=>{
    let listCheck=[items[0].toLocaleLowerCase()]
    for (let i=1; i<items.length; i++){
       if(listCheck.includes(items[i].toLocaleLowerCase())) {
        throw new BadRequest("Column names must unique")
       }
       listCheck.push(items[i].toLocaleLowerCase())
    }
    return listCheck
}

export const duplicateTitleCheck= (items: {title: string, [key: string]: unknown}[])=>{
    let listCheck=[items[0].title.toLocaleLowerCase()]
    for (let i=1; i<items.length; i++){
       if(listCheck.includes(items[i].title.toLocaleLowerCase())) {
        throw new BadRequest("Column name must unique")
       }
       listCheck.push(items[i].title)
    }
    return listCheck
}

export const validateColumnNameOnUpdate= (oldColumns: ColumnNew[], newColumns?:InputMaybe<string[]>)=>{
    let listCheck: string[]= []
    if(oldColumns.length>0){

      listCheck = [oldColumns[0].name.toLocaleLowerCase()]
        for(let i=1; i<oldColumns.length; i++){
            if(listCheck.includes(oldColumns[i].name)){
                throw new BadRequest("Column names must be unique ")
            }
            listCheck.push(oldColumns[i].name.toLocaleLowerCase())
        }
    }
    if(newColumns){
        for(let i=0; i<newColumns.length; i++){
            if(listCheck.includes(newColumns[i])){
                throw new BadRequest("Column names must be unique ")
            }
            listCheck.push(newColumns[i].toLocaleLowerCase())
        }
    }
}
