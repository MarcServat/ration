module.exports = {


  friendlyName: 'Destroy one thing',


  description: 'Delete the "thing" with specified ID from the database',


  inputs: {
    id: {
      type: 'number',
      required: true
    }
  },


  exits: {
    forbidden: {
      description: 'The user making this request doesn\'t have the permission to delete this thing.',
      responseType: 'forbidden'
    }

  },


  fn: async function (inputs, exits) {

    var thing = await Thing.findOne({
      id: inputs.id
    });

    if(thing.owner !== this.req.me.id) {
      throw 'Forbidden';
    }

    await Thing.destroyOne({id: inputs.id});

    return exits.success();

  }


};
