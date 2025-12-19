import React from "react";
import { Flight } from "../../types/api";
import { FlightSummaryCard } from "./FlightSummaryCard";
import { BookingPriceSummary } from "./BookingPriceSummary";

interface Props {
  outboundFlight: Flight | null;
  inboundFlight: Flight | null;
  passengerCount: number;
  seatClass: string;
}

export const BookingSidebar: React.FC<Props> = ({
  outboundFlight,
  inboundFlight,
  passengerCount,
  seatClass
}) => {
  
  const outboundPrice = outboundFlight?.flight_classes?.[0]?.price 
    ? parseFloat(outboundFlight.flight_classes[0].price.toString()) 
    : 0;

  const inboundPrice = inboundFlight?.flight_classes?.[0]?.price 
    ? parseFloat(inboundFlight.flight_classes[0].price.toString()) 
    : 0;

  return (
    <div className="sticky top-24 space-y-6 animate-fadeIn">
        {/* 1. Info Penerbangan */}
        {outboundFlight && (
            <FlightSummaryCard 
                outboundFlight={outboundFlight}
                inboundFlight={inboundFlight}
            />
        )}

        {/* 2. Rincian Harga */}
        <BookingPriceSummary 
            passengerCount={passengerCount}
            seatClass={seatClass}
            outboundPrice={outboundPrice}
            inboundPrice={inboundPrice}
        />
    </div>
  );
};