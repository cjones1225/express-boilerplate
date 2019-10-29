const CustomersService = {
  getAllCustomers(knex) {
    return knex
      .select('*')
      .from('youdirtydog_customer')
  },

  getCustomerById(knex, id) {
    return knex
      .from('youdirtydog_customer')
      .select('*')
      .where('id', id)
      .first()
  },

  insertCustomer(knex, newCustomer) {
    return knex
      .insert(newCustomer)
      .into('youdirtydog_customer')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  deleteCustomer(knex, id) {
    return knex
      .from('youdirtydog_customer')
      .where({ id })
      .delete()
  },

  getPetsForCustomer(db, customer_id) {
    return db
      .from('youdirtydog_pet AS pet')
      .select(
        'pet.id',
        'pet.name',
        'pet.owner_id',
        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                SELECT
                  cust.id,
                  cust.full_name,
                  cust.phone_number
              ) tmp)
            )
          ) AS "owner"`
        )
      )
      .where('pet.owner_id', customer_id)
      .leftJoin(
        'youdirtydog_customer AS cust',
        'pet.owner_id',
        'customer.id',
      )
      .groupBy('pet.id', 'customer.id')
  },
  serializeCustomerPets(pet){
    const {customer} = pet
    return {
      id: pet.id,
      name: pet.name,
      customer_id: pet.owner_id,
      owner: {
        id: customer.id,
        full_name: customer.full_name,
        phone_number: customer.phone_number,
      }
    } 
  }
  
}

module.exports = CustomersService