const Navbar = () => {
    return (
      <header className="h-16 bg-white shadow flex items-center justify-between px-6">
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Welcome Admin</span>
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </header>
    );
  };
  
  export default Navbar;