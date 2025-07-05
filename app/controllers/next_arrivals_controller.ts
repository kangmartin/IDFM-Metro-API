import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import type { SiriResponse } from '../types/siri.js'

export default class NextArrivalsController {
  async getNextArrivals({ response, params }: HttpContext) {
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

      return response.json(data.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit)
    } catch (error) {
      return response.status(500).json({ error: 'Erreur lors de la récupération des données' })
    }
  }
}
