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
