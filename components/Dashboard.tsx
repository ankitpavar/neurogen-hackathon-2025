'use client'
import React, { useState } from 'react';
import { 
  Users, Briefcase, AlertTriangle, Activity, 
  MessageSquare, Calendar, Send, BarChart3
} from 'lucide-react';
import MetricsGrid from './MetricsGrid';
import EngagementChart from './EngagementChart';
import CandidateList from './CandidateList';
import CustomWidgets from './CustomWidgets';
import { Chat } from './chat';
import { nanoid } from '@/lib/utils';

const Dashboard: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState('30');
  const id = nanoid();

  const metrics = [
    {
      id: '1',
      title: 'Total Candidates',
      value: '156',
      change: 12,
      icon: 'Users'
    },
    {
      id: '2',
      title: 'Active Offers',
      value: '45',
      change: -5,
      icon: 'Briefcase'
    },
    {
      id: '3',
      title: 'Cold Candidates',
      value: '23',
      change: 8,
      icon: 'AlertTriangle'
    },
    {
      id: '4',
      title: 'Avg Engagement',
      value: '78%',
      change: 15,
      icon: 'Activity'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Candidate Engagement Dashboard</h1>
          {/* <div className="flex gap-4">
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div> */}
        </div>

        <MetricsGrid metrics={metrics} />

        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="col-span-2">
            <EngagementChart dateRange={dateRange} />
          </div>
          <div className="col-span-1">
            <CandidateList onStatusSelect={setSelectedStatus} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="col-span-1 bg-white rounded-lg shadow-sm p-6">
            <Chat key={id} id={id} initialMessages={[]} />
          </div>
          <div className="col-span-2">
            <CustomWidgets />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;