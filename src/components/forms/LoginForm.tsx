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

import PasswordField from './PasswordField'
import { useForm } from '../../hooks/useForm'

import { Auth } from '../../models/auth/auth'
import { validator } from '../../models/auth/auth.validator'

import './Forms.css'

const LoginForm = () => {
    // Location url
    const location = useLocation()
    const state = location.state as { background?: Location }
    const navigate = useNavigate()

    const initialState: Auth = {
        username: '',
        password: ''
    }

    const submit = async () => {
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

export default LoginForm