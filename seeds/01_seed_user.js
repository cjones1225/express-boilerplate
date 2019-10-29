
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('youdirtydog_user').del()
    .then(function () {
      // Inserts seed entries
      return knex('youdirtydog_user').insert([
        {full_name: 'Melinda Briggs', user_name: 'MBriggs01', password: 'pw'},
        {full_name: 'Jeff Star', user_name: 'JStar', password: 'pw'}
      ]);
    });
};
