import sql from 'mssql';
import config from '../Db/config.js';

// Login  required Middleware
export const loginRequired = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, config.jwt_secret, (err, decoded) => {
            if (decoded) {
                next();
            } else {
                res.status(401).json({ message: 'Please login first' });
            }
        });
    } catch (error) {
        res.status(401).json({ message: 'Please login first' });
    }
}

// Register a new user
export const registerUser = async (req, res) => {
    const { firstName, lastName, email, location, occupation, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('firstName', sql.VarChar, firstName)
            .input('lastName', sql.VarChar, lastName)
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Users WHERE email = @email)');
            const user = result.recordset[0];
            if (user) {
                res.status(409).json({ message: 'Email already exists' });
            } else {
                await pool.request()
                    .input('firstName', sql.VarChar, firstName)
                    .input('lastName', sql.VarChar, lastName)
                    .input('email', sql.VarChar, email)
                    .input('location', sql.VarChar, location)
                    .input('occupation', sql.VarChar, occupation)
                    .input('password', sql.VarChar, hashedPassword)
                    .query('INSERT INTO Users (firstName, lastName, email, location, occupation, password) VALUES (@firstName, @lastName, @email)');
                res.status(201).json({ message: 'User created successfully' });
            }
    } catch (error) {
        res.status(500).json({ Message: `Failed to create the user. ${error.message}`});
    } finally {
        sql.close();
    }
}

// Login a registered user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    let pool = await sql.connect(config);
    let result = await pool.request()
        .input('email', sql.VarChar, email)
        .query('SELECT * FROM Users WHERE email = @email)');
    const user = result.recordset[0];
    if (!user) {
        res.status(401).json({ message: 'Invalid User' });
    } else {
        if (!bcrypt.compareSync(password, user.password)) {
            res.status(401).json({ message: 'Invalid Credentials' });
        } else {
            const token = `JWT ${jwt.sign({ firstName: user.firstName, email: user.email }, config.jwt_secret)}`;
            res.status(200).json({ id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, token: token });
        }
    }
}

// Get a user
export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Users WHERE id = @id)');
        const user = result.recordset[0];
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ Message: `Failed to get the user. ${error.message}`});
    } finally {
        sql.close();
    }
}

// Update a user
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, location, occupation, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Users WHERE id = @id)');
        const user = result.recordset[0];
        if (user) {
            await pool.request()
                .input('id', sql.Int, id)
                .input('firstName', sql.VarChar, firstName)
                .input('lastName', sql.VarChar, lastName)
                .input('email', sql.VarChar, email)
                .input('location', sql.VarChar, location)
                .input('occupation', sql.VarChar, occupation)
                .input('password', sql.VarChar, hashedPassword)
                .query('UPDATE Users SET firstName = @firstName, lastName = @lastName, email = @email');
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ Message: `Failed to update the user. ${error.message}`});
    } finally {
        sql.close();
    }
}

// Delete a user
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Users WHERE id = @id)');
        const user = result.recordset[0];
        if (user) {
            await pool.request()
                .input('id', sql.Int, id)
                .query('DELETE FROM Users WHERE id = @id');
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ Message: `Failed to delete the user. ${error.message}`});
    } finally {
        sql.close();
    }
}