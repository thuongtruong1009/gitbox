import AxiosInstance from "./axios_instance"

class EventRequest {
    getPublicEvents = (username) => {
        const url = `/users/${username}/events/public`
        return AxiosInstance.get(url)
    }
}
export default new EventRequest()