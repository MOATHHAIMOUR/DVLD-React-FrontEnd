import { ElementType } from "react";
import { IoIosPeople } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";

export interface INavbar {
  name: string;
  path: string;
  Icon: ElementType;
  children?: Array<INavbar>;
}

export const NavData: Array<INavbar> = [
  {
    name: "Manage People",
    Icon: IoIosPeople,
    path: "/people",
    children: [
      {
        name: "Add Person",
        path: "/people/add-person",
        Icon: IoPersonAddOutline,
      },
      {
        name: "Edit Person",
        path: "/people/edit-person",
        Icon: IoPersonAddOutline,
      },
    ],
  },
];
