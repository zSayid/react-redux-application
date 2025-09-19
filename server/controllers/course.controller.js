import Course from "../model/course.model.js";

export const getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

export const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json(course);
};

export const createCourse = async (req, res) => {
  const {
    Course_Name,
    Category,
    Duration,
    Enrolled_Students,
    Completion_Rate,
    Platform,
    Price,
    Rating,
  } = req.body;

  const course = await Course.create({
    Course_Name,
    Category,
    Duration,
    Enrolled_Students,
    Completion_Rate,
    Platform,
    Price,
    Rating,
  });
  await course.save();
  res.status(201).json(course);
};
