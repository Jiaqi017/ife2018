
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

/*服务员类  仅一个实例*/
function Waiter(id,name,pay){
    if (typeof Waiter.instance === 'object'){
        return Waiter.instance;
    }
    Staff.call(this, id, name, pay);
    Waiter.instance = this;
}
Waiter.prototype = Object.create(Staff.prototype);
Waiter.prototype.constructor = Waiter;
Waiter.prototype.orderStart = function(){
    console.log("开始点菜");
};
Waiter.prototype.work = function(data) {
    if(data instanceof Array){

        console.log("Waiter - 记录顾客点了：" + data[0].name);

        new Cook().work(data);
    }else{
        console.log("Waiter - serving");
        newCustomer.eat();
    }
};

/*厨师类*/
function Cook(id,name,pay){
    if (typeof Cook.instance === 'object'){
        return Cook.instance;
    }
    Staff.call(this, id, name, pay);
    Cook.instance = this;
}
Cook.prototype = Object.create(Staff.prototype);
Cook.prototype.constructor = Cook;
Cook.prototype.work = function(dishes){
    var _this = this;
    console.log("Cook - " + dishes[0].name + "正在准备...");
    setTimeout(function() {
        console.log("Cook - " + dishes[0].name + "完成");
        _this.callWaiter();
    },500)

};
Cook.prototype.callWaiter = function() {
    new Waiter().work();
};

/*顾客类*/
function Customer(name){
    this.name = name;
}
Customer.prototype.constructor = Customer;
Customer.prototype.order = function() {
    var waiter = new Waiter();
    waiter.orderStart();

    customerOrder = [];
    customerOrder.push(order(menu));
    console.log("顾客" + this.name + "点了：" + customerOrder[0].name);

    waiter.work(customerOrder);
};
Customer.prototype.eat = function() {
    var _this = this;
    console.log("顾客 - eat");
    setTimeout(function(){
        console.log("顾客 - 吃完了");
        _this.leave();
    },500);
};
Customer.prototype.leave = function(){
    setTimeout(function(){
        queue.splice(0,1);
        seat ++;

        queuing();
    },2000);
};

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

var menu = [];    //菜单
var customerOrder = [];       //顾客点菜


//创建菜单
function createMenu(){
    var menuList = [{name: "可乐排骨", cost: 100, price: 130},{name: "辣子鸡", cost: 50, price: 80}, {name: "虾", cost: 60, price: 80},{name: "拍黄瓜", cost: 10, price: 15}, {name: "孜然牛肉", cost: 30, price: 40}];
    for(var i = 0; i < menuList.length; i++){
        var food = new Food(menuList[i].name, menuList[i].cost, menuList[i].price);
        menu.push(food);
    }
    console.log("菜单",menu)
}
createMenu();
//点菜
function order(menuData){
    var dishes = menuData[parseInt(Math.random() * menuData.length)];
    return dishes;
}



//test
var ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 1,
    staff: []
    // staff: [{id: 1,name: "Sam",pay: 10000},{id: 2,name: "Tom",pay: 10000},{id: 3,name: "John",pay: 10000}]
});

var newCook = new Cook(1,"Tony", 10000);
var newWaiter = new Waiter(2,"Sam", 8000);
ifeRestaurant.hire(newCook);
ifeRestaurant.hire(newWaiter);

console.log(ifeRestaurant.staff);
// ifeRestaurant.fire(newCook);
// console.log(ifeRestaurant.staff);


var newCustomer, seat = ifeRestaurant.seats;
var queue = ["Tracy","John", "Mike", "Tiffany"];

//顾客排队进店
function queuing(){
    if(seat > 0){
        if(queue.length > 0){
            console.log("————————————————————————————————————————");
            newCustomer = new Customer(queue[0]);
            seat --;
            newCustomer.order();
        }else{
            console.log("暂无客人排队");
        }
    }
}
//顾客加入排队
function addCustomer(name) {
    queue.push(name);
    if(queue.length === 1){
        queuing();
    }
}

queuing();



