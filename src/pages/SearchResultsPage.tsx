import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchResultsNavbar } from "../components/layout/SearchResultsNavbar";
import { SearchSummary } from "../components/sections/SearchSummary";
import { FilterBar } from "../components/sections/FilterBar";
import { FlightCard } from "../components/ui/FlightCard";
import { flightService } from "../services/flightService";
import { airportService } from "../services/airportService"; 
import { Flight } from "../types/api";
import { FiAlertCircle, FiSearch } from "react-icons/fi";

const SearchResultsPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    
    // --- STATE DATA ---
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // --- STATE HEADER CONTEXT ---
    const [headerContext, setHeaderContext] = useState({
        originCode: "...",
        originCity: "Memuat...",
        destinationCode: "...",
        destinationCity: "Memuat...",
        dateFormatted: "...",
        passengers: 1,
        seatClass: "Economy"
    });

    // --- FETCHING LOGIC ---
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            // 1. Ambil Parameter dari URL
            const originId = searchParams.get("origin");
            const destinationId = searchParams.get("destination");
            
            // 🔥 UPDATE DI SINI: Ambil 'departure_date' dari URL browser
            const departureDateStr = searchParams.get("departure_date"); 
            
            const passengers = Number(searchParams.get("passengers")) || 1;
            const seatClass = searchParams.get("seat_class") || "economy";

            // Validasi Dasar (Cek departureDateStr)
            if (!originId || !destinationId || !departureDateStr) {
                setError("Parameter pencarian tidak lengkap.");
                setLoading(false);
                return;
            }

            try {
                // --- PARALLEL FETCHING ---
                const [airportsData, flightsData] = await Promise.all([
                    airportService.getAirports(), 
                    flightService.searchFlights({ 
                        originAirportId: Number(originId),
                        destinationAirportId: Number(destinationId),
                        departureDate: new Date(departureDateStr), // Pass Date Object
                        passengerCount: passengers,
                        seatClass: seatClass as any
                    })
                ]);

                // --- 2. SET HEADER CONTEXT ---
                const originAirport = airportsData.find(a => a.id === Number(originId));
                const destAirport = airportsData.find(a => a.id === Number(destinationId));

                const dateObj = new Date(departureDateStr);
                const dateFormatted = dateObj.toLocaleDateString('id-ID', { 
                    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' 
                });

                setHeaderContext({
                    originCode: originAirport?.code || "---",
                    originCity: originAirport?.city_name || "Unknown",
                    destinationCode: destAirport?.code || "---",
                    destinationCity: destAirport?.city_name || "Unknown",
                    dateFormatted: dateFormatted,
                    passengers: passengers,
                    seatClass: seatClass.charAt(0).toUpperCase() + seatClass.slice(1) 
                });

                // --- 3. SET FLIGHTS DATA ---
                setFlights(flightsData);

            } catch (err) {
                console.error("Error fetching search data:", err);
                setError("Terjadi kesalahan saat memuat data penerbangan.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchParams]); // Re-run effect kalau URL berubah

    // Handler Placeholder
    const handleFilterChange = (filters: any) => console.log("Filter:", filters);
    const handleEditSearch = () => console.log("Edit Search Modal Open");

    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans">
            <SearchResultsNavbar />

            <div className="pt-24 max-w-5xl mx-auto px-4 md:px-6 flex flex-col gap-6">
                
                <SearchSummary 
                    originCode={headerContext.originCode}
                    originCity={headerContext.originCity}
                    destinationCode={headerContext.destinationCode}
                    destinationCity={headerContext.destinationCity}
                    dateFormatted={headerContext.dateFormatted}
                    passengers={headerContext.passengers}
                    seatClass={headerContext.seatClass}
                    onEditSearch={handleEditSearch}
                />

                <div className="sticky top-20 z-20 bg-gray-50/95 backdrop-blur-sm py-2 -mx-4 px-4 md:mx-0 md:px-0">
                    <FilterBar onFilterChange={handleFilterChange} />
                </div>

                <div className="flex flex-col gap-4 min-h-[300px]">
                    
                    {/* STATE: LOADING (Skeleton) */}
                    {loading && (
                        <>
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-white rounded-xl h-40 animate-pulse border border-gray-100 p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
                                        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
                                        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded mb-4"></div>
                                    <div className="w-1/2 h-4 bg-gray-100 rounded mx-auto"></div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* STATE: ERROR */}
                    {!loading && error && (
                        <div className="bg-red-50 border border-red-100 rounded-xl p-8 text-center">
                            <FiAlertCircle className="text-4xl text-red-500 mx-auto mb-3" />
                            <h3 className="text-lg font-bold text-red-700">Gagal Memuat Data</h3>
                            <p className="text-red-600 text-sm">{error}</p>
                            <button 
                                onClick={() => window.location.reload()} 
                                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700"
                            >
                                Coba Lagi
                            </button>
                        </div>
                    )}

                    {/* STATE: EMPTY */}
                    {!loading && !error && flights.length === 0 && (
                        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiSearch className="text-3xl text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Penerbangan Tidak Ditemukan</h3>
                            <p className="text-gray-500 mt-2 max-w-md mx-auto">
                                Maaf, kami tidak menemukan jadwal penerbangan untuk rute dan tanggal yang Anda pilih. Silakan coba tanggal lain.
                            </p>
                        </div>
                    )}

                    {/* STATE: SUCCESS */}
                    {!loading && !error && flights.length > 0 && (
                        flights.map((flight) => (
                            <FlightCard key={flight.id} flight={flight} />
                        ))
                    )}

                </div>
            </div>
        </div>
    );
};

export default SearchResultsPage;