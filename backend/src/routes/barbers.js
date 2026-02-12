import express from 'express'
import barberController from '../controllers/barber.js'

const router = express.Router()

router.get('/', barberController.getAll)
router.get('/:id', barberController.getById)
router.post('/', barberController.create)
router.put('/:id', barberController.update)
router.delete('/:id', barberController.delete)

export default router
