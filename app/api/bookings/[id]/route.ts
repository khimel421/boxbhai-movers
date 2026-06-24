import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

function checkAuth(req: NextRequest) {
  return req.headers.get('x-admin-key') === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;

  const { data, error } = await supabaseAdmin.from('bookings').select('*').eq('id', id).single();
  if (error) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ booking: data });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;

  const body = await req.json();
  const { status, admin_note, price_offer, details } = body;

  const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
  if (status && !validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const updates: Record<string, string | number | null | object> = {};
  if (status !== undefined)      updates.status      = status;
  if (admin_note !== undefined)  updates.admin_note  = admin_note;
  if (price_offer !== undefined) updates.price_offer = price_offer;
  if (details !== undefined)     updates.details     = details;

  const { data, error } = await supabaseAdmin
    .from('bookings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  return NextResponse.json({ booking: data });
}
