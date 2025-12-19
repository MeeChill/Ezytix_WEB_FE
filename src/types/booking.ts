// src/types/booking.ts

// ==========================================
// 1. REQUEST PAYLOAD (Dikirim ke Backend)
// ==========================================

// Struktur Data Penumpang (Sesuai DTO Backend)
// Backend: Title, FullName, DOB, Nationality, PassportNumber, IssuingCountry, ValidUntil
export interface PassengerPayload {
    title: string;            // "tuan", "nyonya", "nona", "mr", "ms", "mrs"
    full_name: string;        // Gabungan First + Last Name
    dob: string;              // Format: YYYY-MM-DD
    nationality: string;
    passport_number?: string; // Optional (Backend tag omitempty/tidak required)
    issuing_country?: string; // Optional
    valid_until?: string;     // Optional (Format: YYYY-MM-DD)
}

// Struktur Item Booking (Per Penerbangan)
export interface BookingItemPayload {
    flight_id: number;
    seat_class: string;       // "economy", "business", "first_class"
    passengers: PassengerPayload[];
}

// Payload Utama (Root)
export interface CreateBookingRequest {
    items: BookingItemPayload[];
}

// ==========================================
// 2. RESPONSE PAYLOAD (Diterima dari Backend)
// ==========================================

// Detail Item yang berhasil dibooking
export interface BookingDetailResponse {
    booking_code: string;
    flight_code: string;
    origin: string;
    destination: string;
    departure_time: string;   // ISO String
    total_passengers: number;
    total_price: string;      // Decimal string dari Go
}

// Response Utama setelah sukses create booking
export interface CreateBookingResponse {
    order_id: string;
    total_amount: string;     // Decimal string
    status: string;           // "pending", "paid", etc
    transaction_time: string;
    payment_url: string;      // URL Midtrans/Payment Gateway
    expiry_date: string;
    bookings: BookingDetailResponse[];
}