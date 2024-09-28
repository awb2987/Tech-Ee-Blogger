$(document).ready(function () {
    // Event listener for delete buttons
    $('.delete-btn').on('click', function () {
        const postId = $(this).data('id');
        const confirmation = confirm('Are you certain you want to delete this post?');
        
        if (confirmation) {
            $.ajax({
                method: 'DELETE',
                url: `/api/posts/${postId}`,
            })
            .then(() => {
                // Reload the page and redirect to dashboard
                location.reload()
            })
            .catch((err) => {
                console.error(err);
                alert('Error deleting the post. Please try again.');
            });
        }
    });

    // Event listener for comment submission
    $('form').on('submit', function (event) {
        event.preventDefault(); // Prevent default form from submission

        const postId = $(this).attr('action').split('/').pop(); // Get post ID from the form action
        const commentContent = $('textarea[name="content"]').val(); // Get the comment content

        $.ajax({
            method: 'POST',
            url: `/post/${postId}/comment`,
            data: { content: commentContent },
        })
        .then(() => {
            // Reload page or append new comment to the comments
            location.reload();
        })
        .catch((err) => {
            console.error(err);
            alert('Error submitting your content. Please try again.');
        });
    });
});
