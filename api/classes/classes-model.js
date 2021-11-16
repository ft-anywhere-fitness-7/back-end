const db = require("./../data/db-config");

async function findAll() {
  const classes = await db("classes as c")
    .select(
      "c.class_id",
      "c.class_name",
      "c.class_duration",
      "c.max_class_size",
      "c.class_date",
      "c.start_time",
      "c.class_location",
      "u.username as instructor",
      "ci.intensity_level",
      "ct.type_description"
    )
    .leftJoin("users as u", "c.class_instructor", "u.user_id")
    .leftJoin("class_intensity as ci", "c.intensity_id", "ci.intensity_id")
    .leftJoin("class_type as ct", "c.type_id", "ct.type_id")
    .orderBy("c.class_id");

  const attendees = await db("classes_students as cs")
    .select("cs.class_id")
    .count("cs.student_id", { as: "number_registered" })
    .groupBy("cs.class_id");

  let finalClasses = classes.map((cl) => ({
    ...cl,
    ...attendees.find((reg) => reg.class_id === cl.class_id),
  }));
  finalClasses.forEach((cl) =>
    cl.number_registered
      ? (cl.number_registered = parseInt(cl.number_registered))
      : (cl.number_registered = 0)
  );

  return finalClasses;
}

async function findById(class_id) {
  const theClass = await db("classes as c")
    .select(
      "c.class_id",
      "c.class_name",
      "c.class_duration",
      "c.max_class_size",
      "c.class_date",
      "c.start_time",
      "c.class_location",
      "u.username as instructor",
      "ci.intensity_level",
      "ct.type_description"
    )
    .leftJoin("users as u", "c.class_instructor", "u.user_id")
    .leftJoin("class_intensity as ci", "c.intensity_id", "ci.intensity_id")
    .leftJoin("class_type as ct", "c.type_id", "ct.type_id")
    .where("c.class_id", class_id);

  const attendees = await db("classes_students as cs")
    .select("cs.class_id")
    .count("cs.student_id", { as: "number_registered" })
    .groupBy("cs.class_id")
    .where("cs.class_id", class_id);

  let finalClass = theClass.map((cl) => ({
    ...cl,
    ...attendees.find((reg) => reg.class_id === cl.class_id),
  }));
  finalClass.forEach((cl) =>
    cl.number_registered
      ? (cl.number_registered = parseInt(cl.number_registered))
      : (cl.number_registered = 0)
  );

  return finalClass[0];
}

async function findAttending(user_id) {
  const classes = await db("classes as c")
    .select(
      "c.class_id",
      "c.class_name",
      "c.class_duration",
      "c.max_class_size",
      "c.class_date",
      "c.start_time",
      "c.class_location",
      "u.username as instructor",
      "ci.intensity_level",
      "ct.type_description"
    )
    .leftJoin("users as u", "c.class_instructor", "u.user_id")
    .leftJoin("class_intensity as ci", "c.intensity_id", "ci.intensity_id")
    .leftJoin("class_type as ct", "c.type_id", "ct.type_id")
    .leftJoin("classes_students as cs", "c.class_id", "cs.class_id")
    .where("cs.student_id", user_id);

  return classes;
}

module.exports = { findAll, findById, findAttending };
