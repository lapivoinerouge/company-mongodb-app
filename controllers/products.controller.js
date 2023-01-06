const Product = require('../models/product.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Product.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getRandom = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const data = await Product.findOne().skip(rand);
    if(!data) res.status(404).json({ message: 'Product not found' });
    else res.json(data);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getById = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    if(!data) res.status(404).json({ message: 'Product not found' });
    else res.json(data);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.post = async (req, res) => {
  try {
    const { name, client } = req.body;
    const newProduct = new Product({ name: name, client: client });
    await newProduct.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.put = async (req, res) => {
  const { name, client } = req.body;
  try {
    await Product.updateOne({ _id: req.params.id }, { $set: { name: name, client: client }});
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.delete = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    if(data) {
      await Product.deleteOne({ _id: req.params.id });
      res.status(204).json(data);
    }
    else res.status(404).json({ message: 'Product not found' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}
