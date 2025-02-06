import User from "@entity/User";
import Role from "@entity/Role";
import { AppDataSource } from "@databases/data-source";
const userRepository = AppDataSource.getRepository(User)
const roleRepository = AppDataSource.getRepository(Role)

class UserService{
    static async getAllUsers(): Promise<User[]>{
        const data: any = await userRepository.find()
        // console.log(data);
        return data;
    }
    static async createUser(data: any){
        const { firstName, lastName, email, password, isActive } = data;
        const u1 : User = new User();
        u1.firstName = firstName;
        u1.lastName = lastName;
        u1.isActive = isActive ? isActive: false;
        u1.email = email;
        u1.password = password;
        const role = await roleRepository.findOne({
            where:{id: 2}
        });
        if(role){
            u1.role = role;
        }
        return await userRepository.save(u1);
    }
    static async editUser(id: number, data: any, method: string): Promise<User>{
        const { firstName, lastName, isActive } = data; 
        const user = await userRepository.findOne({where: {id}});
        const status = isActive === 'on' || isActive === true; 

        if(!user){
            throw new Error("User not found");
        }
        
        if(method === "PUT"){
            if (!firstName || !lastName || typeof isActive !== 'boolean') {
                throw new Error("Missing required fields for PUT");
            }
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.isActive = status || user.isActive;
            return await userRepository.save(user);
        } else if(method === "PATCH"){
            user.firstName = firstName ?? user.firstName;
            user.lastName = lastName ?? user.lastName;
            user.isActive = status ?? user.isActive;
            return await userRepository.save(user);
        }

        return await userRepository.save(user);
    }
    static async getUserById(id: number){
        const user = await userRepository.findOne({where: {id}});
        if(!user){
            throw new Error("User not found");
        }
        return user;
    }

    static async deleteUser(id: number): Promise<void>{
        const user = await userRepository.findOne({where: {id}});
        if(!user){
            throw new Error("User not found");
        }
        await userRepository.remove(user);
    }

    static async getAccountByEmail(data: any): Promise<any>{
        const { email, password } = data;
        return await userRepository.findOne({
            where: { 
                email: email, 
                password: password 
            },
            relations:["role"],
        })
    }
}

export default UserService;