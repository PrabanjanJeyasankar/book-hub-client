import axios from 'axios'

const addBookToUserPreference = (bookId, status) => {
    console.log(bookId)
    axios
        .post(
            'http://localhost:3500/api/v1/book/bookmark',
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
