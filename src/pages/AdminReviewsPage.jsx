import { useEffect, useState } from "react";
import * as reviewService from "../services/review.service";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewData, setReviewData] = useState({
    comment: "",
    rating: "",
  });

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    const res = await reviewService.getAll();
    setReviews(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await reviewService.create(reviewData);
    getReviews();
  };

  return (
    <div>
      <h2>Reseñas</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Comentario"
          onChange={(e) =>
            setReviewData({ ...reviewData, comment: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Rating"
          onChange={(e) =>
            setReviewData({ ...reviewData, rating: e.target.value })
          }
        />

        <button type="submit">Enviar</button>
      </form>

      {reviews.map((review) => (
        <div key={review._id}>
          <p>{review.comment}</p>
          <span>{review.rating} ⭐</span>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
