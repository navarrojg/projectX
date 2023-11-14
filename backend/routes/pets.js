const express = require("express");

const PetController = require("../controllers/pet");
const router = express.Router();

router.post("", PetController.createPet);
router.get("", PetController.getPets);
router.get("/:id", PetController.getPet);
router.delete("/:id", PetController.deletePet);
router.put("/:id", PetController.updatePet);

module.exports = router;
