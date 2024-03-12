import argon from 'argon2'

const hashPassword = async(password)=>{
        const hash = await argon.hash(password);
        return hash
    } 
    
const verifyPassword = async(hashedPwd, password)=>{
    if(await argon.verify(hashedPwd, password)){
            return true;
    }else{
        return false;
    }
}

export {
    hashPassword, verifyPassword
}