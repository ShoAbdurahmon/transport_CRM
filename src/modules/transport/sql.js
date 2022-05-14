const GET_TRANSPORTS = `
    select
    * from
    transport
`

const GET_TRANSPORT = `
    select * from transport where transport_id = $1
`

export default {
    GET_TRANSPORTS,
    GET_TRANSPORT
}