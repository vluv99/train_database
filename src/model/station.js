class Station{
    constructor(){
        this.name = "";
        this.peronCount = "";
        this.cafe = "";
        this.ticketOffice = "";
        this.info_pont = ""
        this.wifi = "";
        this.disabledServices = "";
    }

    static load(data){
        let station = new Station();
        station.name = data.NEVE;
        station.peronCount = data.PERON_SZAM;
        station.cafe = data.KAVEZO;
        station.ticketOffice = data.JEGYPENZTAR;
        station.info_pont = data.INFO_PONT;
        station.wifi = data.WIFI;
        station.disabledServices = data.MOZGASKORLATOZOTT_ELERES;
        return station;
    }
}

module.exports = Station;