
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('youdirtydog_pet').del()
    .then(function () {
      // Inserts seed entries
      return knex('youdirtydog_pet').insert([
        {name: 'Rover', owner_id: '1'},
        {name: 'Fido', owner_id: '3'},
        {name: 'Lexi', owner_id: '2'}
      ]);
    });
};
