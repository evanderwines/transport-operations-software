import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\MyReservationController::index
 * @see app/Http/Controllers/MyReservationController.php:33
 * @route '/my-reservations'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/my-reservations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MyReservationController::index
 * @see app/Http/Controllers/MyReservationController.php:33
 * @route '/my-reservations'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MyReservationController::index
 * @see app/Http/Controllers/MyReservationController.php:33
 * @route '/my-reservations'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MyReservationController::index
 * @see app/Http/Controllers/MyReservationController.php:33
 * @route '/my-reservations'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MyReservationController::index
 * @see app/Http/Controllers/MyReservationController.php:33
 * @route '/my-reservations'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MyReservationController::index
 * @see app/Http/Controllers/MyReservationController.php:33
 * @route '/my-reservations'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MyReservationController::index
 * @see app/Http/Controllers/MyReservationController.php:33
 * @route '/my-reservations'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const myReservations = {
    index: Object.assign(index, index),
}

export default myReservations