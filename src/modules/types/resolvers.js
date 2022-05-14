export default {
    SortOptions: {
        toLargest: 2,
        toSmallest: 1
    },
    Bool: {
        TRUE: true,
        FALSE: false
    },
    GlobalType: {
        __resolveType: object => {
            if (object.username) return 'Stuff'
            return null
        }
    }
}