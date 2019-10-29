
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('youdirtydog_customer').del()
    .then(function () {
      // Inserts seed entries
      return knex('youdirtydog_customer').insert([
        {full_name: 'John Doe', phone_number: '(324)1456578', user_id: 2},
        {full_name: 'Bert Cox', phone_number: '984-756-4521', user_id: '1'},
        {full_name: 'Alyssa Smucker', phone_number: '(498)-677-1546', user_id: 1}
      ]);
    });
};
/* 
('John Doe', '(324)1456578'),
    ('Bert Cox', '984-756-4521'),
    ('Alyssa Smucker', '(498)-677-1546')
*/