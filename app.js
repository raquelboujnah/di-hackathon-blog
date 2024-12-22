const express = require('express');
const app = express();
const path = require('path')

app.use(express.json());

const cors = require ('cors');
const postgres = require('postgres');
require('dotenv').config();

app.use(cors());
app.use('/', express.static(__dirname+'/public'))

const port = 3105;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.listen(port, () => {
    console.log(`Run on port ${port}`)
})

const {
    PGHOST,
    PGDATABASE,
    PGUSER,
    PGPASSWORD
} = process.env;

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: PGHOST,
        port: 5432,
        user: PGUSER,
        password: PGPASSWORD,
        database: PGDATABASE,
        ssl: { rejectUnauthorized: false },
        // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    },
});

async function viewBlogTable() {
    try {
        console.log('Fetching blog table...');
        const blogs = await knex.select('*').from('posts');
        // console.log('Blogs fetched:', blogs);
        return blogs;
    } catch (error) {
        console.error('Error fetching blog table:', error);
        throw error
    }
}

viewBlogTable();

// async function insertValueToDb() {
//     try {
//         const insertValue = await knex('posts').insert({
//             title: 'from vs code',
//             publish_date: '2024-12-21',
//             content: 'This was inserted through vs code',
//             author: 'Eli from VS Code'
//         })
//     } catch (error) {
//         console.error('Error inserting value to the blog table:', error);
//     } finally {
//         knex.destroy();
//     }
// }

// insertValueToDb()


app.get('/post-data', async (req, res) => {
    try {
        const blogPosts = await viewBlogTable();
        res.json(blogPosts);
    } catch (error) {
        console.error('Error in /post-data route:', error);
        res.status(500).json({ error: 'Failed to fetch blog table' });
    }
});

app.get('/post/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await knex('posts').where({ id }).first(); // Query for the specific post
        
        if (!post) {
            return res.status(404).send('Post not found');
        }
        // res.json(post); // Pass the post data to the EJS template

        res.render('post', { post }); // Pass the post data to the EJS template
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).send('Error fetching the post');
    }
});

app.post('/submit-post', async (req, res) => {
    const { title, publish_date, author, cover_image, content, } = req.body;

    try {
        const result = await knex('posts').insert({
            title: title,
            publish_date: publish_date,
            author: author,
            cover_image: cover_image,
            content: content
        });
        res.status(201).json({ message: 'Post created successfully!', postId: result[0] });
    } catch (error) {
        console.error('Error inserting post into database:', error);
        res.status(500).json({ message: 'An error occurred while creating the post.' });
    }
});
