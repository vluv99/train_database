class User{
    constructor(){
        this.username = "";
        this.birthDate = "";
        this.name = "";
        this.bankCardNumber = "";
        this.password = "";
        this.email = "";
    }

    static load(data){
        let user = new User();
        user.username = data.FELHASZNALONEV;
        user.birthDate = data.SZULETESI_DATUM;
        user.name = data.TELJES_NEV;
        user.bankCardNumber = data.BANKKARTYA;
        user.password = data.JELSZO;
        user.email = data.EMAIL;
        return user;
    }

    checkPassword(pass){
        if(pass == this.password){
            return true;
        }
        return false;
    }
}

//static function to load the data form the data returned by the database

module.exports = User;