export const ADD_FILTER = 'ADD_FILTER'
export const REMOVE_FILTER = 'REMOVE_FILTER'

/**
 * 
 * @param {dataStructure/Filter} filter 
 */
export const addFilter = filter => ({
    type: ADD_FILTER,
    filter
})

export const removeFilter = id => ({
    type: REMOVE_FILTER,
    id
})
