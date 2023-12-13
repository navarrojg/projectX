const Pet = require("../models/pet");

exports.createPet = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const pet = new Pet({
    name: req.body.name,
    sex: req.body.sex,
    age: req.body.age,
    breed: req.body.breed,
    imagePath: url + "/images/pets-images/" + req.file.filename,
    creator: req.userData.userId,
  });
  pet
    .save()
    .then((createdPet) => {
      res.status(201).json({
        message: "Pet added!",
        pet: {
          ...createdPet,
          id: createdPet._id,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Creating pet failed! :(",
      });
    });
};

exports.getPets = (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const petQuery = Pet.find();
  let fetchedPets;
  if (pageSize && currentPage) {
    petQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  petQuery
    .then((documents) => {
      fetchedPets = documents;
      return Pet.countDocuments();
    })
    .then((count) => {
      res.status(200).json({
        message: "Pets fetched!!",
        pets: fetchedPets,
        maxPets: count,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching pet failed!",
      });
    });
};

exports.deletePet = (req, res, next) => {
  Pet.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Pet deleted!" });
      } else {
        res.status(401).json({ message: "Not authorized!!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Deleting pet failed!",
      });
    });
};

exports.updatePet = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/pets-images/" + req.file.filename;
  }
  const pet = new Pet({
    _id: req.body.id,
    name: req.body.name,
    sex: req.body.sex,
    age: req.body.age,
    breed: req.body.breed,
    imagePath: imagePath,
    creator: req.userData.userId,
  });
  Pet.updateOne({ _id: req.params.id, creator: req.userData.userId }, pet)
    .then((result) => {
      if (result.matchedCount > 0) {
        res.status(200).json({ message: "Update successfull!" });
      } else {
        res.status(401).json({ message: "Not authorized!!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldnt update post!",
      });
    });
};

exports.getPet = (req, res, next) => {
  Pet.findById(req.params.id)
    .then((pet) => {
      if (pet) {
        res.status(200).json(pet);
      } else {
        res.status(404).json({ message: "Pet not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching pet failed!",
      });
    });
};

exports.addComment = (req, res, next) => {
  const petId = req.params.id;
  const newComment = req.body.comment;

  Pet.findById(petId)
    .then((pet) => {
      if (!pet) {
        return res.status(404).json({ message: "Pet not found!" });
      }

      pet.comments.push(newComment);
      return pet.save();
    })
    .then((updatedPet) => {
      res
        .status(200)
        .json({ message: "Comment added successfully!", pet: updatedPet });
    })
    .catch((error) => {
      res.status(500).json({ message: "Adding comment to pet failed!" });
    });
};
