process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
import chalk from 'chalk'
import '@babel/polyfill'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

// --- Routers ---
import {
    scrapper,
} from './src/router'
import morgan from 'morgan'

const app = express()
app.use(cors())

app.set('PORT', process.env.PORT || 3200)
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(morgan(':user-agent :method :url :status :response-time ms'))



const BASE_PATH = '/v1'

app.use(`${BASE_PATH}/scrapper/`, scrapper)

app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        // we had a joi error, let's return a custom 400 json response
        res.status(400).json({
            type: err.type, // it could be 'headers', 'body', 'query' or 'params'
            message: err.error.toString()
        })
    } else {
      console.log(err)
        next(err)
    }
})
// --------------
app.listen(app.get('PORT'), () => {
    /* eslint-disable no-console */
    console.log(chalk.blue(`Express server listening on port ${chalk.whiteBright(app.get('PORT'))}`))
})