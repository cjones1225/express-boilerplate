const PetsService = {
  getAllPets(knex) {
    return knex
      .select('*')
      .from('youdirtydog_pet')
  },

  getPetById(knex, id) {
    return knex
      .from('youdirtydog_pet')
      .select('*')
      .where('id', id)
      .first()
  },

  insertPet(knex, newPet) {
    return knex
      .insert(newPet)
      .into('youdirtydog_pet')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  deletePet(knex, id) {
    return knex
      .from('youdirtydog_pet')
      .where({ id })
      .delete()
  },

  updatePet(knex, id, newPet) {
    return knex
      .from('youdirtydog_pet')
      .where({ id })
      .update(newPet)
  }
}

module.exports = PetsService