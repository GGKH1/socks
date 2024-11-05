export default {
  name: "ReviewList",
  props: {
    reviews: {
      type: Array,
      default: () => [],
    },
  },
  template: `
    <div class="review-list">
      <h3>Reviews</h3>
      <ul>
        <li v-for="(review, index) in reviews" :key="index">
          <h4>{{ review.name }}</h4>
          <p>{{ review.review }}</p>
          <p>Rating: {{ review.rating }}</p>
          <p>Recommendation: {{ review.recommend }}</p>
        </li>
      </ul>
    </div>
  `,
};
