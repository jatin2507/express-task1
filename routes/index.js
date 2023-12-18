let routes = require("express").Router();
let { user } = require("../Models");
const JoiSchema = require("../Validator/index.js");
let validateBody = require("../utils/middleware.js");

// User Search BY name
routes.get("/retrive", validateBody(JoiSchema), async (req, res) => {
  try {
    let query = {};
    if (req.query.id) query.userId = req.query.id;
    //with using Paginate plugin of mongoose
    // let options = { page: parseInt(req.query.page) || 1, limit: parseInt(req.query.limit) || 10 };
    // if (req.query.sort) options.sort = { age: req.query.sort };
    // const users_data = await user.paginate(query, options);

    // Without using Paginate plugin of mongoose

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalDocs = await user.countDocuments();
    const totalPages = Math.ceil(totalDocs / limit);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;
    const prevPage = hasPrevPage ? page - 1 : null;
    const nextPage = hasNextPage ? page + 1 : null;
    const pagingCounter = skip + 1;

    const docs = await user
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ age: parseInt(req.query.sort) || 1 });
    res.send({ error: false, data: docs, code: 200, message: "Data Retrive sucseed" });
  } catch (error) {
    console.log("error In User Search By Name :", error);
    res.send({ error: true, data: error.message || "", code: 500, message: "Data Retrive failed" });
  }
});

// User Create
routes.get("/seeder-run", async (req, res) => {
  try {
    let users = [];
    for (let i = 0; i < 100; i++) {
      users.push({
        name: `User ${i}`,
        age: Math.floor(Math.random() * 100),
        userId: Math.floor(1000 + Math.random() * 9000),
      });
    }
    await user.insertMany(users);
    res.send({ error: false, data: "", code: 200, message: "Data created sucseed" });
  } catch (error) {
    console.log("error In user created By Name :", error);
    res.send({ error: true, data: error.message || "", code: 500, message: "Data creation failed" });
  }
});

module.exports = routes;
