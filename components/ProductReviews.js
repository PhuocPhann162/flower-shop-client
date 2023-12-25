import styled from "styled-components";
import Input from "./Input";
import WhiteBox from "./WhiteBox";
import StarsRating from "./StarsRating";
import Textarea from "./Textarea";
import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { Review } from "@/models/Review";

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const Subtitles = styled.h3`
  font-size: 1rem;
  margin-top: 5px;
`;

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
`;

const ReviewWrapper = styled.div`
  margin-bottom: 10px;
  border-top: 2px solid #eee;
  padding: 10px 0;
  h3 {
    margin: 3px 0;
    font-size: 1rem;
    color: #333;
    font-weight: normal;
  }
  p {
    margin: 0;
    font-size: 0.7rem;
    line-height: 1rem;
    color: #555;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  time {
    font-size: 12px;
    color: #aaa;
  }
`;

export default function ProductReviews({ product }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  function submitReview() {
    const data = {
      title,
      description,
      stars,
      product: product._id,
    };
    axios.post("/api/reviews", data).then((res) => {
      setTitle("");
      setDescription("");
      setStars(0);
      loadReviews();
    });
  }
  useEffect(() => {
    loadReviews();
  }, []);
  function loadReviews() {
    setReviewsLoading(true);
    axios.get("/api/reviews?product=" + product._id).then((res) => {
      setReviews(res.data);
      setReviewsLoading(false);
    });
  }
  return (
    <div>
      <div className="font-semibold text-2xl text-main-bg">Reviews</div>
      <ColsWrapper>
        <div>
          <div className="box flex flex-col gap-1">
            <div className="text-xl font-semibold text-main-bg">
              Add a review
            </div>
            <div>
              <StarsRating onChange={setStars} />
            </div>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Was it good? Pros? Cons?"
            />
            <div>
              <button className="btn-primary p-2" onClick={submitReview}>
                Submit your review
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="box">
            <div className="text-xl font-semibold text-main-bg">
              All reviews
            </div>
            {reviewsLoading && <Spinner fullWidth={true} />}
            {reviews.length === 0 && <p>No reviews</p>}
            {reviews.length > 0 &&
              reviews.map((review, index) => (
                <div key={index}>
                  <div className="mt-2 border-t-2 p-2">
                    <div className="flex justify-between">
                      <StarsRating
                        size="sm"
                        disabled={true}
                        defaultHowMany={review.stars}
                      />
                      <div className="text-sm">
                        <time>
                          {new Date(review.createdAt).toLocaleString("sv-SE")}
                        </time>
                      </div>
                    </div>
                    <div className="text-lg font-semibold">{review.title}</div>
                    <div className="text-base my-1">{review.description}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </ColsWrapper>
    </div>
  );
}
