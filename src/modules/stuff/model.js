import query from './sql.js'
import db from '#pg'

async function getStuffs() {
    return await db(
        query.GET_STUFFS,
    )
}

async function getStuff({ stuff_id }) {
    const [ stuff ] = await db(query.GET_STUFF, stuff_id)
    return stuff
}
async function addTransPer(stuff_id){
    const permission = await db(query.ADD_TRANS_PER, stuff_id)
    return permission
}
async function addBranchPer(stuff_id){
    const permission = await db(query.ADD_BRANCH_PER, stuff_id)
    return permission
}

async function transPer(stuff_id){
    const permission = await db(query.TRANS_PER, stuff_id)
    return permission
}
async function branchPer(stuff_id){
    const permission = await db(query.BRANCH_PER, stuff_id)
    return permission
}

async function updateBranchPer(create_branch, delete_branch, read_branch, update_branch, stuff_id){
    const permission = await db(query.UPDATE_BRANCH_PER, create_branch, delete_branch, read_branch, update_branch, stuff_id)
    return permission
}
async function updateTransportPer(){
    const permission = await db(query.UPDATE_TRANSPORT_PER, stuff_id)
    return permission
}


async function loginStuff( username, password ) {
    const stuff = await db(query.LOGIN_STUFF, username, password)
    return stuff
}
async function registerStuff( username, password, birth_date, gender, branch_id ) {
    const stuff = await db(query.REGISTER_STUFF, username, password, birth_date, gender, branch_id)
    return stuff
}

export default {
    getStuff,
    getStuffs,
    loginStuff,
    registerStuff,
    addTransPer,
    addBranchPer,
    transPer,
    branchPer,
    updateBranchPer,
    updateTransportPer
}