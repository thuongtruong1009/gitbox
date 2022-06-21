import AxiosInstance from "./axios_instance"

class UserRequest {
    getUser = (username) => {
        const url = `/users/${username}`
        return AxiosInstance.get(url)
    }
    getFollowers = (username) => {
        const url = `/users/${username}/followers`
        return AxiosInstance.get(url)
    }
}
export default new UserRequest()