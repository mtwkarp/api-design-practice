import dotenv from 'dotenv'

dotenv.config()

import app from './server'
import config from './config'

app.listen(config.port, () => {
    console.log(`starting server on port ${config.port} ...`)
})
