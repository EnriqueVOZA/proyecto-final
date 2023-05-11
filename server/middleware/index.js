module.exports = {

    rejectUser:
        (...rolesToCheck) =>
            (req, res, next) => {

                if (req.session) {

                    req.session?.currentUser && !rolesToCheck.includes(req.session?.currentUser?.role)
                        ? next()
                        : res.redirect('/', { code: 401, message: 'Restricted Area' })

                } else {

                    res.redirect('/', { code: 401, message: 'Restricted Area' })

                }
            },
}