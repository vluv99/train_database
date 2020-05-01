class Trip{
    constructor(){
    this.from = "";
    this.to = "";
    this.depart = "";
    this.arrive = "";
    //this.personCount = 0;
    this.name = ""
    }

    static load(data){
        let trip = new Trip();
        trip.from = data.from; //TODO: change the data types, to match the database
        trip.to = data.to;
        trip.depart = data.depart;
        trip.arrive = data.arrive;
        trip.name = data.name;
        return trip;
    }
}

module.exports = Trip;
