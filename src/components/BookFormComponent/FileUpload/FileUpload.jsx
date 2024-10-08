import React from 'react'
import { useDropzone } from 'react-dropzone'
import { CloudUpload } from 'lucide-react'
import './FileUpload.css'

const FileUpload = ({ onFileChange, error, imagePreview, coverImage }) => {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: onFileChange,
        accept: 'image/jpeg, image/png, image/gif',
        multiple: false,
    })

    return (
        <>
            <div
                {...getRootProps()}
                className={`book-dropzone ${error ? 'book-error-border' : ''}`}>
                <input {...getInputProps()} />
                {coverImage ? (
                    <div className='book-image-preview-container'>
                        <img
                            // src={
                            //     imagePreview ||
                            //     (coverImage instanceof File ? URL.createObjectURL(coverImage) : '')
                            // }
                            src={imagePreview}
                            alt='Preview'
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                ) : (
                    <div className='drag_drop_info'>
                        <CloudUpload
                            size={90}
                            strokeWidth={1}
                            color='rgb(200, 200, 200)'
                        />
                        <p>Drag & Drop or Click to Upload</p>
                    </div>
                )}
            </div>
            {error && <span className='book-error'>{error}</span>}
        </>
    )
}

export default FileUpload
