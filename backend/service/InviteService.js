import InviteModel from "../models/InviteModel.js"
import MemberModel from "../models/memberModel.js";

import { v4 as uuidv4 } from "uuid";
import crypto, { verify } from "crypto";
import pool from "../db.js";

async function createInvite(userId, familyId, email, role){

    const createToken = crypto.randomBytes(6).toString("hex").substring(0, 8);

    const invite = {id: uuidv4(), userId, familyId, email, role, createToken};

    const result = await InviteModel.InviteMember(invite);

    if (result.affectedRows === 0){
        throw new Error("Usuario sem permição")
    }

    return (invite.id, invite.createToken);
}

async function acceptInvite(id, userId, status, token){

    const connection = await pool.getConnection();

    try{
        await InviteModel.acceptInvite(id, status,token, connection);

        if(status === "ACCEPTED"){
            const [infos] = await InviteModel.getFamilyFromAInvite(id, connection);
            
            await MemberModel.createMember(infos.familyId,userId, infos.role, connection );
        }
        
        
        await connection.commit();

        return status ? infos.familyId : null;
    }   catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }

}

async function DeleteInvite(id, userId, familyId){
    const result = await InviteModel.DeleteInvite(id, userId, familyId);

    if(result.affectedRows === 0) {
        throw new Error("Usuario não encontrado!");
    }
}


export default {createInvite, acceptInvite, DeleteInvite};