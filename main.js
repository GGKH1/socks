import ProductDisplay from "./components/ProductDisplay.js";

const app = Vue.createApp({
  data() {
    return {
      cart: [],
      premium: true,
    };
  },
  components: {
    ProductDisplay,
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

app.mount("#app");
