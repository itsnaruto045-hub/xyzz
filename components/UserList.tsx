
import React from 'react';
import { KAORUKO_AVATAR_URL } from '../constants';

const UserList = () => (
  <aside className="w-60 bg-[#2f3136] p-4 flex-shrink-0">
    <h2 className="text-xs font-bold uppercase text-gray-400 mb-2">Online — 2</h2>
    <ul className="space-y-3">
      <li className="flex items-center space-x-3">
        <div className="relative">
          <img className="w-8 h-8 rounded-full" src={KAORUKO_AVATAR_URL} alt="Kaoruko" />
          <span className="bottom-0 left-5 absolute w-3.5 h-3.5 bg-green-400 border-2 border-[#2f3136] rounded-full"></span>
        </div>
        <span className="text-sm font-semibold text-pink-400">ᴋᴀᴏʀᴜᴋᴏ</span>
      </li>
      <li className="flex items-center space-x-3">
        <div className="relative">
          <img className="w-8 h-8 rounded-full" src="https://picsum.photos/seed/user/48/48" alt="User" />
          <span className="bottom-0 left-5 absolute w-3.5 h-3.5 bg-green-400 border-2 border-[#2f3136] rounded-full"></span>
        </div>
        <span className="text-sm font-semibold">User</span>
      </li>
    </ul>
  </aside>
);

export default UserList;
