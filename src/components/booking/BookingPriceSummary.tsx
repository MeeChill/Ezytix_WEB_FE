import React from "react";

interface Props {
  passengerCount: number;
  seatClass: string;
  outboundPrice: number;
  inboundPrice?: number;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const BookingPriceSummary: React.FC<Props> = ({ 
  passengerCount, 
  seatClass, 
  outboundPrice, 
  inboundPrice = 0 
}) => {
  
  const totalOutbound = outboundPrice * passengerCount;
  const totalInbound = inboundPrice * passengerCount;
  const grandTotal = totalOutbound + totalInbound;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-red-50 to-white">
            <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Rincian Harga</h3>
        </div>
        
        <div className="p-4 space-y-3">
            {/* Outbound */}
            <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">
                    Tiket Pergi (x{passengerCount}) 
                    <span className="block text-[10px] text-gray-400 capitalize font-normal mt-0.5">{seatClass.replace('_', ' ')}</span>
                </span>
                <span className="font-bold text-gray-800">{formatCurrency(totalOutbound)}</span>
            </div>

            {/* Inbound */}
            {inboundPrice > 0 && (
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-medium">
                        Tiket Pulang (x{passengerCount})
                        <span className="block text-[10px] text-gray-400 capitalize font-normal mt-0.5">{seatClass.replace('_', ' ')}</span>
                    </span>
                    <span className="font-bold text-gray-800">{formatCurrency(totalInbound)}</span>
                </div>
            )}

            {/* Tax */}
            <div className="flex justify-between text-sm">
                <span className="text-gray-600">Pajak & Biaya</span>
                <span className="font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs">Termasuk</span>
            </div>

            {/* Divider */}
            <div className="border-t border-dashed border-gray-200 my-2"></div>

            {/* Total (Reference Only) */}
            <div className="flex justify-between items-end">
                <span className="font-bold text-gray-500 text-sm">Total Estimasi</span>
                <span className="font-black text-xl text-red-600 tracking-tight">
                    {formatCurrency(grandTotal)}
                </span>
            </div>
        </div>
    </div>
  );
};