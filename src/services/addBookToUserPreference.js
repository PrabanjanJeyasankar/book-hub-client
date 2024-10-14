import axiosInstance from '../utils/axiosInstance'

const addBookToUserPreference = (bookId, status) => {
    console.log(bookId)
    axiosInstance
        .post(
            '/book/bookmark',
            { bookId, status },
            { withCredentials: true }
        )
        .then((response) => {
            console.log(
                'Book successfully added to preferences:',
                response.data
            )
        })
        .catch((error) => {
            console.error('Error adding book to preferences:', error.response)
        })
}

export default addBookToUserPreference
