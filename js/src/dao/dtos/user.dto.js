export class GetuserDTO {
    constructor(user) {
        this.name = user.name;
        this.email = user.email;
        this.age = user.age;
        this.role= user.role;
        // this.cart = user.cart;
    }
}