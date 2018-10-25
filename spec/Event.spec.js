// declare new Domain
const {Domain} = require('cqrs');
const domain = new Domain();
const Event = require('../actors/Event');
const evtData = require('./dataSample/eventModel');
domain.register(Event);

describe('# Event testing #', function (){
  it('## creating test ##', async function(){
    let errors = {}

    const evt1 = await  domain.create('Event', evtData.evt1);

    expect(!!evt1).toBeTruthy();


    const evt2 = await domain.create('Event', evtData.evt2);
    expect(!!evt2).toBeTruthy();

    try{
      const evt3_dup = await domain.create('Event', evtData.evt1);
    }
    catch(err){
      errors = {...err}
    }

    expect(errors).toEqual(jasmine.objectContaining(
      {dupTimeAndVenue: 'TIME AND VENUE CONFLICT WITH OTHER EVENT, PLEASE CHANGE TIME'}
    ));


    errors = {}
    try {
     await evt2.updateInfo(evtData.evt1, 'testing---dummy');
    }
    catch(err){
      errors = {...err}
    }

    expect(errors).toEqual(jasmine.objectContaining(
      {dupTimeAndVenue: 'TIME AND VENUE CONFLICT WITH OTHER EVENT, PLEASE CHANGE TIME'}
    ));
  });
});