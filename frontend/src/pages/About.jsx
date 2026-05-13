import React from "react";
import contactus from "../assets/contactus.svg";
import mission from "../assets/mission.svg";
import chose from "../assets/choose.svg";
import offer from "../assets/workshop_new.svg";
import { motion } from "framer-motion";

function About() {
  const sections = [
    {
      title: "Our Mission",
      content: "At our Survey and Feedback platform, our mission is to empower individuals and organizations to make data-driven decisions by providing a seamless and intuitive way to collect, analyze, and act on feedback.",
      image: mission,
      imageFirst: false
    },
    {
      title: "What We Offer",
      content: [
        "Customizable surveys to suit your specific needs.",
        "Real-time analytics to track responses and trends.",
        "Secure and reliable data storage to protect your information.",
        "Easy-to-use interface for both creators and respondents."
      ],
      image: offer,
      imageFirst: true
    },
    {
      title: "Why Choose Us?",
      content: [
        "We understand the importance of feedback in driving growth and improvement. Our platform is designed with the user in mind, ensuring that you can focus on what matters most—gaining valuable insights.",
        "With our advanced features and dedicated support, we aim to be your trusted partner in achieving your goals."
      ],
      image: chose,
      imageFirst: false
    },
    {
      title: "Contact Us",
      content: "Have questions or need assistance? Feel free to reach out to our support team at support@surveyfeedback.com.",
      image: contactus,
      imageFirst: true,
      isContact: true
    }
  ];

  return (
    <div className="py-8 md:py-12 bg-gradient-to-b from-white to-gray-50">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      >
        About Us
      </motion.h1>

      <div className="space-y-12 md:space-y-16 mx-auto max-w-5xl px-4 md:px-8">
        {sections.map((section, index) => (
          <motion.section
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`flex flex-col ${section.imageFirst ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-6 md:gap-8`}
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="w-full md:w-1/2"
            >
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              />
            </motion.div>

            <div className="w-full md:w-1/2 space-y-4">
              <motion.h2 
                whileHover={{ x: 5 }}
                className="text-xl md:text-2xl font-bold text-gray-800"
              >
                {section.title}
              </motion.h2>

              {Array.isArray(section.content) ? (
                section.title === "What We Offer" ? (
                  <ul className="space-y-2">
                    {section.content.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start space-x-2 text-gray-600 text-sm md:text-base"
                      >
                        <span className="w-1.5 h-1.5 mt-2 rounded-full bg-blue-500"></span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <div className="space-y-3">
                    {section.content.map((paragraph, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="text-gray-600 leading-relaxed text-sm md:text-base"
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                )
              ) : section.isContact ? (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  className="text-gray-600 leading-relaxed text-sm md:text-base"
                >
                  {section.content.split('support@surveyfeedback.com')[0]}
                  <a
                    href="mailto:support@surveyfeedback.com"
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300"
                  >
                    support@surveyfeedback.com
                  </a>
                  {section.content.split('support@surveyfeedback.com')[1]}
                </motion.p>
              ) : (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  className="text-gray-600 leading-relaxed text-sm md:text-base"
                >
                  {section.content}
                </motion.p>
              )}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}

export default About;