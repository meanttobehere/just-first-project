import '../dropdown/index';
import RoomDropdown from './RoomDropdown';

document.querySelectorAll('.js-room-dropdown').forEach((roomDropdown) => {
  const roomDropdownDOM = roomDropdown;
  roomDropdownDOM.roomDropdown = new RoomDropdown(roomDropdown);
});
