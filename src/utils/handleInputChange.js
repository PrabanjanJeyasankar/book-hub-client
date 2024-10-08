import validateInput from './inputValidation'

const handleInputChange = (e, setFormData, setErrors) => {
    const { name, value } = e.target

    const error = validateInput(name, value)
    setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
    }))

    setFormData((prevData) => ({ ...prevData, [name]: value }))
}

export default handleInputChange
