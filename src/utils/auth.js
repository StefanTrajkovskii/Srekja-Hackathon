// User storage and authentication utilities

export const registerUser = (userData) => {
    // Get existing users or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if username or email already exists
    const userExists = existingUsers.some(
        user => user.username === userData.username || user.email === userData.email
    );
    
    if (userExists) {
        throw new Error('Username or email already exists');
    }
    
    // Add new user
    const newUser = {
        ...userData,
        id: Date.now(), // Simple way to generate unique id
        createdAt: new Date().toISOString()
    };
    
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    // Store current user session
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return newUser;
};

export const loginUser = (credentials) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
        u => u.username === credentials.username && u.password === credentials.password
    );
    
    if (!user) {
        throw new Error('Invalid credentials');
    }
    
    // Store current user session
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    return user;
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
};

export const logoutUser = () => {
    localStorage.removeItem('currentUser');
};
