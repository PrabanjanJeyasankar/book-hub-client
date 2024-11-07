import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserProvider } from '../src/context/UserContext/UserContext'
import { PasswordResetProvider } from './context/PasswordResetContext/passwordResetContext.jsx'
import { FormDataProvider } from './context/FormContext/FormContext'
import { BooksProvider } from './context/BooksContext/BooksContext'
import AppRoutes from './routes/AppRoutes.jsx'
import { Toaster } from 'react-hot-toast'

function App() {
    return (
        <React.Fragment>
            <UserProvider>
                <PasswordResetProvider>
                    <BooksProvider>
                        <FormDataProvider>
                            <Router>
                                <AppRoutes />
                            </Router>
                        </FormDataProvider>
                    </BooksProvider>
                </PasswordResetProvider>
            </UserProvider>
            <Toaster position='bottom-right' />
        </React.Fragment>
    )
}

export default App
