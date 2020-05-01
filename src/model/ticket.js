class Ticket{
    constructor(){
        this.on = ""; //date
        this.from = "";
        this.to = "";
        this.depart = "";
        this.price = ""
    }

    static load(data){
        let ticket = new Ticket();
        ticket.on = data.on //TODO: change the data types, to match the database
        ticket.from = data.from;
        ticket.to = data.to;
        ticket.depart = data.depart;
        ticket.price = data.price;
        return ticket;
    }
}

module.exports = Ticket;