import { FormEvent, ChangeEvent, useState } from 'react'
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

const SignupForm = () => {
    // Location url
    const location = useLocation()
    const state = location.state as { background?: Location }

    const navigate = useNavigate()
    const [open] = useState(true)
    const [newUser, setNewUser] = useState({
        fullname:'',
        username: '',
        password: '',
        confirm_password: ''
    })

    const handleClose = () => {
        navigate('/')
    }

    const handleSubmit= (e: FormEvent<HTMLFormElement>) => {
        console.log('submitted')
        e.preventDefault()
    }

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setNewUser({...newUser, [target.name]: target.value})
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
                    Sign Up
                </Typography>
                <TextField 
                    id="fullname"
                    name="fullname"
                    label="Full name" 
                    variant="outlined" 
                    value={newUser.fullname}
                    onChange={handleChange}
                />
                <TextField 
                    id="username"
                    name="username"
                    label="Username" 
                    variant="outlined" 
                    value={newUser.username}
                    onChange={handleChange}
                />
                <PasswordField 
                    value={newUser.password}
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