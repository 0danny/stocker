//Post method using fetch
export const PostRequest = (url, data) => {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                return response.json().then((data) => {
                    throw new Error(JSON.stringify(data))
                })
            }
        })
        .catch((error) => {
            throw new Error(error.message)
        })
}

//Get method using fetch
export const GetRequest = (url) => {
    return fetch(url, {
        method: "GET",
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                return response.json().then((data) => {
                    throw new Error(JSON.stringify(data))
                })
            }
        })
        .catch((error) => {
            throw new Error(error.message)
        })
}
