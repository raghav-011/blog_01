
import Comment from '../model/comment.js';


export const newComment = async (request, response) => {
    try {
        const comment = await new Comment(request.body);
        comment.save();

        response.status(200).json('Comment saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}


export const getComments = async (request, response) => {
    try {
        const comments = await Comment.find({ postId: request.params.id });
        
        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json(error)
    }
}

// export const deleteComment = async (request, response) => {
//     try {
//         //console.log(request.params.id)
//         const comment = await Comment.findById(request.params.id);
//         await comment.delete()

//         response.status(200).json({msg: 'comment deleted successfully'});
//     } catch (error) {
//         response.status(500).json({error:error.message})
//     }
// }

export const deleteComment = async (request, response) => {
    try {
        const comment = await Comment.findById(request.params.id);

        if (!comment) {
            return response.status(404).json({ message: 'Comment not found' });
        }

        await comment.deleteOne(); // Delete the comment

        response.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        response.status(500).json({ message: 'An error occurred while deleting the comment' });
    }
};