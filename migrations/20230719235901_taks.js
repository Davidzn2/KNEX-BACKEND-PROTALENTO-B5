/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.hasTable("tasks").then(function (exists) {
        if (!exists) {
            return knex.schema.createTable("tasks", function(table){
                table.increments("task_id").primary()
                table.string("title").notNullable()
                table.string("description")
                table.boolean("done").defaultTo(false)
            })
        }
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.hasColumn("taks").then(function(exists){
        if(exists){
            return knex.schema.dropTable("tasks")
        }
    })
};
