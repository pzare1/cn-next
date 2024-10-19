"use client";

import { CiSearch } from "react-icons/ci";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);

 const handleScroll = () => {
    if(window.scrollY > 10){
        setIsScrolled(true);
    }else{
        setIsScrolled(false);
    }
 }
 useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return window.removeEventListener('scroll',handleScroll);
 }, [isScrolled])
  

  useEffect(() => {
    if (showSearch && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showSearch]);

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setSearch("");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
      setShowSearch(false);
    }
  };
  return (
    <div className={`navbar ${isScrolled && "bg-black-1"}`}>
      <Link className="max-w-[120px] max-h-[120px]" href="/">
        <img src="/assets/logo.png" alt="logo" className="logo" />
      </Link>

      <div className="nav-right">
      <form onSubmit={handleSearchSubmit} className="search relative">
          {showSearch && (
            <input
              ref={searchRef}
              placeholder="Search movie..."
              className="input-search text-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
          <button
            type="button"
            className="text-white"
            onClick={handleSearchToggle}
          >
            <CiSearch className="w-6 h-6" />
          </button>
        </form>
        <img 
        src="/assets/image.jpg"
        className="w-10 h-10 rounded-md "
        onClick={() => setDropdownMenu(!dropdownMenu)}
        />
        </div>
        {dropdownMenu && (
          <div className="dropdown-menu mx-2">
            <Link href="/">Home</Link>
            <Link href="/my-list">My List</Link>
            <a>Log Out</a>
          </div>
        )}
      </div>
  );
};

export default Navbar;