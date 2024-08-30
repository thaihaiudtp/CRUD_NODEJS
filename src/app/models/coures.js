const mongoose = require('mongoose')
const slugify = require('slugify');

const  Schema  = mongoose.Schema;

const Course = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    image: {type: String},
    video: {type: String, required: true},
    slug: { type: String, slug: "name", unique: true}
}, {
    timestamps: true
})


// Middleware để tạo slug trước khi lưu vào database
Course.pre('save', function(next) {  // Sửa từ Schema.pre thành Course.pre
    if (!this.slug) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model('coures', Course)