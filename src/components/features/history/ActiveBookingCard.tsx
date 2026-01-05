import React, { useState } from "react";
import { FiChevronDown, FiDownload, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { Booking } from "../../../types/booking";

interface Props {
  data: Booking;
}

export const ActiveBookingCard: React.FC<Props> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  // --- HELPER FORMATTING ---
  const getCode = (location: string) => {
    const match = location.match(/\(([^)]+)\)/);
    return match ? match[1] : location.substring(0, 3).toUpperCase();
  };

  const formatDate = (isoString: string) => {
    if (!isoString) return "";
    return new Date(isoString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl mb-4 overflow-hidden shadow-sm transition-shadow hover:shadow-md">
      
      {/* 1. HEADER: JUDUL TENGAH */}
      <div className="py-3 border-b border-gray-100 text-center bg-white">
        <span className="text-gray-900 font-bold text-base">
          E-Tiket Aktif
        </span>
      </div>

      {/* 2. BODY CARD */}
      <div className="p-5">
        <div className="flex items-start gap-4">
            
            {/* LOGO (KIRI) */}
            <div className="w-16 h-16 flex-shrink-0 border border-gray-100 rounded-lg flex items-center justify-center bg-white p-1">
                <img 
                  src={data.flight.airline_logo} 
                  alt={data.flight.airline_name} 
                  className="w-full h-full object-contain"
                />
            </div>

            {/* INFO (KANAN) */}
            <div className="flex-1 min-w-0">
                
                {/* A. RUTE */}
                <div className="flex items-center gap-2 font-bold text-gray-900 text-lg mb-1">
                    <span>{getCode(data.flight.origin)}</span>
                    <FiArrowRight className="text-gray-400 text-sm" />
                    <span>{getCode(data.flight.destination)}</span>
                </div>

                {/* B. INFO LENGKAP (Maskapai • Kode • Tanggal) */}
                <div className="text-sm text-gray-500 font-medium mb-2 truncate">
                    {data.flight.airline_name} • {data.flight.flight_code} • {formatDate(data.flight.departure_time)}
                </div>

                {/* C. BOOKING ID */}
                <div className="text-sm text-gray-500 font-medium mb-1">
                    Booking ID: <span className="text-gray-900 font-bold font-mono">{data.booking_code}</span>
                </div>

                {/* D. STATUS */}
                <div className="text-xs text-green-600 font-bold flex items-center gap-1">
                    E-Tiket Terbit
                </div>
            </div>
        </div>

        {/* 3. TOGGLE DETAIL (POJOK KANAN BAWAH) */}
        <div className="flex justify-end mt-2">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-red-600 text-sm font-bold flex items-center gap-1 hover:underline focus:outline-none"
            >
                Lihat Detail <FiChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
        </div>
      </div>

      {/* 4. DROPDOWN (ACTION) */}
      {isOpen && (
          <div className="bg-gray-50 border-t border-gray-100 p-4 animate-in slide-in-from-top-1 duration-200">
              <div className="flex justify-end">
                  <button className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 hover:text-blue-600 hover:border-blue-200 transition-all w-full sm:w-auto shadow-sm">
                      <FiDownload />
                      Download E-Tiket
                  </button >
              </div>
          </div>
      )}

    </div>
  );
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            