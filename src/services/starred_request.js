import AxiosInstance from "./axios_instance"

class StarredRequest {
    getAllStarred = (username) => {
        const url = `/users/${username}/starred`
        return AxiosInstance.get(url)
    }
}
export default new StarredRequest()