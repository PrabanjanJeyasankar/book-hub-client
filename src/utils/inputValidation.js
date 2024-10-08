const validateInput = (name, value) => {
    let error = ''

    const isNumber = /^[0-9]*$/.test(value)

    switch (name) {
        case 'availableCopies':
            if (value === '') {
                error = '* Available Copies is required'
            } else if (!isNumber) {
                error =
                    'Please enter a valid number. Only digits (0-9) are allowed.'
            }
            break

        case 'isbn':
            if (value === '') {
                error = '* ISBN is required'
            } else if (!isNumber) {
                error =
                    'Please enter a valid number. Only digits (0-9) are allowed.'
            } else if (value.length !== 13) {
                error = 'ISBN must be exactly 13 digits.'
            }
            break

        case 'coverImage':
            if (!value) {
                error = '* Cover image is required'
            }
            break

        default:
            if (!value) {
                error = `* ${
                    name.charAt(0).toUpperCase() + name.slice(1)
                } is required`
            }
    }
    return error
}

export default validateInput
