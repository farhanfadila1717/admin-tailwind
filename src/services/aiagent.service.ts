import type {
  AiAgentCreateRequest,
  AiAgentList,
  CreateKnowladgeRequest,
  KnowledgeSummaryResponse,
} from '@/types/aiagent'
import type { DefaultPagination } from '@/types/common'
import { api } from './api'
import type { ApiResponse, SuccessApiResponse } from '@/types/api'

export async function getAiAgentList(request: DefaultPagination): Promise<AiAgentList> {
  const response = await api.post<ApiResponse<AiAgentList>>('mccarthy/ai-agent/list', request)

  const data = response.data.data

  return data
}

export async function createAiAgent(request: AiAgentCreateRequest): Promise<SuccessApiResponse> {
  const response = await api.post<ApiResponse<SuccessApiResponse>>(
    'mccarthy/ai-agent/create',
    request,
  )

  const data = response.data.data

  return data
}

export async function getAiAgentKnowledgeList(agentId: string): Promise<KnowledgeSummaryResponse> {
  const response = await api.post<ApiResponse<KnowledgeSummaryResponse>>(
    'mccarthy/ai-agent/knowledge/list',
    {
      AiAgentId: agentId,
    },
  )

  const data = response.data.data

  return data
}

export async function createAiAgentKnowledge(
  request: CreateKnowladgeRequest,
): Promise<SuccessApiResponse> {
  const response = await api.post<ApiResponse<SuccessApiResponse>>(
    'ai-agent/knowledge/create',
    request,
  )

  const data = response.data.data

  return data
}
