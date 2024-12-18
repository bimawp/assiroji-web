export default function Page() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center">
            <button className="text-gray-500 focus:outline-none focus:text-gray-700 lg:hidden">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            <h1 className="text-2xl font-semibold text-[#1D564F] ml-4">Dashboard</h1>
          </div>

        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-[#F7B118] rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-[#1D564F] mb-2">Total Pendaftar</h2>
            <p className="text-3xl font-bold text-[#1D564F]">1,234</p>
          </div>
          <div className="bg-[#F7B118] rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-[#1D564F] mb-2">Total Artikel</h2>
            <p className="text-3xl font-bold text-[#1D564F]">567</p>
          </div>
          <div className="bg-[#F7B118] rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-[#1D564F] mb-2">Total Orders</h2>
            <p className="text-3xl font-bold text-[#1D564F]">89</p>
          </div>
          <div className="bg-[#F7B118] rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-[#1D564F] mb-2">Revenue</h2>
            <p className="text-3xl font-bold text-[#1D564F]">$12,345</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#1D564F] mb-4">Recent Orders</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">#12345</td>
                <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">$250.00</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">#12346</td>
                <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">$175.50</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
