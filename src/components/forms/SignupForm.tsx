import { 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Button,
    Link
} from '@mui/material'
import { 
    Link as LinkRouter,
    useNavigate,
    useLocation
} from 'react-router-dom'

import PasswordField from './PasswordField'
import useForm from '../../hooks/useForm'
import { NewUser } from '../../models/user/user'
import { validator } from '../../models/user/user.validator'

import './Forms.css'

const SignupForm = () => {
    // Location url
    const location = useLocation()
    const state = location.state as { background?: Location }

    const navigate = useNavigate()
    
    const initialState: NewUser = {
        username: '',
        fullname: '',
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
        <Dialog
            open={true}
            onClose={handleClose}
            className="dialog"
        >
            <DialogTitle>Sign Up</DialogTitle>
            <DialogContent>
                <form id="signup-form" onSubmit={handleSubmit}>
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
                    <DialogContentText>
                        Do you already have an account?&nbsp;
                        <Link 
                            className="nowrap"
                            component={LinkRouter} 
                            to="/login"
                            state={{ background: state?.background }}
                        >
                            Log in
                        </Link>
                    </DialogContentText>
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    type="submit"
                    form="signup-form"
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SignupForm