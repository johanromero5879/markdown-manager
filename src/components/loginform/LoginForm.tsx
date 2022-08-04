import { 
    Modal,
    TextField,
    Typography,
    Button,
    Link
} from '@mui/material'
import { 
    useNavigate, 
    Link as LinkRouter, 
    useLocation 
} from 'react-router-dom'

import PasswordField from '../passwordfield/PasswordField'
import useForm from '../../hooks/useForm'
import { validator } from '../../models/user/UserValidator'

interface Credentials {
    username: string,
    password: string
}

const LoginForm = () => {
    // Location url
    const location = useLocation()
    const state = location.state as { background?: Location }
    const navigate = useNavigate()

    const initialState = {
        username: '',
        password: ''
    }

    const submit= () => {
        console.log('Submited')
    }

    const { 
        state: credentials,
        errors, 
        handleChange,
        handleBlur,
        handleSubmit 
    } = useForm<Credentials>({
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
                    Login
                </Typography>
                <TextField 
                    id="username"
                    name="username"
                    label="Username" 
                    variant="outlined" 
                    value={credentials.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.username}
                    helperText={errors.username}
                />
                <PasswordField 
                    value={credentials.password}
                    label='Password'
                    name='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.password}
                    helperText={errors.password}
                />
                <Button
                    variant="contained"
                    type="submit"
                >
                    Submit
                </Button>
                <p>
                    New over here?&nbsp;
                    <Link 
                        component={LinkRouter} 
                        to="/signup" 
                        state={{ background: state?.background }}
                    >
                        Sign up
                    </Link>
                </p>
            </form>
        </Modal>
    )
}

export default LoginForm