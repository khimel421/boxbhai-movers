import Navbar from "@/components/Navbar";
import BookingFooter from "@/components/BookingFooter";
import BookingForm from "@/components/BookingForm";

export default function BookMovingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-100 py-12 px-4">
        <BookingForm />
      </div>
      <BookingFooter />
    </main>
  );
}
