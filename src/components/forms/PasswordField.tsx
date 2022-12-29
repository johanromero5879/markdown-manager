import { useState, ChangeEvent } from 'react'
import {
    IconButton,
    InputAdornment,
    InputLabel,
    FormControl,
    FormHelperText,
    OutlinedInput
} from '@mui/material'

import { 
    Visibility,
    VisibilityOff
} from '@mui/icons-material'

interface PasswordFieldProps {
    error? : boolean,
    helperText?: string,
    label?: string,
    value?: string,
    name?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const PasswordField = ({ label, value, name, onChange, error, helperText }: PasswordFieldProps) => {
    const [show, setShow] = useState(false)

    const toggleShow = () => {
        setShow(!show)
    }

    return (
        <FormControl variant="outlined" >
            <InputLabel htmlFor={name} error={error}>{ label }</InputLabel>
            <OutlinedInput 
                id={name}
                name={name}
                label={label}
                type={ show ? 'text': 'password' }
                value={value}
                onChange={onChange}
                error={error}
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
            { helperText && <FormHelperText error={error}>{ helperText }</FormHelperText> }
        </FormControl>
    )
}

export default PasswordField