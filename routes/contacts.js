const router = require('express').Router();
let Contact = require('../models/contact.model');

router.route('/').get(async (req, res) => {
  try {
    let contacts = await Contact.find();
    contacts = await Promise.all(contacts.map(contact => contact.toClient()));
    return res.json({ contacts });
  } catch (error) {
    console.log(error);
  }
});

router.route('/add').post(async (req, res) => {
  try {
    const { email, telephone } = req.body;
    console.log(email, telephone);

    const existingContact = await Contact.find({ email });
    if (existingContact.length === 0) {
      console.log('creating contact!');
      const contact = new Contact({ email, telephone });
      contact.save();
      return res.json(await contact.toClient());
    }
    return res.status(409).json({ error: 'Duplicate email' });
  } catch (error) {
    console.log(error);
    return res.data;
  }
});

module.exports = router;
