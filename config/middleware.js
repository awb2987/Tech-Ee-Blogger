// Middleware to check if a user is logged in
function withAuth(req, res, next) {
    if (!req.session.user_id) {
        res.status(401).redirect('/login'); // Redirect to login if not authenticated
    } else {
        next(); // Proceed to the next middleware or route handler
    }
}

module.exports = {
    withAuth,
};
