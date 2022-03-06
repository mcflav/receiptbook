import { Users } from '../models/users.model';
import { Subject } from 'rxjs';

export class UsersService {
    private users: Users[] = [];
    private usersChanged = new Subject<Users[]>();

    getUsers(){
      return this.users.slice();
    }

    getUser(email: string) {
        const user = this.users.find(
            (u) => {
                return u.email === email;
            }
        );
        return user;
    }

    addUser(userinfo: {email: string, password: string, firstname: string, lastname: string}){
        this.users.push({email: userinfo.email, password: userinfo.password, firstname: userinfo.firstname,
          lastname: userinfo.lastname});
        this.usersChanged.next(this.users.slice());
    }

    setUsers(users: Users[]) {
        this.users = users;
        this.usersChanged.next(this.users.slice());
    }
}
