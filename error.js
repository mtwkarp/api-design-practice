setTimeout(() => {
    throw new Error('oops')
}, 300)

process.on('uncaughtException', () => {
    console.log('unchaughtException')
})

process.on('unhandledRejection', () => {
    console.log('unhandledRejection')
})