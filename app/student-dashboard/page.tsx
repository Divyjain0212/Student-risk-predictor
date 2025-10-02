'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useNotify } from '../../components/NotificationProvider';

const issues = [
  { id: 'financial', label: 'Financial Issues', icon: '💰', color: 'bg-green-500' },
  { id: 'social', label: 'Social/Cultural Issues', icon: '👥', color: 'bg-blue-500' },
  { id: 'attendance', label: 'Attendance Issues', icon: '📅', color: 'bg-yellow-500' },
  { id: 'academic', label: 'Poor Academic Performance', icon: '📚', color: 'bg-red-500' }
];

export default function StudentDashboard() {
  const [selectedIssue, setSelectedIssue] = useState('');
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const notify = useNotify();

  const handleDocumentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('studentId', 'student-123'); // TODO: Get from session
    formData.append('category', 'support-documents');

    try {
      const response = await fetch('/api/upload-document', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setUploadedDocs(prev => [...prev, files[0].name]);
        notify.success('Upload Successful', `${files[0].name} has been uploaded successfully.`);
      } else {
        notify.error('Upload Failed', result.error || 'There was an error uploading your document. Please try again.');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      notify.error('Upload Error', 'Network error occurred. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleIssueSelection = (issueId: string) => {
    setSelectedIssue(issueId);
    
    const issue = issues.find(i => i.id === issueId);
    notify.info('Navigating', `Taking you to ${issue?.label} support resources...`);
    
    // Navigate to specific solution page based on issue
    switch (issueId) {
      case 'financial':
        router.push('/student/financial-support');
        break;
      case 'social':
        router.push('/student/counseling');
        break;
      case 'attendance':
        router.push('/student/attendance-manager');
        break;
      case 'academic':
        router.push('/student/academic-support');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Student Support Dashboard
          </h1>
          <p className="text-gray-600">
            Get personalized support for your academic journey
          </p>
        </div>

        {/* Step 1: Login Status */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                ✓
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Step 1: Logged In</h2>
                <p className="text-gray-600">You are successfully authenticated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Document Upload */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
              2
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Step 2: Upload Documents</h2>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Purpose:</strong> Upload academic documents, assignments, certificates, or any files relevant to your support request. This helps counselors and support staff understand your situation better and provide personalized assistance.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              id="document-upload"
              multiple
              onChange={handleDocumentUpload}
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <label htmlFor="document-upload" className="cursor-pointer">
              <div className="text-gray-400 mb-2">
                <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-gray-500">
                {loading ? 'Uploading...' : 'Click to upload documents or drag and drop'}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PDF, DOC, DOCX, JPG, PNG up to 10MB
              </p>
            </label>
          </div>

          {uploadedDocs.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium text-gray-800 mb-2">Uploaded Documents:</h3>
              <div className="flex flex-wrap gap-2">
                {uploadedDocs.map((doc, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {doc}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Step 3: Issue Selection */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
              3
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Step 3: Choose Your Issue</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {issues.map((issue) => (
              <button
                key={issue.id}
                onClick={() => handleIssueSelection(issue.id)}
                className={`p-6 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all duration-200 text-left group ${
                  selectedIssue === issue.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center mb-3">
                  <span className="text-3xl mr-3">{issue.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                    {issue.label}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">
                  {issue.id === 'financial' && 'Get information about scholarships, government schemes, and financial assistance'}
                  {issue.id === 'social' && 'Access counseling sessions, motivational content, and social support'}
                  {issue.id === 'attendance' && 'Improve attendance with gamification and tracking tools'}
                  {issue.id === 'academic' && 'Get academic support, English courses, and teacher assistance'}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Access Features */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => router.push('/ai-chat')}
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="text-2xl mb-2">🤖</div>
              <p className="text-sm font-medium">AI Chatbot</p>
            </button>
            <button 
              onClick={() => router.push('/test-portal')}
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div className="text-2xl mb-2">📊</div>
              <p className="text-sm font-medium">Test Portal</p>
            </button>
            <button 
              onClick={() => router.push('/motivational-videos')}
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <div className="text-2xl mb-2">🎥</div>
              <p className="text-sm font-medium">Motivational Videos</p>
            </button>
            <button 
              onClick={() => router.push('/achievements')}
              className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
            >
              <div className="text-2xl mb-2">🏆</div>
              <p className="text-sm font-medium">Achievements</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}