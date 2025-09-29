import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa"; // icon uchun
import { selectCourse } from "../slice/course";

const Main = () => {
  const { courses } = useSelector((state) => state.course);
  const [visibleCount, setVisibleCount] = useState(50);
  const dispatch = useDispatch()
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 50);
  };

  const handleAddToCart = (course) => {
    console.log("Added to cart:", course.Course_Name);
    // keyinchalik Redux yoki context orqali cart'ga qo‘shib ketish mumkin
    dispatch(selectCourse(course))
    
  };

  return (
    <div className="container d-flex flex-wrap justify-content-center gap-4 my-4">
      {courses.slice(0, visibleCount).map((course) => (
        <div
          className="card"
          style={{
            width: "20rem",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
          key={course._id}
        >
          <div className="card-body">
            <h5
              className="card-title"
              style={{ fontWeight: "600", color: "#2c3e50" }}
            >
              {course.Course_Name}
            </h5>
            <p className="card-text">
              <strong>Category:</strong> {course.Category}
            </p>
            <p className="card-text">
              <strong>Duration:</strong> {course["Duration (hours)"]} hours
            </p>
            <p className="card-text">
              <strong>Students:</strong> {course.Enrolled_Students}
            </p>
            <p className="card-text">
              <strong>Price:</strong> ${course["Price ($)"].toFixed(2)}
            </p>
            <p className="card-text">
              <strong>Rating:</strong> ⭐ {course["Rating (out of 5)"].toFixed(1)}
            </p>

            <button
              className="btn d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "10px 16px",
                fontWeight: "500",
                marginTop: "10px",
                transition: "0.3s",
              }}
              onClick={() => handleAddToCart(course)}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#0056b3")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#007bff")
              }
            >
              <FaShoppingCart style={{ marginRight: "8px" }} />
              Add to Cart
            </button>
          </div>
        </div>
      ))}

      {visibleCount < courses.length && (
        <div className="w-100 text-center mt-3">
          <button className="btn btn-outline-primary" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Main;
