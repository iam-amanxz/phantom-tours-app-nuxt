<template>
  <v-row justify="center">
    <v-col cols="12" sm="6" md="4" v-for="testimonial in testimonials" :key="testimonial.author">
      <figure class="snip1192">
        <blockquote>{{testimonial.blockquote}}</blockquote>
        <div class="author">
          <img :src="testimonial.imgSrc" alt="sq-sample1" />
          <h5>{{testimonial.author}}</h5>
        </div>
      </figure>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      testimonials: [
        {
          blockquote:
            "Calvin: Sometimes when I'm talking with others, my words can't keep up with my thoughts. I wonder why we think faster than we speak. Hobbes: Probably so we can think twice.",
          imgSrc:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample29.jpg",
          author: "PELICAN STEVE"
        },
        {
          blockquote:
            "Thank you. before I begin, I'd like everyone to notice that my report is in a professional, clear plastic binder...When a report looks this good, you know it'll get an A. That's a tip kids. Write it down.",

          imgSrc:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample24.jpg",
          author: "MAX CONVERSION"
        },
        {
          blockquote:
            "My behaviour is addictive functioning in a disease process of toxic co-dependency. I need holistic healing and wellness before I'll accept any responsibility for my actions.",

          imgSrc:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample1.jpg",
          author: "ELEANOR FAINT"
        }
      ]
    };
  }
};
</script>
<style lang="css" scoped>
figure.snip1192 {
  position: relative;
  overflow: hidden;
  margin: 10px;
  min-width: 220px;
  max-width: 310px;
  width: 100%;
  color: #333;
  text-align: left;
  box-shadow: none !important;
}
figure.snip1192 * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
figure.snip1192 img {
  max-width: 100%;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  margin-bottom: 15px;
  display: inline-block;
  z-index: 1;
  position: relative;
}
figure.snip1192 blockquote {
  margin: 0;
  display: block;
  border-radius: 8px;
  position: relative;
  background-color: #fafafa;
  padding: 30px 50px 65px 50px;
  font-size: 0.9em;
  margin: 0 0 -50px;
  line-height: 1.6em;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
}
figure.snip1192 blockquote:before,
figure.snip1192 blockquote:after {
  font-family: "FontAwesome";
  content: "\201C";
  position: absolute;
  font-size: 50px;
  opacity: 0.3;
  font-style: normal;
}
figure.snip1192 blockquote:before {
  top: 35px;
  left: 20px;
}
figure.snip1192 blockquote:after {
  content: "\201D";
  right: 20px;
  bottom: 35px;
}
figure.snip1192 .author {
  margin: 0;
  text-transform: uppercase;
  text-align: center;
  color: #ffffff;
}
figure.snip1192 .author h5 {
  color: rgba(0, 0, 0, 0.9);
  opacity: 0.8;
  margin: 0;
  font-weight: 800;
}
figure.snip1192 .author h5 span {
  font-weight: 400;
  text-transform: none;
  display: block;
}
/* Demo purposes only */
body {
  background-color: #212121;
}
</style>