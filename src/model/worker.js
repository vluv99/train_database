class Worker{
    constructor(){
        this.id = "";
        this.name = "";
        this.birthDate = "";
        this.addrress = "";
        this.tax = 0;
        this.field = "";
        this.HourlyWage = 0;    
        this.username = "";
    }

    static load(data){
        let worker = new Worker();
        worker.id = data.ID;
        worker.name = data.TELJES_NEV;
        worker.birthDate = data.SZULETESI_DATUM;
        worker.addrress = data.LAKCIM;
        worker.tax = data.ADOSZAM;
        worker.field = data.BEOSZTAS;
        worker.HourlyWage = data.ORABER;
        worker.username = data.FELHASZNALONEV;

        return worker;
    }
}

module.exports = Worker;