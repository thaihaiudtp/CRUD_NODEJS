const mongoose = require('mongoose')
const slugify = require('slugify');
const mongooseDelete = require('mongoose-delete')
const  Schema  = mongoose.Schema;

const Course = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    image: {type: String},
    video: {type: String, required: true},
    price: {type: Number},
    level: {type: String, default: 'Trung bình - Dễ'},
    slug: { type: String, slug: "name", unique: true},

}, {
    timestamps: true
})

Course.plugin(mongooseDelete, {  deletedAt: true, overrideMethods: true  })
// Middleware để tạo slug trước khi lưu vào database
Course.pre('save', async function(next) {
    if (!this.slug) {
        let slug = slugify(this.name, { lower: true, strict: true });
        let count = 1;
        const originalSlug = slug;

        // Sử dụng this.constructor để truy cập mô hình
        const CourseModel = this.constructor;

        // Kiểm tra tính duy nhất của slug
        while (await CourseModel.countDocuments({ slug }) > 0) {
            slug = `${originalSlug}-${count}`;
            count++;
        }

        this.slug = slug;
    }
    next();
})
module.exports = mongoose.model('coures', Course)