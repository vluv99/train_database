class Ticket{
    constructor(){
        this.id = "";
        this.user = "";
        this.road = "";
        this.seat = "";
        this.date = ""; 
        this.cathegory = "";
        this.price = "";
        this.passenger_name = "";
        this.passenger_mail = "";
        this.from = "";
        this.to = "";
        this.depart = "";
        this.car = "";
        this.seat = "";
    }

    static load(data){
        let ticket = new Ticket();
        ticket.id = data.ID
        ticket.user = data.FELHASZNALO;
        ticket.road = data.UT;
        ticket.seat = data.SZEK;
        ticket.date = data.VETELI_DATUM;
        ticket.cathegory = data.K;
        ticket.price = data.AR;
        ticket.passenger_name = data.UTAS_NEV;
        ticket.passenger_mail = data.UTAS_MAIL;
        ticket.from = data.HONNAN;
        ticket.to = data.HOVA;
        ticket.car = data.KOCSI;
        ticket.seat = data.SZEK;
        ticket.depart = data.INDULAS;

        return ticket;
    }
}

module.exports = Ticket;