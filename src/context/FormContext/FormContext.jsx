import React, { createContext, useState } from 'react'

export const FormDataContext = createContext()

export const FormDataProvider = ({ children }) => {
    const initialFormData = {
        title: '',
        author: '',
        genre: '',
        publisher: '',
        isbn: '',
        publicationDate: '',
        language: '',
        description: '',
        availableCopies: '',
        coverImage: null,
    }

    const [formData, setFormData] = useState(initialFormData)

    return (
        <FormDataContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormDataContext.Provider>
    )
}
