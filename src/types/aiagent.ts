export interface AiAgent {
  id: Number
  type: string
  author_id: Number
  behavior: string
  description: string
  created_at: string
  lut: string
}

export interface AiAgentList {
  AiAgentList: AiAgent[]
}

export interface AiAgentCreateRequest {
  AiAgentType: string
  AiAgentName: string
  AiAgentDescription: string
  AiAgentBehaviour: string
  AiAgentLinkedPlatformIntegrationId: Number[]
}

export interface KnowledgeSummaryResponse {
  KnowledgeSummaryList: KnowledgeSummary[]
}

export interface KnowledgeSummary {
  KnowledgeSummaryId: string
  KnowledgeSummaryName: string
  KnowledgeSummaryType: KnowledgeSummaryType
  KnowledgeSummaryStatus: KnowledgeSummaryStatus
  QuestionAndAnswerKnowledge: QuestionAndAnswerKnowledge
  OpenEndedKnowledge: OpenEndedKnowledge
  ExternalKnowledge: ExternalKnowledge
}

export const KNOWLEDGE_SUMMARY_TYPES = [
  'OPEN_ENDED',
  'EXTERNAL_KNOWLEDGE',
  'FREQUENTLY_ASKED_QUESTIONS',
] as const

export type KnowledgeSummaryType = (typeof KNOWLEDGE_SUMMARY_TYPES)[number]

export type KnowledgeSummaryStatus = 'ACTIVE' | 'INACTIVE' | 'DRAFT'

export interface QuestionAndAnswerKnowledge {
  QuestionAndAnswerList: QuestionAndAnswer[] | null
}

export interface QuestionAndAnswer {
  Question: string
  Answer: string
}

export interface OpenEndedKnowledge {
  OpenEndedKnowledgeData: string
}

export interface ExternalKnowledge {
  ExternalKnowledgeType: string
  ExternalKnowledgeScope: string
  ExternalKnowledgeDestination: string
}

export interface CreateKnowladgeRequest {
  AiAgentId: number
  AiKnowledgeType?: KnowledgeSummaryType
  QuestionAndAnswerKnowledge?: QuestionAndAnswerKnowledge
  OpenEndedKnowledge?: OpenEndedKnowledge
  ExternalKnowledge?: ExternalKnowledge
}
