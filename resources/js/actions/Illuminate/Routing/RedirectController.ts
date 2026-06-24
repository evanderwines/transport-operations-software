import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
const RedirectController4b87d2df7e3aa853f6720faea796e36c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'get',
})

RedirectController4b87d2df7e3aa853f6720faea796e36c.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/settings',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.url = (options?: RouteQueryOptions) => {
    return RedirectController4b87d2df7e3aa853f6720faea796e36c.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'head',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'post',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'put',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'patch',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'delete',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'options',
})

    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
    const RedirectController4b87d2df7e3aa853f6720faea796e36cForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'OPTIONS',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    RedirectController4b87d2df7e3aa853f6720faea796e36c.form = RedirectController4b87d2df7e3aa853f6720faea796e36cForm
    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/users'
 */
const RedirectController6e8299a085c11017e62ab420951fb27c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController6e8299a085c11017e62ab420951fb27c.url(options),
    method: 'get',
})

RedirectController6e8299a085c11017e62ab420951fb27c.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/users',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/users'
 */
RedirectController6e8299a085c11017e62ab420951fb27c.url = (options?: RouteQueryOptions) => {
    return RedirectController6e8299a085c11017e62ab420951fb27c.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/users'
 */
RedirectController6e8299a085c11017e62ab420951fb27c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController6e8299a085c11017e62ab420951fb27c.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/users'
 */
RedirectController6e8299a085c11017e62ab420951fb27c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectController6e8299a085c11017e62ab420951fb27c.url(options),
    method: 'head',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/users'
 */
RedirectController6e8299a085c11017e62ab420951fb27c.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectController6e8299a085c11017e62ab420951fb27c.url(options),
    method: 'post',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/users'
 */
RedirectController6e8299a085c11017e62ab420951fb27c.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectController6e8299a085c11017e62ab420951fb27c.url(options),
    method: 'put',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/users'
 */
RedirectController6e8299a085c11017e62ab420951fb27c.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectController6e8299a085c11017e62ab420951fb27c.url(options),
    method: 'patch',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/users'
 */
RedirectController6e8299a085c11017e62ab420951fb27c.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectController6e8299a085c11017e62ab420951fb27c.url(options),
    method: 'delete',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/users'
 */
RedirectController6e8299a085c11017e62ab420951fb27c.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectController6e8299a085c11017e62ab420951fb27c.url(options),
    method: 'options',
})

    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/users'
 */
    const RedirectController6e8299a085c11017e62ab420951fb27cForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: RedirectController6e8299a085c11017e62ab420951fb27c.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/users'
 */
        RedirectController6e8299a085c11017e62ab420951fb27cForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController6e8299a085c11017e62ab420951fb27c.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/users'
 */
        RedirectController6e8299a085c11017e62ab420951fb27cForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController6e8299a085c11017e62ab420951fb27c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/users'
 */
        RedirectController6e8299a085c11017e62ab420951fb27cForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController6e8299a085c11017e62ab420951fb27c.url(options),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/users'
 */
        RedirectController6e8299a085c11017e62ab420951fb27cForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController6e8299a085c11017e62ab420951fb27c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/users'
 */
        RedirectController6e8299a085c11017e62ab420951fb27cForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController6e8299a085c11017e62ab420951fb27c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/users'
 */
        RedirectController6e8299a085c11017e62ab420951fb27cForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController6e8299a085c11017e62ab420951fb27c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/users'
 */
        RedirectController6e8299a085c11017e62ab420951fb27cForm.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController6e8299a085c11017e62ab420951fb27c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'OPTIONS',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    RedirectController6e8299a085c11017e62ab420951fb27c.form = RedirectController6e8299a085c11017e62ab420951fb27cForm
    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/reservations/create/select'
 */
const RedirectControllera05125cd24549b2f230f342be5389802 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectControllera05125cd24549b2f230f342be5389802.url(options),
    method: 'get',
})

RedirectControllera05125cd24549b2f230f342be5389802.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/reservations/create/select',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/reservations/create/select'
 */
