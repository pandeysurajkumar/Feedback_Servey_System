import React from "react";
import img from "../assets/kindpng_1799417.png";
import { FcSurvey, FcFeedback } from "react-icons/fc";
import { IoIosBulb } from "react-icons/io";
import servey from "../assets/servey2.svg";
import Feature from "./Feature";
import Serveys from "./serveys";
import About from "./About";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleonclick = () => {
    navigate("serveys");
   
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between min-h-[60vh] px-4 md:px-8 lg:px-16 py-8 md:py-12 sm:py-19 ">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex flex-col justify-center items-start space-y-6"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Share Your Feedback and Shape the Future
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-lg font-light leading-relaxed">
            We value your opinion! Participate in our quick surveys to help us
            improve and provide the best experience possible.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            
            onClick={handleonclick}
            className="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
          >
            Start Survey Now
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0"
        >
          <img
            src={servey}
            alt="Hero Background"
            className="w-full max-w-md h-auto object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-100 to-white">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Why Participate in Our Surveys?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <motion.div 
            whileHover={{ y: -10 }}
            className="flex flex-col items-center p-6 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <FcFeedback className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold mb-3 text-gray-800">Feedback</h3>
            <p className="text-center text-gray-600 leading-relaxed">
              Provide feedback to help us improve our products and services.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="flex flex-col items-center p-6 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
              <FcSurvey className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold mb-3 text-gray-800">Survey</h3>
            <p className="text-center text-gray-600 leading-relaxed">
              Participate in quick surveys to help us understand your needs.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="flex flex-col items-center p-6 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mb-4">
              <IoIosBulb className="w-10 h-10 text-yellow-500" />
            </div>
            <h3 className="text-lg font-bold mb-3 text-gray-800">Idea</h3>
            <p className="text-center text-gray-600 leading-relaxed">
              Share your ideas and suggestions to help us innovate and grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Other Sections */}
      <Feature />
      <Serveys />
      <About />
    </div>
  );
}

export default Home;