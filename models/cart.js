function cart(oldCart) {
    // Assign values of cart
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    // Add new product to cart
    this.add = function(item, id) {
        var storedItem = this.items[id];

        // If product does not have the same id, then make new list
        if (!storedItem) {
            storedItem = this.items.id = {item: item, qty: 0, price: 0};
        } else {
            // If product has the same id, then add quantity
            storedItem.qty++;   
            storedItem.price = storedItem.item.price * storedItem;  
            this.totalQty++;
            this.totalQty += storedItem.item.price;
        }

    };

    this.generateArray = function() {
        var arr = [];

        for (var id in this.items) {
            arr.push(this.items[id]);
        }

        return arr;
    };
};


module.exports = cart;