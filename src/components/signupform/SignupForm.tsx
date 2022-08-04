import { 
    Modal,
    TextField,
    Typography,
    Button,
    Link
} from '@mui/material'
import { 
    Link as LinkRouter,
    useNavigate,
    useLocation
} from 'react-router-dom'

import PasswordField from '../passwordfield/PasswordField'
import useForm from '../../hooks/useForm'
import { validator } from '../../models/user/UserValidator'

interface NewUser {
    fullname: string,
    username: string,
    password: string,
    confirmPassword: string
}

const SignupForm = () => {
    // Location url
    const location = useLocation()
    const state = location.state as { background?: Location }

    const navigate = useNavigate()
    
    const initialState = {
        fullname:'',
        username: '',
        password: '',
        confirmPassword: ''
    }

    const submit= () => {
        console.log('Submited')
    }

    const {
        state: newUser,
        errors,
        handleChange, 
        handleBlur,
        handleSubmit
    } = useForm<NewUser>({
        initialState,
        validator,
        submit
    })

    const handleClose = () => {
        navigate('/')
    }

    return (
        <Modal
            open={true}
            onClose={handleClose}
            className="modal"
        >
            <form 
                className="form" 
                onSubmit={handleSubmit}
            >
                <Typography variant="h6" component="h2">
                    Sign Up
                </Typography>
                <TextField 
                    id="fullname"
                    name="fullname"
                    label="Full name" 
                    variant="outlined" 
                    value={newUser.fullname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.fullname}
                    helperText={errors.fullname}
                />
                <TextField 
                    id="username"
                    name="username"
                    label="Username" 
                    variant="outlined" 
                    value={newUser.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.username}
                    helperText={errors.username}
                />
                <PasswordField 
                    value={newUser.password}
                    label='Password'
                    name='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.password}
                    helperText={errors.password}
                />
                <PasswordField 
                    value={newUser.confirmPassword}
                    label='Confirm password'
                    name='confirmPassword'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                />
                <Button
                    variant="contained"
                    type="submit"
                >
                    Submit
                </Button>
                <p>
                    Do you already have an account?&nbsp;
                    <Link 
                        component={LinkRouter} 
                        to="/login"
                        state={{ background: state?.background }}
                    >
                        Log in
                    </Link>
                </p>
            </form>
        </Modal>
    )
}

export default SignupForm