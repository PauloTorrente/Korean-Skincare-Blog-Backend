const {
    createBlogPost,
    getAllBlogPosts,
    updateBlogPost,
    deleteBlogPost,
} = require('./blog.model');

const createBlogPostService = async (title, content, imageUrl) => {
    return await createBlogPost(title, content, imageUrl);
};

const getAllBlogPostsService = async () => {
    return await getAllBlogPosts();
};

const updateBlogPostService = async (blogId, updatedData) => {
    return await updateBlogPost(blogId, updatedData);
};

const deleteBlogPostService = async (blogId) => {
    return await deleteBlogPost(blogId);
};

module.exports = {
    createBlogPostService,
    getAllBlogPostsService,
    updateBlogPostService,
    deleteBlogPostService,
};
