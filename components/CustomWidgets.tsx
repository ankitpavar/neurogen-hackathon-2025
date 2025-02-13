import React, { useState } from 'react';
import { BarChart3, Calendar, Clock, Mail, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, AreaChart, Area } from 'recharts';

const responseTimeData = [
  { day: 'Mon', time: 2.5 },
  { day: 'Tue', time: 1.8 },
  { day: 'Wed', time: 3.2 },
  { day: 'Thu', time: 2.1 },
  { day: 'Fri', time: 1.5 },
];

const emailEngagementData = [
  { day: 'Mon', rate: 85 },
  { day: 'Tue', rate: 78 },
  { day: 'Wed', rate: 92 },
  { day: 'Thu', rate: 88 },
  { day: 'Fri', rate: 95 },
];

const activityData = [
  { day: 'Mon', actions: 45 },
  { day: 'Tue', actions: 52 },
  { day: 'Wed', actions: 38 },
  { day: 'Thu', actions: 65 },
  { day: 'Fri', actions: 48 },
];

// Add these types near the top of the file, after the imports
type WidgetId = 'responseTime' | 'emailEngagement' | 'touchpoints' | 'activity';

type WidgetFilters = {
  [K in WidgetId]: string;
};

const CustomWidgets: React.FC = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [widgetFilters, setWidgetFilters] = useState<WidgetFilters>({
    responseTime: 'all',
    emailEngagement: 'all',
    touchpoints: 'all',
    activity: 'all',
  });

  const widgets = [
    {
      title: 'Response Time Trends',
      icon: Clock,
      value: '2.5 hours',
      change: -15,
      chart: 'bar',
      filters: ['All Teams', 'Engineering', 'Product', 'Design'],
      id: 'responseTime' as WidgetId,
      renderChart: () => (
        <BarChart width={300} height={120} data={responseTimeData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="time" fill="#6366f1" />
        </BarChart>
      )
    },
    {
      title: 'Email Engagement',
      icon: Mail,
      value: '85%',
      change: 12,
      chart: 'line',
      filters: ['All Emails', 'Onboarding', 'Documents', 'Updates'],
      id: 'emailEngagement',
      renderChart: () => (
        <LineChart width={300} height={120} data={emailEngagementData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="rate" stroke="#6366f1" />
        </LineChart>
      )
    },
    {
      title: 'Upcoming Touchpoints',
      icon: Calendar,
      value: '8',
      change: 0,
      chart: 'calendar',
      filters: ['All Types', 'Meetings', 'Tasks', 'Reviews'],
      id: 'touchpoints',
      renderChart: () => (
        <div className="space-y-2">
          {['Team Introduction', 'Document Review', 'HR Meeting'].map((event, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span>{event}</span>
              <span className="text-gray-500">Tomorrow</span>
            </div>
          ))}
        </div>
      )
    },
    {
      title: 'Activity Overview',
      icon: BarChart3,
      value: '156 actions',
      change: 25,
      chart: 'activity',
      filters: ['All Activity', 'Logins', 'Documents', 'Meetings'],
      id: 'activity',
      renderChart: () => (
        <AreaChart width={300} height={120} data={activityData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="actions" fill="#6366f1" stroke="#4f46e5" />
        </AreaChart>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Analytics Overview</h2>
        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {widgets.map((widget, index) => {
          const Icon = widget.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Icon className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-medium">{widget.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    className="text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={widgetFilters[widget.id]}
                    onChange={(e) => setWidgetFilters(prev => ({ ...prev, [widget.id]: e.target.value }))}
                  >
                    {widget.filters.map((filter) => (
                      <option key={filter} value={filter.toLowerCase()}>{filter}</option>
                    ))}
                  </select>
                  <span className={`text-sm font-medium ${
                    widget.change > 0 ? 'text-green-600' : widget.change < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {widget.change > 0 ? '+' : ''}{widget.change}%
                  </span>
                </div>
              </div>
              <div className="text-2xl font-semibold mb-4">{widget.value}</div>
              {widget.renderChart()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomWidgets;