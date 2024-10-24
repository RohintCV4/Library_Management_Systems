import * as yup from 'yup';

export const signUpfields = [
  { label: "Name", type: "text", name: "name", placeholder: "Enter Name" },
  { label: "Email", type: "email", name: "email", placeholder: "Enter Email" },
  { label: "Address", type: "textarea", name: "address", placeholder: "Enter Address" },
  { label: "Phone Number", type: "text", name: "phoneNumber", placeholder: "Enter PhoneNumber" },
  { label: "Password", type: "password", name: "password", placeholder: "Enter Password" },
  { label: "Confirm Password", type: "password", name: "confirmPassword", placeholder: "Enter Confirm Password" }
];

export const signInfields = [
  { label: "Email", type: "email", name: "email", placeholder: "Enter Email" },
  { label: "Password", type: "password", name: "password", placeholder: "Enter Password" }
]

export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must be less than 50 characters'),

  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),

  address: yup
    .string()
    .required('Address is required')
    .min(5, 'Address must be at least 5 characters long')
    .max(100, 'Address must be less than 100 characters'),

  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(
      /^(\+?\d{1,4})?\s?\d{10}$/,
      'Phone number must be a valid 10-digit number or include a valid international code'
    ),
});

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required'),

  password: yup
    .string()
    .required('Password is required')
})

export const updateSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must be less than 50 characters'),
    address: yup
    .string()
    .required('Address is required')
    .min(5, 'Address must be at least 5 characters long')
    .max(100, 'Address must be less than 100 characters'),

  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(
      /^(\+?\d{1,4})?\s?\d{10}$/,
      'Phone number must be a valid 10-digit number or include a valid international code'
    ),
})

export const updateField=[
  { label: "Name", type: "text", name: "name"},
  { label: "Address", type: "textarea", name: "address"},
  { label: "Phone Number", type: "text", name: "phoneNumber" }
]