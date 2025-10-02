'use client';

import { useState } from 'react';
import Link from 'next/link';

// Crisis helpline functions
const handleCrisisCall = (number: string) => {
  // Clean the number for calling
  const cleanNumber = number.replace(/[^\d+]/g, '');
  
  // Try to initiate call
  window.open(`tel:${cleanNumber}`, '_self');
  
  // Show confirmation
  alert(`Calling ${number}. If the call doesn't connect automatically, please dial manually.`);
};

const handleChatSupport = () => {
  // In a real implementation, this would open a chat widget
  const confirmed = confirm('This will connect you to a crisis counselor. Continue?');
  if (confirmed) {
    // For now, simulate opening chat
    alert('Connecting you to a crisis counselor... Please wait.');
    // In real implementation: window.open('your-chat-service-url', '_blank');
  }
};

const handleEmailSupport = () => {
  const subject = 'Urgent Counseling Support Request';
  const body = `Dear Counseling Team,

I need immediate support and guidance.

Student Information:
- Name: [Your Name]
- Student ID: [Your ID]
- Date: ${new Date().toLocaleDateString()}
- Time: ${new Date().toLocaleTimeString()}

Urgency Level: [High/Medium/Low]

Description of Situation:
[Please describe what you're going through and what kind of help you need]

Preferred Contact Method:
[ ] Phone Call
[ ] Email Response
[ ] In-Person Appointment
[ ] Video Call

Best time to reach you: [Time]

Additional Information:
[Any other details that might help us assist you]

This is an urgent request from the EduSense Counseling Support System.

Best regards,
[Your Name]`;

  window.open(`mailto:counseling@edusense.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
};

interface CounselingSession {
  id: string;
  counselorName: string;
  specialization: string;
  availableSlots: string[];
  rating: number;
  experience: string;
}

interface MotivationalVideo {
  id: string;
  title: string;
  speaker: string;
  duration: string;
  category: string;
  thumbnail: string;
  description: string;
}

const counselors: CounselingSession[] = [
  {
    id: '1',
    counselorName: 'Dr. Priya Sharma',
    specialization: 'Academic Stress & Anxiety',
    availableSlots: ['10:00 AM', '2:00 PM', '4:00 PM'],
    rating: 4.8,
    experience: '8 years'
  },
  {
    id: '2',
    counselorName: 'Mr. Rahul Kumar',
    specialization: 'Career Guidance & Social Issues',
    availableSlots: ['11:00 AM', '3:00 PM', '5:00 PM'],
    rating: 4.6,
    experience: '6 years'
  },
  {
    id: '3',
    counselorName: 'Dr. Anita Verma',
    specialization: 'Cultural Adaptation & Family Issues',
    availableSlots: ['9:00 AM', '1:00 PM', '6:00 PM'],
    rating: 4.9,
    experience: '12 years'
  }
];

const motivationalVideos: MotivationalVideo[] = [
  {
    id: '1',
    title: 'Overcoming Academic Challenges',
    speaker: 'Dr. APJ Abdul Kalam',
    duration: '15:30',
    category: 'Academic Motivation',
    thumbnail: 'https://img.youtube.com/vi/6AS3S4eqvxE/maxresdefault.jpg',
    description: 'Inspiring words on perseverance and academic excellence'
  },
  {
    id: '2',
    title: 'Building Confidence in College',
    speaker: 'Priyanka Chopra',
    duration: '12:45',
    category: 'Self Confidence',
    thumbnail: 'https://img.youtube.com/vi/u-BtCkwLchU/maxresdefault.jpg',
    description: 'How to build self-confidence and overcome social anxiety'
  },
  {
    id: '3',
    title: 'Managing Cultural Differences',
    speaker: 'Sundar Pichai',
    duration: '18:20',
    category: 'Cultural Adaptation',
    thumbnail: 'https://img.youtube.com/vi/M5QY2_8704o/maxresdefault.jpg',
    description: 'Adapting to new environments while staying true to your roots'
  },
  {
    id: '4',
    title: 'Mental Health Awareness',
    speaker: 'Deepika Padukone',
    duration: '22:15',
    category: 'Mental Health',
    thumbnail: 'https://img.youtube.com/vi/WVaZjt5pgnA/maxresdefault.jpg',
    description: 'Understanding and addressing mental health challenges'
  },
  {
    id: '5',
    title: 'Study Techniques for Success',
    speaker: 'Dr. Kiran Bedi',
    duration: '16:40',
    category: 'Academic Motivation',
    thumbnail: 'https://img.youtube.com/vi/jz-WNEOflj8/maxresdefault.jpg',
    description: 'Effective study methods and time management strategies'
  },
  {
    id: '6',
    title: 'Dealing with Peer Pressure',
    speaker: 'Aamir Khan',
    duration: '14:25',
    category: 'Social Skills',
    thumbnail: 'https://img.youtube.com/vi/T-D1KVIuvjA/maxresdefault.jpg',
    description: 'How to handle peer pressure and make independent decisions'
  }
];

export default function CounselingSupport() {
  const [selectedCounselor, setSelectedCounselor] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookedSession, setBookedSession] = useState<string | null>(null);
  const [selectedVideoCategory, setSelectedVideoCategory] = useState('all');

  const handleBookSession = () => {
    if (selectedCounselor && selectedSlot) {
      setBookedSession(`Session booked with ${counselors.find(c => c.id === selectedCounselor)?.counselorName} at ${selectedSlot}`);
      setSelectedCounselor(null);
      setSelectedSlot(null);
    }
  };

  const filteredVideos = selectedVideoCategory === 'all' 
    ? motivationalVideos 
    : motivationalVideos.filter(video => video.category.toLowerCase().includes(selectedVideoCategory.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                🧠 Counseling & Social Support
              </h1>
              <p className="text-gray-600">
                Get professional counseling and motivational content to overcome social and cultural challenges
              </p>
            </div>
            <Link href="/student-dashboard" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Counseling Sessions */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">👨‍⚕️ Book Counseling Session</h2>
          
          {bookedSession && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-green-800 mb-2">✅ Session Booked Successfully!</h3>
              <p className="text-green-700">{bookedSession}</p>
              <p className="text-green-600 text-sm mt-1">
                You will receive a confirmation email with the meeting link shortly.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {counselors.map((counselor) => (
              <div key={counselor.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">👨‍⚕️</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{counselor.counselorName}</h3>
                  <p className="text-gray-600 text-sm">{counselor.specialization}</p>
                  <div className="flex items-center justify-center mt-2">
                    <span className="text-yellow-500">★</span>
                    <span className="text-gray-600 ml-1">{counselor.rating}/5 ({counselor.experience})</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Available Today:</h4>
                  <div className="space-y-2">
                    {counselor.availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => {
                          setSelectedCounselor(counselor.id);
                          setSelectedSlot(slot);
                        }}
                        className={`w-full py-2 px-3 rounded border text-sm transition-colors ${
                          selectedCounselor === counselor.id && selectedSlot === slot
                            ? 'bg-purple-500 text-white border-purple-500'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-purple-50'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedCounselor === counselor.id && selectedSlot && (
                  <button
                    onClick={handleBookSession}
                    className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Book Session
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Videos */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">🎥 Motivational Videos</h2>
          
          {/* Video Categories */}
          <div className="flex flex-wrap gap-3 mb-6">
            {['all', 'academic', 'confidence', 'cultural'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedVideoCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedVideoCategory === category
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div key={video.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 h-48 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-purple-700 font-medium">{video.duration}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mb-2">
                    {video.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">by {video.speaker}</p>
                  <p className="text-gray-500 text-sm mb-3">{video.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2z" />
                      </svg>
                      Motivational
                    </div>
                    <button 
                      onClick={() => alert(`Playing: ${video.title}\n\nThis would open the video player in a real implementation.`)}
                      className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors text-sm"
                    >
                      Watch Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Help Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🆘 Need Immediate Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">☎️</div>
              <h3 className="font-semibold text-red-800">Crisis Helpline</h3>
              <p className="text-red-600 text-sm mb-2">24/7 Support</p>
              <div className="space-y-2">
                <button 
                  onClick={() => handleCrisisCall('988')}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-sm"
                >
                  Call 988 (US)
                </button>
                <button 
                  onClick={() => handleCrisisCall('1800-599-0019')}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm"
                >
                  Call 1800-599-0019 (India)
                </button>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">💬</div>
              <h3 className="font-semibold text-blue-800">Chat Support</h3>
              <p className="text-blue-600 text-sm mb-2">Live Chat Available</p>
              <button 
                onClick={handleChatSupport}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm"
              >
                Start Chat
              </button>
              <p className="text-blue-500 text-xs mt-2">
                Connect with counselor instantly
              </p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">📧</div>
              <h3 className="font-semibold text-green-800">Email Support</h3>
              <p className="text-green-600 text-sm mb-2">Response within 2hrs</p>
              <button 
                onClick={handleEmailSupport}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors text-sm"
              >
                Send Email
              </button>
              <p className="text-green-500 text-xs mt-2">
                counseling@edusense.edu
              </p>
            </div>
          </div>
          
          {/* Additional Emergency Resources */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">🚨 Emergency Resources</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-yellow-700">Crisis Text Line (US):</p>
                <button 
                  onClick={() => window.open('sms:741741?body=HOME', '_self')}
                  className="text-yellow-600 hover:text-yellow-800 underline"
                >
                  Text HOME to 741741
                </button>
              </div>
              <div>
                <p className="font-medium text-yellow-700">Vandrevala Foundation (India):</p>
                <button 
                  onClick={() => handleCrisisCall('9999666555')}
                  className="text-yellow-600 hover:text-yellow-800 underline"
                >
                  Call 9999666555
                </button>
              </div>
            </div>
            <p className="text-yellow-700 text-xs mt-3">
              <strong>Emergency:</strong> If you're in immediate danger, call 911 (US) or 112 (India) or go to your nearest emergency room.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}