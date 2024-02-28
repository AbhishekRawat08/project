import React, { useState, useRef } from "react";

const CommentsForm = ({ postComments }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
    rating: 0,
  });
  let myFormRef = useRef()
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({})
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    const newErrors = {};
    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
    }
    if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (formData.comment.trim() === "") {
      newErrors.comment = "Comment is required";
    }
    if (formData.rating === 0) {
      newErrors.rating = "Rating is mandatory";
    }

    // If there are errors, update the state and stop form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    postComments(formData);
    // If all validation passes, you can submit the form
    alert("Form submitted successfully!");
    setFormData({
      ...formData,
      name: '',
      email: '',
      comment: '',
      rating: ''
    });
    setErrors({})
    // Here you might want to use AJAX to submit the form data to the server
  };

  const handleRating = (index) => {
    setFormData({
      ...formData,
      rating: index,
    });
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="comment-container">
      <h2>Comments</h2>
      <form onSubmit={handleSubmit} className="comments-form" ref={myFormRef}>
        {/* //Need to create a separate input component to avoid DRY principle */}
        <div className="row">
          <div className="col-25">
            <label htmlFor="fname">Name</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="lname">Email</label>
          </div>
          <div className="col-75">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="subject">Comment</label>
          </div>
          <div className="col-75">
            <textarea
              id="comment"
              name="comment"
              rows="4"
              value={formData.comment}
              onChange={handleChange}
              className={errors.comment ? "error" : ""}
              style={{ height: "200px" }}
            ></textarea>
            {errors.comment && (
              <p className="error-message">{errors.comment}</p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="subject">Rating</label>
          </div>
          <div className="col-75">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= formData.rating ? "on" : "off"}
                  onClick={() => handleRating(index)}
                >
                  <span className="star">&#9733;</span>
                </button>
              );
            })}
            {errors.rating && <p className="error-message">{errors.rating}</p>}
          </div>
        </div>
        <div className="row">
          <div className="col-25">

          </div>
          <div className="col-75">
            <input type="submit" value="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentsForm;
