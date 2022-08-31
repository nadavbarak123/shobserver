const classRP = require("../repository/classRP");

const deleteStudent = function (studentId) {
  classRP.deleteStudent(studentId);
};

const findStudentsForClass = function (classId) {
  return classRP.findStudentsForClass(classId);
};

const getClasses = async function () {
  return classRP.getClasses();
};

const deleteClass = async function (classId) {
  classRP.deleteClass(classId);
};

const getClass = async function (classId) {
  return classRP.getClass(classId);
};

const createNewClass = async function (classId, className, seatsInClass) {
  return await classRP.createNewClass(classId, className, seatsInClass);
};

const findStudentClass = async function (studentId) {
  return await classRP.findStudentClass(studentId);
};

const mongoTest = async function () {
  return await classRP.mongoTest();
};

const assignStudentToClass = async (classId, studentId) => {
  await classRP.assignStudentToClass(classId, studentId);
};

const addClassIdToStudentsList = async function (students) {
  await classRP.addClassIdToStudentsList(students);
  return students;
};

const deleteStudentFromClass = async function (classId, studentId) {
  await classRP.deleteStudentFromClass(classId, studentId);
  return;
};

module.exports = {
  deleteStudent,
  findStudentsForClass,
  getClasses,
  deleteClass,
  getClass,
  createNewClass,
  findStudentClass,
  mongoTest,
  assignStudentToClass,
  addClassIdToStudentsList,
  deleteStudentFromClass,
};
