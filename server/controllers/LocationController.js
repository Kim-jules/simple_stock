const Location = require("../models/Location");

exports.createLocation = async (req, res) => {
  const { name, address } = req.body;
  try {
    const existingLocation = await Location.findOne({ name: name });
    if (existingLocation)
      return res.status(409).json({ message: "Location already exists." });
    const location = new Location({ name, address });
    await location.save();
    res.status(201).json(location);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLocationById = async (req, res) => {
  const { id } = req.params;
  try {
    const location = await Location.findById({ _id: id });
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }
    res.json(location);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLocation = async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;
  try {
    const location = await Location.findByIdAndUpdate(
      { _id: id },
      {
        name: name,
        address: address,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }
    res.json(location);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }
    res.json({ message: "Location deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
