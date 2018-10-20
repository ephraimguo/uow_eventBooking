/**
 * @ author: Group JS
 * @ Version 1.0.0
 * @ User Attributes:
 *  username
 *  fullname
 *  password
 *  course
 *  year of study
 *  perEmail
 *  phoneNo
 * */

const {Actor} = require("cqrs");

module.exports = class User extends Actor{

  static getUniqueFields(){
    return ['username'];
  }

  static beforeCreate(data, domain, uniqueOk, holdedFileds){
    let errors = {}

    if(!uniqueOk){
      errors = {username: "Username is not available"}
    }

  }

  constructor(data){
     super({
       name: data.name,
       createTime: Date.now()
     });
  }

  changeName(name){
    this.$(name);
  }

  get updater(){
    return {
      changeName(json,event){
        return {
          name: event.data
        }
      }
    }
  }
}
