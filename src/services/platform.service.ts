import type { DefaultPagination } from '@/types/common'
import { api } from './api'
import type { ApiResponse } from '@/types/api'
import type { PlatformSummaryList } from '@/types/platform'

export async function getPlatformList(request: DefaultPagination): Promise<PlatformSummaryList> {
  const response = await api.post<ApiResponse<PlatformSummaryList>>('koum/platform/connection/list', request)

  const data = response.data.data

  return data
}