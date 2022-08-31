const studentRP = require("../repository/studentRP");

const getStudent = function (studentId) {
  return studentRP.getStudent(studentId);
};
const createNewStudent = async function (
  studentId,
  age,
  fname,
  lname,
  profession
) {
  return studentRP.createNewStudent(studentId, age, fname, lname, profession);
};
const getAllStudents = async () => {
  return await studentRP.getAllStudents();
};
const deleteStudent = async function (studentId) {
  await studentRP.deleteStudent(studentId);
};

// const addClassIdToStudentsList = async function (students) {
//   return await studentRP.addClassIdToStudentsList(students);
// };

const mongoTest = async () => {
  return await studentRP.mongoTest();
};

module.exports = {
  getStudent,
  createNewStudent,
  getAllStudents,
  deleteStudent,
  // addClassIdToStudentsList,
  mongoTest,
};
