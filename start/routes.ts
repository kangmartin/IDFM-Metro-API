/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const NextArrivalsController = () => import('#controllers/next_arrivals_controller')
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('getNextArrivals/:stopRef', [NextArrivalsController, 'getNextArrivals'])
