'use client';

import { useEffect, useState } from 'react';

interface Booking {
  id: string;
  booking_id: string;
  name: string;
  phone: string;
  email: string | null;
  moving_date: string;
  pickup: string;
  dropoff: string;
  moving_type: string;
  bedrooms: string;
  floor_out: number;
  floor_in: number;
  notes: string | null;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  admin_note: string | null;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending:   'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const STATUS_LABELS: Record<string, string> = {
  pending:   'পেন্ডিং',
  confirmed: 'কনফার্ম',
  completed: 'সম্পন্ন',
  cancelled: 'বাতিল',
};

const MOVING_TYPE_LABELS: Record<string, string> = {
  family:   '🏠 ফ্যামিলি',
  office:   '🏢 অফিস',
  bachelor: '🛏️ ব্যাচেলর',
};

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selected, setSelected] = useState<Booking | null>(null);
  const [adminNote, setAdminNote] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchBookings = async (pw: string, status = 'all') => {
    setLoading(true);
    const res = await fetch(`/api/bookings?status=${status}`, {
      headers: { 'x-admin-key': pw },
    });
    if (res.ok) {
      const json = await res.json();
      setBookings(json.bookings);
    }
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/bookings', { headers: { 'x-admin-key': password } });
    if (res.ok) {
      setAuthed(true);
      const json = await res.json();
      setBookings(json.bookings);
    } else {
      alert('পাসওয়ার্ড ভুল');
    }
    setLoading(false);
  };

  const handleStatusChange = async (booking: Booking, newStatus: string) => {
    setSaving(true);
    const res = await fetch(`/api/bookings/${booking.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': password },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      await fetchBookings(password, filterStatus);
      if (selected?.id === booking.id) setSelected({ ...selected, status: newStatus as Booking['status'] });
    }
    setSaving(false);
  };

  const handleSaveNote = async () => {
    if (!selected) return;
    setSaving(true);
    const res = await fetch(`/api/bookings/${selected.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': password },
      body: JSON.stringify({ admin_note: adminNote }),
    });
    if (res.ok) {
      await fetchBookings(password, filterStatus);
      setSelected({ ...selected, admin_note: adminNote });
    }
    setSaving(false);
  };

  const handleFilter = (status: string) => {
    setFilterStatus(status);
    fetchBookings(password, status);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm space-y-4">
          <div className="text-center">
            <div className="text-3xl mb-2">🔐</div>
            <h1 className="text-xl font-bold text-gray-800">Admin Login</h1>
            <p className="text-sm text-gray-500">BoxBhai Movers Dashboard</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="পাসওয়ার্ড দিন"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors disabled:opacity-50"
          >
            {loading ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-white font-bold text-lg">BoxBhai Admin</h1>
          <p className="text-blue-200 text-xs">{bookings.length} টি বুকিং</p>
        </div>
        <button
          onClick={() => setAuthed(false)}
          className="text-blue-200 hover:text-white text-sm"
        >
          লগআউট
        </button>
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar — booking list */}
        <div className="w-80 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
          {/* Filter tabs */}
          <div className="flex gap-1 p-3 border-b border-gray-100 flex-wrap">
            {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(s => (
              <button
                key={s}
                onClick={() => handleFilter(s)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filterStatus === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s === 'all' ? 'সব' : STATUS_LABELS[s]}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="overflow-y-auto flex-1">
            {loading ? (
              <div className="p-6 text-center text-gray-400 text-sm">লোড হচ্ছে...</div>
            ) : bookings.length === 0 ? (
              <div className="p-6 text-center text-gray-400 text-sm">কোনো বুকিং নেই</div>
            ) : (
              bookings.map(b => (
                <button
                  key={b.id}
                  onClick={() => { setSelected(b); setAdminNote(b.admin_note ?? ''); }}
                  className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-blue-50 transition-colors ${
                    selected?.id === b.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-gray-800">{b.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[b.status]}`}>
                      {STATUS_LABELS[b.status]}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{b.booking_id}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(b.moving_date).toLocaleDateString('bn-BD')} · {MOVING_TYPE_LABELS[b.moving_type]}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Detail panel */}
        <div className="flex-1 overflow-y-auto p-6">
          {!selected ? (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
              বাম দিক থেকে একটি বুকিং সিলেক্ট করুন
            </div>
          ) : (
            <div className="max-w-2xl space-y-5">
              {/* Top bar */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{selected.name}</h2>
                  <p className="text-sm text-gray-500">{selected.booking_id}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[selected.status]}`}>
                  {STATUS_LABELS[selected.status]}
                </span>
              </div>

              {/* Change status */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">স্ট্যাটাস পরিবর্তন</p>
                <div className="flex gap-2 flex-wrap">
                  {(['pending', 'confirmed', 'completed', 'cancelled'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(selected, s)}
                      disabled={saving || selected.status === s}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 ${
                        selected.status === s
                          ? STATUS_COLORS[s] + ' cursor-default'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer info */}
              <InfoCard title="কাস্টমার তথ্য">
                <Row label="নাম" value={selected.name} />
                <Row label="ফোন" value={selected.phone} />
                {selected.email && <Row label="ইমেইল" value={selected.email} />}
                <Row label="মুভিং তারিখ" value={new Date(selected.moving_date).toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} />
              </InfoCard>

              {/* Location */}
              <InfoCard title="লোকেশন">
                <Row label="পিকআপ" value={`${selected.pickup} (ফ্লোর ${selected.floor_out})`} />
                <Row label="ড্রপঅফ" value={`${selected.dropoff} (ফ্লোর ${selected.floor_in})`} />
              </InfoCard>

              {/* Moving details */}
              <InfoCard title="মুভিং ডিটেইলস">
                <Row label="ধরন" value={MOVING_TYPE_LABELS[selected.moving_type]} />
                <Row label="রুম" value={`${selected.bedrooms} BHK`} />
                {selected.notes && <Row label="নোট" value={selected.notes} />}
              </InfoCard>

              {/* Admin note */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">অ্যাডমিন নোট</p>
                <textarea
                  value={adminNote}
                  onChange={e => setAdminNote(e.target.value)}
                  rows={3}
                  placeholder="অভ্যন্তরীণ নোট লিখুন..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <button
                  onClick={handleSaveNote}
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {saving ? 'সেভ হচ্ছে...' : 'নোট সেভ করুন'}
                </button>
              </div>

              <p className="text-xs text-gray-400">
                বুকিং সময়: {new Date(selected.created_at).toLocaleString('bn-BD')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4 justify-between">
      <span className="text-sm text-gray-500 shrink-0">{label}</span>
      <span className="text-sm font-medium text-gray-800 text-right">{value}</span>
    </div>
  );
}
