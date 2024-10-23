import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import FormField from '../component/FormField';
import { signUpfields, signupSchema } from '../constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddSignupVisitorsMutation } from '../redux/services/libApi';

const SignUp = () => {
    const [signup] = useAddSignupVisitorsMutation();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(signupSchema)
    });

    const onSubmit = async (data) => {
        try {
            const { confirmPassword, ...formData } = data;
            await signup(formData);

            toast.success("SignUp done Successfully", { autoClose: 500 });

            setTimeout(() => {
                navigate('/signin');
            }, 1501);

            reset();
        } catch (error) {
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
        <div className='image'>
            <div className='d-flex justify-content-center align-items-center p-3 p-sm-5 p-md-4 p-lg-5'>
                <ToastContainer />
                <div className='card border-0 shadow-lg bg-light card mx-auto col-md-8 col-lg-6 col-xl-7'>
                    <h3 className='text-center mt-4'>Library Management Systems</h3>
                    <div className='card-body p-xl-4 p-lg-4'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {signUpfields.reduce((rows, field, index) => {
                                if (index % 2 === 0) rows.push([]); 
                                rows[rows.length - 1].push(field);
                                return rows;
                            }, []).map((row, rowIndex) => (
                                <div className='row' key={rowIndex}>
                                    {row.map((field, colIndex) => (
                                        <div className='col-12 col-md-6 col-xl-6 col-lg-6' key={colIndex}>
                                            <FormField
                                                field={field}
                                                register={register}
                                                errors={errors}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                            <button className="btn btn-secondary col-12 mt-3 rounded-1" type="submit">
                                Sign Up
                            </button>
                            <div className='text-center mt-3 text-muted'>
                                Have an account?
                                <span onClick={() => navigate('/signin')} style={{ cursor: "pointer" }}> &nbsp; Sign In</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
