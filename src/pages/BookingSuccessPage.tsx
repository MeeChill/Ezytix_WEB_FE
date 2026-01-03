import React, { useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { SimpleNavbar } from "../components/layout/SimpleNavbar";
import { FiCheckCircle, FiHome, FiArrowRight } from "react-icons/fi";

const BookingSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Tangkap order_id dari URL (dikirim oleh Xendit hasil inject Backend tadi)
  const orderId = searchParams.get("order_id");

  // Safety Check: Kalau user iseng buka halaman ini tanpa Order ID, lempar ke Home
  useEffect(() => {
    if (!orderId) {
      navigate("/");
    }
  }, [orderId, navigate]);

  if (!orderId) return null;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <SimpleNavbar />

      <div className="flex flex-col items-center justify-center min-h-[85vh] px-4">
        
        {/* Main Card */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 max-w-lg w-full text-center relative overflow-hidden">
            
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600"></div>

            {/* Icon Animasi */}
            <div className="mb-6 relative inline-block">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
                <div className="relative w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-5xl text-green-600" />
                </div>
            </div>

            <h1 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">
                Pembayaran Berhasil!
            </h1>
            <p className="text-gray-500 mb-8 leading-relaxed">
                Hore! Tiket Anda sudah aman. Kami sedang menyiapkan E-Ticket untuk dikirim ke email Anda.
            </p>

            {/* Ticket Info Box */}
            <div className="bg-gray-50 border border-gray-200 border-dashed rounded-xl p-6 mb-8 relative group hover:border-blue-300 transition-colors">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">
                    Kode Booking Anda
                </p>
                <p className="text-3xl font-mono font-bold text-blue-600 tracking-wider select-all cursor-pointer group-hover:scale-105 transition-transform">
                    {orderId}
                </p>
                <div className="absolute -left-3 top-1/2 w-6 h-6 bg-white rounded-full border-r border-gray-200"></div>
                <div className="absolute -right-3 top-1/2 w-6 h-6 bg-white rounded-full border-l border-gray-200"></div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
                <Link 
                    to="/" 
                    className="w-full py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                >
                    <FiHome />
                    Kembali ke Beranda
                </Link>
                
                {/* Tombol Dummy untuk Next Feature */}
                <button 
                    onClick={() => alert("Fitur Cek Status akan hadir di update berikutnya!")}
                    className="w-full py-4 rounded-xl font-bold text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-700 flex items-center justify-center gap-2 transition-all"
                >
                    Lihat Detail Pesanan
                    <FiArrowRight />
                </button>
            </div>

        </div>

        {/* Footer info */}
        <p className="mt-8 text-xs text-gray-400 max-w-sm text-center">
            Jika dalam 15 menit E-Ticket belum masuk, silakan hubungi CS kami dengan menyebutkan Kode Booking di atas.
        </p>

      </div>
    </div>
  );
};

export default BookingSuccessPage;