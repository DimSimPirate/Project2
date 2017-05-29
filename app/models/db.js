var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/COMP5347DB', function () {
  console.log('mongodb connected')
})

module.exports = mongoose