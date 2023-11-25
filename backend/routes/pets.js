const express = require("express");

const extractFile = require("../middleware/file");
const checkAuth = require("../middleware/check-auth");

const PetController = require("../controllers/pet");
const router = express.Router();

router.post("", checkAuth, extractFile, PetController.createPet);
router.get("", PetController.getPets);
router.get("/:id", PetController.getPet);
router.delete("/:id", checkAuth, PetController.deletePet);
router.put("/:id", checkAuth, extractFile, PetController.updatePet);

module.exports = router;
