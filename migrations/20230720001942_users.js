/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    knex.schema.hasTable("users").then(function (exists) {
        if (!exists) {
            return knex.schema.createTable("users", function(table){
                table.increments("id").primary()
                table.string("name").notNullable()
                table.string("email").notNullable()
            })
        }
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.hasColumn("users").then(function(exists){
        if(exists){
            return knex.schema.dropTable("users")
        }
    })
};
