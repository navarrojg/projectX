const Pet = require("../models/pet");

exports.createPet = (req, res, next) => {
  const pet = new Pet({
    name: req.body.name,
    sex: req.body.sex,
    age: req.body.age,
    breed: req.body.breed,
  });
  console.log(pet);
  res.status(201).json({ message: "Pet added!" });
};

exports.getPets = (req, res, next) => {
  const pets = [
    { id: "dsfsdfds", name: "Max", sex: "M", age: 12, breed: "german shepard" },
    { id: "fdsfdsf", name: "Alex", sex: "F", age: 5, breed: "german shepard" },
    { id: "erettre", name: "Misty", sex: "F", age: 2, breed: "german shepard" },
  ];
  res.status(200).json({
    message: "Pets fetched!!",
    pets: pets,
  });
};
