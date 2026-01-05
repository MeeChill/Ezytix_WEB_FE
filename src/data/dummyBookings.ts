import { Booking } from "../types/booking";

// Helper sederhana untuk membuat tanggal dinamis (Biar dummy data tidak expired saat kamu tes)
const addHours = (h: number) => {
  const d = new Date();
  d.setHours(d.getHours() + h);
  return d.toISOString();
};

export const DUMMY_BOOKINGS: Booking[] = [
  // 1. KASUS: PEMBELIAN TERTUNDA (PENDING)
  // Sesuai DTO: Ada payment_url dan expiry_time
  {
    booking_code: "ORD-PENDING-001",
    status: "pending",
    total_amount: "1500000",
    created_at: new Date().toISOString(),
    payment_url: "https://checkout.xendit.co/web/dummy-link", 
    expiry_time: addHours(1), // Expired 1 jam lagi
    flight: {
      flight_code: "JT-609",
      airline_name: "Lion Air",
      airline_logo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/AirAsia_New_Logo.svg", 
      origin: "Jakarta (CGK)",
      destination: "Bali (DPS)",
      departure_time: addHours(24), // Berangkat besok
      arrival_time: addHours(26),
      duration_minutes: 120,
    },
  },

  // 2. KASUS: E-TIKET AKTIF (PAID & FUTURE)
  // Sesuai DTO: payment_url kosong, flight detail lengkap
  {
    booking_code: "EZY-ACT-888",
    status: "paid",
    total_amount: "1200000",
    created_at: addHours(-24), // Dibuat kemarin
    flight: {
      flight_code: "QZ-202",
      airline_name: "AirAsia",
      airline_logo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/AirAsia_New_Logo.svg",
      origin: "Bandung (BDO)",
      destination: "Bali (DPS)",
      departure_time: addHours(48), // Berangkat 2 hari lagi
      arrival_time: addHours(50),
      duration_minutes: 120,
    },
  },

  // 3. KASUS: RIWAYAT (HISTORY)
  // Sesuai DTO: Status paid/cancelled, waktu lampau
  {
    booking_code: "HIST-DONE-001",
    status: "paid",
    total_amount: "1850000",
    created_at: "2023-01-01T10:00:00Z", 
    flight: {
      flight_code: "GA-404",
      airline_name: "Garuda Indonesia",
      airline_logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Garuda_Indonesia_Logo.svg",
      origin: "Jakarta (CGK)",
      destination: "Surabaya (SUB)",
      departure_time: "2023-01-05T08:00:00Z", // Sudah lewat
      arrival_time: "2023-01-05T09:30:00Z",
      duration_minutes: 90,
    },
  },
];