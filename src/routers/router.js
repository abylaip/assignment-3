const express = require("express");
const data = require("../data/2024-spring-student-info.json");
const getUserInfo = require("../utils/getUserInfo");
const router = express.Router();

// route that returns all data from json
router.get("/", (req, res) => {
  const { ip_address, user_device } = getUserInfo(req);
  return res.json({ ip_address: ip_address, device: user_device, data: data });
});

// route that returns information about student which has same student id as student_id in request body
router.post("/", (req, res) => {
  const { ip_address, user_device } = getUserInfo(req);
  const { student_id } = req.body;
  const student = data.find((student) => student.student_id === student_id);

  return res.json({
    ip_address: ip_address,
    user_device: user_device,
    data: student,
  });
});

// route that returns studentids of all student who has CS548
router.post("/CS548", (req, res) => {
  const { ip_address, user_device } = getUserInfo(req);

  const students = data.filter((student) =>
    student.courses.some((course) => course.course_id === "CS548")
  );
  const studentIds = students.map((student) => student.student_id);
  res.json({
    ip_address: ip_address,
    user_device: user_device,
    data: studentIds,
  });
});

// route that returns all students and their ids who has same course as student in request body except CS548
router.post("/except", (req, res) => {
  const { ip_address, user_device } = getUserInfo(req);
  const { student_id } = req.body;

  const requestingStudent = data.find(
    (student) => student.student_id === student_id
  );
  const courseIds = requestingStudent.courses
    .filter((course) => course.course_id !== "CS548")
    .map((course) => course.course_id);

  const similarStudents = data.filter(
    (student) =>
      student.student_id !== student_id &&
      student.courses.some((course) => courseIds.includes(course.course_id))
  );

  const similarStudentIds = similarStudents.map(
    (student) => student.student_id
  );

  res.json({
    ip_address,
    user_device,
    data: { students: similarStudents, student_ids: similarStudentIds },
  });
});

module.exports = router;
