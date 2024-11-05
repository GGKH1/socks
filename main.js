import ProductDisplay from "./components/ProductDisplay.js";

const app = Vue.createApp({
  data() {
    return {
      cart: 0,
      premium: true,
    };
  },
  components: {
    ProductDisplay,
  },
  methods: {
    updateCart(amount) {
      this.cart += amount;
    },
  },
});

app.mount("#app");
