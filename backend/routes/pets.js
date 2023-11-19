const express = require("express");

const extractFile = require("../middleware/file");

const PetController = require("../controllers/pet");
const router = express.Router();

router.post("", extractFile, PetController.createPet);
router.get("", PetController.getPets);
router.get("/:id", PetController.getPet);
router.delete("/:id", PetController.deletePet);
router.put("/:id", extractFile, PetController.updatePet);

module.exports = router;
