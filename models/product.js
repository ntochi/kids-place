const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
	title: String,
    image: String,
    description: String,
    price: String,
	author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
		{
			type: Schema.Types.ObjectId,
			ref: "Comment" //Model to associate
		}
	]
});

//Delete comments with products when destroying
productSchema.pre('remove', async () => {
	await Comment.remove({
		_id: {
			$in: this.comments
		}
	});
});

// Compile into a model
module.exports = mongoose.model("Product", productSchema);