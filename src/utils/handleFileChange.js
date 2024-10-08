const handleFileChange = (
    acceptedFiles,
    setFormData,
    setImagePreview,
    setErrors
) => {
    const file = acceptedFiles[0]
    if (file) {
        const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
        if (validMimeTypes.includes(file.type)) {
            setFormData((prevData) => ({ ...prevData, coverImage: file }))
            const previewUrl = URL.createObjectURL(file)
            setImagePreview(previewUrl)
            return () => URL.revokeObjectURL(previewUrl)
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                coverImage:
                    '* Invalid file type. Please upload an image file (jpg, png, gif).',
            }))
        }
    }
}

export default handleFileChange
