import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query'
import React from 'react'

export const Book =createApi({
    reducerPath:"Book",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:8005/api/v1/auth/",
        prepareHeaders:(headers)=>{
            const token=localStorage.getItem("Token");
            if(token){
                headers.set("Authorization",`Bearer${token}`)
            }
            return token;
        }
    }),
    tagTypes:["book"],
    endpoints:(builder)=>({
        getBook:builder.query({
            query:()=>({
                url:"get-books",
                method:"GET"
            }),
            providesTags:["book"]
        })
    })
})

export const {useGetBookQuery}=Book;