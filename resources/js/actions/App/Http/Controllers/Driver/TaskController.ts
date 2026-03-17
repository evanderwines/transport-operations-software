import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Driver\TaskController::index
 * @see app/Http/Controllers/Driver/TaskController.php:18
 * @route '/tasks'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/tasks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Driver\TaskController::index
 * @see app/Http/Controllers/Driver/TaskController.php:18
 * @route '/tasks'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Driver\TaskController::index
 * @see app/Http/Controllers/Driver/TaskController.php:18
 * @route '/tasks'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Driver\TaskController::index
 * @see app/Http/Controllers/Driver/TaskController.php:18
 * @route '/tasks'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Driver\TaskController::show
 * @see app/Http/Controllers/Driver/TaskController.php:34
 * @route '/tasks/{reservation_id}'
 */
export const show = (args: { reservation_id: string | number } | [reservation_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/tasks/{reservation_id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Driver\TaskController::show
 * @see app/Http/Controllers/Driver/TaskController.php:34
 * @route '/tasks/{reservation_id}'
 */
show.url = (args: { reservation_id: string | number } | [reservation_id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reservation_id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    reservation_id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reservation_id: args.reservation_id,
                }

    return show.definition.url
            .replace('{reservation_id}', parsedArgs.reservation_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Driver\TaskController::show
 * @see app/Http/Controllers/Driver/TaskController.php:34
 * @route '/tasks/{reservation_id}'
 */
show.get = (args: { reservation_id: string | number } | [reservation_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Driver\TaskController::show
 * @see app/Http/Controllers/Driver/TaskController.php:34
 * @route '/tasks/{reservation_id}'
 */
show.head = (args: { reservation_id: string | number } | [reservation_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Driver\TaskController::update
 * @see app/Http/Controllers/Driver/TaskController.php:42
 * @route '/tasks/location'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/tasks/location',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Driver\TaskController::update
 * @see app/Http/Controllers/Driver/TaskController.php:42
 * @route '/tasks/location'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Driver\TaskController::update
 * @see app/Http/Controllers/Driver/TaskController.php:42
 * @route '/tasks/location'
 */
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Driver\TaskController::updateStatus
 * @see app/Http/Controllers/Driver/TaskController.php:63
 * @route '/tasks/{reservation_id}/status'
 */
export const updateStatus = (args: { reservation_id: string | number } | [reservation_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStatus.url(args, options),
    method: 'post',
})

updateStatus.definition = {
    methods: ["post"],
    url: '/tasks/{reservation_id}/status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Driver\TaskController::updateStatus
 * @see app/Http/Controllers/Driver/TaskController.php:63
 * @route '/tasks/{reservation_id}/status'
 */
updateStatus.url = (args: { reservation_id: string | number } | [reservation_id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reservation_id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    reservation_id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reservation_id: args.reservation_id,
                }

    return updateStatus.definition.url
            .replace('{reservation_id}', parsedArgs.reservation_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Driver\TaskController::updateStatus
 * @see app/Http/Controllers/Driver/TaskController.php:63
 * @route '/tasks/{reservation_id}/status'
 */
updateStatus.post = (args: { reservation_id: string | number } | [reservation_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStatus.url(args, options),
    method: 'post',
})
const TaskController = { index, show, update, updateStatus }

export default TaskController