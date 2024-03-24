import { React, useState } from "react";
const Profile = () => {
  const [feedback, setFeedback] = useState("");
  const handleFeedback = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://ec2-3-91-241-28.compute-1.amazonaws.com:4000/user/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ feedback }),
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData.msg);
      } else {
        console.error("Error sending feedback:", responseData.msg);
      }
    } catch (error) {
      console.error("Error sending feedback:", error.message);
    }
    setFeedback("");
  };
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Feedback</h1>
        <div className="loginsignup-fields">
          <textarea
            placeholder="Enter your feedback"
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value);
            }}
          ></textarea>
        </div>
        <button onClick={handleFeedback}>Send</button>
      </div>
    </div>
  );
};

export default Profile;
