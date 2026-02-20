import InviteService from "../service/InviteService.js";


async function InviteMember(req, res) {
    const familyId = req.params.familyId;
    const userId = req.user.id;
    const { email, role } = req.body;

    try {
        const inviteMember = await InviteService.createInvite(userId, familyId, email, role);
        res.status(201).json(inviteMember);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function acceptInvite(req, res) {
    const userId = req.user.id;
    const id = req.params.id
    const { status, token} = req.body;

    try {
        const result = await InviteService.acceptInvite(id, userId, status, token);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteInvite(){
    const {id, familyId} = req.params;
    const userId = req.user.id;

    try{
        await InviteService.DeleteInvite(id, userId, familyId);

        res.status(204).json("Convite Deletado!");
    } catch(error){
        res.status(500).json({ error: error.message });
    }
}

export default {InviteMember, acceptInvite, deleteInvite};