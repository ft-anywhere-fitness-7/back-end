const db = require("./../data/db-config")

async function findAll() {
    const classes = await db("classes as c")
    .select("c.class_id", "c.class_name", "c.class_duration", "c.max_class_size", "c.class_date", "c.start_time", "c.class_location", "u.username as instructor", "ci.intensity_level", "ct.type_description")
    .leftJoin("users as u", "c.class_instructor", "u.user_id")
    .leftJoin("class_intensity as ci", "c.intensity_id", "ci.intensity_id")
    .leftJoin("class_type as ct", "c.type_id", "ct.type_id")
    .orderBy("c.class_id")

    const attendees = await db("classes_students as cs")
    .select("cs.class_id")
    .count("cs.student_id", {as: "number_registered"})
    .groupBy("cs.class_id")

    let finalClasses = classes.map(cl => ({...cl, ...attendees.find(reg => reg.class_id === cl.class_id)}))
    finalClasses.forEach(cl => cl.number_registered ? cl.number_registered =parseInt(cl.number_registered) : cl.number_registered = 0 )
    
    return finalClasses
}
// SELECT 
// c.class_id, c.class_name, c.class_duration, c.max_class_size, c.class_date, c.start_time, c.class_location, u.username as instructor, ci.intensity_level, ct.type_description as class_type
// from classes as c
// left join users as u
// on c.class_instructor = u.user_id
// left join class_intensity as ci
// on c.intensity_id = ci.intensity_id
// left join class_type as ct
// on c.type_id = ct.type_id
// order by c.class_id


// select cs.class_id, count(cs.student_id) as number_registered
// from classes_students as cs
// group by cs.class_id
// order by cs.class_id

async function findById(class_id){
    const theClass = await db("classes as c")
    .select("c.class_id", "c.class_name", "c.class_duration", "c.max_class_size", "c.class_date", "c.start_time", "c.class_location", "u.username as instructor", "ci.intensity_level", "ct.type_description")
    .leftJoin("users as u", "c.class_instructor", "u.user_id")
    .leftJoin("class_intensity as ci", "c.intensity_id", "ci.intensity_id")
    .leftJoin("class_type as ct", "c.type_id", "ct.type_id")
    .where('c.class_id', class_id)

    const attendees = await db("classes_students as cs")
    .select("cs.class_id")
    .count("cs.student_id", {as: "number_registered"})
    .groupBy("cs.class_id")
    .where('cs.class_id', class_id)

    let finalClass = theClass.map(cl => ({...cl, ...attendees.find(reg => reg.class_id === cl.class_id)}))
    finalClass.forEach(cl => cl.number_registered ? cl.number_registered =parseInt(cl.number_registered) : cl.number_registered = 0 )
    
    return finalClass[0]
}

module.exports = { findAll, findById }
