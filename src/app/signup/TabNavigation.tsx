interface TabNavigationProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
  }
  
  const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
    return (
      <div className="mt-6 flex justify-center mb-6">
        <button
          onClick={() => setActiveTab("user")}
          className={`px-6 py-2 text-sm font-semibold ${
            activeTab === "user"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-blue-100"
          } rounded-l-lg transition-colors duration-200 ease-in-out`}
        >
          Signup as User
        </button>
        <button
          onClick={() => setActiveTab("admin")}
          className={`px-6 py-2 text-sm font-semibold ${
            activeTab === "admin"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-blue-100"
          } rounded-r-lg transition-colors duration-200 ease-in-out`}
        >
          Signup as Admin
        </button>
      </div>
    );
  };
  
  export default TabNavigation;
  