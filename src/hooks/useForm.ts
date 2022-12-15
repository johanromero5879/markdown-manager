import { 
    ChangeEvent, 
    FocusEvent,
    FormEvent,
    useEffect,
    useState 
} from 'react'

interface FormProps<FormState> {
    initialState: FormState,
    validator: Function,
    submit: () => void
}

const useForm = <FormState>({ initialState, validator, submit }: FormProps<FormState>) => {
    const [state, setState] = useState({...initialState})
    const [submited, setSubmited] = useState(false)
    const [errors, setErrors] = useState<FormState>({} as FormState)

    useEffect(() => {
        const isValidErrors = Object.keys(errors!).length > 0

        if(!isValidErrors && submited) {
            submit()
        }

        setSubmited(false)
    }, [submited, errors, submit])

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
        const validations = {} as FormState
        for (const key in state) {
            const error = validator(key, state)
            validations[key] = error[key]
        }
        setErrors({...errors, ...validations })
        setSubmited(true)
    }

    const clearForm = () => {
        setState({...initialState})
        setErrors({} as FormState)
        setSubmited(false)
    }

    return {
        state,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        clearForm
    }
}

export default useForm