// declare new Domain
const {Domain} = require('cqrs');
const domain = new Domain();
const User = require('../actors/User');
domain.register(User);

describe('# User test #', function(){
  it('## normal creation', async function(){
    let userInfo = {
      username: 'testing',
      password: 'testingPass',
      perEmail: 'ephraimguo@gmail.com'
    }

    let errors = {}
    let user1 = null;

    user1 = await domain.create("User", userInfo);
    expect(!!user1).toBeTruthy();

    let user2 = null;
    errors = {}

    try{
      user2 = await domain.create('User', userInfo);
    }
    catch(err){
      errors = {...err}
    }
    expect(errors).toEqual(jasmine.objectContaining({
      username: "Username is not available"
    }));
  })
});