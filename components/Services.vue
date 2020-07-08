<template>
  <v-row>
    <v-col md="4" v-for="service in services" :key="service.id">
      <v-card class="mx-auto" height="320px" outlined>
        <v-img class="white--text align-end" height="200px" :src="service.img"></v-img>

        <v-card-subtitle class="pb-0">{{service.description}}</v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      services: [
        {
          id: 1,
          img: "https://i.imgur.com/yOW1WAM.jpg",
          description:
            "We offer several unique adventure tours that allow our clients to Discover and Experience some of the hidden treasures South East Asia has to offer"
        },
        {
          id: 2,
          img: "https://i.imgur.com/5Mk3xQi.jpg",
          description:
            "Our Personalized Adventure Tours allow for a maximum of 12 riders, making each adventure tour a unique experience with a personal touch"
        },
        {
          id: 3,
          img: "https://i.imgur.com/IctfwtN.jpg",
          description:
            "Our Knowledgable Team has years of experience and have the skill and know-how to ensure every tour is a fundamentally fantastic and safe experience"
        },
        {
          id: 4,
          img: "https://i.imgur.com/QB3lWSn.jpg",
          description:
            "Our Reliable Fleet of motorcycles is serviced regularly, fully licensed and roadworthy so you can enjoy every moment of your Phantom Tours adventure tour"
        },
        {
          id: 5,
          img: "https://i.imgur.com/wWsXhsS.jpg",
          description:
            "A Trained First Aider and backup vehicle accompany every tour to ensure that we are prepared to take care of any emergency that may arise"
        },
        {
          id: 6,
          img: "https://i.imgur.com/RniYwMX.jpg",
          description:
            "A backup vehicle follows the group with all the gear, necessities and everyone’s luggage allowing you a more Comfortable Ride without panniers or boxes"
        }
      ]
    };
  }
};
</script>