import { IoIosPeople } from "react-icons/io";
import {
  MdModeEdit,
  MdDelete,
  MdPersonSearch,
  MdHistory,
  MdPersonAdd,
  MdSupervisorAccount,
  MdOutlineHelpOutline,
  MdDashboard,
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
    nameKey: "sideBar.dashboard",
    Icon: MdDashboard,
    path: "/",
  },
  {
    nameKey: "sideBar.manage_people",
    Icon: IoIosPeople,
    path: "",
    children: [
      {
        nameKey: "sideBar.people_management",
        path: "/people/people-management",
        Icon: RiTeamFill,
      },
      {
        nameKey: "sideBar.find_person",
        path: "/people/find-person",
        Icon: MdPersonSearch,
      },
      {
        nameKey: "sideBar.add_person",
        path: "/people/add-person",
        Icon: MdPersonAdd,
      },
      {
        nameKey: "sideBar.edit_person",
        path: "/people/edit-person",
        Icon: MdModeEdit,
      },
      {
        nameKey: "sideBar.delete_person",
        path: "/people/delete-person",
        Icon: MdDelete,
      },
    ],
  },

  // User Management
  {
    nameKey: "sideBar.manage_users",
    Icon: RiUser2Fill,
    path: "",
    children: [
      {
        nameKey: "sideBar.users_management",
        path: "users/users-management",
        Icon: MdSupervisorAccount,
      },
      {
        nameKey: "sideBar.find_user",
        path: "users/find-user",
        Icon: MdPersonSearch,
      },
      {
        nameKey: "sideBar.add_user",
        path: "users/add-user",
        Icon: MdPersonAdd,
      },
      {
        nameKey: "sideBar.edit_user",
        path: "users/edit-user",
        Icon: MdModeEdit,
      },
      {
        nameKey: "sideBar.delete_user",
        path: "users/delete-user",
        Icon: MdDelete,
      },
    ],
  },

  // Applications Management
  {
    nameKey: "sideBar.applications_management",
    Icon: FaCarSide,
    path: "",
    children: [
      // Local Licenses
      {
        nameKey: "sideBar.local_licenses_applications",
        path: "local-driving",
        Icon: HiDocumentText,
        children: [
          {
            nameKey: "sideBar.manage_local_licenses",
            path: "/local-driving-license/manage-local-driving-licenses",
            Icon: HiDocumentText,
          },
          {
            nameKey: "sideBar.add_local_license",
            path: "/local-driving/add-local-driving-licenses",
            Icon: HiOutlineDocumentAdd,
          },
          {
            nameKey: "sideBar.lookup_local_licenses",
            path: "/local-driving/lookup-local-driving-licenses",
            Icon: MdHistory,
          },
        ],
      },

      // Detain & Release
      {
        nameKey: "sideBar.detain_and_release",
        path: "detain-release",
        Icon: FaCarCrash,
        children: [
          {
            nameKey: "sideBar.release_licenses",
            path: "/detain-release/release-licenses",
            Icon: FaCarSide,
          },
          {
            nameKey: "sideBar.detain_licenses",
            path: "/detain-release/detain-licenses",
            Icon: FaCarCrash,
          },
        ],
      },

      // Replacement
      {
        nameKey: "sideBar.replace_damage_lost_license",
        path: "",
        Icon: TbReplaceFilled,
        children: [
          {
            nameKey: "sideBar.replace_damage_license",
            path: "/replace/replace-damage-local-license",
            Icon: RiFileDamageLine,
          },
          {
            nameKey: "sideBar.replace_lost_license",
            path: "/replace/replace-lost-local-license",
            Icon: MdOutlineHelpOutline,
          },
        ],
      },

      // International Licenses
      {
        nameKey: "sideBar.international_licenses",
        path: "international",
        Icon: FaPassport,
        children: [
          {
            nameKey: "sideBar.add_international_license",
            path: "/international/add-international-license",
            Icon: FaPassport,
          },
          {
            nameKey: "sideBar.lookup_international_licenses",
            path: "/international/lookup-international-license",
            Icon: MdHistory,
          },
        ],
      },

      {
        nameKey: "sideBar.licenses_history",
        path: "licenses",
        Icon: MdHistory,
        children: [
          {
            nameKey: "sideBar.licenses_history",
            path: "/licenses/history",
            Icon: MdHistory,
          },
        ],
      },
      {
        nameKey: "sideBar.renew_licenses_applications",
        Icon: AiOutlineSchedule,
        path: "",
        children: [
          {
            nameKey: "sideBar.renew_local_licenses",
            path: "/renew/renew-local-licenses",
            Icon: AiOutlineSchedule,
          },
        ],
      },
      // Types
      {
        nameKey: "sideBar.applications_settings",
        path: "types",
        Icon: FaFileAlt,
        children: [
          {
            nameKey: "sideBar.application_types",
            path: "/types/application-types",
            Icon: FaFileAlt,
          },
        ],
      },
    ],
  },
];
