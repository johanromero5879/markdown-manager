import { 
    ChangeEvent, 
    FormEvent,
    useState
} from 'react'

import { IValidator, ErrorValidation } from '../models/validator'

interface FormProps<FormState> {
    initialState: FormState,
    validator: IValidator<FormState>,
    onSubmit: () => Promise<void>
}

type FormStatus = 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'

export const useForm = <FormState>({ initialState, validator, onSubmit }: FormProps<FormState>) => {
    const [state, setState] = useState({...initialState})
    const [formStatus, setFormStatus] = useState<FormStatus>('IDLE')
    const [errors, setErrors] = useState({} as ErrorValidation<FormState>)

    const validateField = (name: keyof FormState, value: string) => {

        const error = validator.validateField(name, value)
        
        setErrors((errors) => {

            if (!error) {
                delete errors[name]
                return errors
            }

            return {...errors, [name]: error}
        })

    }

    const validate = () => {

        const errors = validator.validateAll(state)
        if (errors && Object.keys(errors).length > 0) {
            setErrors(errors)
            return false
        }

        return true

    }

    const submit = async () => {

        setFormStatus('LOADING')
        await onSubmit()
        setFormStatus('SUCCESS')

    }

    const clearForm = () => {

        setState({...initialState})
        setErrors({} as ErrorValidation<FormState>)
        setFormStatus('IDLE')

    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        if (validate()) submit()

    }

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        validateField(target.name as keyof FormState, target.value)
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