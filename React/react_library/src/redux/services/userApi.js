import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath:"userApi",
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
        

        addRatingBook: build.mutation({
            query: ({ rating, id, bookId }) => ({
              url: "auth/rating-book",
              method: "POST",
              body: {
                rating,
                userId: id,
                bookId,
              },
            }),
            invalidatesTags: ['Library'],
          }),

          getsearchPracticeTest: build.query({
            query: ({search,searchCurrentPageNo}) => `/api/v1/search-practice-test?pageNo=${searchCurrentPageNo}${search.length===0?"":`&search=${search}`}`,
          }),

          getVisitors:build.query({
            query:(id) =>({
                url:`user/account/${id}`,
                method : "GET",
                providesTags:['Library']
            }),
                 
        }),

        updateBookRating:build.mutation({
            query:(id)=>({
                url:`auth/rating-update`,
                method:"PUT",
                body:id,
            }),
            invalidatesTags:['Library']
        }),

        updateVisitors:build.mutation({
            query:({id,data})=>({
                url:`user/update-user/${id}`,
                method: "POST",
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
                url: `event/borrow/multiple/${id}`,     
                // url:"https://v1nrolapi.devboxengine.com/v1/api/login",
                method: "POST",
                body: { bookId: selectedBooks }, 
            }), 
        }),
    })
})
export const {useAddRatingBookMutation,useAddReturnBookMutation,useAddborrowbookMutation,useGetBooksQuery,useGetPurchaseQuery,useGetVisitorsQuery,useGetsearchPracticeTestQuery,useUpdateBookRatingMutation,useUpdateVisitorsMutation}=userApi;