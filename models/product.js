const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    price: String,
    comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
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