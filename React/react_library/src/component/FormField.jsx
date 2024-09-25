import React from 'react';


const FormField = ({ field, register, errors }) => {
    return (
        <div >
            <div >
                <label htmlFor={field.name} className="form-label">
                    <strong>{field.label}</strong>
                </label>
            </div>
            <div >
                
                    {field.type === "textarea" ? (
                        <textarea
                            className="form-control"
                            {...register(field.name)}
                            placeholder={field.placeholder}
                        />
                    ):
                    <input
                        className="form-control"
                        type={field.type}
                        {...register(field.name)}
                        placeholder={field.placeholder}
                    />
                }
                {errors && errors[field.name] && (
                    <p className="text-danger mt-2">{errors[field.name].message}</p>
                )}
                <div className='mb-2'></div>
            </div>
        </div>
    );
};

export default FormField;
