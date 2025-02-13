"use client"

import React, { useState } from "react"

import { nanoid } from "@/lib/utils"

import CandidateList from "./CandidateList"
import { Chat } from "./chat"
import CustomWidgets from "./CustomWidgets"
import EngagementChart from "./EngagementChart"
import MetricsGrid from "./MetricsGrid"

const Dashboard: React.FC = () => {
	const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
	const [dateRange, setDateRange] = useState("30")
	const id = nanoid()

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
					<div className="col-span-2">
						<EngagementChart dateRange={dateRange} />
					</div>
					<div className="col-span-1">
						<CandidateList onStatusSelect={setSelectedStatus} />
					</div>
				</div>

				<div className="mt-8 grid grid-cols-3 gap-6">
					<div className="col-span-2">
						<CustomWidgets />
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
