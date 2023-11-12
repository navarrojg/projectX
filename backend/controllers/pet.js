const Pet = require("../models/pet");

exports.createPet = (req, res, next) => {
  const pet = new Pet({
    name: req.body.name,
    sex: req.body.sex,
    age: req.body.age,
    breed: req.body.breed,
  });
  pet.save();
  // .then((createdPet) => {
  //   res.status(201).json({
  //     message: "Pet added!",
  //     pet: {
  //       ...createdPet,
  //       id: createdPet._id,
  //     },
  //   });
  // })
  // .catch((error) => {
  //   res.status(500).json({
  //     message: "Creating post failed! :(",
  //   });
  // });

  console.log(pet);
  res.status(201).json({ message: "Pet added!" });
};

exports.getPets = (req, res, next) => {
  Pet.find()
    .then((documents) => {
      res.status(200).json({
        message: "Pets fetched!!",
        pets: documents,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching posts failed!",
      });
    });
};
