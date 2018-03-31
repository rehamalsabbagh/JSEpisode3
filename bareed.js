/**************************************************************
* Point - defines a point on the map using X and Y coordinates
*
* x - x coordinate
* y - y coordinate
*
* distanceTo(point) - takes a point, calculates the distance to
*                     that point from the current point.
*
* let point = new Point(x, y);
****************************************************************/
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceTo(point) {
    let xDelta = this.x - point.x;
    let yDelta = this.y - point.y;
    return Math.sqrt(xDelta*xDelta + yDelta*yDelta); // PYTHAGORAS!
  }

  static randomPoint(maxX, maxY) {
    let x = Math.random() * (maxX || 100);
    let y = Math.random() * (maxY || 100);
    return new Point(x, y);
  }
}


/**********************************************************
* Wallet - keeps track of money
*
* money - how much money is in the wallet. Defaults to 0.
*
* credit(amount) - adds `amount` to `money`.
*
* debit(amount) - subtracts `amount` from `money`.
*
* let wallet = new Wallet(money);
**********************************************************/
class Wallet {
  // implement Wallet!
  constructor(money) {
    if(money){
    this.money = money;
    }
    else{
       this.money = 0;   
    }
    

  }

  credit(amount) {
    //this.amount = amount;
  this.money = amount + this.money;
  //return credit;

  }

  debit(amount) {
    //this.amount = amount;
    this.money = this.money - amount;
    //return debit;


  }
}

/**********************************************************
* Person - defines a person with a name and feelings
*
* name - name of said person
* location - a Point
* wallet` - a Wallet instance initially with 0.
*
* moveTo(point) - updates the location to point
*
* let person = new Person(name, x, y);
**********************************************************/
class Person {
  constructor(name, x, y) {
    this.name = name;
    this.location = new Point(x,y);
    this.wallet = new Wallet();
}
  moveTo(point){
    this.location = point;
  } 
  // implement Person!
}


/**********************************************************
* Vendor - defines a vendor with a desire for money
* Subclasses Person
*
* range - the maximum distance this vendor can travel - initially 5
* price - the cost of a single ice creams - initially 1
*
* sellTo(customer, numberOfIceCreams) -  sells a specific number of ice creams
*     to the customer by doing the following:
*         - Moves to the customer's location
*         - Transfers money from the customer's wallet
*           to the vendor's wallet
*
* new vendor = new Vendor(name, x, y);
**********************************************************/
class Vendor extends Person {
  constructor(name,x,y){
    super(name,x,y);
    this.range = 5;
    this.price = 1;
  }
  sellTo(customer, numberOfIceCreams) {

    this.moveTo(customer.location);
    let total = (this.price * numberOfIceCreams);
    if(customer.wallet.money>= total){
      this.wallet.money += total;
      customer.wallet.money -= total;     
    }
    ///// TBD

    // implement Vendor!
  }
}


/**********************************************************
* Customer - defines a customer with a desire for ice cream
* Subclasses Person
*
* wallet - a Wallet instance initially with 10.
*
* _isInRange(vendor) - checks if the customer is in range of vendor.
*
* _haveEnoughMoney(vendor, numberOfIceCreams) - checks if the customer
*     has enough money to buy a specific number of ice creams from vendor.
*
* requestIceCream(vendor, numberOfIceCreams) - if the customer is in the vendor's
*     range and has enough money for, a request is sent to the vendor.
*
* new customer = new Customer(name, x, y);
**********************************************************/
class Customer extends Person {
  constructor(name,x,y){
    super(name,x,y);
    this.wallet = new Wallet(10);
  }
  _isInRange(vendor) {
    console.log('what distanceTo is returning : ' + this.location.distanceTo(vendor.location));
    console.log('vendor\'s range : ' + vendor.range);
    console.log('customer location : ' + this.location);
    console.log('vendor location : ' + vendor.location.x);
    console.log('vendor location : ' + vendor.location.y);
    console.log('result : ' + (this.location.distanceTo(vendor.location) <= vendor.range));

    if (this.location.distanceTo(vendor.location) <= vendor.range){
      return true;
    }
    else {
      return false;
    }

  }
  _haveEnoughMoney(vendor, numberOfIceCreams) {
    if (this.wallet.money >= (vendor.price * numberOfIceCreams)) {
      return true;
    }
    else {
      return false;
    }
    
  }
  requestIceCream(vendor, numberOfIceCreams) {
    if (this._isInRange(vendor) && this._haveEnoughMoney(vendor, numberOfIceCreams)) {
      vendor.sellTo(this, numberOfIceCreams);
      return true;
    }

    else if (this._isInRange(vendor)  && (!this._haveEnoughMoney(vendor, numberOfIceCreams)) ) {
      console.log("GET A JOB");
      return false;
    }

    else if ((!this._isInRange(vendor)) && this._haveEnoughMoney(vendor, numberOfIceCreams)) {
      console.log("you live in the middle of nowhere!");
      return false;
    }

    

  } 
} 







export {Point, Wallet, Person, Customer, Vendor};
