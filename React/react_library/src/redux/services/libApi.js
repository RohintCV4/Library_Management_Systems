import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import UpdateLibrarian from "../../page/Librarian/updateLibrarian";

export const libApi = createApi({
    reducerPath:"libraryApi",
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost:8005/api/v1/",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('Token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },

    }),
    tagTypes:['Library'],
    endpoints:(build) => ({
    
        getallvisitors:build.query({
            query:()=>"user/get-data",
            providesTags:['Library']
        }),

        getVisitorEventList:build.query({
            query:()=>"event/list/user",
            providesTags:['Library']
        }),

       
        UpdateLibrarian:build.mutation({
            query:({id,data})=>({
                url:`user/update-user/${id}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags:['Library']
        }),

        getLibrarian:build.query({
            query:(id) =>({
                url:`user/account/${id}`,
                method : "GET",
                providesTags:['Library']
            }),
                 
        }),

        getOverDue:build.query({
            query:()=>"event/list/overdue",
            providesTags:['Library']
        }),


    })
})
export const {useGetallvisitorsQuery,useGetVisitorEventListQuery,useUpdateLibrarianMutation,useGetLibrarianQuery,useGetOverDueQuery}=libApi;