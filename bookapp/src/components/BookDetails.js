import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentsForm from "./CommentsSection";
import isLoadingHOC from "./HOC/WithLoading";
import { useNavigate } from "react-router-dom";

export const BookDetails = (props) => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsLoading } = props;
  const navigate = useNavigate();

  //Get the book detail on page load
  useEffect(() => {
    const fetchProducts = () => {
      setIsLoading(true);
      fetch(`https://api.artic.edu/api/v1/artworks/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.data) {
            setIsLoading(false);
            setDetails(data.data);
          }
        })
        .catch(() => {
          setIsLoading(false);
          setErrorMessage("Unable to fetch Book Details");
        });
    };
    fetchProducts();
  }, []);

  //post the comments
  const postComments = (commentObj) => {
    const { name, email, comment, rating } = commentObj;
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({ comment, email, name, rating }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  //Handle Back click
  const handleBack = () => {
    navigate("/");
  };


  return (
    <>
      <div  className="back-button">
        <button onClick={handleBack}>Back</button>
      </div>
      <div className="container">
        <div className="card-image">
          <img
            style={{ width: "100%", height: "100%" }}
            src={details?.thumbnail?.lqip}
          />
          <p className="book-size-text">{details?.dimensions}</p>
        </div>
        <div className="card-right">
          <h5>{details?.title}</h5>
          <p className="book-text">
            <b>{details?.artist_display}</b>
          </p>
          <p className="book-text">
            <label>
              <b>Date Display: </b>
            </label>
            {details?.date_display}
          </p>
          <p className="book-text">
            <label>
              <b>Reference Number: </b>
            </label>
            {details?.main_reference_number}
          </p>
        </div>
      </div>
      <CommentsForm postComments={postComments} />
      {errorMessage && <div className="error">{errorMessage}</div>}
    </>
  );
};

export default isLoadingHOC(BookDetails, "");
