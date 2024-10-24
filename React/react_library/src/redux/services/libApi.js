import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

        getLibrarian:build.query({
            query:(id) =>({
                url:`user/account/${id}`,
                method : "GET",
                providesTags:['Library']
            }),
                 
        }),
       
        updateLibrarian:build.mutation({
            query:({id,data})=>({
                url:`user/update-user/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags:['Library']
        }),


    })
})
export const {useUpdateLibrarianMutation,useGetallvisitorsQuery,useGetVisitorEventListQuery,useGetLibrarianQuery}=libApi;