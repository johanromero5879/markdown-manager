import { 
    ChangeEvent, 
    FocusEvent,
    FormEvent,
    useState 
} from 'react'

import { Validator } from '../models/validator'

interface FormProps<FormState> {
    initialState: FormState,
    validator: Validator<FormState>,
    submit: () => Promise<void>
}

type FormStatus = 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'

export const useForm = <FormState>({ initialState, validator, submit }: FormProps<FormState>) => {
    const [state, setState] = useState({...initialState})
    const [formStatus, setFormStatus] = useState<FormStatus>('IDLE')
    const [errors, setErrors] = useState<FormState>({} as FormState)

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setState({...state, [target.name]: target.value})
    }

    const handleBlur = ({ target }: FocusEvent<HTMLInputElement>) => {
        const { name } = target

        const error = validator(name, state)
        setErrors({...errors, [name]: error[name]})
    }

    const isValid = () => {
        // Validate all fields at the same time
        const validations: any = {}
        for (const key in state) {
            const errors = validator(key, state)
            
            if (!!errors[key]) {
                validations[key] = errors[key]
            }
        }
        setErrors(validations)

        // True if there is any key in validations object
        return Object.keys(validations!).length === 0
    }

    const execSubmit = async () => {
        setFormStatus('LOADING')
        await submit()
        setFormStatus('SUCCESS')
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    
        if (isValid()) {
            execSubmit()
        }
    }

    const clearForm = () => {
        setState({...initialState})
        setErrors({} as FormState)
        setFormStatus('IDLE')
    }

    return {
        state,
        setState,
        formStatus,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        clearForm
    }
}