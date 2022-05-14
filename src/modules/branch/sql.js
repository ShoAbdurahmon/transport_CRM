const GET_BRANCHES = `
    select
    * from
    branch
`

const GET_BRANCH = `
    select * from branch where branch_id = $1
`

const ADD_BRANCH = `
insert into branch(branch_name, branch_address) values
($1, $2)
returning * ;`

const UPDATE_BRANCH = `
update branch set 
branch_name = $1,
branch_address = $2
where branch_id = $3
returning * ;`

const DELETE_BRANCH = `
delete from branch
where branch_id = $1
returning * ;`

export default {
    GET_BRANCHES,
    GET_BRANCH,
    ADD_BRANCH,
    UPDATE_BRANCH,
    DELETE_BRANCH,
}