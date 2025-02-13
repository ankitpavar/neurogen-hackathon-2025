'use client'
import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, ChevronUp, Mail, Clock, CheckCircle, AlertCircle, ExternalLink, Calendar, XCircle, Ban,
  Linkedin, Search, MessageCircle, Globe 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Skeleton } from "./ui/skeleton";

interface CandidateListProps {
  onStatusSelect: (status: string) => void;
}

interface Candidate {
  id: string;
  fullName: string;
  role: string;
  status: string;
  emailOpenRate: number;
  responseTime: number;
  touchpointCompletion: number;
  lastActivity: string;
  engagement_score: number;
  avatar: string;
  email?: string;
  linkedinActivity?: string;
  naukriActivity?: string;
  offerStatus?: string;
  jobSearchActivity?: string;
  whatsappResponse?: string;
  loop_usage_time?: number;
  final_outcome?: string;
  action?: string;
  timestamp?: string;
  offer_status?: string;
  naukri_activity?: string;
  linkedin_activity?: string;
  whatsapp_response?: string;
  job_search_activity?: string;
}

const activityLog = [
  { id: 1, type: 'email_opened', points: 10, timestamp: '2024-03-15T10:30:00', description: 'Opened onboarding email' },
  { id: 2, type: 'link_clicked', points: 15, timestamp: '2024-03-15T11:45:00', description: 'Clicked job description link' },
  { id: 3, type: 'meeting_scheduled', points: 20, timestamp: '2024-03-15T12:30:00', description: 'Scheduled interview with hiring manager' },
  { id: 4, type: 'email_bounced', points: -5, timestamp: '2024-03-15T13:15:00', description: 'Email delivery failed' },
  { id: 5, type: 'email_unsubscribed', points: -10, timestamp: '2024-03-15T14:00:00', description: 'Unsubscribed from communications' },
];

