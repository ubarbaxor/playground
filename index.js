module.exports = {
  front: require('./client'),
  back: require('./server')
}

console.log(process.env.API_KEY)
