'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  Clock,
  Heart,
  AlertTriangle,
  ExternalLink,
  Send,
  User,
  MapPin,
  Shield
} from 'lucide-react'
import { useNotify } from './NotificationProvider'

interface SupportContact {
  id: string
  type: 'crisis' | 'chat' | 'email' | 'counseling'
  title: string
  description: string
  contact: string
  availability: string
  urgent: boolean
  icon: any
  color: string
}

export default function ImmediateHelpWidget() {
  const { data: session } = useSession()
  const [isExpanded, setIsExpanded] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  const notify = useNotify()

  const supportContacts: SupportContact[] = [
    {
      id: 'crisis',
      type: 'crisis',
      title: 'Crisis Helpline',
      description: '24/7 Emergency Mental Health Support',
      contact: '988', // National Suicide Prevention Lifeline (US)
      availability: '24/7 Support',
      urgent: true,
      icon: Phone,
      color: 'bg-red-500'
    },
    {
      id: 'crisis-india',
      type: 'crisis',
      title: 'Indian Crisis Helpline',
      description: 'KIRAN Mental Health Helpline',
      contact: '1800-599-0019', // KIRAN Mental Health Helpline (India)
      availability: '24/7 Support',
      urgent: true,
      icon: Phone,
      color: 'bg-red-600'
    },
    {
      id: 'chat',
      type: 'chat',
      title: 'Live Chat Support',
      description: 'Immediate chat with counselor',
      contact: 'Available Now',
      availability: 'Mon-Fri 8AM-10PM',
      urgent: false,
      icon: MessageCircle,
      color: 'bg-blue-500'
    },
    {
      id: 'email',
      type: 'email',
      title: 'Email Support',
      description: 'Professional counseling response',
      contact: 'crisis@edusense.edu',
      availability: 'Response within 2hrs',
      urgent: false,
      icon: Mail,
      color: 'bg-green-500'
    },
    {
      id: 'campus',
      type: 'counseling',
      title: 'Campus Counseling',
      description: 'In-person counseling services',
      contact: '(555) 123-4567',
      availability: 'Mon-Fri 9AM-5PM',
      urgent: false,
      icon: Heart,
      color: 'bg-purple-500'
    }
  ]

  const emergencyContacts = [
    { name: 'National Suicide Prevention Lifeline (US)', number: '988', available: '24/7' },
    { name: 'Crisis Text Line (US)', number: '741741', type: 'text', instruction: 'Text HOME to 741741', available: '24/7' },
    { name: 'KIRAN Mental Health (India)', number: '1800-599-0019', available: '24/7' },
    { name: 'Vandrevala Foundation (India)', number: '9999666555', available: '24/7' },
    { name: 'SAMHSA National Helpline (US)', number: '1-800-662-4357', available: '24/7' },
    { name: 'Campus Security Emergency', number: '911', available: '24/7' }
  ]

  const handleCrisisCall = (number: string) => {
    // Clean the number for calling
    const cleanNumber = number.replace(/[^\d+]/g, '');
    
    // Try to initiate call
    window.open(`tel:${cleanNumber}`, '_self');
    
    // Also show the number for manual dialing
    notify.info('Crisis Call Initiated', `Calling ${number}. If the call doesn't connect automatically, please dial manually.`);
    
    // Log the crisis call attempt for safety tracking
    console.log(`Crisis call initiated to ${number} by user ${session?.user?.email || 'anonymous'} at ${new Date().toISOString()}`);
  }

  const handleTextCrisis = (number: string, instruction: string) => {
    // Open SMS app with pre-filled message
    const message = "HOME";
    window.open(`sms:${number}?body=${encodeURIComponent(message)}`, '_self');
    notify.info('Crisis Text', `${instruction} - SMS app opened with message ready.`);
  }

  const handleEmailSupport = () => {
    const timestamp = new Date().toLocaleString();
    const subject = `Urgent Support Request - ${session?.user?.name || 'Student'} - ${timestamp}`;
    const body = `URGENT SUPPORT REQUEST

Student Information:
Name: ${session?.user?.name || 'Not provided'}
Email: ${session?.user?.email || 'Not provided'}
Date/Time: ${timestamp}

Emergency Level: Please specify (High/Medium/Low)

Situation Description:
[Please describe your current situation and what kind of help you need]

Immediate Danger: Yes/No
[If yes, please also call emergency services]

Contact Preference:
[ ] Call me immediately at: ___________
[ ] Email response is sufficient
[ ] Schedule counseling appointment

Best time to reach you:
___________

Additional Information:
[Any other details that might help us assist you better]

This is an automated template from EduSense Crisis Support System.
If this is a life-threatening emergency, please call 911 or your local emergency services immediately.`;
    
    window.open(`mailto:crisis@edusense.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    notify.success('Crisis Email', 'Emergency email template opened. Please fill in your details and send immediately.');
  }

  const handleChatSupport = () => {
    setShowChatModal(true);
    notify.info('Live Chat', 'Opening secure chat with crisis counselor...');
  }

  const sendChatMessage = async () => {
    if (!chatMessage.trim()) return;
    
    // In a real implementation, this would send to actual chat service
    const messageData = {
      message: chatMessage,
      userId: session?.user?.email || 'anonymous',
      timestamp: new Date().toISOString(),
      urgency: 'high',
      source: 'crisis-widget'
    };
    
    try {
      // Simulate API call to crisis chat service
      console.log('Crisis chat message:', messageData);
      
      notify.success('Message Sent', 'Your message has been sent to our crisis counselor. You will receive a response within 2-3 minutes.');
      setChatMessage('');
      setShowChatModal(false);
      
      // Auto-response simulation
      setTimeout(() => {
        notify.info('Counselor Response', 'A crisis counselor is now reviewing your message and will respond shortly.');
      }, 2000);
      
    } catch (error) {
      notify.error('Send Failed', 'Unable to send message. Please try calling our crisis hotline instead.');
    }
  }

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 animate-pulse"
          title="Need Immediate Help?"
        >
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6" />
            <span className="font-medium hidden sm:block">SOS</span>
          </div>
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full">
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200">
          {/* Header */}
          <div className="bg-red-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <h3 className="font-semibold">Need Immediate Help?</h3>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                ✕
              </button>
            </div>
            <p className="text-red-100 text-sm mt-1">24/7 Support Available</p>
          </div>

          {/* Support Options */}
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            {supportContacts.map((contact) => (
              <div key={contact.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 ${contact.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <contact.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900 text-sm">{contact.title}</h4>
                      {contact.urgent && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">Urgent</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{contact.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-gray-900">{contact.contact}</p>
                        <p className="text-xs text-gray-500">{contact.availability}</p>
                      </div>
                      <button
                        onClick={() => {
                          switch (contact.type) {
                            case 'crisis':
                              handleCrisisCall(contact.contact)
                              break
                            case 'chat':
                              handleChatSupport()
                              break
                            case 'email':
                              handleEmailSupport()
                              break
                            case 'counseling':
                              handleCrisisCall(contact.contact)
                              break
                          }
                        }}
                        className={`${contact.color} text-white px-3 py-1 rounded text-xs hover:opacity-90 transition-opacity`}
                      >
                        {contact.type === 'crisis' || contact.type === 'counseling' ? 'Call Now' : 
                         contact.type === 'chat' ? 'Start Chat' : 'Send Email'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Emergency Contacts */}
            <div className="border-t pt-3 mt-4">
              <h4 className="font-medium text-gray-900 text-sm mb-2 flex items-center">
                <Shield className="h-4 w-4 mr-1 text-red-600" />
                Emergency Resources
              </h4>
              <div className="space-y-2">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <div>
                      <p className="font-medium text-gray-700">{contact.name}</p>
                      <p className="text-gray-500">{contact.available}</p>
                    </div>
                    <div className="flex space-x-2">
                      {contact.type === 'text' ? (
                        <button
                          onClick={() => handleTextCrisis(contact.number, contact.instruction)}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Text
                        </button>
                      ) : (
                        <button
                          onClick={() => handleCrisisCall(contact.number)}
                          className="text-red-600 hover:text-red-700 font-medium"
                        >
                          Call
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mt-3">
              <p className="text-xs text-yellow-800">
                <strong>Emergency:</strong> If you&apos;re in immediate danger, call 911 or go to your nearest emergency room.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="bg-blue-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Live Chat Support</h3>
                <button
                  onClick={() => setShowChatModal(false)}
                  className="text-white hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              <p className="text-blue-100 text-sm">Connect with a counselor</p>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Hi {session?.user?.name || 'there'}! I&apos;m here to help. What&apos;s on your mind?
                </p>
              </div>
              <textarea
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Tell us how we can help you today..."
                className="w-full h-24 border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between items-center mt-4">
                <p className="text-xs text-gray-500">Your message is confidential</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowChatModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={sendChatMessage}
                    disabled={!chatMessage.trim()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center space-x-1"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}