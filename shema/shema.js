import * as yup from 'yup';

export const schemaRegister = yup.object().shape({
  //string prop defines value of input field (it can also be number,date etc.)
  name: yup.string().required(),
  //required method takes in message that is returned if user doesn't input anything,
  //email method takes in message that is returned if entered email is invalid
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});

export const schemaLogin = yup.object().shape({
  //required method takes in message that is returned if user doesn't input anything,
  //email method takes in message that is returned if entered email is invalid
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});

export const schemaCreatePost = yup.object().shape({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
  postImg: yup.mixed().required('Photo required'),
});
