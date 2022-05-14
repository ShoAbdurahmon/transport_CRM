import query from './sql.js'
import db from '#pg'

async function getBranches({ page, limit, search, sortKey, sortValue }) {
    return await db(
        query.GET_BRANCHES,
    )
}

async function getBranch( branch_id ) {
    const branch = await db(query.GET_BRANCH, branch_id)
    return branch
}

async function addBranch(branch_name, branch_address) {
    const branch = await db(query.ADD_BRANCH, branch_name, branch_address)
    return branch
}

async function updateBranch(branch_name, branch_address, branch_id) {
    const branch = await db(query.UPDATE_BRANCH, branch_name, branch_address, branch_id)
    return branch
}

async function deleteBranch(branch_id) {
    const branch = await db(query.DELETE_BRANCH, branch_id)
    return branch
}

export default {
    getBranch,
    getBranches,
    addBranch,
    updateBranch,
    deleteBranch
}