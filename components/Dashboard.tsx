"use client"

import React, { useEffect, useState } from "react"

import { nanoid } from "@/lib/utils"

import CandidateList from "./CandidateList"
import { Chat } from "./chat"
// import CustomWidgets from "./CustomWidgets"
import EngagementChart from "./EngagementChart"
import MetricsGrid from "./MetricsGrid"
import { Candidate } from "@/lib/types"

const Dashboard: React.FC = () => {
	const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
	const [dateRange, setDateRange] = useState("30")
	const id = nanoid()
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

	const metrics = [
		{
			id: "1",
			title: "Total Candidates",
			value: "156",
			change: 12,
			icon: "Users"
		},
		{
			id: "2",
			title: "Active Offers",
			value: "45",
			change: -5,
			icon: "Briefcase"
		},
		{
			id: "3",
			title: "Cold Candidates",
			value: "23",
			change: 8,
			icon: "AlertTriangle"
		},
		{
			id: "4",
			title: "Avg Engagement",
			value: "78%",
			change: 15,
			icon: "Activity"
		}
	]

  const chartData = [
    { 
      name: 'Hot', 
      value: candidates.filter(c => c.engagement_score >= 60).length,
      color: '#22c55e' 
    },
    { 
      name: 'Warm', 
      value: candidates.filter(c => c.engagement_score >= 30 && c.engagement_score < 60).length,
      color: '#f59e0b' 
    },
    { 
      name: 'Cold', 
      value: candidates.filter(c => c.engagement_score < 30).length,
      color: '#ef4444' 
    },
  ];
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="mb-8 flex items-center justify-between">
					<h1 className="text-3xl font-bold text-gray-900">
						Candidate Engagement Dashboard
					</h1>
				</div>

				<MetricsGrid metrics={metrics} />

				<div className="mt-8 grid grid-cols-3 gap-6">
				
					
					<div className="col-span-1">
					  <EngagementChart dateRange={dateRange} data={chartData} />
					</div>
					<div className="col-span-1">
          <CandidateList 
            onStatusSelect={setSelectedStatus}
            setSelectedFilter={setSelectedFilter}
            loading={loading}
            error={error}
            candidates={candidates}
            selectedFilter={selectedFilter}
            setExpandedCandidate={setExpandedCandidate}
            expandedCandidate={expandedCandidate}
          />
        </div>
					<div className="col-span-1 h-[690px] rounded-lg bg-white p-6 shadow-sm">
						<Chat key={id} id={id} initialMessages={[]} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
