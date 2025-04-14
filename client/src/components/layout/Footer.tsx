const Footer = () => {
  return (
    <footer className="py-8 border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} WebSeoScan. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-gray-500 hover:text-primary text-sm">Terms</a>
            <a href="#" className="text-gray-500 hover:text-primary text-sm">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-primary text-sm">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
