import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
import {DbBurger} from '../db/DbBurger'

//makes id start at 0 to match array index
let id=0

class BurgersService {

    //gets all burgers
    getAll() {
        return DbBurger.burgers
    }

    //gets one burger
    getOne(id) {
        const foundBurger = findBurger(id)
        return foundBurger
    }

    //when creating a new burger, add 1 to ID and give it to the new burger, then store it to DB
  async create(newBurger) {
    newBurger.id = id++
    DbBurger.burgers.push(newBurger)
    return newBurger
  }

  //loops through arrays values to make foundburger's keys equal to editedBurger's keys
  edit(editedBurger, id) {
      const foundBurger = findBurger(id)
      Object.keys(editedBurger).forEach(key => {
          foundBurger[key] = editedBurger[key]
      })
      return foundBurger
  }

  //filters the one desired to be deleted out by its id
  delete(id) {
      findBurger(id)
      DbBurger.burgers = DbBurger.burgers.filter(b => b.id != id)
  }
}

//finds burger, if not, returns empty
function findBurger(id) {
    let foundBurger = DbBurger.burgers.find(b => b.id == id)
    if(!foundBurger) return;
    return foundBurger;
}

export const burgersService = new BurgersService();