const express = require('express')
const Post = require('../models/Post')

const router = express.Router()

//getting limited posts
router.get('/', async (req, res) => {
    try {
        if (req.query.page === 'all') {
            const posts = await Post.find()
            res.status(200).json(posts)
        } else {
            const posts = await Post.find(req.query.category && {
                category: req.query.category
            })
                .limit(4)
                .skip(req.query.page * 4)
            res.status(200).json(posts)
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

// getting document count
router.get('/documentcount', async (req, res) => {
    try {
        const posts = await Post.find(req.query.category && {
            category: req.query.category
        })
            .countDocuments()
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

//getting single post
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

// saving post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category
    })
    try {
        const savedPost = await post.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

// deleing single post
router.delete('/:postId', async (req, res) => {
    try {
        const deletePost = await Post.remove({ _id: req.params.postId })
        res.status(200).json(deletePost)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

//update post
router.patch('/:postId', async (req, res) => {
    try {
        const deletePost = await Post.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                    category: req.body.category
                }
            })
        res.status(200).json(deletePost)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})


module.exports = router