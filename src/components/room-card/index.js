import RoomCard from './RoomCard';

document.querySelectorAll('.js-room-card').forEach((roomCard) => {
  const roomCardDOM = roomCard;
  roomCardDOM.roomCard = new RoomCard(roomCard);
});
