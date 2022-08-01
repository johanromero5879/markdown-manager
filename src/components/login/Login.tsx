import { FormEvent } from 'react'

import './Login.css'

const Login = () => {
    const handleSubmit= (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <div className='container'>
            <form 
                className="form" 
                onSubmit={handleSubmit}
            >
                <h3>Login</h3>
            </form>
        </div>
    )
}

export default Login