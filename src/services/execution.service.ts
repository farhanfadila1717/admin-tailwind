import type { DefaultPagination } from '@/types/common'
import { api } from './api'
import type { ApiResponse } from '@/types/api'
import type { ExecutionData, ExecutionSummaryListResponse } from '@/types/execution'

export async function getExecutionList(request: DefaultPagination): Promise<ExecutionSummaryListResponse> {
  const response = await api.post<ApiResponse<ExecutionSummaryListResponse>>(
    'mccarthy/ai-agent/executions/list',
    request,
  )

  const data = response.data.data

  return data
}

export async function getExecutionDetail(executionID: string): Promise<ExecutionData> {
  const response = await api.post<ApiResponse<ExecutionData>>(
    'mccarthy/ai-agent/executions/detail',
    {
        "ExecutionID": executionID,
    },
  )

  const data = response.data.data

  return data
}

