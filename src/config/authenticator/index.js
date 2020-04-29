const NoneSecureRoutes = ['/globo', '/g1']
export default async (req, res, next) => {
    if (NoneSecureRoutes.some(route => req.path.includes(route))) return next()
    let token = req.headers['authorization']
    if (token) {
        try {
            let user
            if (token.includes('Basic')) {
                token = token.split('Basic ')[1].trim()
                token = new Buffer.from(token, 'base64').toString('ascii')
                let [username, password] = token.split(':')
                user = {
                    username,
                    password
                }
                req.user = user;
                if (!user) { throw { code: 401 } }
                else {
                    req.user = user;
                    return next()
                }
            } else {
                throw new Error('Auth method not allowed')
            }
        } catch (err) {
            console.trace(err)
            res.status(err.code || 401).json({
                type: 'headers',
                message: 'You should provide an auth for this route'
            })
        }
    } else {
        res.status(401).json({
            type: 'headers',
            message: 'You should provide an auth for this route'
        })
    }
}