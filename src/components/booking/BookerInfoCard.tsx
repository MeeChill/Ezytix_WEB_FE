import React from "react";
import { FiUser, FiMail, FiPhone, FiCheckCircle } from "react-icons/fi";

// Nanti interface ini diganti dengan User object dari Auth Context
interface BookerProps {
    user: {
        fullName: string;
        email: string;
        phone: string;
    };
}

export const BookerInfoCard: React.FC<BookerProps> = ({ user }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    Detail Pemesan
                    <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full border border-green-200">
                        Terisi Otomatis
                    </span>
                </h3>
                <FiCheckCircle className="text-green-500" />
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Nama */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                        <FiUser /> Nama Lengkap
                    </label>
                    <p className="font-bold text-gray-800 truncate" title={user.fullName}>
                        {user.fullName}
                    </p>
                </div>

                {/* Email */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                        <FiMail /> Email
                    </label>
                    <p className="font-bold text-gray-800 truncate" title={user.email}>
                        {user.email}
                    </p>
                </div>

                {/* Telepon */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                        <FiPhone /> Nomor Telepon
                    </label>
                    <p className="font-bold text-gray-800">
                        {user.phone}
                    </p>
                </div>
            </div>

            <div className="bg-yellow-50 px-6 py-3 border-t border-yellow-100">
                <p className="text-xs text-yellow-700">
                    *E-ticket dan bukti pembayaran akan dikirim ke alamat email di atas.
                </p>
            </div>
        </div>
    );
};