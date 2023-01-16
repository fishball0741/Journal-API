import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.set('strictQuery', true)

async function dbClose(){
    await mongoose.connection.close();
    console.log("Database disconnected!");
}

//First 3 STEPS..

// 1.)   Connect to a MongoDB via Mongoose
// protocol: mongo, srv:server, username:password@cluster/network name
// normally this one will put into env file to protect the acc and pw.
// npm i mongoose first, then import. and copy and paste from the mongo connection string.
try{
    const m = await mongoose.connect(process.env.ATLAS_DB_URL)
    console.log(m.connection.readyState === 1 ? 'Mongoose Connected' : 'Mongoose failed to connect!')
  // === 1 mean if true,  ? mean it will... ,  : mean otherwise it will be...
}
catch (err) {
    console.log(err)
}


// 2.)    Create a MongooseSchema to define the structure of a model
const entrySchema = new mongoose.Schema({
  category: {type: mongoose.ObjectId, ref: 'Category'},    //ObjectId = mongoose's id (same in mongo website).    ref = similar FK(foreign key), need to reference who gonna link
  content: { type: String, required: true}  //reqired = cannot be empty
})


// 3.)    Create a Mongoose model based on the schema
const EntryModel = mongoose.model('Entry', entrySchema) // we can create different models in the same schema

//  Categories
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  // entries: [entrySchema]    // **make sure, ARRAY [] **  it's like a field.nest in python, can show the details of entries.
  // but need the entries ID and categories ID.
})

const CategoryModel = mongoose.model('Category', categorySchema)

// For Testing.
// CategoryModel.create({
//   name: 'Foo',
//   entries: [
//     {content: 'Bar'},

//   ]
// })

export { EntryModel, CategoryModel, dbClose }    // we dont need to export the schema, schema will do it in own file .