module.exports = class Checkout{
    constructor() {
        this.prices = new Object();
        this.items = new Object();
        this.discounts = new Object();
    }
    addItemPrice(item, price){
        this.prices[item] = price;
    }
    addItem(item){
        if(this.prices[item] == undefined){
            throw('No price defined for item '+ item);
        }
        // checking if this item exists within the list of items

        //if it doesnt, it simply creates it and sets its count to 1
        if(this.items[item] == undefined){
            this.items[item] = 1;
        }
        //if it does exist, it simply increments the value
        else{
            this.items[item]++;
        }
    }
    calculateTotal(){
        //sets total to 0 to start
        var total = 0;

        //loops through each item in the list of items
        for(var item in this.items){
            total += this.calculateItemTotal(item);
        }
        //returning the total after it is calculated
        return total;
    }
    calculateItemTotal(item){
        //set total to 0
        var total = 0;
        //creating the object for what items are discounted
        var discount = this.discounts[item];

        //if there is a discount, it calls the calculateDiscount() method
        if(discount != undefined){
            total += this.calclulateDiscount(item, this.items[item], discount);
        }
        //if the discount doesn't exist it skips the discount calculation completely
        else {
            //total + (the price of the item * the total amount of that item)
            total += (this.prices[item] * this.items[item]);
        }
        return total;

    }
    calclulateDiscount(item,itemCnt, discount){
        //setting total to 0
        var total = 0;
        //calculate how many discounts are going to be calculated
        var nbrOfDiscounts = itemCnt / discount.cnt;
        //adds the number of discounts * the discount price to the total
        total += nbrOfDiscounts * discount.price;
        //calculate the remainder, item count % discount items count
        var remainder = itemCnt % discount.cnt;
        //adds the remainder items to the total, multiplying the price
        total += remainder * this.prices[item];
        //finally return the total
        return total;
    }
    addDiscount(item, itemCnt, discountPrice){
        // passing in the item count and discount price to calculate later, attaching it to the specific item
        this.discounts[item] = {cnt:itemCnt, price:discountPrice};
    }
}