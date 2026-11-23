export interface ExecutionSummary {
    execution_id: string
    agent_id: string
    agent_name: string
    conversation_id: string
    user_id: string
    input_preview: string
    output_preview: string
    created_at: string
    started_at: string
    completed_at: string
    error?: string 
}
export interface ExecutionSummaryListResponse {
    ExecutionList: ExecutionSummary[]
}

export interface ExecutionData {
  execution_id: string
  agent_id: string
  agent_name: string
  conversation_id: string
  user_id: string
  channel: { type: string; name: string }
  status: string
  trigger: { type: string }
  input_preview: string
  output_preview: string
  model: { provider: string; name: string }
  usage: { input_tokens: number; output_tokens: number; total_tokens: number }
  duration_ms: number
  created_at: string
  started_at: string
  completed_at: string
  error: string | { message?: string; code?: string } | null
}
