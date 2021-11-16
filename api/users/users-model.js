const db = require("./../data/db-config")

async function findAll(){
    const users = await db("users as u")
    .select("u.user_id", "u.username", "ur.role_type")
    .leftJoin("user_role as ur", "u.role_id", "ur.role_id")
    .orderBy("u.user_id")

    return users
}

async function findBy(filter){
    const user = await db("users")
    .select("u.user_id", "u.username", "u.password", "ur.role_type")
    .leftJoin("user_role as ur", "u.role_id", "ur.role_id")
    .where(filter)

    return user[0]
}

// SELECT u.user_id, u.username, u.password, ur.role_type 
// from users as u
// left join user_role as ur 
// on u.role_id = ur.role_id

module.exports = {
    findAll,
    findBy
}
