import { UserInputError } from 'apollo-server-express'
import { BRANCH_CONFIG } from '#config/index'
import model from './model.js'
import stuffModel from '../stuff/model.js'


export default {
    Query: {
        branches: async (_, { pagination, search, sort }, { token }) => {
            const sortKey = Object.keys(sort || {})[0]
            console.log(token)
            
            return await model.getBranches({
                page: pagination?.page || BRANCH_CONFIG.PAGINATION.PAGE,
                limit: pagination?.limit || BRANCH_CONFIG.PAGINATION.LIMIT,
                sortValue: sort ? sort[sortKey] : null,
                sortKey,
                search,
            })
        },

        branch: async (_, args) => {
            let { branch_id } = args
            let branch = await model.getBranch(branch_id)
            if(!branch[0].length){
                return {
                    status: 400,
                    message: "Branch not found"
                }
            }
            return branch[0]
        }
    },
    Mutation: {
        addBranch: async (_ , args, {token}) => {
            const { branch_name, branch_address , stuff_id} = args
            console.log(branch_name, branch_address, stuff_id)


            let permissions = await stuffModel.branchPer(stuff_id)
            permissions = permissions[0]
            console.log(permissions.branch_create)

            if(permissions.branch_create == false){
                return {
                    status: 400,
                    message: "You have no permission to create branch"
                }
            }
            console.log(branch_name.trim() && branch_address.trim() && branch_name.length > 4 && branch_address.length > 4)
            if(branch_name.trim() && branch_address.trim() && branch_name.length > 4 && branch_address.length > 4){
                await model.addBranch(branch_name, branch_address)
            }else{
                return {
                    status: 400,
                    message: "Please enter data correctly"
                }
            }


            return {
                status: 200,
                message: "Branch Added Succesfully"
            }
        },
        changeBranch: async (_ , args, {token}) => {
            const { branch_id, branch_name, branch_address , stuff_id} = args


            let permissions = await stuffModel.branchPer(stuff_id)
            permissions = permissions[0]
            let branch = await model.getBranch(branch_id)
            if(!branch.length){
                return {
                    status: 400,
                    message: "Branch not found"
                    
                }
            }

            if(permissions.branch_update == false){
                return {
                    status: 400,
                    message: "You have no permission to create branch"
                }
            }
            

            if(branch_name.trim() && branch_address.trim() && branch_name.length > 4 && branch_address.length > 4){
                await model.updateBranch(branch_name, branch_address , branch_id)
            }


            return {
                status: 200,
                message: "Branch update Succesfully"
            }
        },
        deleteBranch: async (_ , args, {token}) => {
            const { branch_id , stuff_id} = args


            let permissions = await stuffModel.branchPer(stuff_id)
            permissions = permissions[0]

            if(permissions.branch_delete == false){
                return {
                    status: 400,
                    message: "You have no permission to create branch"
                }
            }

            let branch = await model.getBranch(branch_id)
            if(!branch.length){
                return {
                    status: 400,
                    message: "Branch not found"
                }
            }

            await model.deleteBranch(branch_id)


            return {
                status: 200,
                message: "Branch Added Succesfully"
            }
        }
        
    }

}
