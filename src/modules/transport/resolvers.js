import { UserInputError } from 'apollo-server-express'
import { STUFF_CONFIG } from '#config/index'
import model from './model.js'

export default {
    Query: {
        transports: async (_, { pagination, search, sort }) => {
            const sortKey = Object.keys(sort || {})[0]

            return await model.getTransports({
               
            })
        },

        transport: async (_, args) => {
            return await model.getTransport(args)
        }
    },
    // Mutation: {
    //     login: {

    //     },
    //     register: {

    //     }
    // }

    
}