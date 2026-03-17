import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\MyActiveReservationsController::index
 * @see app/Http/Controllers/MyActiveReservationsController.php:11
 * @route '/my-active-reservations'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/my-active-reservations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MyActiveReservationsController::index
 * @see app/Http/Controllers/MyActiveReservationsController.php:11
 * @route '/my-active-reservations'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MyActiveReservationsController::index
 * @see app/Http/Controllers/MyActiveReservationsController.php:11
 * @route '/my-active-reservations'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MyActiveReservationsController::index
 * @see app/Http/Controllers/MyActiveReservationsController.php:11
 * @route '/my-active-reservations'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const myActiveReservations = {
    index: Object.assign(index, index),
}

export default myActiveReservations