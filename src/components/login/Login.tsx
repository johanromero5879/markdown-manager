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
    useNavigate, 
    Link as LinkRouter, 
    useLocation 
} from 'react-router-dom'

import PasswordField from 'components/password-field/PasswordField'
import { useForm } from 'hooks/useForm'

import { Auth, UserValidator } from 'models/user'

const validator = new UserValidator<Auth>()

const Login = () => {
    // Location url
    const location = useLocation()
    const state = location.state as { background?: Location }
    const navigate = useNavigate()

    const initialState: Auth = {
        username: '',
        password: '',
    }

    const onSubmit = async () => {
        console.log('Submited by LoginForm')
    }

    const { 
        state: credentials,
        errors, 
        handleChange,
        handleSubmit 
    } = useForm<Auth>({
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
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <form id="login-form" onSubmit={handleSubmit}>
                    <TextField 
                        id="username"
                        name="username"
                        label="Username" 
                        variant="outlined" 
                        value={credentials.username}
                        onChange={handleChange}
                        error={!!errors.username}
                        helperText={errors.username}
                    />
                    <PasswordField 
                        value={credentials.password}
                        label='Password'
                        name='password'
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <DialogContentText>
                        New over here?&nbsp;
                        <Link 
                            className="nowrap"
                            component={LinkRouter} 
                            to="/signup" 
                            state={{ background: state?.background }}
                        >
                            Sign up
                        </Link>
                    </DialogContentText>
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    type="submit"
                    form='login-form'
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Login