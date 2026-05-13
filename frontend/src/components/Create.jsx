import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdTitle, MdDescription, MdDateRange, MdCheck } from "react-icons/md";
import { motion } from "framer-motion";
import { toast,ToastContainer } from "react-toastify";

function Create() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (data) => {
    try {
      const { title, startDate, endDate, description } = data;
      
      const response = await fetch("http://localhost:8080/api/v1/Serveys/profile/create-servey", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          startDate,
          endDate,
          description,
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        toast.success("Survey created successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        reset();
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        throw new Error("Failed to create survey");
      }
    } catch (error) {
      toast.error("Failed to create survey. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Create New Survey</h2>
            <p className="text-blue-100 mt-1">Fill in the details to create a new survey</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Title Input */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <MdTitle className="text-gray-400 mr-2 text-xl" />
                  Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.title ? 'border-red-500' : 'border-gray-200'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter survey title"
                    {...register("title", { 
                      required: "Title is required",
                      minLength: { value: 3, message: "Title must be at least 3 characters" }
                    })}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                  )}
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <MdDateRange className="text-gray-400 mr-2 text-xl" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.startDate ? 'border-red-500' : 'border-gray-200'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    {...register("startDate", { 
                      required: "Start date is required" 
                    })}
                  />
                  {errors.startDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.startDate.message}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <MdDateRange className="text-gray-400 mr-2 text-xl" />
                    End Date
                  </label>
                  <input
                    type="date"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.endDate ? 'border-red-500' : 'border-gray-200'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    {...register("endDate", { 
                      required: "End date is required",
                      validate: (value, formValues) => 
                        new Date(value) > new Date(formValues.startDate) || "End date must be after start date"
                    })}
                  />
                  {errors.endDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.endDate.message}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <MdDescription className="text-gray-400 mr-2 text-xl" />
                  Description
                </label>
                <textarea
                  rows="4"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.description ? 'border-red-500' : 'border-gray-200'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Enter survey description"
                  {...register("description", { 
                    required: "Description is required",
                    minLength: { value: 10, message: "Description must be at least 10 characters" }
                  })}
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                )}
              </div>

              {/* Submit Button */}
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
                    Creating Survey...
                  </div>
                ) : showSuccess ? (
                  <div className="flex items-center">
                    <MdCheck className="mr-2" />
                    Survey Created!
                  </div>
                ) : (
                  "Create Survey"
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
}

export default Create;