export const storage = {
    accessToken: 'velzon-access-token',
    rememberMe: 'velzon-remember-me',
    theme: 'velzon-theme',
}

export const parseJSON = (storage: string) => {
    const data = localStorage[storage]
    if (data) return JSON.parse(data)
    return undefined
}
