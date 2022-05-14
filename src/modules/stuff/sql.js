const GET_STUFFS = `
select
*
from 
stuff
;
`

const GET_STUFF = `
    select * from stuff where stuff_id = $1
`

const LOGIN_STUFF = `
select
*
from stuff
where username = $1 and password = $2
;
`

const REGISTER_STUFF = `
    insert into stuff (username, password, birth_date, gender, branch_id) values
    ($1, $2, $3, $4, $5)
    returning *
    ;
`

const ADD_TRANS_PER = `
insert into transport_permission (stuff_id) values
($1)
returning * ;
`
const ADD_BRANCH_PER = `
insert into branch_permission (stuff_id) values
($1)
returning * ;
`
const TRANS_PER = `
select * from transport_permission
where stuff_id = $1;
`
const BRANCH_PER = `
select * from branch_permission
where stuff_id = $1;
`
const UPDATE_BRANCH_PER = `
update branch_permission set
branch_create = $1,
branch_delete = $2,
branch_update = $3,
branch_read = $4
where stuff_id = $5
returning * ;
`
const UPDATE_TRANSPORT_PER = `
update transport_permission set
transport_create = $1,
transport_delete = $2,
transport_update = $3,
transport_read = $4
where stuff_id = $5
returning * ;
`

export default {
    GET_STUFFS,
    GET_STUFF,
    LOGIN_STUFF,
    REGISTER_STUFF,
    ADD_TRANS_PER,
    ADD_BRANCH_PER,
    TRANS_PER,
    BRANCH_PER,
    UPDATE_BRANCH_PER,
    UPDATE_TRANSPORT_PER
}
