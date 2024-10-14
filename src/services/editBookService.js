import axiosInstance from '../utils/axiosInstance'

const editBookService = async (formData, bookId) => {
    console.log(bookId)
    const data = new FormData()
    Object.keys(formData).forEach((key) => {
        data.append(key, formData[key])
    })

    try {
        const response = await axiosInstance.put(
            `/book/edit/${bookId}`,
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

export default editBookService
