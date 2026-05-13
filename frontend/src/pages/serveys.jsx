import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Serveys() {
  const [upcomingSurveys, setUpcomingSurveys] = useState([]);
  const [closedSurveys, setClosedSurveys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8080/api/v1/Serveys/");
        const data = await response.json();

        const currentDateTime = new Date();
        const upcoming = [];
        const closed = [];

        data.forEach((survey) => {
          if (new Date(survey.endDate) > currentDateTime) {
            upcoming.push(survey);
          } else {
            closed.push(survey);
          }
        });
        console.log(upcoming);
        setUpcomingSurveys(upcoming);
        setClosedSurveys(closed);
      } catch (error) {
        console.error("Error fetching surveys:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const renderSurvey = (survey, isClosed = false) => (
    <div 
      className="survey-card bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 relative group text-start border border-gray-200 
      min-w-[300px] max-w-[350px] transform hover:-translate-y-1 hover:scale-105"
      key={survey._id}
    >
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-xl"></div>
      <div className="mt-2">
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300 text-center">
          {survey.title.toUpperCase()}
        </h3>
        <p className="text-gray-700 mb-4 max-w-xs mx-auto text-center line-clamp-2">
          {survey.description.toUpperCase()}
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-gray-600 mb-2 flex items-center">
            <span className="material-icons mr-2 text-blue-500">event</span>
            <span className="font-medium text-gray-700">Start Date:</span>{" "}
            {new Date(survey.startDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600 flex items-center">
            <span className="material-icons mr-2 text-red-500">event</span>
            <span className="font-medium text-gray-700">End Date:</span>{" "}
            {new Date(survey.endDate).toLocaleDateString()}
          </p>
        </div>
        {!isClosed && (
          <Link
          to={`/response/${survey._id}`}
          onClick={console.log(survey._id)} // Replace 'surveyId' with a dynamic value if needed
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2.5 rounded-lg mt-2 cursor-pointer hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
        >
          <span>Take Survey</span>
          <span className="ml-2">→</span>
        </Link>
        )}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center relative">
            Upcoming/Ongoing Surveys
            {/* <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div> */}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {upcomingSurveys.length > 0 ? (
              upcomingSurveys.map(survey => (
                <React.Fragment key={survey._id}>
                  {renderSurvey(survey, false)}
                </React.Fragment>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No upcoming surveys available</p>
              </div>
            )}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center relative">
            Closed Surveys
            {/* <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div> */}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {closedSurveys.length > 0 ? (
              closedSurveys.map(survey => (
                <React.Fragment key={survey._id}>
                  {renderSurvey(survey, true)}
                </React.Fragment>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No closed surveys available</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Serveys;