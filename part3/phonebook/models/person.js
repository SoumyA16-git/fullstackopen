const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
  type: String,
  required: true,
  validate: {
    validator: value => {
      return /^\d{2,3}-\d+$/.test(value)
    },
    message: props => `${props.value} is not a valid phone number`
  }
}
})

module.exports = mongoose.model('Person', personSchema)