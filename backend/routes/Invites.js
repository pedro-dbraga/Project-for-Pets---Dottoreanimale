import express from "express"; 

const router = express.Router();

import authmiddleware from "../middleware/auth.js";

import InviteController from "../controllers/InviteController.js";


router.use(authmiddleware);

router.post("/families/:familyId/createinvite", InviteController.InviteMember);

router.get("/showInvites",InviteController.listInvites);

router.put("/:id/inviteRes", InviteController.acceptInvite);

router.delete("/:id/families/:familyId", InviteController.deleteInvite);



export default router;