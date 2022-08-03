import { FormEvent, ChangeEvent, useState } from 'react'
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

const LoginForm = () => {
    // Location url
    const location = useLocation()
    const state = location.state as { background?: Location }

    const navigate = useNavigate()
    const [open] = useState(true)
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    const handleClose = () => {
        navigate('/')
    }

    const handleSubmit= (e: FormEvent<HTMLFormElement>) => {
        console.log('submitted')
        e.preventDefault()
    }

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setCredentials({...credentials, [target.name]: target.value})
    }

    return (
        <Modal
            open={open}
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
                />
                <PasswordField 
                    value={credentials.password}
                    label='Password'
                    name='password'
                    handleChange={handleChange}
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