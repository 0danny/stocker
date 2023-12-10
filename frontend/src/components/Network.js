import Log from "./Logger"

const baseURL = process.env.NODE_ENV !== "production" ? "http://localhost:8080/api/v1" : "/api/v1"
//We are using relative paths in this file in order to pick our endpoint.

//Post method using fetch
const PostRequest = (path, data) => {
    Log(`Making POST request to ${path} with data - `, "Network", data)
    return fetch(`${baseURL}/${path}`, {
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
            Log(`Error making POST request to ${path}: `, "Network", error)

            return { status: false, message: "There was a network error." }
        })
}

//Get method using fetch
const GetRequest = (path) => {
    Log(`Making GET request to ${path}`, "Network")

    return fetch(`${baseURL}/${path}`, {
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
            Log(`Error making POST request to ${path}: `, "Network", error)

            return { status: false, message: "There was a network error." }
        })
}

export { PostRequest, GetRequest }
