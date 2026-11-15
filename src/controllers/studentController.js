import { getDB } from "../config/db.js";

// @desc    Add a new student
// @route   POST /api/students
export const addStudent = async (req, res) => {
  try {
    const db = getDB();
    const studentData = req.body;

    // Add a timestamp
    const newStudent = {
      ...studentData,
      createdAt: new Date(),
    };

    const result = await db.collection("students").insertOne(newStudent);

    res.status(201).json({
      success: true,
      message: "Student added successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Get all students (with optional class filtering)
// @route   GET /api/students
export const getStudents = async (req, res) => {
  try {
    const db = getDB();
    const { studentClass } = req.query; // e.g., /api/students?studentClass=10

    // If a class is provided in the URL, filter by it. Otherwise, get everyone.
    const query = studentClass ? { studentClass } : {};

    const students = await db.collection("students").find(query).toArray();

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
