import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

function generateBookingId(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `BXM-${num}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name, number, email, movingDate,
      pickupLocation, dropoffLocation,
      movingType, bedroomCount, floorOut, floorIn, notes,
    } = body;

    if (!name || !number || !movingDate || !pickupLocation || !dropoffLocation || !movingType || !bedroomCount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const bookingId = generateBookingId();

    const { data, error } = await supabaseAdmin
      .from('bookings')
      .insert({
        booking_id: bookingId,
        name,
        phone: number,
        email: email || null,
        moving_date: movingDate,
        pickup: pickupLocation,
        dropoff: dropoffLocation,
        moving_type: movingType,
        bedrooms: bedroomCount,
        floor_out: floorOut,
        floor_in: floorIn,
        notes: notes || null,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 });
    }

    return NextResponse.json({ bookingId: data.booking_id }, { status: 201 });
  } catch (err) {
    console.error('Booking API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const adminKey = req.headers.get('x-admin-key');
  if (adminKey !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');

  let query = supabaseAdmin
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }

  return NextResponse.json({ bookings: data });
}
