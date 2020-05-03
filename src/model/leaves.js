class Leave{
    constructor(){
        this.id = "";
        this.workerId = "";
        this.beginning = "";
        this.end = 0;
        this.approved = 0;
        this.reason = 0;
    }

    static load(data){
        let leave = new Leave();
        leave.id = data.ID;
        leave.workerId = data.DOLGOZO;
        leave.beginning = data.KEZDETE;        //TODO: inish the databe version of these data
        leave.end = data.VEGE;
        leave.approved = data.JOVAHAGYOTT;
        leave.reason = data.OK;

        return leave;
    }
}

module.exports = Leave;