import React, { useState, useEffect } from "react";
import { FiUser, FiCalendar, FiFlag, FiGlobe } from "react-icons/fi";

// Tipe data untuk Satu Penumpang
export interface PassengerData {
    title: string;
    firstName: string;
    lastName: string;
    nationality: string;
    dob: string; 
    passportNumber?: string;
    issuingCountry?: string;
    expiryDate?: string;
}

interface Props {
    index: number;
    isInternational: boolean;
    onChange: (data: PassengerData, isValid: boolean) => void;
}

export const PassengerForm: React.FC<Props> = ({ index, isInternational, onChange }) => {
    // --- LOCAL STATE ---
    const [hasSingleName, setHasSingleName] = useState(false);
    
    const [formData, setFormData] = useState<PassengerData>({
        title: "Mr",
        firstName: "",
        lastName: "",
        nationality: "Indonesia", 
        dob: "",
        passportNumber: "",
        issuingCountry: "",
        expiryDate: ""
    });

    // --- EFFECT: VALIDATION ---
    useEffect(() => {
        let isValid = 
            formData.firstName.length > 0 && 
            formData.dob.length > 0 &&
            formData.nationality.length > 0;

        if (!hasSingleName && formData.lastName.length === 0) {
            isValid = false;
        }

        if (isInternational) {
            const passportOk = 
                (formData.passportNumber?.length || 0) > 0 &&
                (formData.issuingCountry?.length || 0) > 0 &&
                (formData.expiryDate?.length || 0) > 0;
            
            if (!passportOk) isValid = false;
        }

        const cleanData = { ...formData };
        if (hasSingleName) cleanData.lastName = ""; 

        onChange(cleanData, isValid);
    }, [formData, hasSingleName, isInternational]);

    // --- HANDLER ---
    const handleChange = (field: keyof PassengerData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6 transition-all duration-300 hover:shadow-md">
            
            {/* Header Card (Red Gradient) */}
            <div className="bg-gradient-to-r from-red-50 to-white px-6 py-4 border-b border-red-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">
                        {index + 1}
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg">
                        Data Penumpang
                        <span className="ml-2 text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-full border border-gray-100 shadow-sm">Dewasa</span>
                    </h3>
                </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
                
                {/* 1. BAGIAN NAMA (GRID SYSTEM) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    
                    {/* Title (2 Kolom) */}
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Title</label>
                        <div className="relative">
                            <select 
                                className="w-full h-[46px] px-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none appearance-none font-medium text-gray-700 cursor-pointer hover:border-red-300 transition"
                                value={formData.title}
                                onChange={(e) => handleChange("title", e.target.value)}
                            >
                                <option value="Mr">Mr.</option>
                                <option value="Mrs">Mrs.</option>
                                <option value="Ms">Ms.</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    {/* Nama Depan (5 Kolom) */}
                    <div className="md:col-span-5">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                            Nama Depan & Tengah <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input 
                                type="text"
                                className="w-full h-[46px] pl-10 pr-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-medium placeholder-gray-400 transition"
                                placeholder="Cth: Budi"
                                value={formData.firstName}
                                onChange={(e) => handleChange("firstName", e.target.value)}
                            />
                            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    {/* Nama Belakang (5 Kolom) */}
                    <div className="md:col-span-5 relative group">
                        <label className={`block text-xs font-bold uppercase tracking-wider mb-2 transition-colors ${hasSingleName ? 'text-gray-300' : 'text-gray-500'}`}>
                            Nama Belakang <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input 
                                type="text"
                                disabled={hasSingleName}
                                className={`w-full h-[46px] pl-10 pr-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none font-medium transition-all
                                    ${hasSingleName 
                                        ? 'bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed' 
                                        : 'bg-white border-gray-300 placeholder-gray-400 hover:border-red-300'
                                    }`}
                                placeholder={hasSingleName ? "" : "Cth: Santoso"}
                                value={formData.lastName}
                                onChange={(e) => handleChange("lastName", e.target.value)}
                            />
                            <FiUser className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${hasSingleName ? 'text-gray-300' : 'text-gray-400'}`} />
                        </div>
                    </div>
                </div>

                {/* TOGGLE SINGLE NAME (PINDAH KE KIRI) */}
                <div className="flex justify-start -mt-4">
                    <label className="flex items-center gap-3 cursor-pointer group select-none">
                        <div className="relative inline-flex items-center">
                            <input 
                                type="checkbox" 
                                className="sr-only peer"
                                checked={hasSingleName}
                                onChange={() => setHasSingleName(!hasSingleName)} 
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </div>
                        <span className={`text-xs font-medium transition-colors ${hasSingleName ? 'text-red-600 font-bold' : 'text-gray-500 group-hover:text-gray-700'}`}>
                            Penumpang hanya memiliki 1 nama
                        </span>
                    </label>
                </div>

                <div className="h-px bg-gray-100 w-full"></div>

                {/* 2. BAGIAN IDENTITAS (GRID 2 KOLOM) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Tanggal Lahir */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                            Tanggal Lahir <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input 
                                type="date"
                                className="w-full h-[46px] pl-10 pr-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-gray-700 font-medium cursor-pointer hover:border-red-300 transition"
                                value={formData.dob}
                                onChange={(e) => handleChange("dob", e.target.value)}
                            />
                            <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    {/* Kewarganegaraan */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                            Kewarganegaraan <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select 
                                className="w-full h-[46px] pl-10 pr-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none appearance-none font-medium text-gray-700 cursor-pointer hover:border-red-300 transition"
                                value={formData.nationality}
                                onChange={(e) => handleChange("nationality", e.target.value)}
                            >
                                <option value="Indonesia">Indonesia</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Singapore">Singapore</option>
                                <option value="Japan">Japan</option>
                                <option value="Other">Lainnya</option>
                            </select>
                            <FiFlag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. BAGIAN PASPOR (INTERNASIONAL ONLY) */}
                {isInternational && (
                    <div className="mt-6 bg-red-50/50 p-6 rounded-xl border border-red-100 animate-fadeIn">
                        <div className="flex items-center gap-2 mb-6 text-red-800">
                            <div className="p-1.5 bg-red-100 rounded-full">
                                <FiGlobe className="text-red-600" />
                            </div>
                            <h4 className="text-sm font-bold">Dokumen Perjalanan (Wajib untuk Internasional)</h4>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Nomor Paspor */}
                            <div>
                                <label className="block text-[10px] font-bold text-red-600 uppercase tracking-wider mb-2">Nomor Paspor *</label>
                                <input 
                                    type="text"
                                    className="w-full h-[42px] px-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm font-medium placeholder-red-300"
                                    placeholder="Nomor Paspor"
                                    value={formData.passportNumber}
                                    onChange={(e) => handleChange("passportNumber", e.target.value)}
                                />
                            </div>

                            {/* Negara Penerbit */}
                            <div>
                                <label className="block text-[10px] font-bold text-red-600 uppercase tracking-wider mb-2">Negara Penerbit *</label>
                                <div className="relative">
                                    <select 
                                        className="w-full h-[42px] px-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm font-medium bg-white appearance-none cursor-pointer"
                                        value={formData.issuingCountry}
                                        onChange={(e) => handleChange("issuingCountry", e.target.value)}
                                    >
                                        <option value="">Pilih Negara</option>
                                        <option value="Indonesia">Indonesia</option>
                                        <option value="Malaysia">Malaysia</option>
                                        <option value="Singapore">Singapore</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-red-400">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Berlaku Hingga */}
                            <div>
                                <label className="block text-[10px] font-bold text-red-600 uppercase tracking-wider mb-2">Berlaku Hingga *</label>
                                <input 
                                    type="date"
                                    className="w-full h-[42px] px-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm font-medium bg-white cursor-pointer text-gray-700"
                                    value={formData.expiryDate}
                                    onChange={(e) => handleChange("expiryDate", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};