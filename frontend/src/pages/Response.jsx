import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaStar, FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

function SurveyResponse() {
  const { surveyId } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm();

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:8080/api/v1/response/${surveyId}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch survey');
        }

        const data = await response.json();
        if (!data || !data.questions) {
          throw new Error('Invalid survey data');
        }

        setSurvey(data);
        data.questions.forEach(question => {
          setValue(question._id, question.type === 'rating' ? 0 : '');
        });
      } catch (err) {
        setError(err.message || 'Failed to load survey');
        console.error('Survey fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [surveyId, setValue]);

  const handleCancel = () => {
    if (isDirty) {
      setShowCancelDialog(true);
    } else {
      navigate('/');
    }
  };

  const confirmCancel = () => {
    setShowCancelDialog(false);
    navigate('/');
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`http://localhost:8080/api/v1/response/serveyId`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serveyid: surveyId,
          answer: data
        })
      });

      if (response.ok) {
        toast.success('Survey submitted successfully!', {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit responses');
      }
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderQuestion = (question, index) => {
    const questionId = question._id;
    const watchedValue = watch(questionId);

    switch (question.type) {
      case 'text':
        return (
          <div>
            <input
              {...register(questionId, { required: 'This field is required' })}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Type your answer here..."
            />
            {errors[questionId] && (
              <p className="mt-1 text-sm text-red-600">{errors[questionId].message}</p>
            )}
          </div>
        );

      case 'multiplechoice':
        return (
          <div className="space-y-2">
            {question.options.map((option) => (
              <label key={option} className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                <input
                  {...register(questionId, { required: 'Please select an option' })}
                  type="radio"
                  value={option}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-3 text-gray-700">{option}</span>
              </label>
            ))}
            {errors[questionId] && (
              <p className="mt-1 text-sm text-red-600">{errors[questionId].message}</p>
            )}
          </div>
        );

      case 'rating':
        return (
          <div>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`h-8 w-8 cursor-pointer transition-colors ${
                    star <= watchedValue
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  onClick={() => setValue(questionId, star)}
                />
              ))}
              <span className="ml-2 text-gray-500">
                {watchedValue ? `${watchedValue} stars` : 'Select rating'}
              </span>
            </div>
            <input
              {...register(questionId, { required: 'Please select a rating' })}
              type="hidden"
            />
            {errors[questionId] && (
              <p className="mt-1 text-sm text-red-600">{errors[questionId].message}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading survey...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-4">
          <FaExclamationTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Survey</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-4">
          <FaExclamationTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Survey Not Found</h2>
          <p className="text-gray-600 mb-6">The requested survey could not be found.</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8"
      >
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{survey.title}</h1>
            <p className="text-gray-600">{survey.description}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCancel}
            className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FaTimes className="h-6 w-6" />
          </motion.button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {survey.questions.map((question, index) => (
            <motion.div
              key={question._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 p-6 rounded-lg"
            >
              <label className="block text-lg font-medium text-gray-700 mb-4">
                {index + 1}. {question.text}
              </label>
              {renderQuestion(question, index)}
            </motion.div>
          ))}

          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleCancel}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                'Submit Survey'
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* Cancel Confirmation Dialog */}
      {showCancelDialog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">Discard Changes?</h3>
            <p className="text-gray-500 mb-6">
              You have unsaved changes. Are you sure you want to leave this page?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowCancelDialog(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Stay
              </button>
              <button
                onClick={confirmCancel}
                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Discard
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default SurveyResponse;