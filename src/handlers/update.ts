import prisma from "../db";

export const getAllUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    res.json({data: updates})
}

export const getOneUpdate = async (req,res) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id
        }
    })

    res.json({data: update})
}

export const refreshUpdate = async (req,res) => {
    if(!await checkIfUpdateExists(req)) {
        res.json({message: 'No such update'})

        return
    }

    const update = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: {
            title: req.body.title,
            version: req.body.version,
            status: req.body.status
        }
    })

    res.json({data: update})
}

export const createUpdate = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    })

    if(!product) {
        res.json({message: 'nope, no such product'})
        return
    }

    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            productId: req.body.productId,
            updatedAt: new Date()
        }
    })

    res.json({data: update})
}

export const deleteUpdate = async (req,res) => {

    if(!await checkIfUpdateExists(req)) {
        res.json({message: 'No such update'})

        return
    }

    const update = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })

    res.json({data: update})
}


const checkIfUpdateExists = async (req): Promise<boolean> => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find((update) => update.id === req.params.id)

    return match;
}