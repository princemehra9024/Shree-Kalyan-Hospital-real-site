import { bookAppointment } from '../src/lib/server/appointments';

async function test() {
  console.log("Testing appointment booking...");
  const success = await bookAppointment({
    patient_name: "Antigravity Integration Test",
    phone_number: "0001112222",
    reason: "Verifying backend and DB connectivity",
    appointment_date: "2026-05-01",
    appointment_time: "10:30 AM"
  });

  if (success) {
    console.log("✅ Booking successful!");
  } else {
    console.error("❌ Booking failed.");
  }
}

test();
