import { CategoryModel, EntryModel, dbClose} from './db.js' 

//  SEED IS VERY USEFUL, WHEN YOU ARE DEBUGGING SOMTHING THEN WE CAN CLEAN ALL THE TEST  (NODE SEED.JS)

// same as python, drop first (clean data) (drop, create, seed)
await EntryModel.deleteMany()
console.log('Deleted all entries')
await CategoryModel.deleteMany()
console.log('Deleted all categories')

const categories = [
    { name: 'Food'},
    { name: 'Coding'},
    { name: 'Work'},
    { name: 'Other'}
]

// create
const cats = await CategoryModel.insertMany(categories)
// to make sure categories are successfully inserted
console.log('Inserted categories')


// we can't use category: 'food' etc, because it based on ObjectId, so we need to const the model, and put array to define each entries
const entries = [
  { category: cats[0], content: 'Hello!' },
  { category: cats[1], content: 'Express is cool!' },
  { category: cats[2], content: 'Another day at the office' }
]

//create
await EntryModel.insertMany(entries)
// to make sure entries are successfully inserted
console.log('Inserted entries')

dbClose()