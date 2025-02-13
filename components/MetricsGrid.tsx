import React from 'react';
import { Users, Briefcase, AlertTriangle, Activity } from 'lucide-react';
import { MetricWidget } from '../types';

interface MetricsGridProps {
  metrics: MetricWidget[];
}

const iconMap = {
  Users,
  Briefcase,
  AlertTriangle,
  Activity
};

const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = iconMap[metric.icon as keyof typeof iconMap];
        return (
          <div
            key={metric.id}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Icon className="h-6 w-6 text-indigo-600" />
              </div>
              <span className={`text-sm font-medium ${
                metric.change > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change > 0 ? '+' : ''}{metric.change}%
              </span>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">{metric.value}</h3>
            <p className="text-sm text-gray-500">{metric.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsGrid;