import mongoose from "mongoose";

function isValidObjectId(id) {
    if (!id) {
        return false;
    }
    return mongoose.Types.ObjectId.isValid(id);
}


export {
    isValidObjectId
}