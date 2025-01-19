import User from "@entity/User";
import { AppDataSource } from "@databases/data-source";
const userRepository = AppDataSource.getRepository(User)

class UserService{
    static async getAllUsers(): Promise<User[]>{
        const data: any = await userRepository.find()
        // console.log(data);
        return data;
    }
    static async createUser(data: any){
        const { firstName, lastName, isActive } = data;
        const u1 : User = new User();
        u1.firstName = firstName;
        u1.lastName = lastName;
        u1.isActive = isActive;
        return await userRepository.save(u1);
    }
    static async updateUser(id: number, data: any, method: string): Promise<User>{
        const { firstName, lastName, isActive } = data; 
        const user = await userRepository.findOne({where: {id}});

        if(!user){
            throw new Error("User not found");
        }
        
        if(method === "PUT"){
            if (!firstName || !lastName || typeof isActive !== 'boolean') {
                throw new Error("Missing required fields for PUT");
            }
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.isActive = isActive || user.isActive;
            return await userRepository.save(user);
        } else if(method === "PATCH"){
            user.firstName = firstName ?? user.firstName;
            user.lastName = lastName ?? user.lastName;
            user.isActive = isActive ?? user.isActive;
            return await userRepository.save(user);
        }

        return await userRepository.save(user);
    }

    static async deleteUser(id: number): Promise<void>{
        const user = await userRepository.findOne({where: {id}});
        if(!user){
            throw new Error("User not found");
        }
        await userRepository.remove(user);
    }
}

export default UserService;