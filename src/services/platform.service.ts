import type { DefaultPagination } from '@/types/common'
import { api } from './api'
import type { ApiResponse, SuccessApiResponse } from '@/types/api'
import type { PlatformCreateRequest, PlatformSummaryList } from '@/types/platform'

export async function getPlatformList(request: DefaultPagination): Promise<PlatformSummaryList> {
  const response = await api.post<ApiResponse<PlatformSummaryList>>(
    'koum/platform/connection/list',
    request,
  )

  const data = response.data.data

  return data
}

export async function createPlatform(request: PlatformCreateRequest): Promise<SuccessApiResponse> {
  const response = await api.post<ApiResponse<SuccessApiResponse>>(
    'koum/platform/connection/create',
    request,
  )

  const data = response.data.data

  return data
}
