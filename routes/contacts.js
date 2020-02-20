const router = require('express').Router();
let Contact = require('../models/contact.model');

router.route('/').get(async (req, res) => {
  try {
    console.log('test!');
    const { email, telephone } = req.body;
    const contact = new Contact({ email, telephone });
    contact.save();
    return res.json(await contact.toClient());
  } catch (error) {
    console.log(error);
  }
});

router.route('/add').post(async (req, res) => {
  try {
    const { email, telephone } = req.body;
    const contact = new Contact({ email, telephone });
    contact.save();
    return res.json(await contact.toClient());
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
