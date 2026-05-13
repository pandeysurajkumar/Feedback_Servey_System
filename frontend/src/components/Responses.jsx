import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { MdBarChart, MdPieChart, MdShowChart, MdDownload } from 'react-icons/md';
import { motion } from 'framer-motion';
import { saveAs } from 'file-saver';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

function Responses() {
  const [surveys, setSurveys] = useState([]);
  const [responses, setResponses] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState('');
  const [loading, setLoading] = useState(false);
  const [chartType, setChartType] = useState('bar');
  const [surveyDetails, setSurveyDetails] = useState(null);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const exportData = () => {
    const dataToExport = responses.map(response => ({
      surveyId: selectedSurvey,
      question: response.answer.map(ans => ans.questionid.text),
      answer: response.answer.map(ans => ans.answer),
    }));

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    saveAs(blob, 'survey-responses.json');
  };
  const exportDataAsText = () => {
    let textData = `Survey ID: ${selectedSurvey}\n\nResponses:\n`;
  
    responses.forEach((response, index) => {
      textData += `Response ${index + 1}:\n`;
      response.answer.forEach(ans => {
        textData += `Question: ${ans.questionid.text}\nAnswer: ${ans.answer}\n\n`;
      });
    });
  
    const blob = new Blob([textData], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'survey-responses.txt');
  };
  

  const fetchSurveys = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/v1/serveys/:serveyId", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setSurveys(data);
    } catch (error) {
      console.error('Error fetching surveys:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSurveySelect = async (surveyId) => {
    setSelectedSurvey(surveyId);
    if (surveyId) {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/v1/response/serveyId/${surveyId}`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();
        const data = result.responses;
        setResponses(data);
        setSurveyDetails(surveys.find(s => s._id === surveyId));
      } catch (error) {
        console.error('Error fetching responses:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const extractQuestions = () => {
    const questionsMap = new Map();
    responses.forEach((response) => {
      response.answer.forEach((ans) => {
        const q = ans.questionid;
        if (!questionsMap.has(q._id)) {
          questionsMap.set(q._id, q);
        }
      });
    });
    return Array.from(questionsMap.values());
  };

  const calculateOptionCounts = (question) => {
    const counts = {};
    responses.forEach(response => {
      response.answer.forEach(ans => {
        if (ans.questionid._id === question._id) {
          const val = ans.answer;
          counts[val] = (counts[val] || 0) + 1;
        }
      });
    });
    return counts;
  };

  const getChartData = (question) => {
    const counts = calculateOptionCounts(question);
    const labels = Object.keys(counts);
    const data = Object.values(counts);

    return {
      labels,
      datasets: [
        {
          label: 'Responses',
          data,
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Survey Responses' },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-gray-50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Survey Responses</h1>
            <p className="text-blue-100 mt-2">View and analyze survey responses</p>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <label htmlFor="survey-select" className="block text-gray-700 font-medium mb-2">
                Select a Survey:
              </label>
              <select
                id="survey-select"
                onChange={(e) => handleSurveySelect(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={selectedSurvey}
              >
                <option value="">Select a survey</option>
                {surveys.map((survey) => (
                  <option key={survey._id} value={survey._id}>
                    {survey.title}
                  </option>
                ))}
              </select>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : selectedSurvey && (
              <div className="space-y-8">
                {surveyDetails && (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{surveyDetails.title}</h2>
                    <p className="text-gray-600">{surveyDetails.description}</p>
                    <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                      <span>Total Responses: {responses.length}</span>
                      <span>Created: {new Date(surveyDetails.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}

                <div className="flex space-x-4 mb-6">
                  {['bar', 'pie', 'line'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setChartType(type)}
                      className={`flex items-center px-4 py-2 rounded-lg transition duration-200 ${
                        chartType === type ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type === 'bar' && <MdBarChart className="mr-2" />}
                      {type === 'pie' && <MdPieChart className="mr-2" />}
                      {type === 'line' && <MdShowChart className="mr-2" />}
                      {type.charAt(0).toUpperCase() + type.slice(1)} Chart
                    </button>
                  ))}
                </div>

                {responses.length > 0 ? (
                  extractQuestions().map((question) => (
                    <motion.div
                      key={question._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                    >
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">{question.text}</h3>

                      <div className="h-64 mb-6">
                        {chartType === 'bar' && <Bar data={getChartData(question)} options={chartOptions} />}
                        {chartType === 'pie' && <Pie data={getChartData(question)} options={chartOptions} />}
                        {chartType === 'line' && <Line data={getChartData(question)} options={chartOptions} />}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(calculateOptionCounts(question)).map(([option, count]) => (
                          <div key={option} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-gray-700">{option}</span>
                              <span className="text-blue-500 font-semibold">{count} responses</span>
                            </div>
                            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${(count / responses.length) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No responses available for this survey.</p>
                  </div>
                )}

                <div className="flex justify-end mt-8">
                  <button
                    className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                    onClick={exportDataAsText}
                  >
                    <MdDownload className="mr-2" />
                    Export Data
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Responses;
