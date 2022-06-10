import AxiosInstance from "./axios_instance"

class RepoRequest {
    getAllRepos = (username) => {
        const url = `/users/${username}/repos`
        return AxiosInstance.get(url)
    }
    // searchRepos = (input, language, sort, order, page, per_page) => {
    //     const url = `/search/repositories?q=${input}+language:${language}&sort=${sort}&order=${order}&page=${page}&per_page=${per_page}`
    //     return AxiosInstance.get(url)
    // }
}
export default new RepoRequest()