const CandidateList: React.FC<CandidateListProps> = ({ onStatusSelect }) => {
  const [expandedCandidate, setExpandedCandidate] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const url = selectedFilter === 'all' 
          ? '/api/candidate'
          : `/api/candidate?status=${selectedFilter}`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch candidates');
        }
        
        const data = await response.json();
        setCandidates(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch candidates');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [selectedFilter]);

  const handleStatusSelect = (status: string) => {
    setSelectedFilter(status);
    onStatusSelect(status);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 h-[450px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Candidates</h2>
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-12 h-8 rounded-full" />
            ))}
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100%-5rem)]">
          <div className="space-y-4 pr-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg border shadow-sm p-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <div className="text-right space-y-2">
                    <Skeleton className="h-4 w-16 ml-auto" />
                    <Skeleton className="h-3 w-24 ml-auto" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  }
  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  const getFilteredCandidates = (candidates: Candidate[], filter: string) => {
    switch (filter) {
      case 'hot':
        return candidates.filter(candidate => candidate.engagement_score >= 60);
      case 'warm':
        return candidates.filter(candidate => candidate.engagement_score >= 30 && candidate.engagement_score < 60);
      case 'cold':
        return candidates.filter(candidate => candidate.engagement_score < 30);
      default:
        return candidates;
    }
  };

  const filteredCandidates = getFilteredCandidates(candidates, selectedFilter);

  const toggleExpand = (id: string) => {
    setExpandedCandidate(expandedCandidate === id ? null : id);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'email_opened':
        return <Mail className="h-4 w-4 text-blue-600" />;
      case 'link_clicked':
        return <ExternalLink className="h-4 w-4 text-purple-600" />;
      case 'meeting_scheduled':
        return <Calendar className="h-4 w-4 text-green-600" />;
      case 'email_bounced':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'email_unsubscribed':
        return <Ban className="h-4 w-4 text-red-600" />;
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
    <div className="bg-white rounded-lg shadow-sm p-6 h-[450px]">
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
      
      <ScrollArea className="h-[calc(100%-5rem)]">
        <div className="space-y-4 pr-4">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((candidate) => (
              <div key={candidate.id} className="bg-white rounded-lg border shadow-sm">
                <div 
                  className="flex items-center space-x-4 p-4 cursor-pointer"
                  onClick={() => toggleExpand(candidate.id)}
                >
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={candidate.avatar} alt={candidate.fullName} />
                    <AvatarFallback>{candidate.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">{candidate.fullName}</h3>
                    <p className="text-sm text-gray-500">{candidate.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      Score: {candidate.engagement_score}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center justify-end gap-1">
                      {candidate.lastActivity}
                      {candidate.final_outcome && (
                        <span className={`px-2 py-0.5 rounded-full ${
                          candidate.final_outcome === 'dropped_off' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {candidate.final_outcome.replace(/_/g, ' ').toUpperCase()}
                        </span>
                      )}
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
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Email</div>
                        <div className="text-sm font-medium truncate">{candidate?.email}</div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Offer Status</div>
                        <div className="text-sm font-medium capitalize">{candidate?.offer_status?.replace(/_/g, ' ') || 'N/A'}</div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Loop Usage</div>
                        <div className="text-lg font-medium">{candidate?.loop_usage_time || 0}min</div>
                      </div>
                    </div>
                  
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                      <div className="text-sm text-gray-500 mb-3">Job Platforms</div>
                      <div className="space-y-3">
                        <div className="flex justify-between flex-col">
                          <span className="text-sm font-medium flex items-center gap-2">
                            <Linkedin className="h-4 w-4 text-blue-600" />
                            LinkedIn
                          </span>
                          <span className="text-sm text-gray-600 capitalize">{candidate?.linkedin_activity?.replace(/_/g, ' ') || 'No activity'}</span>
                        </div>
                        <div className="flex justify-between flex-col">
                          <span className="text-sm font-medium flex items-center gap-2">
                            <Globe className="h-4 w-4 text-orange-600" />
                            Naukri
                          </span>
                          <span className="text-sm text-gray-600 capitalize">{candidate?.naukri_activity?.replace(/_/g, ' ') || 'No activity'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                      <div className="text-sm text-gray-500 mb-3">Communication</div>
                      <div className="space-y-3">
                        <div className="flex justify-between flex-col">
                          <span className="text-sm font-medium flex items-center gap-2">
                            <MessageCircle className="h-4 w-4 text-green-600" />
                            WhatsApp
                          </span>
                          <span className="text-sm text-gray-600 capitalize">{candidate?.whatsapp_response || 'No response'}</span>
                        </div>
                        <div className="flex justify-between flex-col">
                          <span className="text-sm font-medium flex items-center gap-2">
                            <Search className="h-4 w-4 text-blue-600" />
                            Job Search
                          </span>
                          <span className="text-sm text-gray-600 capitalize">{candidate?.job_search_activity?.replace(/_/g, ' ') || 'Unknown'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Recent Activity</h4>
                    {candidate.action && (
                      <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center space-x-3">
                          {getActivityIcon(candidate.action)}
                          <span className="text-sm font-medium">
                            {activityLog.find(activity => activity?.type === candidate.action)?.description || 'Unknown activity'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          {(() => {
                            const activity = activityLog.find(a => a.type === candidate?.action);
                            const points = activity?.points ?? 0;
                            return (
                              <span className={`text-sm font-medium ${points >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {points >= 0 ? '+' : ''}{points} pts
                              </span>
                            );
                          })()}
                          <span className="text-sm text-gray-500">
                            {candidate?.timestamp ? new Date(candidate?.timestamp).toLocaleString('en-US', {
                              hour: 'numeric',
                              minute: 'numeric',
                              hour12: true,
                              month: 'short',
                              day: 'numeric'
                            }) : 'Unknown time'}
                          </span>
                        </div>
                      </div>
                    )}
                    {!candidate.action && (
                      <div className="text-sm text-gray-500 text-center py-3 bg-gray-50 rounded-lg">No recent activities</div>
                    )}
                  </div>
                </div>
              )}
            </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-gray-500">
              <Search className="h-12 w-12 text-gray-400 mb-3" />
              <p className="text-lg font-medium">No candidates found</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          )
        }
        </div>
      </ScrollArea>
    </div>
  );
};

export default CandidateList;