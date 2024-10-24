import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateSchema } from '../../constant/index'; 
import {useGetLibrarianQuery, useUpdateLibrarianMutation} from '../../redux/services/libApi';
import { Button, Typography } from '@mui/material';


const UpdateLibrarian=()=>{
    const { id } = useParams(); 
    
    
    const { data: userData, error, isLoading,refetch } = useGetLibrarianQuery(id);
    const [updateLibrarian] = useUpdateLibrarianMutation(); 
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
      resolver: yupResolver(updateSchema),
    });
    
    useEffect(() => {
      if (userData?.data) {
        reset({
          name: userData.data.name,
          address: userData.data.address,
          phoneNumber: userData.data.phoneNumber,
        });
      }
    }, [userData, reset]);
  
    const dataSubmit = async (data) => {
        try {
          const updateData = {
            name: data.name,
            address: data.address,
            phoneNumber: data.phoneNumber,
          };
          console.log(updateData);
      
          await updateLibrarian({ id, data: updateData }).unwrap();
          
          toast.success('Profile updated successfully!', {
            autoClose: 1500, 
          });
      
          reset(); 
      

          setTimeout(() => {
            window.location.reload();
          }, 1500); 
      
        } catch (error) {
          console.error("Error updating profile:", error);
          toast.error('Unable to update profile.', {
            autoClose: 1500, 
          });
        }
      };
  
    if (isLoading) {
      return <div className="text-center mt-5">Loading...</div>; 
    }
  
    if (error) {
      return <div className="text-center mt-5 text-danger">Error loading user data.</div>; 
    }
  
    return (
      <div className="container mt-5">
        <ToastContainer />
        <h2 className="text-center mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit(dataSubmit)} className="shadow p-4 rounded bg-light">
          
          <div className="mb-3">
            <label htmlFor="name" className="form-label"><strong>Name</strong> </label>
            <input
              type="text"
              id="name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              {...register('name')}
            />
            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
          </div>
  
          <div className="mb-3">
            <label htmlFor="address" className="form-label"><strong>Address</strong> </label>
            <input
              type="text"
              id="address"
              className={`form-control ${errors.address ? 'is-invalid' : ''}`}
              {...register('address')}
            />
            {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
          </div>
  
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label"><strong>Phone Number</strong> </label>
            <input
              type="text"
              id="phoneNumber"
              className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
              {...register('phoneNumber')}
            />
            {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber.message}</div>}
          </div>  
  
          <Button type="submit" variant="contained" className="btn-primary w-100">
          <Typography textTransform={'capitalize'}> Update Profile</Typography>
            </Button>
        </form>
      </div>
    );  
}
export default UpdateLibrarian;