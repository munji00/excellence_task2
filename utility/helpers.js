import bcrypt from 'bcrypt';
const salt_value = 10;

export const hash_password = async(plain_password)=>
{
   return await bcrypt.hash(plain_password, salt_value);
}

export const compare_password=(password, hash) => {
    return  bcrypt.compare(password, hash);
}