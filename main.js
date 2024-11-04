const app = Vue.createApp({
  data() {
    return {
      cart: 0,
      product: "Socks",
      brand: "G&G",
      selectedVariant: 0,
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        {
          id: 2234,
          color: "green",
          image: "../assets/images/socks_green.jpg",
          inventory: 10,
        },
        {
          id: 2235,
          color: "blue",
          image: "../assets/images/socks_blue.jpg",
          inventory: 0,
        },
      ],
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
  },
  methods: {
    addToCart() {
      if (this.inventory > this.cart) {
        this.cart += 1;
      }
    },
    decrease() {
      if (this.cart > 0) {
        this.cart -= 1;
      }
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
  },
});

app.mount("#app");
