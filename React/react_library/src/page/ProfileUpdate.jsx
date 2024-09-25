import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Icon } from '@iconify/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateField } from '../constant';
import { signupSchema } from '../constant';
import FormField from '../component/FormField';
import { useGetVisitorsQuery, useUpdateVisitorsMutation } from '../redux/services/libApi';
import axios from 'axios';


const ProfileUpdate = () => {
    const { id } = useParams(); 
  const [visitorId, setVisitorId] = useState(id);
  const [visitorData, setVisitorData] = useState({ name: '', email: '' });
  const [updateVisitors] = useUpdateVisitorsMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateVisitors({ id: visitorId, data: visitorData }).unwrap();
      alert('Visitor updated successfully');
    } catch (error) {
      console.error('Update failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Visitor ID"
        value={visitorId}
        onChange={(e) => setVisitorId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={visitorData.name}
        onChange={(e) => setVisitorData({ ...visitorData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={visitorData.email}
        onChange={(e) => setVisitorData({ ...visitorData, email: e.target.value })}
      />
      <button type="submit">Update Visitor</button>
    </form>
  );
};


//     const { id } = useParams(); 
//    console.log(id);
//   //  const [userData,setUserData]=useState([]);
//     const { data: userData, error, isLoading } = useGetVisitorsQuery(id);
//     console.log(userData,"F");
    
// // console.log('userData:', userData);  
// // useEffect(() => {
// //   const token = localStorage.getItem('Token'); // Replace 'yourTokenKey' with the key you used to store the token
// //   const headers = { 'Authorization': `Bearer ${token}` }; // Set up the Authorization header

// //   axios.get(`http://localhost:8005/api/v1/user/getid/${id}`, { headers })
// //       .then(response => {
// //          console.log(response,"vgggb");
         
// //           setUserData(response.data);
// //       })
// //       .catch(error => {
// //           console.log(error);
// //       });
// // }, [id]);

// console.log(userData);


//     const [updateVisitors, { isSuccess }] = useUpdateVisitorsMutation(); 
  
//     const { register, handleSubmit, formState: { errors }, reset } = useForm({
//         resolver: yupResolver(signupSchema)
//     });

//     useEffect(() => {
//       if (userData) {
//         reset({
//         name: userData.name, 
//         address: userData.address,
//         phoneNumber: userData.phoneNumber
//     })
//       }
//     }, [userData, reset]);
//     console.log(userData);
    
//     const onSubmit = async (data) => {
//       try {
//         const updateData = {
//           name: data.name,
//           address: data.address,
//           phone: data.phone
//         };
        
//         await updateVisitors({ id: id, data: updateData }); 
//         alert('Profile updated successfully!');
//       } catch (error) {
//         console.error("Error updating profile:", error);
//         alert('Unable to update profile.');
//       }
//     };
    
  
//     // if (isLoading) {
//     //   return <div>Loading...</div>; 
//     // }
  
//     // if (error) {
//     //   return <div>Error loading user data.</div>; 
//     // }
  
//     return (
//       <div className="container">
//         <h2>Update Profile</h2>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="mb-3">
//             <label htmlFor="name" className="form-label">Name</label>
//             <input
//               type="text"
//               id="name"
//               className="form-control"
//               {...register('name', { required: true })}
//             />
//           </div>
  
//           <div className="mb-3">
//             <label htmlFor="address" className="form-label">Address</label>
//             <input
//               type="text"
//               id="address"
//               className="form-control"
//               {...register('address', { required: true })}
//             />
//           </div>
  
//           <div className="mb-3">
//             <label htmlFor="phone" className="form-label">Phone Number</label>
//             <input
//               type="tel"
//               id="phone"
//               className="form-control"
//               {...register('phone', { required: true })}
//             />
//           </div>  
//           <button type="submit" className="btn btn-primary">Update Profile</button>
//         </form>
//       </div>
//     );
//   };
  
  export default ProfileUpdate;