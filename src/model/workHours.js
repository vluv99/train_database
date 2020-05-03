class WorkHours{
    constructor(){
        this.id = "";
        this.workerID = "";
        this.date = "";
        this.hours = "";
    }

    static load(data){
        let workHours = new WorkHours();
        workHours.id = data.ID;
        workHours.workerID = data.DOLGOZO;
        workHours.date = data.DATUM;
        workHours.hours = data.ORAK_SZAMA;

        return workHours;
    }
}

module.exports = WorkHours;