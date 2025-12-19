import React from "react";
import { Flight } from "../../types/api";
import { FiCalendar, FiClock } from "react-icons/fi";

interface Props {
  outboundFlight: Flight | null; 
  inboundFlight: Flight | null;  
}

// Helper
const formatDate = (isoStr: string) => {
  if (!isoStr) return "-";
  return new Date(isoStr).toLocaleDateString("id-ID", {
    weekday: "short", day: "numeric", month: "short", year: "numeric"
  });
};

const formatTime = (isoStr: string) => {
  if (!isoStr) return "--:--";
  return new Date(isoStr).toLocaleTimeString("id-ID", {
    hour: "2-digit", minute: "2-digit", hour12: false
  });
};

export const FlightSummaryCard: React.FC<Props> = ({ outboundFlight, inboundFlight }) => {
  
  const renderFlightSegment = (flight: Flight, label: string, badgeColor: string, textColor: string) => (
    <div className="border-b last:border-0 border-gray-100 pb-4 last:pb-0 mb-4 last:mb-0">
      {/* Label: PERGI / PULANG */}
      <div className={`text-[10px] font-bold uppercase tracking-wider mb-3 ${textColor} ${badgeColor} inline-block px-2 py-1 rounded`}>
        {label}
      </div>

      {/* Rute & Maskapai */}
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center bg-white p-1 shadow-sm">
             <img src={flight.airline?.logo_url} alt="logo" className="w-full h-full object-contain" />
        </div>
        <div className="flex-1">
             <h4 className="font-bold text-gray-800 text-sm leading-tight mb-1">
                {flight.origin?.city_name} ({flight.origin?.code}) 
                <span className="text-gray-300 mx-2">→</span>
                {flight.destination?.city_name} ({flight.destination?.code})
             </h4>
             <p className="text-xs text-gray-500 font-medium">{flight.airline?.name} • {flight.flight_code}</p>
        </div>
      </div>

      {/* Waktu */}
      <div className="mt-3 flex items-center gap-4 text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
         <div className="flex items-center gap-1.5">
            <FiCalendar className="text-red-400" />
            <span className="font-medium">{formatDate(flight.departure_time)}</span>
         </div>
         <div className="h-3 w-[1px] bg-gray-300"></div>
         <div className="flex items-center gap-1.5">
            <FiClock className="text-red-400" />
            <span className="font-medium">
                {formatTime(flight.departure_time)} - {formatTime(flight.arrival_time)}
            </span>
         </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-red-50 to-white">
        <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Penerbangan Anda</h3>
      </div>
      <div className="p-4">
        {/* Outbound: Merah */}
        {outboundFlight && renderFlightSegment(outboundFlight, "Penerbangan Pergi", "bg-red-50", "text-red-600")}
        
        {/* Inbound: Abu/Dark (Supaya beda tapi match) */}
        {inboundFlight && (
            <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
                {renderFlightSegment(inboundFlight, "Penerbangan Pulang", "bg-gray-100", "text-gray-600")}
            </div>
        )}
      </div>
    </div>
  );
};