import { loginUser, registerUser, getUser, updateUser, deleteUser } from "../controllers/userController.js";

const socialRoutes = (app) => {

    // Auth Routes
    app.route('/register')
        .post(registerUser);
    
    app.route('/login')
        .post(loginUser);

    // User Routes
    app.route('/user/:id')
        .get(getUser)
        .put(updateUser)
        .delete(deleteUser);
}

export default socialRoutes;