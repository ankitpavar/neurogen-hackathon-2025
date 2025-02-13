import { Message } from "ai/react"

import { ClientMessage } from "./chat/types"

// eslint-disable-next-line
export interface Chat extends Record<string, any> {
	id?: string
	title: string
	messages?: ClientMessage[] | Message[]
}

export interface Result<T> {
	ok: boolean
	message?: string
	result: T | null
}

export type ServerActionResult<Result> = Promise<
	| Result
	| {
			error: string
	  }
>

export type Theme = "light" | "dark"

export interface Model {
	name: string
	title: string
	description: string
	prompt: string
	is_workflow: boolean
}
export type CandidateStatus = 'hot' | 'cold' | 'warm';

export interface Candidate {
  id: string;
  name: string;
  role: string;
  status: CandidateStatus;
  emailOpenRate: number;
  responseTime: number;
  touchpointCompletion: number;
  lastActivity: string;
  engagementScore: number;
  avatar: string;
}

export interface MetricWidget {
  id: string;
  title: string;
  value: number | string;
  change: number;
  icon: string;
}
interface CandidateListProps {
  onStatusSelect: (status: string) => void;
}

export interface Candidate {
  id: string;
  fullName: string;
  role: string;
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