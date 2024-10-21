import React from 'react' 
import './BookCardLoadingComponent.css' 
function BookCardLoadingComponent() { 
    return ( 
        <div className='book-card-loader'> 
            <div className='loader-wrapper'> 
                <div className='circle' /> 
                <div className='line-1' /> 
                <div className='line-2' /> 
                <div className='line-3' /> 
                <div className='line-4' /> 
            </div> 
        </div> 
    ) 
} 
 
export default BookCardLoadingComponent 
