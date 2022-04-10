exports.deleteFromArray = deleteFromArray

function deleteFromArray (element, arr) {
    if (!element || !arr || arr.length == 0) {
        return;
    }
    const index = arr.indexOf(element, 0);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

exports.updateBlogForUserLike = (req, blog) => {
    let likesIncrement = parseInt(req.query.userLikesIncrement);
    let creditsIncrement = parseInt(req.query.userCreditsIncrement);

    blog.likes += likesIncrement;
    // like
    if (likesIncrement > 0) {
        blog.likedBy.push(req.query.userId);
    } else {// cancel like
        deleteFromArray(req.query.userId, blog.likedBy);
    }

    return {
        likesIncrement: likesIncrement,
        creditsIncrement: creditsIncrement
    };
}

exports.updateUserForUserLike = (user, likesIncrement, creditsIncrement) => {
    user.likes+=likesIncrement;
    user.credits+=creditsIncrement;
}