// const classRP = require("../repository/classRP");
const mongoose = require("mongoose");

const Students = mongoose.model(
  "Students",
  new mongoose.Schema({
    studentId: Number,
    firstName: String,
    lastName: String,
    age: Number,
    profession: String,
  }),
  "Students"
);
const getStudents = async function (studentId) {
  try {
    const foundStudents = await Students.find({
      studentId: { $in: studentId },
    }).lean();
    return foundStudents;
  } catch (err) {
    console.log(err);
  }
};
const getStudent = async function (studentId) {
  try {
    const foundStudent = await Students.find({
      studentId: studentId,
    }).lean();
    return foundStudent;
  } catch (err) {
    console.log(err);
  }
};
const createNewStudent = async function (
  studentId,
  age,
  fname,
  lname,
  profession
) {
  try {
    const result = await Students.create({
      studentId: studentId,
      age: age,
      firstName: fname,
      lastName: lname,
      profession: profession,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
const getAllStudents = async function () {
  try {
    // const foundStudents = await Students.find({}).lean();

    const foundStudents = await Students.aggregate([
      { $match: {} },
      {
        $lookup: {
          from: "Classes",
          localField: "studentId",
          foreignField: "studentId",
          as: "classes",
        },
      },
    ]);

    return foundStudents;
    // const res = [];
    // foundStudents.forEach(async (student) => {
    //   const foundClass = await classRP.findStudentClass(student.studentId);
    //   res.push({ ...student, classId: foundClass?.classId });
    // });
    // const res = foundStudents.map(async (student) => {
    //   const foundClass = await classRP.findStudentClass(student.studentId);
    //   // foundClass
    //   //   ? (student.classId = foundClass.classId)
    //   //   : (student.classId = 0);
    //   return student;
    // student.classId = inx;
    // });

    return res;
  } catch (err) {
    console.log(err);
  }
};

const deleteStudent = async function (studentId) {
  await Students.deleteOne({ studentId: studentId }).lean();
};

// const addClassIdToStudentsList = async function (students) {
//   students.map(async (student, inx) => {
//     // student.classId = 2;
//     // const a = await classRP.findStudentClass(student.studentId);
//     // let x;
//     // if (a) {
//     // return { ...student, "student.classId": a.classId };
//     // } else {
//     student.classId2 = inx;
//     // }
//   });
//   return students;
// };

const mongoTestStudents = () => {
  // const foundItems = await Students.aggregate([
  //   {
  //     $match: {},
  //   },
  // ]);
  return 1;
};
const mongoTest = async () => {
  const aa = await Students.aggregate([
    { $match: {} },
    {
      $lookup: {
        from: "Classes",
        localField: "studentId",
        foreignField: "studentId",
        as: "classes",
      },
    },
  ]);
  return aa;
};

module.exports = {
  getStudents,
  getStudent,
  createNewStudent,
  getAllStudents,
  deleteStudent,
  // addClassIdToStudentsList,
  mongoTestStudents,
  mongoTest,
};
