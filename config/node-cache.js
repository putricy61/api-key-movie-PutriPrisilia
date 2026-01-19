const Node = require('node-cache')
const cache = new Node ({stdTTL:3600})
module.exports = cache  