const axios = require("axios");

async function getApi() {
    try {
        const response = await axios.get("http://localhost:8080/");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export default getApi;
