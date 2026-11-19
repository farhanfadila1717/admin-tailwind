export interface PlatformSummary {
  PlatformIntegrationId: Number
  PlatformIntegrationUserDefinedName: string
  PlatformIntegrationExternalId: string
  PlatformIntegrationStatus: string
}

export interface PlatformSummaryList {
  PlatformIntegrationSummaryList: PlatformSummary[]
}