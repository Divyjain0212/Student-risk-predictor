'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Scheme {
  id: string;
  name: string;
  description: string;
  eligibility: string[];
  amount: string;
  category: 'general' | 'scholarship' | 'loan';
  deadline?: string;
  applyUrl: string;
}

const governmentSchemes: Scheme[] = [
  {
    id: 'pmsss',
    name: 'Prime Minister\'s Special Scholarship Scheme',
    description: 'Scholarship for students from Jammu & Kashmir and Ladakh for higher education',
    eligibility: ['Domicile of J&K/Ladakh', 'Family income < ₹8 lakh', '60% in 12th class'],
    amount: '₹30,000 - ₹1,25,000 per year',
    category: 'scholarship',
    deadline: 'October 31, 2025',
    applyUrl: 'https://www.aicte-india.org/schemes/students-development-schemes/pm-special-scholarship-scheme-pmsss'
  },
  {
    id: 'nsp',
    name: 'National Scholarship Portal',
    description: 'Central sector scholarships for various categories of students',
    eligibility: ['Indian citizen', 'Merit-based', 'Income criteria varies'],
    amount: '₹12,000 - ₹20,000 per year',
    category: 'scholarship',
    deadline: 'November 30, 2025',
    applyUrl: 'https://scholarships.gov.in/'
  },
  {
    id: 'inspire',
    name: 'INSPIRE Scholarship',
    description: 'Scholarship for students pursuing science courses',
    eligibility: ['Top 1% in 12th board', 'Science stream', 'Age < 27 years'],
    amount: '₹80,000 per year',
    category: 'scholarship',
    deadline: 'July 31, 2025',
    applyUrl: 'https://online-inspire.gov.in/'
  }
];

export default function FinancialSupport() {
  const [filteredSchemes, setFilteredSchemes] = useState<Scheme[]>(governmentSchemes);
  const [filter, setFilter] = useState('all');
  const [testScore, setTestScore] = useState<number | null>(null);
  const [showTestPortal, setShowTestPortal] = useState(false);

  const handleFilterChange = (category: string) => {
    setFilter(category);
    if (category === 'all') {
      setFilteredSchemes(governmentSchemes);
    } else {
      setFilteredSchemes(governmentSchemes.filter(scheme => scheme.category === category));
    }
  };

  const handleTestSubmit = () => {
    // Simulate test score
    const score = Math.floor(Math.random() * 40) + 60; // Score between 60-100
    setTestScore(score);
    setShowTestPortal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                💰 Financial Support Center
              </h1>
              <p className="text-gray-600">
                Discover scholarships, government schemes, and financial assistance opportunities
              </p>
            </div>
            <Link href="/student-dashboard" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Test Portal Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎓 Scholarship Test Portal</h2>
          <p className="text-gray-600 mb-4">
            Take our aptitude test to qualify for additional college discounts and scholarship opportunities.
          </p>
          
          {!testScore ? (
            <div className="space-y-4">
              <button
                onClick={() => setShowTestPortal(true)}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
              >
                Start Aptitude Test
              </button>
              
              {showTestPortal && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Sample Question:</h3>
                  <p className="mb-4">What is the capital of India?</p>
                  <div className="space-y-2 mb-4">
                    <button className="block w-full text-left p-3 bg-white rounded border hover:bg-blue-50">
                      A) Mumbai
                    </button>
                    <button className="block w-full text-left p-3 bg-white rounded border hover:bg-blue-50">
                      B) New Delhi ✓
                    </button>
                    <button className="block w-full text-left p-3 bg-white rounded border hover:bg-blue-50">
                      C) Kolkata
                    </button>
                    <button className="block w-full text-left p-3 bg-white rounded border hover:bg-blue-50">
                      D) Chennai
                    </button>
                  </div>
                  <button
                    onClick={handleTestSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Submit Test
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800 mb-2">🎉 Test Completed!</h3>
              <p className="text-green-700 mb-2">Your Score: {testScore}/100</p>
              {testScore >= 75 ? (
                <div className="bg-green-100 border border-green-300 rounded p-3">
                  <p className="text-green-800 font-semibold">
                    🌟 Congratulations! You qualify for a 15% college fee discount!
                  </p>
                  <p className="text-green-700 text-sm mt-1">
                    Contact your college administration with this score for discount application.
                  </p>
                </div>
              ) : (
                <div className="bg-yellow-100 border border-yellow-300 rounded p-3">
                  <p className="text-yellow-800">
                    You can retake the test after 24 hours to improve your score.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Filter Schemes</h2>
          <div className="flex flex-wrap gap-3">
            {['all', 'scholarship', 'loan', 'general'].map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Government Schemes */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">🏛️ Government Schemes & Scholarships</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme) => (
              <div key={scheme.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    scheme.category === 'scholarship' ? 'bg-green-100 text-green-800' :
                    scheme.category === 'loan' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {scheme.category.toUpperCase()}
                  </span>
                  {scheme.deadline && (
                    <span className="text-sm text-red-600 font-medium">
                      Due: {scheme.deadline}
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{scheme.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{scheme.description}</p>
                
                <div className="mb-3">
                  <h4 className="font-medium text-gray-800 mb-1">Eligibility:</h4>
                  <ul className="text-sm text-gray-600 list-disc list-inside">
                    {scheme.eligibility.map((criterion, index) => (
                      <li key={index}>{criterion}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-4">
                  <span className="font-medium text-gray-800">Amount: </span>
                  <span className="text-green-600 font-semibold">{scheme.amount}</span>
                </div>
                
                <a
                  href={scheme.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-center block"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendation Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🤖 AI Scheme Recommendations</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 mb-2">
              <strong>Based on your profile, we recommend:</strong>
            </p>
            <ul className="text-blue-700 space-y-1">
              <li>• National Scholarship Portal (High match: 89%)</li>
              <li>• INSPIRE Scholarship (Medium match: 67%)</li>
              <li>• State Merit Scholarships (Medium match: 72%)</li>
            </ul>
            <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Get Detailed Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}