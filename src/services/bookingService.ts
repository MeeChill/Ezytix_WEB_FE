// src/services/bookingService.ts

import { api } from '../lib/axios'; // Pastikan path axios instance benar
import { CreateBookingRequest, CreateBookingResponse } from '../types/booking';
import { ApiResponse } from '../types/api'; // Wrapper response standar { data, message }

export const bookingService = {
    // API: POST /bookings
    createBooking: async (payload: CreateBookingRequest): Promise<CreateBookingResponse> => {
        try {
            console.log("📤 Sending Booking Payload:", JSON.stringify(payload, null, 2));
            
            const response = await api.post<ApiResponse<CreateBookingResponse>>('/bookings', payload);
            
            console.log("📥 Booking Success Response:", response.data);
            return response.data.data; // Mengembalikan data inti (CreateBookingResponse)

        } catch (error: any) {
            // Error Handling Sederhana
            console.error("❌ Booking Failed:", error.response?.data || error.message);
            throw error; // Lempar error agar bisa ditangkap di UI (BookingPage)
        }
    }
};