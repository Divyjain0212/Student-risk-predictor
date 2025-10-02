'use client'

import { useSession } from 'next-auth/react'
import { useState, useRef, useEffect } from 'react'
import { 
  Send, 
  Bot, 
  User, 
  Trash2, 
  Download,
  MessageSquare,
  Lightbulb,
  BookOpen,
  Target,
  Heart,
  Star
} from 'lucide-react'
import { PageLoader } from '../../components/LoadingSpinner'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: 'text' | 'suggestion' | 'resource'
}

export default function AIChat() {
  const { data: session, status } = useSession()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI assistant. I can help you with academic questions, study tips, career guidance, and emotional support. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Sample AI responses based on keywords
  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('stress') || input.includes('anxiety') || input.includes('overwhelmed')) {
      return 'I understand you\'re feeling stressed. Here are some strategies that can help: 1) Take deep breaths and practice mindfulness, 2) Break tasks into smaller manageable parts, 3) Take regular breaks, 4) Talk to someone you trust. Remember, it\'s normal to feel stressed sometimes. Would you like me to suggest some specific relaxation techniques?'
    }
    
    if (input.includes('study') || input.includes('exam') || input.includes('test')) {
      return 'Great question about studying! Here are some effective study techniques: 1) Use the Pomodoro Technique (25-min focused sessions), 2) Create mind maps for complex topics, 3) Practice active recall by testing yourself, 4) Form study groups with classmates, 5) Get enough sleep before exams. What subject are you studying for?'
    }
    
    if (input.includes('career') || input.includes('job') || input.includes('future')) {
      return 'Career planning is exciting! Consider these steps: 1) Identify your interests and strengths, 2) Research potential career paths, 3) Gain relevant experience through internships, 4) Build your professional network, 5) Develop both technical and soft skills. What field interests you most?'
    }
    
    if (input.includes('time') || input.includes('manage') || input.includes('schedule')) {
      return 'Time management is crucial for success! Try these techniques: 1) Use a planner or digital calendar, 2) Prioritize tasks using the Eisenhower Matrix, 3) Set realistic goals and deadlines, 4) Eliminate distractions during study time, 5) Review and adjust your schedule regularly. Would you like help creating a study schedule?'
    }
    
    if (input.includes('motivation') || input.includes('lazy') || input.includes('procrastination')) {
      return 'We all struggle with motivation sometimes! Here\'s what can help: 1) Set small, achievable goals, 2) Reward yourself for completing tasks, 3) Find your "why" - your deeper purpose, 4) Use positive self-talk, 5) Surround yourself with motivated people. Remember, motivation gets you started, but habit keeps you going!'
    }
    
    if (input.includes('friends') || input.includes('social') || input.includes('lonely')) {
      return 'Building connections is important for wellbeing! Try these approaches: 1) Join clubs or organizations that match your interests, 2) Be open to conversations with classmates, 3) Attend social events and activities, 4) Practice active listening, 5) Be genuine and yourself. Quality friendships take time to develop, so be patient!'
    }
    
    // Default response
    return 'That\'s an interesting question! While I try my best to help, I\'m still learning. For complex issues, I recommend speaking with your counselors, mentors, or academic advisors who can provide personalized guidance. Is there something specific I can help you explore further?'
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputText),
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: 'Chat cleared! How can I help you today?',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      }
    ])
  }

  const exportChat = () => {
    const chatText = messages.map(msg => 
      `[${msg.timestamp.toLocaleTimeString()}] ${msg.sender === 'user' ? 'You' : 'AI'}: ${msg.text}`
    ).join('\n')
    
    const blob = new Blob([chatText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `chat-export-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const quickSuggestions = [
    { icon: BookOpen, text: "Help me study effectively", color: "blue" },
    { icon: Target, text: "I need motivation", color: "green" },
    { icon: Heart, text: "I'm feeling stressed", color: "red" },
    { icon: Lightbulb, text: "Career guidance", color: "purple" },
    { icon: Star, text: "Time management tips", color: "yellow" }
  ]

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion)
  }

  if (status === 'loading') {
    return <PageLoader />
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please sign in to access the AI Chat.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
                <p className="text-gray-600">Your personal academic and wellness companion</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={exportChat}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
              <button
                onClick={clearChat}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Suggestions */}
        {messages.length <= 1 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Suggestions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {quickSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className={`flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-${suggestion.color}-300 hover:bg-${suggestion.color}-50 transition-colors text-left`}
                >
                  <suggestion.icon className={`h-5 w-5 text-${suggestion.color}-600`} />
                  <span className="text-sm font-medium text-gray-700">{suggestion.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col" style={{ height: '600px' }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>

                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here... (Press Enter to send)"
                className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Disclaimer:</strong> This AI assistant provides general guidance and support. For serious academic, mental health, or personal issues, please consult with qualified professionals such as counselors, advisors, or healthcare providers.
          </p>
        </div>
      </div>
    </div>
  )
}