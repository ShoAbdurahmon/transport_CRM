import host from "./helpers/getHost.js"
import queryParser from "./helpers/queryParser.js"
import JWT from "./helpers/jwt.js"
export default ({ req, res }) => {

    try {
        const { operation, fieldName, variables } = queryParser(req.body)

        const reqAgent = req.headers['user-agent']
        const TOKEN = req.headers.token
        const ipp = req.headers['x-forwarded-for'] || req.socket.remoteAddress


        if (["login", "register"].includes(fieldName)) {
            return {
                agent: reqAgent,
                ip: ipp
            }
        }

        if (!TOKEN) {
            throw new Error("User is un authorizate!")
        }
        const { agent, stuff_id, branch_id, ip  } = JWT.verify(TOKEN)
        console.log(agent, stuff_id, branch_id, ip)

        if (agent !== reqAgent) {
            throw new Error("Invalid Token")
        }

        return {
            host: `http://${host({ internal: false })}:${process.env.PORT}/`,
            token: req.headers.token,
            ip,
            agent,
            stuff_id,
            branch_id,
        }
    } catch (error) {
        throw error
    }
}
