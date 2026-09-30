import React, { use, useState } from 'react'

const Login = () => {
    const [error,setError] = useState('')
    const [loading, setLoading]= useState(false)
    const [user, setUser] = useState(null)

    const handleSubmit = async (e:React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        const formData = new FormData(e.currentTarget)
        const username = formData.get('username')
        const password = formData.get('password')
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    username: username,
                    password: password,
                    // expiresInMin: 30,
                })
            })
            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || 'Login Failed')
            }
            setUser(data)
            console.log('Login successful', data)
        } catch(err) {
            if(err instanceof Error) {
                setError(err.message)
            } else {
                setError('An unexpected error occured')
            }
        } finally {
            setLoading(false)
        }
        
        console.log(user)

    }
  return (
    <>
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name='username' placeholder='try emilys' />
                <input type="password" name='password' placeholder='try emilyspass'/>
                <button type='submit' disabled={loading}>
                    {loading ? 'Logging In' : 'Login'}
                </button>
            </form>
        </div>

    </>
    
    
  )
}

export default Login
