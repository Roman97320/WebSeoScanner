import { Link } from "wouter";

const Header = () => {
  return (
    <header className="bg-white py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <Link href="/" className="text-primary font-bold text-2xl">
            WebSeoScan
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
