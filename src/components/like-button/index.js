import LikeButton from './LikeButton';

document.querySelectorAll('.js-like-button').forEach((likeButton) => {
  const likeButtonDOM = likeButton;
  likeButtonDOM.likeButton = new LikeButton(likeButton);
});
