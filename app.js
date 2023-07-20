const express = require('express')
const app = express()
const connection = require('./knexfile')['development']
const db = require('knex')(connection)

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        saludo: "Hello world"
    })
})

app.get('/tasks', (req, res) => {
    db('tasks').then((tasks) => {
        res.json(tasks)
    })
})

app.get('/tasks/:id', (req, res) => {
    const { id } = req.params
    db('tasks')
        .where({ task_id: id })
        .then((task) => {
            res.json(task)
        })
})

app.post('/tasks', (req, res) => {
    const toCreate = req.body
    db('tasks').insert(toCreate)
        .then((task) => {
            res.json(task)
        })
})
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params
    const toEdit = req.body
    db('tasks')
        .where({ task_id: id })
        .update(toEdit)
        .then((task) => {
            res.json(task)
        })
})
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params
    db('tasks')
        .where({task_id: id})
        .del()
        .then((task)=>{
            res.json(task)
        })
})
app.listen(3000, () => {
    console.log("Running on port 3000")
})