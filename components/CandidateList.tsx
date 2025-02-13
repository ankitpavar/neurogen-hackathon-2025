'use client'
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Candidate } from '@/lib/types';

interface CandidateListProps {
  onStatusSelect: (status: string) => void;
}

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    role: 'Senior Frontend Developer',
    status: 'hot',
    emailOpenRate: 95,
    responseTime: 2,
    touchpointCompletion: 100,
    lastActivity: '2 hours ago',
    engagementScore: 9.5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'Product Manager',
    status: 'warm',
    emailOpenRate: 75,
    responseTime: 8,
    touchpointCompletion: 80,
    lastActivity: '1 day ago',
    engagementScore: 8.7,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '3',
    name: 'Siya Chonn',
    role: 'Product Manager',
    status: 'warm',
    emailOpenRate: 75,
    responseTime: 8,
    touchpointCompletion: 80,
    lastActivity: '4 day ago',
    engagementScore: 7.9,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '4',
    name: 'Will Smith',
    role: 'Product Manager',
    status: 'cold',
    emailOpenRate: 75,
    responseTime: 8,
    touchpointCompletion: 80,
    lastActivity: '7 day ago',
    engagementScore: 5.2,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

const activityLog = [
  { id: 1, type: 'email_open', points: 10, timestamp: '2024-03-15T10:30:00', description: 'Opened onboarding email' },
  { id: 2, type: 'login', points: 15, timestamp: '2024-03-15T11:45:00', description: 'Logged into Loop platform' },
  { id: 3, type: 'document_view', points: 20, timestamp: '2024-03-15T14:20:00', description: 'Viewed offer letter' },
  { id: 4, type: 'meeting_attendance', points: 25, timestamp: '2024-03-15T16:00:00', description: 'Attended team introduction' },
];

const CandidateList: React.FC<CandidateListProps> = ({ onStatusSelect }) => {
  const [expandedCandidate, setExpandedCandidate] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredCandidates = mockCandidates.filter(candidate => {
    if (selectedFilter === 'all') return true;
    return candidate.status === selectedFilter;
  });

  const handleStatusSelect = (status: string) => {
    setSelectedFilter(status);
    onStatusSelect(status);
  };

  const toggleExpand = (id: string) => {
    setExpandedCandidate(expandedCandidate === id ? null : id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot':
        return 'bg-green-100 text-green-800';
      case 'warm':
        return 'bg-yellow-100 text-yellow-800';
      case 'cold':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'email_open':
        return <Mail className="h-4 w-4 text-indigo-600" />;
      case 'login':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'document_view':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'meeting_attendance':
        return <Clock className="h-4 w-4 text-purple-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Candidates</h2>
        <div className="flex gap-4">
          <div className="flex gap-2 ml-2">
            <button
              onClick={() => handleStatusSelect('all')}
              className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                selectedFilter === 'all' ? 'bg-cyan-500 text-white' : 'bg-cyan-100 text-green-800 border-cyan-800 border-1'
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleStatusSelect('hot')}
              className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                selectedFilter === 'hot' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800 border-green-800 border-1'
              }`}
            >
              Hot
            </button>
            <button
              onClick={() => handleStatusSelect('warm')}
              className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                selectedFilter === 'warm' ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-800 border-yellow-800 border-1'
              }`}
            >
              Warm
            </button>
            <button
              onClick={() => handleStatusSelect('cold')}
              className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                selectedFilter === 'cold' ? 'bg-red-500 text-white' : 'bg-red-100 text-red-800 border-red-800 border-1'
              }`}
            >
              Cold
            </button>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredCandidates.map((candidate) => (
          <div key={candidate.id} className="bg-white rounded-lg border shadow-sm">
            <div 
              className="flex items-center space-x-4 p-4 cursor-pointer"
              onClick={() => toggleExpand(candidate.id)}
            >
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h3 className="font-medium">{candidate.name}</h3>
                <p className="text-sm text-gray-500">{candidate.role}</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">
                  Score: {candidate.engagementScore}
                </div>
                <div className="text-xs text-gray-500">
                  {candidate.lastActivity}
                </div>
              </div>
              {expandedCandidate === candidate.id ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
            
            {expandedCandidate === candidate.id && (
              <div className="border-t px-4 py-3">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Email Open Rate</div>
                    <div className="text-lg font-semibold">{candidate.emailOpenRate}%</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Response Time</div>
                    <div className="text-lg font-semibold">{candidate.responseTime}h</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Touchpoint Completion</div>
                    <div className="text-lg font-semibold">{candidate.touchpointCompletion}%</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-gray-700">Recent Activity</h4>
                  {activityLog.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getActivityIcon(activity.type)}
                        <span className="text-sm">{activity.description}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-green-600">+{activity.points} pts</span>
                        <span className="text-xs text-gray-500">
                          {new Date(activity.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateList;