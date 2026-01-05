import React, { useState } from "react";
import { FiChevronDown, FiArrowRight, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { Booking } from "../../../types/booking";

interface Props {
    data: Booking;
}

export const HistoryBookingCard: React.FC<Props> = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);

    // --- HELPER FORMATTING ---
    const formatRupiah = (amount: string) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(Number(amount));
    };

    const formatTime = (isoString: string) => {
        if (!isoString) return "";
        return new Date(isoString).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };

    const formatDate = (isoString: string) => {
        if (!isoString) return "";
        return new Date(isoString).toLocaleDateString("id-ID", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const formatDuration = (minutes: number) => {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${h}j ${m}m`;
    };

    const getCode = (location: string) => {
        const match = location.match(/\(([^)]+)\)/);
        return match ? match[1] : location.substring(0, 3).toUpperCase();
    };

    // Logic Status untuk Dropdown
    const isCancelled = data.status === 'cancelled' || data.status === 'failed';

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-4 overflow-hidden transition-all hover:shadow-md hover:border-gray-300">

            {/* === HEADER CARD === */}
            <div className="p-5">

                {/* Row 1: Identitas Penerbangan & INFO KANAN (Harga + Toggle) */}
                <div className="flex justify-between items-start mb-5">

                    {/* KIRI: Logo + Nama + Kode Penerbangan */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg p-1 border border-gray-100">
                            <img
                                src={data.flight.airline_logo}
                                alt={data.flight.airline_name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm md:text-base">
                                {data.flight.airline_name}
                            </h4>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">
                                {data.flight.flight_code} • {formatDate(data.flight.departure_time)}
                            </p>
                        </div>
                    </div>

                    {/* KANAN: Harga Total & Lihat Detail */}
                    <div className="text-right flex flex-col items-end gap-1">
                        {/* Total Harga */}
                        <p className="font-bold text-gray-900 text-base md:text-lg">
                            {formatRupiah(data.total_amount)}
                        </p>

                        {/* Tombol Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center gap-1 text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
                        >
                            Lihat Detail
                            <FiChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Row 2: Visualisasi Rute (Sama seperti card lain) */}
                <div className="flex items-center justify-between">
                    {/* Keberangkatan */}
                    <div className="text-left min-w-[60px]">
                        <p className="text-lg font-bold text-gray-800">{formatTime(data.flight.departure_time)}</p>
                        <p className="text-sm font-medium text-gray-500">{getCode(data.flight.origin)}</p>
                    </div>

                    {/* Durasi */}
                    <div className="flex-1 px-6 flex flex-col items-center">
                        <p className="text-[10px] text-gray-400 mb-1 font-medium">{formatDuration(data.flight.duration_minutes)}</p>
                        <div className="w-full h-[1px] bg-gray-300 relative flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 absolute left-0"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 absolute right-0"></div>
                            <div className="bg-white px-1">
                                <FiArrowRight className="text-gray-300 text-xs" />
                            </div>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1">Langsung</p>
                    </div>

                    {/* Kedatangan */}
                    <div className="text-right min-w-[60px]">
                        <p className="text-lg font-bold text-gray-800">{formatTime(data.flight.arrival_time)}</p>
                        <p className="text-sm font-medium text-gray-500">{getCode(data.flight.destination)}</p>
                    </div>
                </div>

            </div>

            {/* === DROPDOWN (STATUS INFO) === */}
            {/* Karena tidak ada tombol aksi, kita tampilkan status transaksi */}
            {isOpen && (
                <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-between items-center animate-in slide-in-from-top-1">

                    <div className="text-xs text-gray-500">
                        Kode Booking: <span className="font-mono font-bold text-gray-700">{data.booking_code}</span>
                    </div>

                    {/* Status Badge di dalam Dropdown */}
                    {isCancelled ? (
                        <span className="flex items-center gap-1.5 text-red-600 bg-red-100 px-3 py-1 rounded-full text-xs font-bold">
                            <FiXCircle /> Dibatalkan
                        </span>
                    ) : (
                        <span className="flex items-center gap-1.5 text-gray-600 bg-gray-200 px-3 py-1 rounded-full text-xs font-bold">
                            <FiCheckCircle /> Transaksi Selesai
                        </span>
                    )}
                </div>
            )}

        </div>
    );
};