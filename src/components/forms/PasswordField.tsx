import { useState, ChangeEvent, FocusEvent } from 'react'
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
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void
}

const PasswordField = ({ label, value, name, onChange, onBlur, error, helperText }: PasswordFieldProps) => {
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
                onBlur={onBlur}
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