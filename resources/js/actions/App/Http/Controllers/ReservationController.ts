import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ReservationController::index
 * @see app/Http/Controllers/ReservationController.php:85
 * @route '/reservations'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/reservations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservationController::index
 * @see app/Http/Controllers/ReservationController.php:85
 * @route '/reservations'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservationController::index
 * @see app/Http/Controllers/ReservationController.php:85
 * @route '/reservations'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservationController::index
 * @see app/Http/Controllers/ReservationController.php:85
 * @route '/reservations'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ReservationController::show
 * @see app/Http/Controllers/ReservationController.php:146
 * @route '/reservations/{reservation_id}'
 */
export const show = (args: { reservation_id: string | number } | [reservation_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/reservations/{reservation_id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservationController::show
 * @see app/Http/Controllers/ReservationController.php:146
 * @route '/reservations/{reservation_id}'
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
* @see \App\Http\Controllers\ReservationController::show
 * @see app/Http/Controllers/ReservationController.php:146
 * @route '/reservations/{reservation_id}'
 */
show.get = (args: { reservation_id: string | number } | [reservation_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservationController::show
 * @see app/Http/Controllers/ReservationController.php:146
 * @route '/reservations/{reservation_id}'
 */
show.head = (args: { reservation_id: string | number } | [reservation_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ReservationController::edit
 * @see app/Http/Controllers/ReservationController.php:161
 * @route '/reservations/{reservation_id}/edit'
 */
export const edit = (args: { reservation_id: string | number } | [reservation_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/reservations/{reservation_id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservationController::edit
 * @see app/Http/Controllers/ReservationController.php:161
 * @route '/reservations/{reservation_id}/edit'
 */
edit.url = (args: { reservation_id: string | number } | [reservation_id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{reservation_id}', parsedArgs.reservation_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservationController::edit
 * @see app/Http/Controllers/ReservationController.php:161
 * @route '/reservations/{reservation_id}/edit'
 */
edit.get = (args: { reservation_id: string | number } | [reservation_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservationController::edit
 * @see app/Http/Controllers/ReservationController.php:161
 * @route '/reservations/{reservation_id}/edit'
 */
edit.head = (args: { reservation_id: string | number } | [reservation_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ReservationController::editStep
 * @see app/Http/Controllers/ReservationController.php:243
 * @route '/reservations/{reservation_id}/edit/step/{step}'
 */
export const editStep = (args: { reservation_id: string | number, step: string | number } | [reservation_id: string | number, step: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editStep.url(args, options),
    method: 'get',
})

editStep.definition = {
    methods: ["get","head"],
    url: '/reservations/{reservation_id}/edit/step/{step}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservationController::editStep
 * @see app/Http/Controllers/ReservationController.php:243
 * @route '/reservations/{reservation_id}/edit/step/{step}'
 */
editStep.url = (args: { reservation_id: string | number, step: string | number } | [reservation_id: string | number, step: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    reservation_id: args[0],
                    step: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reservation_id: args.reservation_id,
                                step: args.step,
                }

    return editStep.definition.url
            .replace('{reservation_id}', parsedArgs.reservation_id.toString())
            .replace('{step}', parsedArgs.step.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservationController::editStep
 * @see app/Http/Controllers/ReservationController.php:243
 * @route '/reservations/{reservation_id}/edit/step/{step}'
 */
editStep.get = (args: { reservation_id: string | number, step: string | number } | [reservation_id: string | number, step: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editStep.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservationController::editStep
 * @see app/Http/Controllers/ReservationController.php:243
 * @route '/reservations/{reservation_id}/edit/step/{step}'
 */
editStep.head = (args: { reservation_id: string | number, step: string | number } | [reservation_id: string | number, step: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: editStep.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ReservationController::destroy
 * @see app/Http/Controllers/ReservationController.php:173
 * @route '/reservations/{reservation_id}'
 */
export const destroy = (args: { reservation_id: string | number } | [reservation_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/reservations/{reservation_id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ReservationController::destroy
 * @see app/Http/Controllers/ReservationController.php:173
 * @route '/reservations/{reservation_id}'
 */
destroy.url = (args: { reservation_id: string | number } | [reservation_id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{reservation_id}', parsedArgs.reservation_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservationController::destroy
 * @see app/Http/Controllers/ReservationController.php:173
 * @route '/reservations/{reservation_id}'
 */
destroy.delete = (args: { reservation_id: string | number } | [reservation_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ReservationController::step
 * @see app/Http/Controllers/ReservationController.php:211
 * @route '/reservations/create/step/{step}'
 */
export const step = (args: { step: string | number } | [step: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: step.url(args, options),
    method: 'get',
})

step.definition = {
    methods: ["get","head"],
    url: '/reservations/create/step/{step}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservationController::step
 * @see app/Http/Controllers/ReservationController.php:211
 * @route '/reservations/create/step/{step}'
 */
step.url = (args: { step: string | number } | [step: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { step: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    step: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        step: args.step,
                }

    return step.definition.url
            .replace('{step}', parsedArgs.step.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservationController::step
 * @see app/Http/Controllers/ReservationController.php:211
 * @route '/reservations/create/step/{step}'
 */
step.get = (args: { step: string | number } | [step: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: step.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservationController::step
 * @see app/Http/Controllers/ReservationController.php:211
 * @route '/reservations/create/step/{step}'
 */
step.head = (args: { step: string | number } | [step: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: step.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ReservationController::processStep1
 * @see app/Http/Controllers/ReservationController.php:362
 * @route '/reservations/create/processStep1'
 */
export const processStep1 = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: processStep1.url(options),
    method: 'patch',
})

processStep1.definition = {
    methods: ["patch"],
    url: '/reservations/create/processStep1',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\ReservationController::processStep1
 * @see app/Http/Controllers/ReservationController.php:362
 * @route '/reservations/create/processStep1'
 */
processStep1.url = (options?: RouteQueryOptions) => {
    return processStep1.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservationController::processStep1
 * @see app/Http/Controllers/ReservationController.php:362
 * @route '/reservations/create/processStep1'
 */
processStep1.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: processStep1.url(options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ReservationController::processStep2
 * @see app/Http/Controllers/ReservationController.php:374
 * @route '/reservations/create/processStep2'
 */
export const processStep2 = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: processStep2.url(options),
    method: 'patch',
})

processStep2.definition = {
    methods: ["patch"],
    url: '/reservations/create/processStep2',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\ReservationController::processStep2
 * @see app/Http/Controllers/ReservationController.php:374
 * @route '/reservations/create/processStep2'
 */
processStep2.url = (options?: RouteQueryOptions) => {
    return processStep2.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservationController::processStep2
 * @see app/Http/Controllers/ReservationController.php:374
 * @route '/reservations/create/processStep2'
 */
processStep2.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: processStep2.url(options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ReservationController::processStep3
 * @see app/Http/Controllers/ReservationController.php:385
 * @route '/reservations/create/processStep3'
 */
export const processStep3 = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: processStep3.url(options),
    method: 'patch',
})

processStep3.definition = {
    methods: ["patch"],
    url: '/reservations/create/processStep3',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\ReservationController::processStep3
 * @see app/Http/Controllers/ReservationController.php:385
 * @route '/reservations/create/processStep3'
 */
processStep3.url = (options?: RouteQueryOptions) => {
    return processStep3.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservationController::processStep3
 * @see app/Http/Controllers/ReservationController.php:385
 * @route '/reservations/create/processStep3'
 */
processStep3.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: processStep3.url(options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ReservationController::processStep4
 * @see app/Http/Controllers/ReservationController.php:396
 * @route '/reservations/create/processStep4'
 */
export const processStep4 = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: processStep4.url(options),
    method: 'patch',
})

processStep4.definition = {
    methods: ["patch"],
    url: '/reservations/create/processStep4',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\ReservationController::processStep4
 * @see app/Http/Controllers/ReservationController.php:396
 * @route '/reservations/create/processStep4'
 */
processStep4.url = (options?: RouteQueryOptions) => {
    return processStep4.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservationController::processStep4
 * @see app/Http/Controllers/ReservationController.php:396
 * @route '/reservations/create/processStep4'
 */
processStep4.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: processStep4.url(options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ReservationController::processStep5
 * @see app/Http/Controllers/ReservationController.php:412
 * @route '/reservations/create/processStep5'
 */
export const processStep5 = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: processStep5.url(options),
    method: 'patch',
})

processStep5.definition = {
    methods: ["patch"],
    url: '/reservations/create/processStep5',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\ReservationController::processStep5
 * @see app/Http/Controllers/ReservationController.php:412
 * @route '/reservations/create/processStep5'
 */
processStep5.url = (options?: RouteQueryOptions) => {
    return processStep5.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservationController::processStep5
 * @see app/Http/Controllers/ReservationController.php:412
 * @route '/reservations/create/processStep5'
 */
processStep5.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: processStep5.url(options),
    method: 'patch',
})
const ReservationController = { index, show, edit, editStep, destroy, step, processStep1, processStep2, processStep3, processStep4, processStep5 }

export default ReservationController