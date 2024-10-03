import React, { useEffect } from 'react';
import {useParams } from 'react-router-dom';
import {useGetPurchaseQuery } from '../redux/services/libApi';

const Purchase = () => {
  const { id } = useParams();
  const { data: purchase, refetch } = useGetPurchaseQuery(id);

  // Refetch data when the component mounts or when id changes
  useEffect(() => {
    refetch();
  }, [id, refetch]); 

  useEffect(() => {
    if (purchase) {
      console.log('Purchase data:', purchase); // Perform any side effects here
    }
  }, [purchase]);

  return (
    <div className="container mt-5">
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Purchased Books</h3>
        </div>
        <div className="card-body p-4 bg-light rounded-4">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>S.Num</th>
                  <th>Book Name</th>
                  <th>Author Name</th>
                  <th>Publisher</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {purchase?.data?.slice(0, 3)?.map((val, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{val?.book?.name}</td>
                    <td>{val?.book?.authorName}</td>
                    <td>{val?.book?.publisher}</td>
                    <td>{val?.book?.category?.name}</td> 
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;