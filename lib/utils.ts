import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class handling
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, "");

    // Format as +254 XXX XXX XXX
    if (cleaned.startsWith("254")) {
        return `+254 ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
    }

    return phone;
}

/**
 * Generate WhatsApp link with pre-filled message
 */
export function getWhatsAppLink(phone: string, message: string): string {
    const cleanedPhone = phone.replace(/\D/g, "");
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${cleanedPhone}?text=${encodedMessage}`;
}

/**
 * Generate Google Maps link
 */
export function getGoogleMapsLink(lat: number, lng: number): string {
    return `https://www.google.com/maps?q=${lat},${lng}`;
}

/**
 * Generate phone call link
 */
export function getPhoneLink(phone: string): string {
    return `tel:${phone}`;
}

/**
 * Generate email link
 */
export function getEmailLink(email: string, subject?: string): string {
    if (subject) {
        return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    }
    return `mailto:${email}`;
}