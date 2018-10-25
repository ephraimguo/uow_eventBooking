/**
 * @ author: Group JS
 * @ Version 1.0.0
 * @ User Attributes:
 *  username
 *  fullname
 *  password
 *  perEmail
 *  phoneNo
 * */
const {hasError} = require('../validators/hasError');


const {Actor} = require("cqrs");

module.exports = class User extends Actor{

  static get uniqueFields(){
    return ["username"];
  }

  static beforeCreate(data, domain, uniqueOk, holdedFields){
    let errors = {}

    console.log('\n\n =======  class User <|-- holdedFields ===== \n', holdedFields, '\n -------');
    if(!uniqueOk){
      errors = {username: "Username is not available"}
    }

    if(hasError(errors)){
      throw errors;
    }

    console.log('\n\n ====== class User <|-- data ===== \n', data, '\n -------');
    console.log('\n\n ====== class User <|-- errors ===== \n', errors, '\n -------');

  }

  constructor(data){
    const {username, fullName , password, perEmail, phoneNo} = data;
    super({
      username,
      fullName,
      password,
      perEmail,
      phoneNo,
      createTime: Date.now()
    });
  }

  updateInfo(data, adminActorId){
    this.$(data);
  }

  get updater(){
    return {
      updateInfo(json,event){
        const {password, fullName, perEmail} = event.data;
        return {...data}
      }
    }
  }
}
