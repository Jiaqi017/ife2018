/**
 * Created by Win on 2018/7/12.
 */

/*餐厅类*/
function Restaurant(obj){
    this.cash = obj.cash;
    this.seats = obj.seats;
    this.staff = obj.staff;
}
Restaurant.prototype.constructor = Restaurant;
Restaurant.prototype.hire = function(staff) {
    this.staff.push(staff);
    console.log('hire');
};
Restaurant.prototype.fire = function(staff) {
    var arr = this.staff;
    var len = arr.length;
    for(var i = 0; i < len; i++){
        if(arr[i] === staff){
            console.log('fire');
            arr.splice(i,1);
        }
    }
};

/*职员类*/
function Staff(id,name,pay){
    this.id = id;
    this.name = name;
    this.pay = pay;
}
Staff.prototype.constructor = Staff;
Staff.prototype.work = function() {

};

/*服务员类*/
function Waiter(id,name,pay){
    Staff.call(this, id, name, pay);
}
Waiter.prototype = Object.create(Staff.prototype);
Waiter.prototype.constructor = Waiter;
Waiter.prototype.work = function(data) {
    if(isArrayFn(data)){
        console.log("menu")
    }else{
        console.log("serving")
    }
};

/*厨师类*/
function Cook(id,name,pay){
    Staff.call(this, id, name, pay);
}
Cook.prototype = Object.create(Staff.prototype);
Cook.prototype.constructor = Cook;
Cook.prototype.work = function(){
    console.log("+1")
};

/*顾客类*/
function Customer(){

}
Cook.prototype.constructor = Customer;
Customer.prototype = {
    order: function(){
        console.log("order")
    },
    eat: function(){
        console.log("eat")
    }
}
/*菜品类*/
function Food(name,cost,price){
    this.name = name;
    this.cost = cost;
    this.price = price;
}

function isArrayFn(value){
    if (typeof Array.isArray === "function") {
        return Array.isArray(value);
    }else{
        return Object.prototype.toString.call(value) === "[object Array]";
    }
}

//test
var ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 20,
    staff: [{id: 1,name: "Sam",pay: 10000},{id: 2,name: "Tom",pay: 10000},{id: 3,name: "John",pay: 10000}]
});

var newCook = new Cook("Tony", 10000);
ifeRestaurant.hire(newCook);

console.log(ifeRestaurant.staff);

ifeRestaurant.fire(newCook);
console.log(ifeRestaurant.staff);