import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast,ToastContainer } from "react-toastify";
import { MdAdd, MdDelete, MdQuestionAnswer, MdList, MdCheckBox, MdStarRate, MdTextFields } from "react-icons/md";

function Add_Del() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();
  const [surveys, setSurveys] = useState([]);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/v1/questions/profile/questions/${selectedSurveyId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const ques = data?.data?.questions;
      setQuestions(ques);
    } catch (error) {
      toast.error("Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  };

  const questionType = watch("questionType");

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:8080/api/v1/serveys/:serveyId",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setSurveys(data);
      } catch (error) {
        toast.error("Failed to fetch surveys");
      } finally {
        setLoading(false);
      }
    };
    fetchSurveys();
  }, []);

  const onSubmit = async (data) => {
    try {
      const payload = {
        questionTitle: data.questionTitle,
        questionType: data.questionType,
        ...(data.questionType === "multiplechoice" && {
          options: data.options
            .split(",")
            .map((opt) => opt.trim())
            .filter((opt) => opt.length > 0),
        }),
      };

      const response = await fetch(
        `http://localhost:8080/api/v1/Serveys/profile/add-question/${selectedSurveyId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add question");
      }
  
      toast.success("✅ Question added successfully!");
      reset();
      fetchQuestions();
     
    } catch (error) {
      toast.error("Failed to add question");
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/questions//profile/delete-questions/${questionId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Question deleted successfully!");
        fetchQuestions();
      } else {
        throw new Error("Failed to delete question");
      }
    } catch (error) {
      toast.error("Failed to delete question");
    }
  };

  useEffect(() => {
    if (selectedSurveyId) {
      fetchQuestions();
    }
  }, [selectedSurveyId]);

  const getQuestionTypeIcon = (type) => {
    switch (type) {
      case "text":
        return <MdTextFields className="text-blue-500" />;
      case "rating":
        return <MdStarRate className="text-yellow-500" />;
      case "multiplechoice":
        return <MdCheckBox className="text-green-500" />;
      default:
        return <MdQuestionAnswer className="text-gray-500" />;
    }
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Question Management</h2>
            <p className="text-blue-100 mt-1">Add and manage questions for your surveys</p>
          </div>

          <div className="p-8">
            {/* Survey Selection */}
            <div className="mb-8">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MdList className="text-gray-400 mr-2 text-xl" />
                Select Survey
              </label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                onChange={(e) => setSelectedSurveyId(e.target.value)}
              >
                <option value="">-- Select a Survey --</option>
                {surveys.map((survey) => (
                  <option key={survey._id} value={survey._id}>
                    {survey.title}
                  </option>
                ))}
              </select>
            </div>

            {selectedSurveyId && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {/* Add Question Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <MdQuestionAnswer className="text-gray-400 mr-2 text-xl" />
                      Question Title
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.questionTitle ? 'border-red-500' : 'border-gray-200'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      placeholder="Enter your question"
                      {...register("questionTitle", { required: "Question title is required" })}
                    />
                    {errors.questionTitle && (
                      <p className="mt-1 text-sm text-red-500">{errors.questionTitle.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <MdList className="text-gray-400 mr-2 text-xl" />
                      Question Type
                    </label>
                    <select
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.questionType ? 'border-red-500' : 'border-gray-200'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      {...register("questionType", { required: "Question type is required" })}
                    >
                      <option value="text">Text Response</option>
                      <option value="rating">Rating Scale</option>
                      <option value="multiplechoice">Multiple Choice</option>
                    </select>
                    {errors.questionType && (
                      <p className="mt-1 text-sm text-red-500">{errors.questionType.message}</p>
                    )}
                  </div>

                  {questionType === "multiplechoice" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <MdCheckBox className="text-gray-400 mr-2 text-xl" />
                        Options (comma-separated)
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.options ? 'border-red-500' : 'border-gray-200'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                        placeholder="Option 1, Option 2, Option 3"
                        {...register("options", { required: "Options are required for multiple choice questions" })}
                      />
                      {errors.options && (
                        <p className="mt-1 text-sm text-red-500">{errors.options.message}</p>
                      )}
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center px-8 py-4 text-lg font-medium text-white rounded-xl 
                      ${isSubmitting ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'}
                      transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Adding Question...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <MdAdd className="mr-2" />
                        Add Question
                      </div>
                    )}
                  </motion.button>
                </form>

                {/* Questions List */}
                <div className="mt-12">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <MdList className="text-gray-400 mr-2" />
                    Questions List
                  </h3>
                  
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  ) : questions?.length > 0 ? (
                    <div className="space-y-4">
                      {questions.map((question, index) => (
                        <motion.div
                          key={question.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <div className="p-2 bg-gray-50 rounded-lg">
                                {getQuestionTypeIcon(question.type)}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{question.text}</h4>
                                <p className="text-sm text-gray-500 mt-1">Type: {question.type}</p>
                              </div>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDeleteQuestion(question.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            >
                              <MdDelete className="text-xl" />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No questions added yet
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
}

export default Add_Del;