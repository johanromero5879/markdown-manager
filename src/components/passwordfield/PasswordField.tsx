import { useState, ChangeEvent } from 'react'
import {
    IconButton,
    InputAdornment,
    InputLabel,
    FormControl,
    OutlinedInput
} from '@mui/material'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

interface PasswordFieldProps {
    label: string,
    value: string,
    name: string,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const PasswordField = ({ label, value, name, handleChange }: PasswordFieldProps) => {
    const [show, setShow] = useState(false)

    const toggleShow = () => {
        setShow(!show)
    }

    return (
        <FormControl variant="outlined" >
            <InputLabel htmlFor={name}>{ label }</InputLabel>
            <OutlinedInput 
                id={name}
                name={name}
                label={label}
                type={ show ? 'text': 'password' }
                value={value}
                onChange={handleChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            edge="end"
                            onClick={toggleShow}
                        >
                            { show ? <Visibility /> : <VisibilityOff /> }
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}

export default PasswordField