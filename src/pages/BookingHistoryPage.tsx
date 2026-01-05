import React, { useMemo } from "react";
import { HistoryNavbar } from "../components/layout/HistoryNavbar";
import { PendingBookingCard } from "../components/features/history/PendingBookingCard";
import { ActiveBookingCard } from "../components/features/history/ActiveBookingCard";
import { HistoryBookingCard } from "../components/features/history/HistoryBookingCard";
import { DUMMY_BOOKINGS } from "../data/dummyBookings";
import { FiInbox } from "react-icons/fi";

export const BookingHistoryPage: React.FC = () => {

  // --- LOGIKA PEMISAHAN DATA ---
  const { pendingBookings, activeBookings, historyBookings } = useMemo(() => {
    const now = new Date();

    // 1. Filter Pending
    const pending = DUMMY_BOOKINGS.filter((b) => b.status === "pending");

    // 2. Filter Active (Paid + Masa Depan)
    const active = DUMMY_BOOKINGS.filter(
      (b) => b.status === "paid" && new Date(b.flight.departure_time) > now
    );

    // 3. Filter History (Paid Lampau / Cancelled / Failed)
    const history = DUMMY_BOOKINGS.filter((b) => {
      const isPastPaid = b.status === "paid" && new Date(b.flight.departure_time) <= now;
      const isCancelled = b.status === "cancelled" || b.status === "failed";
      return isPastPaid || isCancelled;
    });

    return { 
      pendingBookings: pending, 
      activeBookings: active, 
      historyBookings: history 
    };
  }, []);

  const isEmpty = pendingBookings.length === 0 && activeBookings.length === 0 && historyBookings.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      
      {/* 1. NAVBAR (Sesuai yang sudah di-ACC) */}
      <HistoryNavbar />

      {/* 2. CONTAINER UTAMA */}
      {/* UPDATE DISINI: 'pt-28' (Padding Top besar) biar gak ketabrak navbar */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-28 pb-10">
        
        {/* (Header Page Judul dihapus agar fokus ke section titles) */}

        {/* A. SECTION: PEMBELIAN TERTUNDA */}
        {pendingBookings.length > 0 && (
          <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* JUDUL TENGAH */}
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-2">
              Pembelian Tertunda
              <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {pendingBookings.length}
              </span>
            </h2>
            <div className="space-y-4">
              {pendingBookings.map((booking) => (
                <PendingBookingCard key={booking.booking_code} data={booking} />
              ))}
            </div>
          </div>
        )}

        {/* B. SECTION: E-TIKET AKTIF */}
        {activeBookings.length > 0 && (
          <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* JUDUL TENGAH */}
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
              E-Tiket Aktif
            </h2>
            <div className="space-y-4">
              {activeBookings.map((booking) => (
                <ActiveBookingCard key={booking.booking_code} data={booking} />
              ))}
            </div>
          </div>
        )}

        {/* C. SECTION: RIWAYAT PEMESANAN */}
        {historyBookings.length > 0 && (
          <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* JUDUL TENGAH */}
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Riwayat Pemesanan
            </h2>
            <div className="space-y-4">
              {historyBookings.map((booking) => (
                <HistoryBookingCard key={booking.booking_code} data={booking} />
              ))}
            </div>
          </div>
        )}

        {/* 4. EMPTY STATE */}
        {isEmpty && (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
            <div className="bg-gray-200 p-6 rounded-full mb-4">
                <FiInbox className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Belum ada riwayat</h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto mt-1">
                Kamu belum melakukan pemesanan tiket apapun. Yuk cari tiket sekarang!
            </p>
          </div>
        )}

      </div>
    </div>
  );
};