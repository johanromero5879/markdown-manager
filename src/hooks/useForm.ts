import { 
    ChangeEvent, 
    FocusEvent,
    FormEvent,
    useEffect,
    useState 
} from 'react'

import { Validator } from '../models/validator'

interface FormProps<FormState> {
    initialState: FormState,
    validator: Validator<FormState>,
    submit: () => void
}

type FormStatus = 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'

const useForm = <FormState>({ initialState, validator, submit }: FormProps<FormState>) => {
    const [state, setState] = useState({...initialState})
    const [formStatus, setFormStatus] = useState<FormStatus>('IDLE')
    const [submited, setSubmited] = useState(false)
    const [errors, setErrors] = useState<FormState>({} as FormState)

    useEffect(() => {
        const isValidErrors = Object.keys(errors!).length > 0

        if(!isValidErrors && submited) {
            setFormStatus('LOADING')
            submit()
            setFormStatus('SUCCESS')
        }

        setSubmited(false)

        // eslint-disable-next-line
    }, [submited])

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setState({...state, [target.name]: target.value})
    }

    const handleBlur = ({ target }: FocusEvent<HTMLInputElement>) => {
        const { name } = target

        const error = validator(name, state)
        setErrors({...errors, [name]: error[name]})
    }

    const handleSubmit= (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Validate all fields at the same time
        const validations: any = {}
        for (const key in state) {
            const errors = validator(key, state)
            
            if (!!errors[key]) {
                validations[key] = errors[key]
            }
        }

        setErrors({...errors, ...validations })
        setSubmited(true)
    }

    const clearForm = () => {
        setState({...initialState})
        setFormStatus('IDLE')
        setErrors({} as FormState)
        setSubmited(false)
    }

    return {
        state,
        formStatus,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        clearForm
    }
}

export default useForm