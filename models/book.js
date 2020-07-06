const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true  
  },
  content: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['DRAFT', 'PUBLISHED'],
    default: 'DRAFT'
  }
}, {
  timestamps: true
});

// Query Helpers
BookSchema.query.drafts = function () {
  return this.where({
    status: 'DRAFT'
  })
};

BookSchema.query.published = function () {
  return this.where({
    status: 'PUBLISHED'
  })
};

BookSchema.virtual('synopsis')
.get(function () {
  const post = this.content;
  return post
    .replace(/(<([^>]+)>)/ig,"")
    .substring(0, 250);
});

module.exports = mongoose.model('Book', BookSchema);