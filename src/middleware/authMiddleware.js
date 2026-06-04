// src/middleware/authMiddleware.js
//
// Guards /api routes that require an authenticated admin. After a successful
// login through the AdminJS form, AdminJS stores the current admin in
// req.session.adminUser (in the SHARED session store — see config/session.js),
// so this middleware can read it on /api routes too.

export const isAdminAuthenticated = (req, res, next) => {
    const adminUser = req.session?.adminUser;

    if (adminUser && adminUser.id && adminUser.email) {
        req.user = { id: adminUser.id, email: adminUser.email };
        return next();
    }

    return res.status(401).json({ message: 'Unauthorized: Admin access required.' });
};

export default isAdminAuthenticated;