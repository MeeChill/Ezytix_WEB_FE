import React from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";

export const SimpleNavbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 h-16 flex items-center fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full flex justify-between items-center">
        
        {/* KIRI: Logo & Back */}
        <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-500 hover:text-gray-800 transition">
                <FiChevronLeft size={24} />
            </Link>
            {/* Ganti dengan Logo Image projectmu jika ada */}
            <Link to="/" className="text-2xl font-black text-blue-600 tracking-tighter">
                EZYTIX
            </Link>
        </div>

        {/* KANAN: Title Halaman */}
        <div>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                Booking Session
            </span>
        </div>

      </div>
    </nav>
  );
};