RedirectControllera05125cd24549b2f230f342be5389802.url = (options?: RouteQueryOptions) => {
    return RedirectControllera05125cd24549b2f230f342be5389802.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/reservations/create/select'
 */
RedirectControllera05125cd24549b2f230f342be5389802.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectControllera05125cd24549b2f230f342be5389802.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/reservations/create/select'
 */
RedirectControllera05125cd24549b2f230f342be5389802.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectControllera05125cd24549b2f230f342be5389802.url(options),
    method: 'head',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/reservations/create/select'
 */
RedirectControllera05125cd24549b2f230f342be5389802.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectControllera05125cd24549b2f230f342be5389802.url(options),
    method: 'post',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/reservations/create/select'
 */
RedirectControllera05125cd24549b2f230f342be5389802.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectControllera05125cd24549b2f230f342be5389802.url(options),
    method: 'put',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/reservations/create/select'
 */
RedirectControllera05125cd24549b2f230f342be5389802.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectControllera05125cd24549b2f230f342be5389802.url(options),
    method: 'patch',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/reservations/create/select'
 */
RedirectControllera05125cd24549b2f230f342be5389802.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectControllera05125cd24549b2f230f342be5389802.url(options),
    method: 'delete',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/reservations/create/select'
 */
RedirectControllera05125cd24549b2f230f342be5389802.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectControllera05125cd24549b2f230f342be5389802.url(options),
    method: 'options',
})

    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/reservations/create/select'
 */
    const RedirectControllera05125cd24549b2f230f342be5389802Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: RedirectControllera05125cd24549b2f230f342be5389802.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/reservations/create/select'
 */
        RedirectControllera05125cd24549b2f230f342be5389802Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectControllera05125cd24549b2f230f342be5389802.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/reservations/create/select'
 */
        RedirectControllera05125cd24549b2f230f342be5389802Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectControllera05125cd24549b2f230f342be5389802.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/reservations/create/select'
 */
        RedirectControllera05125cd24549b2f230f342be5389802Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControllera05125cd24549b2f230f342be5389802.url(options),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/reservations/create/select'
 */
        RedirectControllera05125cd24549b2f230f342be5389802Form.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControllera05125cd24549b2f230f342be5389802.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/reservations/create/select'
 */
        RedirectControllera05125cd24549b2f230f342be5389802Form.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControllera05125cd24549b2f230f342be5389802.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/reservations/create/select'
 */
        RedirectControllera05125cd24549b2f230f342be5389802Form.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControllera05125cd24549b2f230f342be5389802.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/reservations/create/select'
 */
        RedirectControllera05125cd24549b2f230f342be5389802Form.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectControllera05125cd24549b2f230f342be5389802.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'OPTIONS',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    RedirectControllera05125cd24549b2f230f342be5389802.form = RedirectControllera05125cd24549b2f230f342be5389802Form
    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/fleet'
 */
const RedirectController6115b3fc826f8f5721297ff9da65115d = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController6115b3fc826f8f5721297ff9da65115d.url(options),
    method: 'get',
})

RedirectController6115b3fc826f8f5721297ff9da65115d.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/fleet',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/fleet'
 */
RedirectController6115b3fc826f8f5721297ff9da65115d.url = (options?: RouteQueryOptions) => {
    return RedirectController6115b3fc826f8f5721297ff9da65115d.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/fleet'
 */
RedirectController6115b3fc826f8f5721297ff9da65115d.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController6115b3fc826f8f5721297ff9da65115d.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/fleet'
 */
RedirectController6115b3fc826f8f5721297ff9da65115d.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectController6115b3fc826f8f5721297ff9da65115d.url(options),
    method: 'head',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/fleet'
 */
RedirectController6115b3fc826f8f5721297ff9da65115d.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectController6115b3fc826f8f5721297ff9da65115d.url(options),
    method: 'post',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/fleet'
 */
RedirectController6115b3fc826f8f5721297ff9da65115d.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectController6115b3fc826f8f5721297ff9da65115d.url(options),
    method: 'put',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/fleet'
 */
RedirectController6115b3fc826f8f5721297ff9da65115d.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectController6115b3fc826f8f5721297ff9da65115d.url(options),
    method: 'patch',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/fleet'
 */
RedirectController6115b3fc826f8f5721297ff9da65115d.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectController6115b3fc826f8f5721297ff9da65115d.url(options),
    method: 'delete',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/fleet'
 */
RedirectController6115b3fc826f8f5721297ff9da65115d.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectController6115b3fc826f8f5721297ff9da65115d.url(options),
    method: 'options',
})

    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/fleet'
 */
    const RedirectController6115b3fc826f8f5721297ff9da65115dForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: RedirectController6115b3fc826f8f5721297ff9da65115d.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/fleet'
 */
        RedirectController6115b3fc826f8f5721297ff9da65115dForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController6115b3fc826f8f5721297ff9da65115d.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/fleet'
 */
        RedirectController6115b3fc826f8f5721297ff9da65115dForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController6115b3fc826f8f5721297ff9da65115d.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/fleet'
 */
        RedirectController6115b3fc826f8f5721297ff9da65115dForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController6115b3fc826f8f5721297ff9da65115d.url(options),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/fleet'
 */
        RedirectController6115b3fc826f8f5721297ff9da65115dForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController6115b3fc826f8f5721297ff9da65115d.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/fleet'
 */
        RedirectController6115b3fc826f8f5721297ff9da65115dForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController6115b3fc826f8f5721297ff9da65115d.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/fleet'
 */
        RedirectController6115b3fc826f8f5721297ff9da65115dForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController6115b3fc826f8f5721297ff9da65115d.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/fleet'
 */
        RedirectController6115b3fc826f8f5721297ff9da65115dForm.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController6115b3fc826f8f5721297ff9da65115d.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'OPTIONS',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    RedirectController6115b3fc826f8f5721297ff9da65115d.form = RedirectController6115b3fc826f8f5721297ff9da65115dForm

const RedirectController = {
    '/settings': RedirectController4b87d2df7e3aa853f6720faea796e36c,
    '/users': RedirectController6e8299a085c11017e62ab420951fb27c,
    '/reservations/create/select': RedirectControllera05125cd24549b2f230f342be5389802,
    '/fleet': RedirectController6115b3fc826f8f5721297ff9da65115d,
}

export default RedirectController