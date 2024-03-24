import { React, useState, useEffect } from "react";

const AdminPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem("AdminToken");
        const response = await fetch(
          "http://ec2-3-91-241-28.compute-1.amazonaws.com:4000/admin/feedbacks",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        const responseData = await response.json();
        if (response.ok) {
          console.log(responseData.feedbackArray);
          setFeedbacks(responseData.feedbackArray);
        } else {
          console.error("Error logging in:", responseData.msg);
        }
      } catch (error) {
        console.error("Error logging in:", error.message);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div>
      {feedbacks.map((feedback) => (
        <div className="feedback-container">
          <div className="feedback-card">
            <p>{feedback.username}</p>
            <p>{feedback.feedback}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
