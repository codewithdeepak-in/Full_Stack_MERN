import { useEffect, useState } from "react";

import { useFormik } from 'formik';
// Better management of forms.
import * as Yup from 'yup';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import { registerUser, signInUser } from "../../store/actions/users";
// For validation purpose.
import { useDispatch, useSelector } from "react-redux";
import { errorHelper } from "../../utils/tool";
import {Loader} from "../../utils/tool";
import { useNavigate } from "react-router-dom";
import  PreventSignin  from '../../hoc/preventSignin';

const Auth = () => {
    const navigate = useNavigate();

    const [register, setRegister] = useState(false);
    // redux
    const state = useSelector((state) => state.users);
    const notification = useSelector((state) => state.notification.global);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: Yup.object({
            email: Yup.string().required('Sorry the email is required')
                .email('This is not a valid email'),
            password: Yup.string()
                .required('Sorry the password is required')
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        }
    })

    const handleSubmit = (values) => {
        if (register) {
            dispatch(registerUser(values))
        } else {
            dispatch(signInUser(values));
        }
    }

    useEffect(() => {
        if (notification && notification.success) {
            navigate('/dashboard');
        }
    }, [notification])

    return (
<PreventSignin props={state}>
        <div className='auth_container d-flex justify-content-center align-items-center flex-column '>
            <h1>Authenticate</h1>
            {state.loading ? <Loader /> :

                <Box
                    sx={{
                        '& .MuiTextField-root': { width: '100%', marginTop: '20px' },
                    }}
                    component="form"
                    onSubmit={formik.handleSubmit}
                >
                    <TextField
                        name="email"
                        label="Enter your email"
                        variant='outlined'
                        {...formik.getFieldProps('email')}
                        {...errorHelper(formik, 'email')}
                    />

                    <TextField
                        name="password"
                        label="Enter your password"
                        type="password"
                        variant='outlined'
                        {...formik.getFieldProps('password')}
                        {...errorHelper(formik, 'password')}
                        />

                    <div className='mt-2'>
                        <Button variant='contained' color="primary" type="submit" size="large" className="w-100">
                            {register ? 'Register' : 'Login'}
                        </Button>
                        <br />
                        <Button
                            className='mt-3 w-100'
                            variant='outlined'
                            color="secondary"
                            size="small"
                            onClick={() => setRegister(!register)}
                        >
                            Want to {!register ? 'Register' : 'Login'}
                        </Button>
                    </div>
                </Box>
            }

        </div>
    </PreventSignin>
    )
}

export default Auth;