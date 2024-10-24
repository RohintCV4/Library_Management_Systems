import React from "react";
import {useGetOverDueQuery } from "../../redux/services/libApi";

const OverDue=()=>{
    const { data: visitor, isLoading, error } = useGetOverDueQuery();
    console.log(visitor);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching data</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card border-0 shadow-sm rounded-4">
                <div className="card-header text-center bg-light">
                    <h3 className="mb-0">Overdue List</h3>
                </div>
                <div className="card-body p-4 bg-light">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>S.Num</th>
                                    <th>Visitors Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>OverDue (Days)</th>
                                    <th>Address</th>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                {visitor?.data?.map((val, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{val?.name}</td>
                                        <td>{val?.email}</td>
                                        <td>{val?.phoneNumber}</td>
                                        <td>{val?.overdue}</td>
                                        <td>{val?.address}</td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default OverDue;