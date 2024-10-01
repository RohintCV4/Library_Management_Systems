import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '../constant';
import { useGetVisitorsQuery, useUpdateVisitorsMutation } from '../redux/services/libApi';

const ProfileUpdate = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const { data: userData, error, isLoading } = useGetVisitorsQuery(id);
  console.log(userData);
  
  const [updateVisitors, { isSuccess }] = useUpdateVisitorsMutation(); 
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(signupSchema),
  });

  
  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name, 
        address: userData.address,
        phoneNumber: userData.phoneNumber, 
      });
    }
  }, [userData, reset]);

  const onSubmit = async (data) => {
    try {
      const updateData = {
        name: data.name,
        address: data.address,
        phone: data.phone, // Matches the form input's name
      };
      
      await updateVisitors({ id, data: updateData });
      toast.success('Profile updated successfully!');
      navigate('/profile'); // Redirect or take appropriate action
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error('Unable to update profile.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error loading user data.</div>; 
  }

  return (
    <div className="container">
      <ToastContainer />
      <h2>Update Profile</h2>
      <form >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name='name'
            className="form-control"
            {...register('name')} // Make sure the names match in register
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            id="address"
            name='address'
            className="form-control"
            {...register('address')} // Name should be consistent
          />
          {errors.address && <p className="text-danger">{errors.address.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name='phoneNumber'
            className="form-control"
            {...register('phoneNumber')} // Should match the 'phone' used in reset
          />
          {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber.message}</p>}
        </div>  

        <button type="submit" className="btn btn-primary" onSubmit={handleSubmit(onSubmit)}>Update Profile</button>
      </form>
    </div>
  );
};


// export default ProfileUpdate;



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
      // <div className="container">
      //   <h2>Update Profile</h2>
      //   <form onSubmit={handleSubmit(onSubmit)}>
      //     <div className="mb-3">
      //       <label htmlFor="name" className="form-label">Name</label>
      //       <input
      //         type="text"
      //         id="name"
      //         className="form-control"
      //         {...register('name', { required: true })}
      //       />
      //     </div>
  
      //     <div className="mb-3">
      //       <label htmlFor="address" className="form-label">Address</label>
      //       <input
      //         type="text"
      //         id="address"
      //         className="form-control"
      //         {...register('address', { required: true })}
      //       />
      //     </div>
  
      //     <div className="mb-3">
      //       <label htmlFor="phone" className="form-label">Phone Number</label>
      //       <input
      //         type="tel"
      //         id="phone"
      //         className="form-control"
      //         {...register('phone', { required: true })}
      //       />
      //     </div>  
      //     <button type="submit" className="btn btn-primary">Update Profile</button>
      //   </form>
      // </div>
//     );
//   };
  
  export default ProfileUpdate;