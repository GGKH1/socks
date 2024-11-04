const app = Vue.createApp({
  data() {
    return {
      cart: 0,
      product: "Socks",
      // description: "Very soft socks"
      image: "../assets/images/socks_green.jpg",
      // link: "https://www.uipmworld.org/"
      inventory: 15,
      // onSale: true
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        { id: 2234, color: "green", image: "../assets/images/socks_green.jpg" },
        { id: 2235, color: "blue", image: "../assets/images/socks_blue.jpg" },
      ],
      // sizes: [xs, s, m, l, xl, xxl}
    };
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    decrease() {
      this.cart -= 1;
    },
    uptadeImage(variantImage) {
      this.image = variantImage;
    },
  },
});
