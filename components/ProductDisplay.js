import ReviewForm from "./ReviewForm.js";
import ReviewList from "./ReviewList.js";

export default {
  name: "PrdouctDisplay",
  components: {
    ReviewList,
    ReviewForm,
  },
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
          <review-list v-if="reviews.length" :reviews="reviews"></review-list>
          <review-form @review-submitted="addReview"></review-form>
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
};
