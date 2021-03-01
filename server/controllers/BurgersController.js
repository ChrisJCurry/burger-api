import express from "express";
import BaseController from "../utils/BaseController";
import { burgersService } from "../services/BurgersService";
import {DbBurger} from '../db/DbBurger'

export class BurgersController extends BaseController {
  constructor() {
    super("api/burgers");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getOne)
      .post("", this.create)
      .delete("/:id", this.delete)
      .put("/:id", this.edit);
  }

  //req, res, next in order
  async getAll(req, res, next) {
    try {
      const burgers = burgersService.getAll()
      res.send(burgers)
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
        res.send(burgersService.getOne(req.params.id))
    }catch(err) {
        next(err)
    }
  }
  async create(req, res, next) {
    try {
        let newBurger = req.body //gets body of request and turns it into new burger, then gives it to create in Service
        const burger = burgersService.create(newBurger)
        res.send({data: burger, message:"Burger created!", count: DbBurger.burgers.length});
    } catch (error) {
      next(error);
    }
  }

  //async currently doesnt do anything, once we use separate DBs it will
  async edit(req, res, next) {
      try {
          let editedBurger = req.body
          const burger = burgersService.edit(editedBurger, req.params.id)
          res.send(burger)
      }catch(err) {
          next(err)
      }
  }

  delete(req, res, next) {
    try {
        const id = req.params.id //gets id of request parameter and gives it to delete in the Service
        burgersService.delete(id)
        res.send("Burger deleted")
    }catch(err) {
        next(err)
    }
  }
}
