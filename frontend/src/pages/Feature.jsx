import React from "react";
import survey from "../assets/easysurvey.svg";
import analytics from "../assets/analyt.svg";
import privacy from "../assets/privacy.svg";
import { motion } from "framer-motion";

function Feature() {
  const features = [
    {
      icon: survey,
      title: "Easy Surveys",
      description: "Create and share surveys in just a few clicks. Our platform makes it simple and fast to gather feedback.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: analytics,
      title: "Real-Time Analytics",
      description: "Monitor survey results as they come in. Analyze responses instantly to make informed decisions faster.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: privacy,
      title: "User Privacy",
      description: "We take privacy seriously. All survey responses are anonymous, ensuring that your users' information is safe.",
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Why Choose Our Surveys?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="feature-item bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              
              {/* Icon Container */}
              <div className="relative z-10">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} p-4 transform group-hover:scale-110 transition-transform duration-300`}>
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Effect Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Feature;