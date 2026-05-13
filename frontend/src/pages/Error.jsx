import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navigate to the previous page
    };
    return (
        <div className="text-center mt-12">
            <h1 className="text-6xl text-red-500">404</h1>
            <p className="text-lg text-gray-600">Oops! The page you're looking for doesn't exist.</p>
            <button
                className="mt-5 px-5 py-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleGoBack}
            >
                Go Back
            </button>
        </div>
    );
} 
export default Error;