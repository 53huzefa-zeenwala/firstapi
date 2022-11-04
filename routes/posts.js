const express = require('express')
const Post = require('../models/Post')

const router = express.Router()

//getting all posta
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
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
        description: req.body.description
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
                    description: req.body.description
                }
            })
        res.status(200).json(deletePost)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})


module.exports = router