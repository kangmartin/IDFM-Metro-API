export interface SiriResponse {
  Siri: {
    ServiceDelivery: {
      ResponseTimestamp: string
      ProducerRef: string
      ResponseMessageIdentifier: string
      StopMonitoringDelivery: StopMonitoringDelivery[]
    }
  }
}

export interface StopMonitoringDelivery {
  ResponseTimestamp: string
  Version: string
  Status: string
  MonitoredStopVisit: MonitoredStopVisit[]
  StopLineNotice: any[]
  ServiceException: any[]
}

export interface MonitoredStopVisit {
  RecordedAtTime: string
  ItemIdentifier: string
  MonitoringRef: {
    value: string
  }
  MonitoredVehicleJourney: MonitoredVehicleJourney
}

export interface MonitoredVehicleJourney {
  LineRef: {
    value: string
  }
  OperatorRef: {
    value: string
  }
  FramedVehicleJourneyRef: {
    DataFrameRef: {
      value: string
    }
    DatedVehicleJourneyRef: string
  }
  DirectionName: Array<{
    value: string
  }>
  DestinationRef: {
    value: string
  }
  DestinationName: Array<{
    value: string
  }>
  VehicleJourneyName: any[]
  JourneyNote: any[]
  MonitoredCall: MonitoredCall
  TrainNumbers: {
    TrainNumberRef: any[]
  }
  VehicleFeatureRef: any[]
  DirectionRef: {
    value: string
  }
  DestinationShortName: Array<{
    value: string
  }>
}

export interface MonitoredCall {
  StopPointName: Array<{
    value: string
  }>
  VehicleAtStop: boolean
  DestinationDisplay: Array<{
    value: string
  }>
  ExpectedArrivalTime: string
  DeparturePlatformName: {
    value: string
  }
  ExpectedDepartureTime: string
  DepartureStatus: string
  ArrivalStatus: string
}
