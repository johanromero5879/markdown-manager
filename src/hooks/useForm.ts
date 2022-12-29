import { 
    ChangeEvent, 
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

    const validateField = (name: string, value: string) => {
        const error = validator(name, {...state, [name]: value})
        setErrors({...errors, [name]: error[name]})
    }

    const isValid = () => {
        // Validate all fields at the same time
        const validations: any = {}
        for (const key in state) {

            const errors = validator(key, state)
            if(errors[key]) {
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

    const clearForm = () => {
        setState({...initialState})
        setErrors({} as FormState)
        setFormStatus('IDLE')
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isValid()) {
            execSubmit()
        }
    }

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        validateField(target.name, target.value)
        setState({...state, [target.name]: target.value})
    }

    return {
        state,
        setState,
        formStatus,
        validateField,
        errors,
        setErrors,
        handleChange,
        handleSubmit,
        clearForm
    }
}