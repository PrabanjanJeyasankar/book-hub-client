import React from 'react'
import NotFoundPage from '../SharedComponents/NotFoundPage/NotFoundPage'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by ErrorBoundary:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return <NotFoundPage/>
        }

        return this.props.children
    }
}

export default ErrorBoundary
