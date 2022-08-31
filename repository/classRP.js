const mongoose = require("mongoose");
const studentRP = require("../repository/studentRP");

const Classes = mongoose.model(
  "Classes",
  new mongoose.Schema({
    classId: Number,
    className: String,
    seatsInClass: Number,
    availableSeats: Number,
    studentId: [Number],
  }),
  "Classes"
);

const deleteStudent = async function (studentId) {
  try {
    const a = await Classes.findOneAndUpdate(
      { classId: { $gt: 0 } },
      {
        $pull: { studentId: studentId },
      }
    ).lean();

    const students = await studentRP.getStudents(studentId);
    return students;
  } catch (err) {
    console.log(err);
  }
};
const deleteStudentFromClass = async function (classId, studentId) {
  try {
    const a = await Classes.findOneAndUpdate(
      { classId: classId },
      {
        $pull: { studentId: studentId },
      }
    ).lean();
  } catch (err) {
    console.log(err);
  }
};

const assignStudentToClass = async function (classId, studentId) {
  try {
    const a = await Classes.findOneAndUpdate(
      { classId: classId },
      {
        $push: { studentId: studentId },
      }
    ).lean();

    return;
  } catch (err) {
    console.log(err);
  }
};

const findStudentsForClass = async function (classId) {
  try {
    const foundClasses = await Classes.find({ classId: classId }).lean();
    // let foundStudents;
    const foundStudents = await studentRP.getStudents(
      foundClasses[0]?.studentId
    );
    return foundStudents;
  } catch (err) {
    console.log(err);
  }
};

const getClasses = async function () {
  try {
    const foundItems = await Classes.find({}).lean();
    return foundItems;
  } catch (err) {}
};

const deleteClass = async function (classId) {
  await Classes.deleteOne({ classId: classId }).lean();
};

const getClass = async function (classId) {
  try {
    const foundItem = await Classes.find({ classId: classId }).lean();
    return foundItem;
  } catch (err) {
    console.log(err);
  }
};

const createNewClass = async function (classId, className, seatsInClass) {
  try {
    const result = await Classes.create({
      classId: classId,
      className: className,
      seatsInClass: seatsInClass,
      studentId: [],
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const findStudentClass = async function (studentId) {
  return await Classes.findOne({
    // classId: { $gt: 0 },
    studentId: studentId,
  }).lean();
};

const addClassIdToStudentsList = async function (students) {
  students.map(async (student, inx) => {
    studentClass = await findStudentClass(student.studentId);
    student.classId = student.classId;
    return student;
  });
  return students;
};

const mongoTest = async function () {
  // const foundItems = await Classes.aggregate([
  //   {
  //     $match: {},
  //   },
  //   {
  //     $sort: { classId: 1 },
  //   },
  //   { $project: { _id: 0, className: 1, seatsInClass: 1 } },
  //   { $group: { _id: "$seatsInClass", classess: { $push: "$className" } } },
  // ]);

  // return foundItems;

  // const foundItems = studentRP.mongoTestStudents();
  const a = 3;
  const aa = await Classes.aggregate([{ $match: { studentId: a } }]);

  return foundItems;
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
