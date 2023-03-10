import {handleConfirm} from './../store/slice/user/userSlice';
/* eslint-disable prettier/prettier */
export enum IHeaderEnum {
  Home = 'HOME',
  Register = 'REGISTER',
  Message = 'MESSAGE',
  Search = 'SEARCH',
  Personal = 'PERSONAL',
  PostStatus = 'PostStatus',
  Comment = 'COMMENT',
  QRCode = 'QRCode',
  Phonebook = 'Phonebook',
}

export enum IButtonEnum {
  disable = 'DISABLE',
}
export enum IPeronalEnum {
  Confirm = 'CONFIRM',
  AddFriend = 'ADDFRIEND',
  UnFriend = 'UNFRIEND',
  Friend = 'FRIEND',
}

export enum IRequestEnum {
  Received = 'RECEIVED',
  Sent = 'SENT',
}
export enum IOptionEnum {
  Avatar = 'Avatar',
  BackGround = 'BackGround',
  HandleStatus = 'HandleStatus',
}

export enum IPreviewImageEnum {
  More = 'More',
  Photoshop = 'BackGround',
  ImageOfStatus = 'ImageOfStatus',
}
