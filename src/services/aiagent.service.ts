import type { AiAgentCreateRequest, AiAgentList } from '@/types/aiagent'
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
