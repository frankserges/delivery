const express = require("express");
const router = express.Router();
const pck_ctrl = require('../controllers/api/packages');

router.get('/package', pck_ctrl.read_all_packages)
router.get('/package/:id', pck_ctrl.read_package_by_id)
router.post('/package/:id', pck_ctrl.create_package_by_id)
router.put('/package/:id', pck_ctrl.update_package_by_id)
router.delete('/package/:id', pck_ctrl.update_package_by_id)
module.exports = router;