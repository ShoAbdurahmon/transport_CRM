import { makeExecutableSchema } from '@graphql-tools/schema'

import TypesModule from './types/index.js'
import StuffModule from './stuff/index.js'
import TransportModule from './transport/index.js'
import BranchModule from './branch/index.js'

export default makeExecutableSchema({
    typeDefs: [
        TypesModule.typeDefs,
        StuffModule.typeDefs,
        TransportModule.typeDefs,
        BranchModule.typeDefs
    ],
    resolvers: [
        TypesModule.resolvers,
        StuffModule.resolvers,
        TransportModule.resolvers,
        BranchModule.resolvers
    ]
})