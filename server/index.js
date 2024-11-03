import express from 'express'
import cors from 'cors'
import todoRouter from './routers/todoRouter.js'
import userRouter from './routers/userRouter.js'
import { pool } from './helpers/db.js'



const port = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', todoRouter)
app.use('/user', userRouter)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({ error: err.message })
})
 

app.delete('/delete/:id', (req, res) => {

    const id = parseInt (req.params.id)
    pool.query('delete from task where id = $1',
    [id],
    (error, result) => {
        if (error) {
        return res.status(500).json({error: error.message})
        }
        return res.status(200).json({message: 'Task deleted successfully', id: id})
        }
    )
})


app.listen(port)