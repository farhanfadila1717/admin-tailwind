export interface PlatformSummary {
  PlatformIntegrationId: Number
  PlatformIntegrationUserDefinedName: string
  PlatformIntegrationExternalId: string
  PlatformIntegrationStatus: string
}

export interface PlatformSummaryList {
  PlatformIntegrationSummaryList: PlatformSummary[]
}

export interface PlatformCreateRequest {
  platform_id: string
  platform_external_id: string
  platform_user_defined_name: string
}
