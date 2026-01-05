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

export interface FlightDetail {
    flight_code: string;
    airline_name: string;
    airline_logo: string;
    origin: string;      // Contoh: "Jakarta (CGK)"
    destination: string; // Contoh: "Bali (DPS)"
    departure_time: string; // ISO String (2026-01-01T10:00:00Z)
    arrival_time: string;
    duration_minutes: number;
}

export interface Booking {
    booking_code: string;
    status: string;       // 'pending', 'paid', 'cancelled', 'failed'
    total_amount: string; // Backend mengirim Decimal sebagai string agar presisi
    created_at: string;
    
    // Field Opsional (Tergantung Status)
    payment_url?: string; // Wajib ada jika status 'pending'
    expiry_time?: string; // Wajib ada jika status 'pending'
    
    flight: FlightDetail;
}