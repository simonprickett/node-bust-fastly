# node-bust-fastly

This is a brief example of how to bust the cache for a set of URLs on the Fastly CDN.  You will need a Fastly API key, and to have stored that in the environment variable `FASTLY_API_KEY`.

## Get up and Running

```
git clone https://github.com/simonprickett/node-bust-fastly.git
cd node-bust-fastly
npm install
```

Edit `index.js` to have your URLs in there, then:

```
npm start
```
