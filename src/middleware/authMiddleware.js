export const isAdminAuthenticated = (req, res, next) => {
    if (req.session && req.session.adminUser && req.session.adminUser.id) {
        req.user = {
            id: req.session.adminUser.id,
            email: req.session.adminUser.email
        };
        console.log('Admin Authenticated:', req.user);
        return next();
    }
    console.warn('Admin Unauthenticated Attempt');
    return res.status(401).json({ message: 'Unauthorized: Admin access required.' });
};