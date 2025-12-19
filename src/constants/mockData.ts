import { Flight } from "../types/api";

export const MOCK_FLIGHTS: Flight[] = [
  // SKENARIO 1: Penerbangan Langsung (Direct)
  {
    id: 101,
    flight_code: "GA-404",
    airline: {
      id: 1,
      iata: "GA",
      name: "Garuda Indonesia",
      logo_url:
        "https://upload.wikimedia.org/wikipedia/commons/e/e4/Garuda_Indonesia.svg",
    },
    origin: {
      id: 1,
      code: "CGK",
      city_name: "Jakarta",
      airport_name: "Soekarno-Hatta Intl Airport",
      country: "Indonesia",
    },
    destination: {
      id: 3,
      code: "DPS",
      city_name: "Bali / Denpasar",
      airport_name: "Ngurah Rai Intl Airport",
      country: "Indonesia",
    },
    departure_time: "2025-12-25T08:00:00Z",
    arrival_time: "2025-12-25T10:50:00Z",
    total_duration_minutes: 170,
    duration_formatted: "2j 50m",
    transit_count: 0,
    transit_info: "Langsung",
    flight_legs: [
      {
        id: 1001,
        leg_order: 1,
        airline: {
          id: 1,
          iata: "GA",
          name: "Garuda Indonesia",
          logo_url:
            "https://upload.wikimedia.org/wikipedia/commons/e/e4/Garuda_Indonesia.svg",
        },
        origin: {
          id: 1,
          code: "CGK",
          city_name: "Jakarta",
          airport_name: "Soekarno-Hatta Intl Airport",
          country: "Indonesia",
        },
        destination: {
          id: 3,
          code: "DPS",
          city_name: "Bali / Denpasar",
          airport_name: "Ngurah Rai Intl Airport",
          country: "Indonesia",
        },
        departure_time: "2025-12-25T08:00:00Z",
        arrival_time: "2025-12-25T10:50:00Z",
        flight_number: "GA-404",
        transit_notes: "",
        duration_minutes: 170,
        duration_formatted: "2j 50m",
      },
    ],
    flight_classes: [
      {
        seat_class: "economy",
        price: "1500000",
        total_seats: 50,
      },
    ],
  },

  // SKENARIO 2: Penerbangan Transit (Smart Backend Feature)
  {
    id: 102,
    flight_code: "MIX-777",
    airline: {
      id: 2,
      iata: "JT",
      name: "Lion Air",
      logo_url:
        "https://upload.wikimedia.org/wikipedia/commons/7/7b/Lion_Air_logo.svg",
    },
    origin: {
      id: 2,
      code: "HLP",
      city_name: "Jakarta (Halim)",
      airport_name: "Halim Perdanakusuma",
      country: "Indonesia",
    },
    destination: {
      id: 3,
      code: "DPS",
      city_name: "Bali / Denpasar",
      airport_name: "Ngurah Rai Intl Airport",
      country: "Indonesia",
    },
    departure_time: "2025-12-25T06:00:00Z",
    arrival_time: "2025-12-25T12:00:00Z",
    total_duration_minutes: 360,
    duration_formatted: "6j 0m",
    transit_count: 1,
    transit_info: "1 Transit",
    flight_legs: [
      // Leg 1: HLP -> SUB
      {
        id: 2001,
        leg_order: 1,
        airline: {
          id: 2,
          iata: "JT",
          name: "Lion Air",
          logo_url:
            "https://upload.wikimedia.org/wikipedia/commons/7/7b/Lion_Air_logo.svg",
        },
        origin: {
          id: 2,
          code: "HLP",
          city_name: "Jakarta (Halim)",
          airport_name: "Halim Perdanakusuma",
          country: "Indonesia",
        },
        destination: {
          id: 4, // Anggap saja SUB
          code: "SUB",
          city_name: "Surabaya",
          airport_name: "Juanda Intl Airport",
          country: "Indonesia",
        },
        departure_time: "2025-12-25T06:00:00Z",
        arrival_time: "2025-12-25T07:30:00Z",
        flight_number: "JT-101",
        transit_notes: "Transit Ganti Pesawat",
        duration_minutes: 90,
        duration_formatted: "1j 30m",

        // --- DATA PENTING FRONTEND: LAYOVER INFO ---
        layover_duration_minutes: 90,
        layover_duration_formatted: "1j 30m",
      },
      // Leg 2: SUB -> DPS
      {
        id: 2002,
        leg_order: 2,
        airline: {
          id: 3,
          iata: "QZ",
          name: "AirAsia",
          logo_url:
            "https://upload.wikimedia.org/wikipedia/commons/f/f5/AirAsia_New_Logo.svg",
        },
        origin: {
          id: 4,
          code: "SUB",
          city_name: "Surabaya",
          airport_name: "Juanda Intl Airport",
          country: "Indonesia",
        },
        destination: {
          id: 3,
          code: "DPS",
          city_name: "Bali / Denpasar",
          airport_name: "Ngurah Rai Intl Airport",
          country: "Indonesia",
        },
        departure_time: "2025-12-25T09:00:00Z",
        arrival_time: "2025-12-25T12:00:00Z", // +1 zona waktu (WIB ke WITA biasanya ada selisih, tapi ini dummy)
        flight_number: "QZ-202",
        transit_notes: "",
        duration_minutes: 180,
        duration_formatted: "3j 0m",
      },
    ],
    flight_classes: [
      {
        seat_class: "economy",
        price: "1150000",
        total_seats: 10,
      },
    ],
  },
];
