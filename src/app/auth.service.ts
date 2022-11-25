// this just an emulation for the authntication process //

export class AuthService {

    loggedIn:boolean = false;
    isAuthenticated(){
        const promise = new Promise(
            (respond , reject)=>{
                setTimeout(() => {
                     respond(this.loggedIn)   
                }, 800);
            }
        )
        return promise;
    }
    logIn(){
        this.loggedIn= true;
    }

    logOut(){
        this.loggedIn= false;
    }

}