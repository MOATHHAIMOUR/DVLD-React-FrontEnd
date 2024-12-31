import { IoIosPeople } from "react-icons/io";
import {
  MdModeEdit,
  MdDelete,
  MdPersonSearch,
  MdHistory,
  MdPersonAdd,
  MdSupervisorAccount,
  MdOutlineHelpOutline,
} from "react-icons/md";
import { RiFileDamageLine } from "react-icons/ri";
import { TbReplaceFilled } from "react-icons/tb";

import { RiTeamFill, RiUser2Fill } from "react-icons/ri";
import { FaCarSide, FaCarCrash, FaPassport, FaFileAlt } from "react-icons/fa";
import { HiDocumentText, HiOutlineDocumentAdd } from "react-icons/hi";
import { AiOutlineSchedule } from "react-icons/ai";
import { INavbar } from "../interfaces";

export const NavData: Array<INavbar> = [
  // People Management
  {
    name: "Manage People",
    Icon: IoIosPeople,
    path: "",
    children: [
      {
        name: "People Management",
        path: "/people/people-management",
        Icon: RiTeamFill,
      },
      {
        name: "Find Person",
        path: "/people/find-person",
        Icon: MdPersonSearch,
      },
      {
        name: "Add Person",
        path: "/people/add-person",
        Icon: MdPersonAdd,
      },
      {
        name: "Edit Person",
        path: "/people/edit-person",
        Icon: MdModeEdit,
      },
      {
        name: "Delete Person",
        path: "/people/delete-person",
        Icon: MdDelete,
      },
    ],
  },

  // User Management
  {
    name: "Manage Users",
    Icon: RiUser2Fill,
    path: "",
    children: [
      {
        name: "Users Management",
        path: "users/users-management",
        Icon: MdSupervisorAccount,
      },
      {
        name: "Find User",
        path: "users/find-user",
        Icon: MdPersonSearch,
      },
      {
        name: "Add User",
        path: "users/add-user",
        Icon: MdPersonAdd,
      },
      {
        name: "Edit User",
        path: "users/edit-user",
        Icon: MdModeEdit,
      },
      {
        name: "Delete User",
        path: "users/delete-user",
        Icon: MdDelete,
      },
    ],
  },

  // Applications Management
  {
    name: "Applications Management",
    Icon: FaCarSide,
    path: "",
    children: [
      // Local Licenses
      {
        name: "Local Licenses Applications",
        path: "local-driving",
        Icon: HiDocumentText,
        children: [
          {
            name: "Manage Local Licenses",
            path: "/local-driving-license/manage-local-driving-licenses",
            Icon: HiDocumentText,
          },
          {
            name: "Add Local License",
            path: "/local-driving/add-local-driving-licenses",
            Icon: HiOutlineDocumentAdd,
          },
          {
            name: "Lookup Local Licenses",
            path: "/local-driving/lookup-local-driving-licenses",
            Icon: MdHistory,
          },
        ],
      },

      // Detain & Release
      {
        name: "Detain & Release",
        path: "detain-release",
        Icon: FaCarCrash,
        children: [
          {
            name: "Release Licenses",
            path: "/detain-release/release-licenses",
            Icon: FaCarSide,
          },
          {
            name: "Detain Licenses",
            path: "/detain-release/detain-licenses",
            Icon: FaCarCrash,
          },
        ],
      },

      // Replacement
      {
        name: "Replace Damage & Lost License ",
        path: "",
        Icon: TbReplaceFilled,
        children: [
          {
            name: "Replace Damage License",
            path: "/replace/replace-damage-local-license",
            Icon: RiFileDamageLine,
          },
          {
            name: "Replace Lost License",
            path: "/replace/replace-lost-local-license",
            Icon: MdOutlineHelpOutline,
          },
        ],
      },

      // International Licenses
      {
        name: "International Licenses",
        path: "international",
        Icon: FaPassport,
        children: [
          {
            name: "Add International License",
            path: "/international/add-international-license",
            Icon: FaPassport,
          },
          {
            name: "Lookup International Licenses",
            path: "/international/lookup-international-license",
            Icon: MdHistory,
          },
        ],
      },

      {
        name: "Licenses History",
        path: "licenses",
        Icon: MdHistory,
        children: [
          {
            name: "Licenses History",
            path: "/licenses/history",
            Icon: MdHistory,
          },
        ],
      },
      {
        name: "Renew Licenses Applications",
        Icon: AiOutlineSchedule,
        path: "",
        children: [
          {
            name: "Renew Local Licenses",
            path: "/renew/renew-local-licenses",
            Icon: AiOutlineSchedule,
          },
        ],
      },
      // Types
      {
        name: "Applications Sittings",
        path: "types",
        Icon: FaFileAlt,
        children: [
          {
            name: "Application Types",
            path: "/types/application-types",
            Icon: FaFileAlt,
          },
        ],
      },
    ],
  },
];
