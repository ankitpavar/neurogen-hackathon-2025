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