import Log from "./Logger"
import { getAuthToken } from "./JWT"

const baseURL = process.env.NODE_ENV !== "production" ? "http://localhost:8080/api/v1" : "/api/v1"
//We are using relative paths in this file in order to pick our endpoint.

//Post method using fetch
const PostRequest = (path, data, useAuth = false) => {
    Log(`Making POST request to ${path} with data - `, "Network", data)

    var headers = {
        "Content-Type": "application/json",
    }

    if (useAuth) headers["Authorization"] = `Bearer ${getAuthToken()}`

    return fetch(`${baseURL}/${path}`, {
        method: "POST",
        headers: headers,
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
const GetRequest = (path, useAuth = false) => {
    Log(`Making GET request to ${path}`, "Network")

    var headers = {}

    if (useAuth) headers["Authorization"] = `Bearer ${getAuthToken()}`

    return fetch(`${baseURL}/${path}`, {
        method: "GET",
        headers: headers,
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
