import axios from 'axios';

const apiUrl = 'http://localhost:3000';

export const postUser = async (formData) => {
    const user = await axios.post(apiUrl+'/user', formData);
    return user
}

