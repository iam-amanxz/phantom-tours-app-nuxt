# Phantom Tours VueJS Nuxt App

**VueJS web appliaction of Group-C for SOFTWARE SYSTEMS DEVELOPMENT (BCC608), Sothamption Solent University**

>
### Group Members
**Husnul Aman-14883830 |**
**Jareer Zeenam-14883881 |**
**Emaadh Careem-14889641 |**
**Puvanendrarajah Vinushiya-14883813 |**
**Thilagshana Thilakarasa-14883708**

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

### Changing the API URL
In order to change the connection URL for backend, go to `./nuxt.config.js` and provide the API URL in baseUrl under `env` section.

    env: {
	    baseUrl: process.env.BASE_URL || "http://localhost:9000"
    }

