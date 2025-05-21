const locationController = require("../controllers/LocationController");
const express = require("express");
const router = express.Router();

router.post("/create", locationController.createLocation);
router.get("/", locationController.getLocations);
router.get("/:id", locationController.getLocationById);
router.put("/update/:id", locationController.updateLocation);
router.delete("/delete/:id", locationController.deleteLocation);

module.exports = router;
