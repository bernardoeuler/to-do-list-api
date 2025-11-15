import crypto from "node:crypto";
import express from "express"
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT ?? 3000

const database = {
    tasks: [
        {id: "8a76ec78a4c8469687ff427ba7b4615d", description: "Comprar pão", status: "Pending", createdAt: 1763236144826}
    ]
}

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "." })
})

app.get("/tasks", (req, res) => {
    res.send(database.tasks)
})

app.post("/tasks", (req, res) => {
    if (!req.body) {
        res.status(400).send({ error: "No data provided" })
        return
    } else if (!req.body.description) {
        res.status(400).send({ error: "No description provided" })
        return
    } else if (!req.body.status) {
        res.status(400).send({ error: "No status provided" })
        return
    } else if (typeof req.body.description !== "string") {
        res.status(400).send({ error: "Description must be of type string" })
        return
    } else if (typeof req.body.status !== "string") {
        res.status(400).send({ error: "Status must be of type string" })
        return
    } else if (req.body.status in ["Pending", "Done"]) {
        res.status(400).send({ error: "Status must be either \"Pending\" or \"Complete\"" })
        return
    }if (!req.body) {
        res.status(400).send({ error: "No data provided" })
        return
    } else if (!req.body.description) {
        res.status(400).send({ error: "No description provided" })
        return
    } else if (!req.body.status) {
        res.status(400).send({ error: "No status provided" })
        return
    } else if (typeof req.body.description !== "string") {
        res.status(400).send({ error: "Description must be of type string" })
        return
    } else if (typeof req.body.status !== "string") {
        res.status(400).send({ error: "Status must be of type string" })
        return
    } else if (req.body.status in ["Pending", "Done"]) {
        res.status(400).send({ error: "Status must be either \"Pending\" or \"Complete\"" })
        return
    }

    const id = crypto.randomUUID().replaceAll("-","")
    const { description, status } = req.body
    const createdAt = Date.now()

    database.tasks.push({ id, description, status, createdAt })

    res.status(201).send({ message: "Task created successfully" })
})

app.patch("/tasks/:id", (req, res) => {
    if (!req.body) {
        res.status(400).send({ error: "No data provided" })
        return
    } else if (req.body.description && typeof req.body.description !== "string") {
        res.status(400).send({ error: "Description must be of type string" })
        return
    } else if (req.body.status && typeof req.body.status !== "string") {
        res.status(400).send({ error: "Status must be of type string" })
        return
    } else if (req.body.status && req.body.status in ["Pending", "Done"]) {
        res.status(400).send({ error: "Status must be either \"Pending\" or \"Complete\"" })
        return
    }

    const { id } = req.params
    const { description, status } = req.body
    const taskIndex = database.tasks.findIndex(task => task.id === id)

    if (description) database.tasks[taskIndex].description = description
    if (status) database.tasks[taskIndex].status = status

    res.status(200).send({ message: "Task updated successfully" })
})

app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params
    const taskIndex = database.tasks.findIndex(task => task.id === id)

    if (taskIndex === -1) {
        res.status(400).send({ error: "Provide a valid id" })
        return
    }

    const deletedTasks = database.tasks.splice(taskIndex, 1)
    console.log(deletedTasks)
    const deletedTask = deletedTasks ? deletedTasks[0] : null

    if (deletedTask) {
        res.status(200).send({ message: "Task deleted successfully", data: deletedTask })
    }
})

app.listen(PORT, (err) => {
    if (err) {
        console.error("Error initializing server: " + err)
    } else {
        console.log(`Server running on http://localhost:${PORT}`)
    }
})

function validateTask(req, res, next) {
    

    next()
}