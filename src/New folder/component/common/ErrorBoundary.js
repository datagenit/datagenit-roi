import React from "react";
import {Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        //   logErrorToMyService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <div className="container-xxl mt-5 container-p-y">
                <div className="misc-wrapper text-center">
                    <h2 className="mb-2 mx-2">Something Went Wrong:(</h2>
                    <p className="mb-4 mx-2">Oops! 😖 The requested URL was not found on this server.</p>
                    <Link to="/admin" className="btn btn-primary btn-lg">Return to website</Link>
                    <div className="mt-3">
                    </div>
                </div>
            </div>
                ;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;