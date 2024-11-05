import ProductDisplay from "./components/ProductDisplay.js";
import ReviewForm from "./components/ReviewForm.js";
import ReviewList from "./components/ReviewList.js";

// No imports
const app = Vue.createApp({
  data() {
    return {
      cart: [],
      premium: true,
    };
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    decreaseCart(id) {
      const index = this.cart.lastIndexOf(id);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    },
  },
});

// Define ProductDisplay component
app.component("product-display", {
  props: {
    cart: {
      type: Array,
      required: true,
    },
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `
    <div class="product-display">
      <div class="product-container">
        <div class="product-image">
          <img :class="{ 'out-of-stock-img': !inventory }" :src="image" />
        </div>
        <div class="product-info">
          <h1>{{ title }}</h1>
          <p>{{ stockStatus }}</p>
          <p>Shipping: {{ shipping }}</p>
          <ul>
            <li v-for="detail in details" :key="detail">{{ detail }}</li>
          </ul>
          <div
            v-for="(variant, index) in variants"
            :key="variant.id"
            @mouseover="updateVariant(index)"
            class="color-circle"
            :style="{ backgroundColor: variant.color }"
          ></div>
          <button
            class="button"
            :class="{ disabledButton: !inventory }"
            :disabled="!inventory"
            @click="addToCart"
          >
            Add to Cart
          </button>
          <button
            class="button"
            @click="decrease"
            :class="{ disabledButton: cart.length === 0 }"
            :disabled="cart.length === 0"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      product: "Socks",
      brand: "G&G",
      selectedVariant: 0,
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          inventory: 10,
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          inventory: 0,
        },
      ],
      reviews: [],
    };
  },
  computed: {
    title() {
      return `${this.brand} ${this.product}`;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inventory() {
      return this.variants[this.selectedVariant].inventory;
    },
    stockStatus() {
      if (this.inventory === 0) {
        return "Out of Stock";
      } else if (this.inventory <= 10) {
        return "Almost Sold Out";
      } else {
        return "In Stock";
      }
    },
    shipping() {
      return this.premium ? "Free" : "$2.99";
    },
  },
  methods: {
    addToCart() {
      if (this.inventory > 0) {
        this.$emit("update-cart", this.variants[this.selectedVariant].id);
      }
    },
    decrease() {
      this.$emit("decrease-cart", this.variants[this.selectedVariant].id);
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
    addReview(review) {
      this.reviews.push(review);
    },
  },
});

// Define ReviewList component
app.component("review-list", {
  props: {
    reviews: {
      type: Array,
      required: true,
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
});

// Define ReviewForm component
app.component("review-form", {
  template: /*html*/ `
    <form class="review-form" @submit.prevent="onSubmit">
      <h3>Leave a review</h3>
      <label for="name">Name:</label>
      <input id="name" v-model="name" />

      <label for="review">Review:</label>
      <textarea id="review" v-model="review"></textarea>

      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option disabled value="">Select rating</option> 
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>

      <label for="recommend">Would you recommend this product?</label>
      <select id="recommend" v-model="recommend">
        <option disabled value="">Select</option> 
        <option>Yes</option>
        <option>No</option>
      </select>

      <input class="button" type="submit" value="Submit" />
    </form>
  `,
  data() {
    return {
      name: "",
      review: "",
      rating: null,
      recommend: null,
    };
  },
  methods: {
    onSubmit() {
      if (
        this.name === "" ||
        this.review === "" ||
        this.rating === null ||
        this.recommend === null
      ) {
        alert("Review is incomplete. Please fill out every field.");
        return;
      }

      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating,
        recommend: this.recommend,
      };
      this.$emit("review-submitted", productReview);

      this.name = "";
      this.review = "";
      this.rating = null;
      this.recommend = null;
    },
  },
});

// Mount the app
app.mount("#app");
