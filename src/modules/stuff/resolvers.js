import { UserInputError } from 'apollo-server-express'
import { STUFF_CONFIG } from '#config/index'
import model from './model.js'
import stuffModel from '../stuff/model.js'
import JWT from '../../helpers/jwt.js'
import sha256 from 'sha256'

export default {
    Query: {
        stuffs: async (_, { pagination, search, sort }, {token}) => {
            console.log("Token: ", token)
            const sortKey = Object.keys(sort || {})[0]
            return await model.getStuffs()
        },

        stuff: async (_, args) => {
            return await model.getStuff(args)
        }
    },
    Mutation: {
        login: async (_, args, {agent, ipp}) => {
            let {username, password} = args

            username = username.trim()
            password = password.trim()

            let stuff = await model.loginStuff(username, password)
            if(stuff.length == 0){
                return {
                    status: 400,
                    message: "Wrong Username or Password",
                    data: null
                }
            }
            return {
                status: 200,
                message: "Succesfully logged in!",
                token: JWT.sign({stuff_id: stuff[0].stuff_id, agent, ipp,branch_id: stuff[0].branch_id, username: stuff[0].username, }),
                data: stuff[0]
            }

        },
        register: async(_, args, { agent, ip }) => {
            let { username, password, confirmPassword, gender, birth_date, branch_id } = args

            let stuffs = await model.getStuffs()
            console.log("test: ", stuffs)

            console.log(username, password, confirmPassword, birth_date, gender, branch_id)

            username = username.trim()
            password = password.trim()
            confirmPassword = confirmPassword.trim()

            if (!username ||
                username.username > 50
            ) {
                throw new Error("The username cannot be empty! Please check username field")
            }

            if ((!password || password.length < 6 ||
                password.length > 50) ||
                (!confirmPassword || confirmPassword.length < 6 ||
                    confirmPassword.length > 50
                ) || password !== confirmPassword
            ) {
                throw new Error("Invalid password!")
            }
            if(gender != 'male' && gender != 'female'){
                throw new Error("Invalid Gender, Gender must be male or female")
            }

            let stuff = await model.registerStuff(username, sha256(password), birth_date, gender, branch_id)
            stuff = stuff[0]
            console.log( stuff.stuff_id, agent, ip,stuff.username,stuff.branch_id )

            console.log(await model.addBranchPer(stuff.stuff_id))
            console.log(await model.addTransPer(stuff.stuff_id))

            return {
                status: 201,
                message: "The stuff succesfully logged in",
                token: JWT.sign({ stuff_id: stuff.stuff_id, agent, ip, username: stuff.username, branch_id: stuff.branch_id }),
                data: stuff
            }
        },
        changeBranchPermission: async (_, args) => {
            const {stuff_id,giving_permissions_to_stuff_id, create_branch, delete_branch, read_branch, update_branch} = args

            let b = await model.branchPer(stuff_id)
            let t = await model.transPer(stuff_id)
            b = b[0]
            t = t[0]
            let son = 0
            for(let i in t){
                if(t[i] === true){
                    son += 1
                }
            }
            for(let i in b){
                if(b[i] === true){
                    son += 1
                }
            }
            if(son != 8){
                return {
                    status: 400,
                    message: "You have not permission to give permission"
                }
            }
            await model.updateBranchPer (create_branch, delete_branch, read_branch, update_branch, giving_permissions_to_stuff_id)

            
            return {
                status: 201,
                message: "Permission given!!",
            }
        },
        changeTransportPermission: async (_, args) => {
            const {stuff_id,giving_permissions_to_stuff_id, create_transport, delete_transport, read_transport, update_transport} = args

            let b = await model.branchPer(stuff_id)
            let t = await model.transPer(stuff_id)
            b = b[0]
            t = t[0]
            let son = 0
            for(let i in t){
                if(t[i] === true){
                    son += 1
                }
            }
            for(let i in b){
                if(b[i] === true){
                    son += 1
                }
            }
            if(son != 8){
                return {
                    status: 400,
                    message: "You have not permission to give permission"
                }
            }
            await model.updateTransportPer (create_branch, delete_branch, read_branch, update_branch, giving_permissions_to_stuff_id)

            
            return {
                status: 201,
                message: "Permission given!!",
            }
        }
    }

}