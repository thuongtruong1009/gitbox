import AxiosInstance from "./axios_instance"

class OrgRequest {
    getOrgs = (username) => {
        const url = `/users/${username}/orgs`
        return AxiosInstance.get(url)
    }
}
export default new OrgRequest()