var cors = require("cors");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const classBL = require("./bl/classBL");
const studentBL = require("./bl/studentBL");

const app = express();
app.use(cors());
app.use(express.static("public"));
mongoose.connect(
  "mongodb+srv://nadavbarak:aloniyo@cluster0.rnl9j.mongodb.net/shobClass"
);
// mongoose.connect("mongodb://localhost:27017/shobClass");

app.get("/mongo", async function (req, res) {
  // const classList = await classBL.mongoTest();
  const classList = await studentBL.mongoTest();
  res.json(classList);
});

app.get("/classes", async function (req, res) {
  const classList = await classBL.getClasses();
  res.json(classList);
});
app.get("/classStudents/:classId", async function (req, res) {
  const studentsForClass = await classBL.findStudentsForClass(
    req.params.classId
  );
  res.json(studentsForClass);
});
app.get("/classOfStudent/:studentId", async function (req, res) {
  const studentsForClass = await classBL.findStudentClass(req.params.studentId);
  res.json(studentsForClass);
});
app.get("/class/:classId", async function (req, res) {
  const classData = await classBL.getClass(req.params.classId);
  res.json(classData);
});
app.get("/student/:studentId", async function (req, res) {
  const studentData = await studentBL.getStudent(req.params.studentId);
  res.json(studentData);
});
app.get("/allStudents", async function (req, res) {
  const studentsData = await studentBL.getAllStudents();
  // classBL.findStudentClass(3);
  // const ccc = studentsData.map((sData) => {
  //   return { classId: 3 };
  // });
  // const studentsDataWithClassId = await classBL.addClassIdToStudentsList(
  //   studentsData
  // );
  res.json(studentsData);
});
app.get("/test/:studentId", async function (req, res) {
  const result = await classBL.deleteStudentfromClass(req.params.studentId);
  res.json(result);
});
app.delete(
  "/deleteStudentFromClass/:classId/:studentId",
  async function (req, res) {
    const a = req.params.studentId;
    await classBL.deleteStudentFromClass(
      req.params.classId,
      req.params.studentId
    );
    const studentsForClass = await classBL.findStudentsForClass(
      req.params.classId
    );
    res.json(studentsForClass);
  }
);
app.delete("/deleteClass/:classId", async function (req, res) {
  await classBL.deleteClass(req.params.classId);
  const classList = await classBL.getClasses();
  res.json(classList);
});
app.delete("/deleteStudent/:studentId", async function (req, res) {
  await classBL.deleteStudent(req.params.studentId);
  await studentBL.deleteStudent(req.params.studentId);
  const studentsData = await studentBL.getAllStudents();
  res.json(studentsData);
});
app.put(
  "/newStudent/:studentId/:age/:fname/:lname/:profession",
  async function (req, res) {
    const result = await studentBL.createNewStudent(
      req.params.studentId,
      req.params.age,
      req.params.fname,
      req.params.lname,
      req.params.profession
    );
    res.json({ result: result });
  }
);
app.put(
  "/newClass/:classId/:seatsInClass/:className",
  async function (req, res) {
    const result = await classBL.createNewClass(
      req.params.classId,
      req.params.className,
      req.params.seatsInClass
    );
    res.json({ result: result });
  }
);
app.put("/assignStudentToClass/:classId/:studentId", async function (req, res) {
  const result = await classBL.assignStudentToClass(
    req.params.classId,
    req.params.studentId
  );
  res.json({ result: result });
});
app.listen("3002", function () {
  console.log("server running of port 3000");
});
