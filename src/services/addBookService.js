import axios from 'axios'

const addBookService = async (formData) => {
    const data = new FormData()
    Object.keys(formData).forEach((key) => {
        data.append(key, formData[key])
    })

    try {
        const response = await axios.post(
            'http://localhost:3500/api/v1/book/add',
            data,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            }
        )
        return response
    } catch (error) {
        throw error
    }
}

export default addBookService
