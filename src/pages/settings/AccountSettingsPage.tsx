import { MdEmail } from "react-icons/md";

const AccountSettingsPage = () => {
  return (
    <div className="min-h-screen  flex flex-col items-center p-6">
      {/* Profile Section */}
      <div className="mt-4 w-full">
        <div className="flex items-center justify-between">
          {/* Profile Info */}
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/80" // Replace with actual image URL
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Alexa Rawles
              </h2>
              <p className="text-sm text-gray-500">alexarawles@gmail.com</p>
            </div>
          </div>
          {/* Edit Button */}
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover">
            Edit
          </button>
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your First Name"
              className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Nick Name */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Nick Name
            </label>
            <input
              type="text"
              placeholder="Your First Name"
              className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Gender
            </label>
            <select className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300">
              <option>Your First Name</option>
            </select>
          </div>

          {/* Country */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Country
            </label>
            <select className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300">
              <option>Your First Name</option>
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Language
            </label>
            <select className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300">
              <option>Your First Name</option>
            </select>
          </div>

          {/* Time Zone */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Time Zone
            </label>
            <select className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300">
              <option>Your First Name</option>
            </select>
          </div>
        </div>

        {/* Email Address */}
        <div className="mt-8">
          <h3 className="text-gray-800 text-sm font-medium">
            My email Address
          </h3>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-white p-2.5 rounded-full">
                <MdEmail />
              </div>
              <div>
                <p className="text-gray-800">alexarawles@gmail.com</p>
                <p className="text-sm text-gray-500">1 month ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
