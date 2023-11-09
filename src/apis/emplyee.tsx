import axios from "axios/index";

type User = {
    name: string,
    mobile: string,
    companyEmail: string,
    privateEmail: string,
    designation: string,
    specializedField: string
};


export const saveUser = async (user:User) => {
    try {
        const url = "http://localhost:8000/api/v1/responsible-person/create";

        const result = await axios.post(url,user);
        return result.data;
    } catch (err) {
        throw err;
    }
};