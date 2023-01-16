import express from 'express'
import { CategoryModel, EntryModel } from '../db.js' 

// a new express, Must be capital R
const router = express.Router()


router.get('/', async (req, res) => res.send(await EntryModel.find().populate({path: 'category', select: 'name'})))   //use the ID to show what's the id' object from.
// async await are using promise,  callback function: async.  find : find a document, () = all doc in Entry model

//Postman Get
router.get('/:id', async (req, res) => {
  try {
    const entry = await EntryModel.findById(req.params.id).populate({path: 'category', select: 'name'})
    if (entry) {   // if entry is truthy
      res.send(entry)   // it will response the entry model
    } else {  // otherwise 
      res.status(404).send({ error: 'Entry not found' })  // it will response the error
    }
  }
  catch (err) {   //other than that, not the problem with wrong entry id, such as Connection problem etc...
    res.status(500).send({ error: err.message })  //  it will response error 500 (server error)
  }

})

// Postman Put, update
router.put('/:id', async (req, res) => {
  const { category, content } = req.body
  const newEntry = { category, content }
  
  try {
        // because it must find it in schema and one more thing is needed to be updated. So, ID and UPDATE
    const entry = await EntryModel.findByIdAndUpdate(req.params.id, newEntry, { returnDocument: 'after' })
    if (entry) {    // if entry is truthy
      res.send(entry)   // it will response the entry model
    } else {    // otherwise 
      res.status(404).send({ error: 'Entry not found' })    // it will response the error
    }
  }
  catch (err) {   //other than that, not the problem with wrong entry id, such as Connection problem etc...
    res.status(500).send({ error: err.message })    //  it will response error 500 (server error)
  }
})


//Postman Delete

router.delete('/:id', async (req, res) => {
  try {
    const entry = await EntryModel.findByIdAndDelete(req.params.id)
    if (entry) {    // if entry is truthy
      res.sendStatus(204)     // after deleted, send the status. HTTP status code
    } else {    // otherwise 
      res.status(404).send({ error: 'Entry not found' })    // it will response the error
    }
  }
  catch (err) {   //other than that, not the problem with wrong entry id, such as Connection problem etc...
    res.status(500).send({ error: err.message })  //  it will response error 500 (server error)
  }

})

router.post('/', async (req, res) => {
  try {
    // 1. Create a new entry object with values passed in from the request
    const { category, content } = req.body  // req.body = express json, it means 2 objects in the body
    const categoryObject = await CategoryModel.findOne({ name: category })   // we can ignore every time, the ID may change, but it won't affect as we use by name
    const newEntry = { category: categoryObject._id, content }  // { category, content } = { category: category, content: content }
    // 2. Push the new entry to the entries array
    // entries.push(newEntry)
    const insertedEntry = await EntryModel.create(newEntry)   // need to wait for the return, so use await.
    // 3. Send the new entry with 201 status
    res.status(201).send(await insertedEntry.populate({path: 'category', select: 'name'}))
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// when it's default, the name is optional, so we don't ned to call entryRoutes
export default router