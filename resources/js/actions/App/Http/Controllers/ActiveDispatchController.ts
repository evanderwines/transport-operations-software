import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ActiveDispatchController::index
 * @see app/Http/Controllers/ActiveDispatchController.php:11
 * @route '/active-dispatches'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/active-dispatches',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ActiveDispatchController::index
 * @see app/Http/Controllers/ActiveDispatchController.php:11
 * @route '/active-dispatches'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ActiveDispatchController::index
 * @see app/Http/Controllers/ActiveDispatchController.php:11
 * @route '/active-dispatches'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ActiveDispatchController::index
 * @see app/Http/Controllers/ActiveDispatchController.php:11
 * @route '/active-dispatches'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ActiveDispatchController::show
 * @see app/Http/Controllers/ActiveDispatchController.php:57
 * @route '/active-dispatches/{selectedDispatch}'
 */
export const show = (args: { selectedDispatch: string | number } | [selectedDispatch: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/active-dispatches/{selectedDispatch}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ActiveDispatchController::show
 * @see app/Http/Controllers/ActiveDispatchController.php:57
 * @route '/active-dispatches/{selectedDispatch}'
 */
show.url = (args: { selectedDispatch: string | number } | [selectedDispatch: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { selectedDispatch: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    selectedDispatch: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        selectedDispatch: args.selectedDispatch,
                }

    return show.definition.url
            .replace('{selectedDispatch}', parsedArgs.selectedDispatch.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ActiveDispatchController::show
 * @see app/Http/Controllers/ActiveDispatchController.php:57
 * @route '/active-dispatches/{selectedDispatch}'
 */
show.get = (args: { selectedDispatch: string | number } | [selectedDispatch: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ActiveDispatchController::show
 * @see app/Http/Controllers/ActiveDispatchController.php:57
 * @route '/active-dispatches/{selectedDispatch}'
 */
show.head = (args: { selectedDispatch: string | number } | [selectedDispatch: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})
const ActiveDispatchController = { index, show }

export default ActiveDispatchController