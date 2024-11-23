import { FaSearch } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { IoIosPeople } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { INavbar } from "../interfaces";
import { RiUser2Fill } from "react-icons/ri";

export const NavData: Array<INavbar> = [
  {
    name: "Manage People",
    Icon: IoIosPeople,
    path: "/people",
    children: [
      {
        name: "People Management",
        path: "/",
        Icon: GrUserManager,
      },
      {
        name: "Find Person",
        path: "/find-person",
        Icon: FaSearch,
      },
      {
        name: "Add Person",
        path: "/add-person",
        Icon: IoPersonAddOutline,
      },
      {
        name: "Edit Person",
        path: "/edit-person",
        Icon: MdModeEdit,
      },
      {
        name: "Delete Person",
        path: "/delete-person",
        Icon: MdDelete,
      },
    ],
  },
  {
    name: "Manage Users",
    Icon: RiUser2Fill,
    path: "/users",
    children: [
      {
        name: "Users Management",
        path: "/",
        Icon: GrUserManager,
      },
      {
        name: "Find User",
        path: "/find-user",
        Icon: FaSearch,
      },
      {
        name: "Add User",
        path: "/add-user",
        Icon: IoPersonAddOutline,
      },
      {
        name: "Edit User",
        path: "/edit-user",
        Icon: MdModeEdit,
      },
      {
        name: "Delete User",
        path: "/delete-user",
        Icon: MdDelete,
      },
    ],
  },
];
