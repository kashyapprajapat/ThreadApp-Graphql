import UserService, { CreateUserPayload } from "../../services/user";

const queries = {
    getUserToken : async(_:any,payload: {email:string,password:string}) =>{
        const token = await UserService.getUserToken({
            email:payload.email,
            password:payload.password
        })
        return token;
    },
    getCurrentLoggedInUser: async(_:any,parametrs:any,context:any) =>{
        if(context && context.user){
            const id  = context.user.id
            const user = await UserService.getUserByID(id);
            return user
        }
       throw new Error("I doont Know")
    }
}
const mutaions = {
    createUser : async(_:any,payload:CreateUserPayload) =>{
        const res = await UserService.createUser(payload);
        return res.id;
    }
}

export const resolvers = {  queries , mutaions};