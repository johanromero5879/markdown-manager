import { 
    Link as LinkRouter,
    useNavigate,
    useLocation
} from 'react-router-dom'

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


import PasswordField from 'components/password-field/PasswordField'
import { useForm } from 'hooks/useForm'
import { NewUser, UserValidator } from 'models/user'

const validator = new UserValidator<NewUser>()

const Signup = () => {
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

    const onSubmit = async () => {
        console.log('Submited by SignupForm')
    }

    const {
        state: user,
        errors,
        handleChange, 
        handleSubmit
    } = useForm<NewUser>({
        initialState,
        validator,
        onSubmit
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
                        value={user.fullname}
                        onChange={handleChange}
                        error={!!errors.fullname}
                        helperText={errors.fullname}
                    />
                    <TextField 
                        id="username"
                        name="username"
                        label="Username" 
                        variant="outlined" 
                        value={user.username}
                        onChange={handleChange}
                        error={!!errors.username}
                        helperText={errors.username}
                    />
                    <PasswordField 
                        value={user.password}
                        label='Password'
                        name='password'
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <PasswordField 
                        value={user.confirmPassword}
                        label='Confirm password'
                        name='confirmPassword'
                        onChange={handleChange}
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

export default Signup