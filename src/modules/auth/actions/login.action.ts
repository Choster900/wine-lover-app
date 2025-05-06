
export const loginAction = async (email: string, password: string) => {
    const response = await fetch('https://tu-api.com/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
        throw new Error('Credenciales inválidas')
    }

    const data = await response.json()
    localStorage.setItem('token', data.token)
}
