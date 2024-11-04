const app = Vue.createApp({
  data() {
    return {
      cart: 0,
      product: "Socks",
      image: "../assets/images/socks_green.jpg",
      inventory: 10,
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        { id: 2234, color: "green", image: "../assets/images/socks_green.jpg" },
        { id: 2235, color: "blue", image: "../assets/images/socks_blue.jpg" },
      ],
    };
  },
  computed: {
    isAtMaxInventory() {
      return this.cart >= this.inventory;
    },
    stockStatus() {
      if (this.cart >= this.inventory) {
        return "Out of Stock";
      } else if (this.inventory <= 10 && this.inventory > 0) {
        return "Almost Sold Out";
      } else if (this.inventory > 10) {
        return "In Stock";
      }
      return "Out of Stock";
    },
  },
  methods: {
    addToCart() {
      if (this.cart < this.inventory) {
        this.cart += 1;
      }
    },
    decrease() {
      if (this.cart > 0) {
        this.cart -= 1;
      }
    },
    updateImage(variantImage) {
      this.image = variantImage;
    },
  },
});
