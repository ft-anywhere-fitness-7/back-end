const db = require("./../data/db-config")

async function findAll() {
    const classes = db()
}
SELECT 
c.class_id, c.class_name, c.class_duration, c.max_class_size, c.class_date, c.start_time, c.class_location, u.username as instructor, ci.intensity_level, ct.type_description as class_type
from classes as c
join users as u
on c.class_instructor = u.user_id
join class_intensity as ci
on c.intensity_id = ci.intensity_id
join class_type as ct
on c.type_id = ct.type_id


select cs.class_id, count(cs.student_id) as number_registered
from classes_students as cs
group by cs.class_id
order by cs.class_id
