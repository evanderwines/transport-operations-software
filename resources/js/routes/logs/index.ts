import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\SystemLogController::index
 * @see app/Http/Controllers/SystemLogController.php:11
 * @route '/logs'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SystemLogController::index
 * @see app/Http/Controllers/SystemLogController.php:11
 * @route '/logs'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SystemLogController::index
 * @see app/Http/Controllers/SystemLogController.php:11
 * @route '/logs'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SystemLogController::index
 * @see app/Http/Controllers/SystemLogController.php:11
 * @route '/logs'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const logs = {
    index: Object.assign(index, index),
}

export default logs