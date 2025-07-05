import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import type { SiriResponse } from '../types/siri.js'

export default class NextArrivalsController {
  async getSimplifiedArrivals({ response, params }: HttpContext) {
    try {
      const stopRef = params.stopRef
      const apiKey = env.get('API_KEY')

      const url = `https://prim.iledefrance-mobilites.fr/marketplace/stop-monitoring?MonitoringRef=${stopRef}`
      const apiResponse = await fetch(url, {
        headers: {
          apikey: apiKey,
        },
      })

      const data = (await apiResponse.json()) as SiriResponse

      const monitoredStopVisits =
        data.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit

      const simplifiedData = monitoredStopVisits.map((visit) => {
        const journey = visit.MonitoredVehicleJourney
        const expectedArrivalTime = journey.MonitoredCall.ExpectedArrivalTime
        const expectedDepartureTime = journey.MonitoredCall.ExpectedDepartureTime

        const now = new Date()
        const arrivalTime = new Date(expectedArrivalTime)
        const waitTimeMinutes = Math.max(
          0,
          Math.round((arrivalTime.getTime() - now.getTime()) / (1000 * 60))
        )

        return {
          ligne: journey.LineRef.value,
          destination: journey.DestinationName[0]?.value || '',
          direction: journey.DirectionName[0]?.value || '',
          arret: journey.MonitoredCall.StopPointName[0]?.value || '',
          quai: journey.MonitoredCall.DeparturePlatformName?.value || '',
          tempsAttente: waitTimeMinutes,
          heureArrivee: expectedArrivalTime,
          heureDepart: expectedDepartureTime,
          aQuai: journey.MonitoredCall.VehicleAtStop,
          statut: journey.MonitoredCall.DepartureStatus,
        }
      })

      return response.json(simplifiedData)
    } catch (error) {
      return response.status(500).json({ error: 'Erreur lors de la récupération des données' })
    }
  }
}
