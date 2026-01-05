import React, { useState } from "react";
import { FiChevronDown, FiClock, FiArrowRight } from "react-icons/fi";
import { Booking } from "../../../types/booking";

interface Props {
  data: Booking;
}

export const PendingBookingCard: React.FC<Props> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Helper Formatting
  const formatTime = (isoString: string) => {
    if (!isoString) return "";
    return new Date(isoString).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getCode = (location: string) => {
    const match = location.match(/\(([^)]+)\)/);
    return match ? match[1] : location.substring(0, 3).toUpperCase();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl mb-4 overflow-hidden shadow-sm transition-shadow hover:shadow-md">
      
      {/* === BODY CARD === */}
      <div className="p-5">
        <div className="flex items-start gap-4">
            
            {/* 1. LOGO DI SAMPING KIRI */}
            <div className="w-14 h-14 flex-shrink-0 border border-gray-100 rounded-lg flex items-center justify-center bg-gray-50">
                <img 
                  src={data.flight.airline_logo} 
                  alt={data.flight.airline_name} 
                  className="w-10 h-10 object-contain"
                />
            </div>

            {/* 2. KETERANGAN DI SAMPING LOGO */}
            <div className="flex-1">
                
                {/* RUTE (Dari Mana Mau Kemana) */}
                <div className="flex items-center gap-2 font-bold text-gray-900 text-lg">
                    <span>{getCode(data.flight.origin)}</span>
                    <FiArrowRight className="text-gray-400 text-sm" />
                    <span>{getCode(data.flight.destination)}</span>
                </div>

                {/* BOOKING ID (Di Bawahnya) */}
                <div className="text-sm text-gray-500 font-medium mt-1">
                    Booking ID: <span className="text-gray-700">{data.booking_code}</span>
                </div>

                {/* STATUS KECIL (Di Bawahnya Lagi) */}
                <div className="text-xs text-orange-600 mt-1 font-medium">
                    Dalam pemilihan metode pembayaran
                </div>
            </div>
        </div>

        {/* 3. POJOK KANAN BAWAH: LIHAT DETAIL */}
        <div className="flex justify-end mt-4">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-red-600 text-sm font-bold flex items-center gap-1 hover:underline"
            >
                Lihat Detail <FiChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
        </div>
      </div>

      {/* === DROPDOWN (TIMER & TOMBOL BAYAR) === */}
      {/* Muncul saat klik Lihat Detail */}
      {isOpen && (
          <div className="bg-gray-50 border-t border-gray-100 p-4 animate-in slide-in-from-top-2">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  
                  {/* Timer */}
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <FiClock className="text-red-600" />
                      <span>Selesaikan dalam: <span className="font-bold text-gray-900">00:59:00</span></span>
                  </div>

                  {/* Tombol Lanjut Bayar */}
                  <a 
                      href={data.payment_url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto bg-red-600 text-white px-6 py-2 rounded-lg font-bold text-sm text-center hover:bg-red-700 transition"
                  >
                      Lanjutkan Pembayaran
                  </a>
              </div>
          </div>
      )}

    </div>
  );
};