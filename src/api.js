import axios from "axios";
// function that makes the api request and returns a Promise for response
const api = {
    fetchDog : () => {
    return axios({
      method: "get",
      url: "https://dog.ceo/api/breeds/image/random"
    });
  }
};
export default api;
