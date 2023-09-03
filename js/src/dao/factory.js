import database from '../db.js'
import { persistenceType } from '../utils/commander.js'

export let productDAO, cartDAO, userDAO, messageDAO, ticketDAO

switch (persistenceType) {
  case 'MONGO':
    database.connect()
    const { product } = await import('./mongo/product.mongo.js')
    productDAO = product
    const { cart } = await import('./mongo/cart.mongo.js')
    cartDAO = cart
    const { user } = await import('./mongo/users.mongo.js')
    userDAO = user
    const { ticket } = await import('./mongo/ticket.mongo.js')
    ticketDAO = ticket
    break
  case 'FILESYSTEM':
    console.log("Using memory persistance. Not implemented yet");
    break
  default:
    throw new Error(
      `${persistenceType} is not a valid persistence type, you must select "MONGO" or "FILESYSTEM"`
    )
}
