import query from './sql.js'
import db from '#pg'

async function getTransports({ page, limit, search, sortKey, sortValue }) {
    return await db(
        query.GET_TRANSPORTS,
    )
}

async function getTransport({ transport_id }) {
    const [ transport ] = await db(query.GET_TRANSPORT, transport_id)
    console.log(transport)
    return transport
}

export default {
    getTransports,
    getTransport
}