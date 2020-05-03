class Salary{
    constructor(){
        this.name = "";
        this.birthDate = "";
        this.date = "";
        this.workedHours = 0;
        this.HourlyWage = 0;
        this.wage = 0;
    }

    static load(data){
        let salary = new Salary();
        salary.name = data.NEV;
        salary.birthDate = data.SZULETESI_DATUM;
        salary.date = data.date;        //TODO: inish the databe version of these data 
        //NOT IN USE
        salary.workedHours = data.workedHours;
        salary.HourlyWage = data.HourlyWage;
        salary.wage = data.wage;

        return salary;
    }
}

module.exports = Salary;