import AxiosInstance from "./axios_instance"

class RepoRequest {
    getAllRepos = (username) => {
        const url = `/users/${username}/repos`
        return AxiosInstance.get(url)
    }
}
export default new RepoRequest()