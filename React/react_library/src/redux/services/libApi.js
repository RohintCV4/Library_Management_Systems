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
        addSignupVisitors:build.mutation({
            query:(createSignup) => ({
                url:"auth/visitors-signup",
                method:"POST",
                body:createSignup,
            }),
            invalidatesTags:['Library']
        }),

        addLogin:build.mutation({
            query:(login)=>({
                url:"auth/login",
                method:"POST",
                body:login,
            }),
            invalidatesTags:['Library']
        }),

        getVisitors:build.query({
            query:(id) =>({
                url:`user/ac/${id}`,
                method : "GET",
                providesTags:['Library']
            }),
            // transformResponse: (response) =>{
            //     console.log(response,"hbh");
                
            // },       
        }),

        updateVisitors:build.mutation({
            query:({id,data})=>({
                url:`user/update-user/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags:['Library']
        }),

        getBooks:build.query({
            query:()=>"auth/get-book",
            
            providesTags:['Library']
        }),

        getPurchase:build.query({
            query:(id)=>`event/borrowed/${id}`,
            
            providesTags:['Library']
        }),

        addReturnBook:build.mutation({
            query:(id) =>({
                url:`event/return/${id}`,
                method : "POST",    
            }),
            invalidatesTags:['Library']
        }),

        addborrowbook: build.mutation({
            query: ({ id, selectedBooks }) => ({
                url: `event/borrow/multiple/${id}`, // Use id in the URL
                method: "POST",
                body: { bookId: selectedBooks }, // Send selectedBooks as part of request body
            }),
        }),

    })
})
export const {useAddSignupVisitorsMutation,useAddLoginMutation,useGetVisitorsQuery,useUpdateVisitorsMutation,useGetBooksQuery,useAddborrowbookMutation,useGetPurchaseQuery,useAddReturnBookMutation}=libApi;