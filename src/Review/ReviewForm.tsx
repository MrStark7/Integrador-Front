import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const ADD_REVIEW = gql`
  mutation AddReview($serviceId: Int!, $userId: Int!, $rating: Int!, $comment: String!) {
    addReview(serviceId: $serviceId, userId: $userId, rating: $rating, comment: $comment) {
      id
      rating
      comment
      user {
        username
      }
    }
  }
`;

const ReviewForm: React.FC<{ serviceId: number }> = ({ serviceId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userId = 1; // Reemplazar con el ID del usuario autenticado
  const [addReview] = useMutation(ADD_REVIEW);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await addReview({
        variables: {
          serviceId,
          userId,
          rating,
          comment,
        },
      });
      setRating(0);
      setComment('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating:
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          min="1"
          max="5"
          required
        />
      </label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave a comment"
        required
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
