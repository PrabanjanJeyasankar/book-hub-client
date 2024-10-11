import axios from 'axios'

const fetchAllBooksService = async () => {
    try {
        const response = await axios.get('http://localhost:3500/api/v1/book/')

        if (response.status === 200) {
            return response.data.books
        } else {
            console.error('Unexpected response status:', response.status)
            return []
        }
    } catch (error) {
        if (error.response) {
            console.error(
                'Error fetching books:',
                error.response.status,
                error.response.data
            )
            if (error.response.status === 500) {
                console.error('Internal Server Error. Please try again later.')
            }
        } else if (error.request) {
            console.error('No response received:', error.request)
        } else {
            console.error('Error:', error.message)
        }
        return []
    }
}

export default fetchAllBooksService
