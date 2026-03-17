import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\UserController::customer
 * @see app/Http/Controllers/UserController.php:17
 * @route '/users/customer'
 */
export const customer = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: customer.url(options),
    method: 'get',
})

customer.definition = {
    methods: ["get","head"],
    url: '/users/customer',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::customer
 * @see app/Http/Controllers/UserController.php:17
 * @route '/users/customer'
 */
customer.url = (options?: RouteQueryOptions) => {
    return customer.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::customer
 * @see app/Http/Controllers/UserController.php:17
 * @route '/users/customer'
 */
customer.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: customer.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserController::customer
 * @see app/Http/Controllers/UserController.php:17
 * @route '/users/customer'
 */
customer.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: customer.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserController::driver
 * @see app/Http/Controllers/UserController.php:39
 * @route '/users/driver'
 */
export const driver = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: driver.url(options),
    method: 'get',
})

driver.definition = {
    methods: ["get","head"],
    url: '/users/driver',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::driver
 * @see app/Http/Controllers/UserController.php:39
 * @route '/users/driver'
 */
driver.url = (options?: RouteQueryOptions) => {
    return driver.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::driver
 * @see app/Http/Controllers/UserController.php:39
 * @route '/users/driver'
 */
driver.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: driver.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserController::driver
 * @see app/Http/Controllers/UserController.php:39
 * @route '/users/driver'
 */
driver.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: driver.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserController::admin
 * @see app/Http/Controllers/UserController.php:61
 * @route '/users/admin'
 */
export const admin = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: admin.url(options),
    method: 'get',
})

admin.definition = {
    methods: ["get","head"],
    url: '/users/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::admin
 * @see app/Http/Controllers/UserController.php:61
 * @route '/users/admin'
 */
admin.url = (options?: RouteQueryOptions) => {
    return admin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::admin
 * @see app/Http/Controllers/UserController.php:61
 * @route '/users/admin'
 */
admin.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: admin.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserController::admin
 * @see app/Http/Controllers/UserController.php:61
 * @route '/users/admin'
 */
admin.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: admin.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserController::show
 * @see app/Http/Controllers/UserController.php:83
 * @route '/users/{user}'
 */
export const show = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/users/{user}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::show
 * @see app/Http/Controllers/UserController.php:83
 * @route '/users/{user}'
 */
show.url = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return show.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::show
 * @see app/Http/Controllers/UserController.php:83
 * @route '/users/{user}'
 */
show.get = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserController::show
 * @see app/Http/Controllers/UserController.php:83
 * @route '/users/{user}'
 */
show.head = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserController::create
 * @see app/Http/Controllers/UserController.php:88
 * @route '/users/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(options),
    method: 'post',
})

create.definition = {
    methods: ["post"],
    url: '/users/create',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserController::create
 * @see app/Http/Controllers/UserController.php:88
 * @route '/users/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::create
 * @see app/Http/Controllers/UserController.php:88
 * @route '/users/create'
 */
create.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserController::update
 * @see app/Http/Controllers/UserController.php:121
 * @route '/users/update/{user}'
 */
export const update = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/users/update/{user}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\UserController::update
 * @see app/Http/Controllers/UserController.php:121
 * @route '/users/update/{user}'
 */
update.url = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return update.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::update
 * @see app/Http/Controllers/UserController.php:121
 * @route '/users/update/{user}'
 */
update.patch = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\UserController::destroy
 * @see app/Http/Controllers/UserController.php:148
 * @route '/users/{user}'
 */
export const destroy = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/users/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\UserController::destroy
 * @see app/Http/Controllers/UserController.php:148
 * @route '/users/{user}'
 */
destroy.url = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return destroy.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::destroy
 * @see app/Http/Controllers/UserController.php:148
 * @route '/users/{user}'
 */
destroy.delete = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const UserController = { customer, driver, admin, show, create, update, destroy }

export default UserController