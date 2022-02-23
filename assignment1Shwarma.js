const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    Soup:   Symbol("size"),
    Hamburger:   Symbol("toppings"),
    Cake:   Symbol("cake"),
    UpSell:  Symbol("potato")    
});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSoup = "";
        this.sHamburger = "";
        this.sCake = "";
        this.sUpSell  = "";
        this.sItem = "Order";
        this.sTotal=0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.Soup;
                aReturn.push("Welcome to Richard's soup-house. Please type yes or no.");
                aReturn.push("Would you like soup, costs $8 ?");
                break;
            case OrderState.Soup:
                this.stateCur = OrderState.Hamburger
                if(sInput.toLowerCase() == "yes"){
                    this.sSoup = "soup,";
                    this.sTotal+=8;
                }
                else 
                {
                    this.sSoup="no soup";
                }
                aReturn.push("Would you like hamburger $5 ?");
                break;
            case OrderState.Hamburger:
                this.stateCur = OrderState.Cake
                if(sInput.toLowerCase() == "yes"){
                    this.sHamburger = "hamburger,";
                    this.sTotal+=5;
                }
                else 
                {
                    this.sHamburger="no hamburger,";
                }
                aReturn.push("Would you like chery or apple cake $3 ?");
                break;
            case OrderState.Cake:
                this.stateCur = OrderState.UpSell
                if(sInput.toLowerCase() == "yes"){
                    this.sCake = "cake,";
                    this.sTotal+=3;
                }
                else 
                {
                    this.sCake="no cake";
                }
                if (this.sCake =="cake,")
                {
                aReturn.push("Would you like to add topping to the cake for $1, only today?");                
                }        
                else 
                {
                    aReturn.push("Thank you for your choise, ready to confirm the order?"); 
                }                  
                break;
            case OrderState.UpSell:                  
                if(sInput.toLowerCase() == "yes"){
                    this.sUpSell = sInput;
                    this.sTotal+=1;                                      
                }
                else 
                {
                    this.sUpSell="no topping";
                }                
                this.isDone(true);
                if (this.sTotal==0)
                {
                    aReturn.push("you have not done order or made mistakes in answers, please type 'yes' or 'no' only");
                }
                else
                {                  
                aReturn.push("Thank-you for your order of:");
                aReturn.push(`${this.sSoup} ${this.sHamburger} ${this.sCake} with ${this.sUpSell}`); // thank you for your order of soup '', 'hamburger/cheesburger', '' cake, 'with/no' topping. 
                aReturn.push(`that costs $ ${this.sTotal}`);
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        }
        return aReturn;
    }
}