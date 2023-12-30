var jwtToken = ""

export const setAuthToken = (token) => {
    if (token) jwtToken = token
    else jwtToken = ""
}

export const getAuthToken = () => {
    return jwtToken
}
