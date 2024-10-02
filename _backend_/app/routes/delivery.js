const express = require("express");
const router = express.Router();
const del_ctrl = require('../controllers/api/delivery');

router.get('/delivery', del_ctrl.read_all_deliveries)
router.get('/delivery/:id', del_ctrl.read_delivery_by_id)
router.post('/delivery/:id', del_ctrl.create_delivery_by_id)
router.put('/delivery/:id', del_ctrl.update_delivery_by_id)
router.delete('/delivery/:id', del_ctrl.delete_delivery_by_id)
module.exports = router;