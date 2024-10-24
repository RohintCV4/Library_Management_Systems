import React, { useEffect} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import FormField from '../../component/FormField';
import { signInSchema, signInfields } from '../../constant/index';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddLoginMutation } from '../../redux/services/authApi';

const SignIn = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(signInSchema)
    });
    
    const [login] = useAddLoginMutation();

    useEffect(() => {
        localStorage.removeItem('Token');
    }, []);


    const onSubmit = async (data) => {
     
        
        try {
            const result = await login(data).unwrap(); // unwrap to handle success/error more easily
    
            if (!result || !result.token) {
                toast.error("Invalid email or password. Please try again.", { autoClose: 1500 });
                return;
            }
    
            const token = result.token;

         
            
    
            // Store token and show success message
            localStorage.setItem('Token', token);
            toast.success("Login done Successfully", { autoClose: 500 });
    
            // Process token payload
            const tokenParts = token.split('.');
            if (tokenParts.length === 3) {
                const payloadBase64 = tokenParts[1];
                const decodedPayload = atob(payloadBase64);
                const payload = JSON.parse(decodedPayload);
    
                const userId = payload.user_id;
                const userRole = payload.role;
    
                // Navigate based on user role
                setTimeout(() => {
                    if (userRole === "ROLE_VISITOR") {
                        navigate(`/library/book/${userId}`);
                    } else {
                        navigate(`/librarian/userlist`);
                    }
                }, 1501);
            } else {
                toast.error("Invalid token format.", { autoClose: 1500 });
            }
    
            reset(); // Clear form after success
    
        } catch (error) {
            // Handle network or server errors properly
            if (error.response) {
                toast.error("Server responded with an error. Please try again.", { autoClose: 1500 });
            } else if (error.request) {
                toast.error("Network error. Please check your connection.", { autoClose: 1500 });
            } else {
                toast.error("An error occurred during submission. Please try again.", { autoClose: 1500 });
            }
        }
    };
    

    return (
        <div className='image1'> 
            <div className='d-flex justify-content-center align-items-center p-3 p-sm-5 p-md-4 p-lg-5'>
                <ToastContainer />
                <div className='card border-0 shadow-lg bg-light card mx-auto col-md-8 col-lg-5 col-xl-4 mt-5'>
                    <div className='card-body p-xl-3 p-lg-4'>
                        <h3 className='text-center'>Library Management Systems</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className='p-4'>
                            {signInfields.map((field, index) => (
                                <FormField
                                    key={index}
                                    field={field}
                                    register={register}
                                    errors={errors}
                                />
                            ))}
                            <div className='pt-3'>
                                <button className="btn btn-secondary col-12 mt-3 rounded-1" type="submit">
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SignIn;