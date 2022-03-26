export const storage = {
    accessToken: 'velzon-access-token',
    rememberMe: 'velzon-remember-me',
}

export const parseJSON = (storage: string) => {
    const data = localStorage[storage]
    if (data) return JSON.parse(data)
    return undefined
}
