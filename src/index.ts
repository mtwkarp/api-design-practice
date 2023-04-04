import dotenv from 'dotenv'

dotenv.config()

import app from './server'

app.listen(8000, () => {
    console.log('starting server on port 8000 ...')
})

