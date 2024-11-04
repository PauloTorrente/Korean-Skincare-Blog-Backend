const {
    createBlogPost,
    getAllBlogPosts,
    getBlogPostById,
    updateBlogPost,
    deleteBlogPost,
    getUserBlogs,
} = require('./blog/blog.model');

const createBlogPostService = async (userId, title, content, imageUrl) => {
    return await createBlogPost(userId, title, content, imageUrl);
};

const getAllBlogPostsService = async () => {
    return await getAllBlogPosts();
};

const getBlogPostByIdService = async (id) => {
    return await getBlogPostById(id);
};

const updateBlogPostService = async (blogId, updatedData) => {
    return await updateBlogPost(blogId, updatedData);
};

const deleteBlogPostService = async (blogId) => {
    return await deleteBlogPost(blogId);
};

const getUserBlogsService = async (userId) => {
    return await getUserBlogs(userId);
};

module.exports = {
    createBlogPostService,
    getAllBlogPostsService,
    getBlogPostByIdService,
    updateBlogPostService,
    deleteBlogPostService,
    getUserBlogsService,
};
