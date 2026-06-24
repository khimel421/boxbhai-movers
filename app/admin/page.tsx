'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ── Types ─────────────────────────────────────────────────────────────────────
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
  price_offer: number | null;
  created_at: string;
}

type NavSection = 'dashboard' | 'requests' | 'customers' | 'analytics';

// ── Config ────────────────────────────────────────────────────────────────────
const STATUS_CFG: Record<string, { label: string; bg: string; text: string; dot: string; btn: string }> = {
  pending:   { label: 'Pending',   bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500', btn: 'bg-orange-500 text-white' },
  confirmed: { label: 'Confirmed', bg: 'bg-green-100',  text: 'text-green-700',  dot: 'bg-green-500',  btn: 'bg-green-500 text-white'  },
  completed: { label: 'Complete',  bg: 'bg-emerald-100',text: 'text-emerald-800',dot: 'bg-emerald-600',btn: 'bg-emerald-600 text-white' },
  cancelled: { label: 'Cancelled', bg: 'bg-red-100',    text: 'text-red-600',    dot: 'bg-red-500',    btn: 'bg-red-500 text-white'    },
};

const MOVE_LABELS: Record<string, string> = { family: 'Family', office: 'Office', bachelor: 'Bachelor' };

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}
function fmtShort(s: string) {
  return new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const IcoDash = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 12a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z" /></svg>;
const IcoReq  = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>;
const IcoCust = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IcoPart = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-2h7.5M13 16l2-2h1.5a1 1 0 001-1V9a1 1 0 00-1-1h-2L13 6" /></svg>;
const IcoAnal = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const IcoOut  = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const IcoSearch = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const IcoPhone  = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" /></svg>;
const IcoUp    = () => <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4l8 9H4z" /></svg>;
const IcoDown  = () => <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 20l-8-9h16z" /></svg>;
const IcoX     = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
const IcoChev  = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>;
const IcoPlus  = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>;
const IcoCheck = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;
const IcoUser  = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const IcoRefresh = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;
const IcoTruck = () => <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path fillRule="evenodd" clipRule="evenodd" d="M13 6a1 1 0 00-1-1H4a1 1 0 00-1 1v9l1-1h9V6zM13 15v1h1.5a1 1 0 001-1V9a1 1 0 00-1-1h-2L11 6v9h2z"/></svg>;

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ section, onSection, onSignout }: {
  section: NavSection;
  onSection: (s: NavSection) => void;
  onSignout: () => void;
}) {
  const nav: { id: NavSection; label: string; Icon: () => React.ReactElement }[] = [
    { id: 'dashboard', label: 'Dashboard', Icon: IcoDash },
    { id: 'requests',  label: 'Requests',  Icon: IcoReq  },
    { id: 'customers', label: 'Customers', Icon: IcoCust },
    { id: 'analytics', label: 'Analytics', Icon: IcoAnal },
  ];

  return (
    <aside className="w-52 shrink-0 bg-white border-r border-gray-100 flex flex-col min-h-screen">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
            <IcoTruck />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">BoxBhai</p>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        {nav.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => onSection(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              section === id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Icon />
            {label}
          </button>
        ))}

        <button
          disabled
          title="Coming soon"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 cursor-not-allowed"
        >
          <IcoPart />
          Partners
          <span className="ml-auto text-xs bg-gray-50 text-gray-300 px-1.5 py-0.5 rounded">soon</span>
        </button>
      </nav>

      <div className="p-3 border-t border-gray-100">
        <button
          onClick={onSignout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          <IcoOut />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, color, sub }: { label: string; value: string | number; color: string; sub?: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{label}</p>
      <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

// ── Booking Card ──────────────────────────────────────────────────────────────
function BookingCard({ b }: { b: Booking }) {
  const router = useRouter();
  const sc = STATUS_CFG[b.status];
  return (
    <div
      onClick={() => router.push(`/admin/requests/${b.id}`)}
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all group"
    >
      <div className="bg-blue-600 group-hover:bg-blue-700 text-white text-xs font-bold px-3 py-5 rounded-lg text-center min-w-[84px] leading-tight transition-colors">
        {b.booking_id}
      </div>

      <div className="w-40 shrink-0">
        <p className="font-semibold text-gray-800 text-sm truncate">{b.name}</p>
        <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
          <IcoPhone />
          <span>{b.phone}</span>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1.5">
          <span className="text-blue-500 shrink-0"><IcoUp /></span>
          <span className="truncate">{b.pickup}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <span className="text-red-400 shrink-0"><IcoDown /></span>
          <span className="truncate">{b.dropoff}</span>
        </div>
      </div>

      <div className="text-right shrink-0 w-24">
        <p className="text-xs text-gray-400 mb-0.5">Date</p>
        <p className="text-sm font-semibold text-gray-700">{fmtShort(b.moving_date)}</p>
      </div>

      <div className="text-right shrink-0 w-28">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
          {sc.label}
        </span>
        <p className="text-xs text-gray-400 mt-1.5">
          Price Offer: {b.price_offer ? `৳${b.price_offer.toLocaleString()}` : '-'}
        </p>
      </div>
    </div>
  );
}

// ── Detail Drawer ─────────────────────────────────────────────────────────────
function BookingDrawer({ booking, password, onClose, onUpdate }: {
  booking: Booking;
  password: string;
  onClose: () => void;
  onUpdate: (b: Booking) => void;
}) {
  const [note, setNote]   = useState(booking.admin_note ?? '');
  const [price, setPrice] = useState(booking.price_offer?.toString() ?? '');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const sc = STATUS_CFG[booking.status];

  const patch = async (body: Record<string, string | number | null>) => {
    setSaving(true);
    setMsg('');
    const res = await fetch(`/api/bookings/${booking.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': password },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const json = await res.json();
      onUpdate(json.booking);
      setMsg('Saved!');
      setTimeout(() => setMsg(''), 2000);
    }
    setSaving(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/25 z-40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-[460px] bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                {sc.label}
              </span>
              <span className="text-xs text-gray-400">{booking.booking_id}</span>
            </div>
            <h2 className="font-bold text-gray-900 text-lg">{booking.name}</h2>
            <p className="text-xs text-gray-400 mt-0.5">Created {fmtDate(booking.created_at)}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400">
            <IcoX />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-4">
            {/* Status actions */}
            <DrawerSection title="Update Status">
              <div className="flex flex-wrap gap-2">
                {Object.entries(STATUS_CFG).map(([key, cfg]) => (
                  <button
                    key={key}
                    onClick={() => patch({ status: key })}
                    disabled={saving || booking.status === key}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      booking.status === key ? cfg.btn + ' shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    } disabled:opacity-50`}
                  >
                    {cfg.label}
                  </button>
                ))}
              </div>
            </DrawerSection>

            {/* Customer */}
            <DrawerSection title="Customer Info">
              <DRow label="Name"        value={booking.name} />
              <DRow label="Phone"       value={booking.phone} />
              {booking.email && <DRow label="Email" value={booking.email} />}
              <DRow label="Moving Date" value={fmtDate(booking.moving_date)} />
            </DrawerSection>

            {/* Locations */}
            <DrawerSection title="Locations">
              <DRow label="Pickup"  value={`${booking.pickup} · Floor ${booking.floor_out}`} />
              <DRow label="Dropoff" value={`${booking.dropoff} · Floor ${booking.floor_in}`} />
            </DrawerSection>

            {/* Move details */}
            <DrawerSection title="Move Details">
              <DRow label="Type"     value={MOVE_LABELS[booking.moving_type] ?? booking.moving_type} />
              <DRow label="Bedrooms" value={`${booking.bedrooms} BHK`} />
              {booking.notes && <DRow label="Customer Note" value={booking.notes} />}
            </DrawerSection>

            {/* Price + Note */}
            <DrawerSection title="Price & Notes">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 font-medium mb-1">Price Offer (৳)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="e.g. 12000"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 font-medium mb-1">Internal Note</label>
                  <textarea
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    rows={3}
                    placeholder="Add internal notes..."
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
                <button
                  onClick={() => patch({ admin_note: note, price_offer: price ? Number(price) : null })}
                  disabled={saving}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
                >
                  <IcoCheck />
                  {saving ? 'Saving...' : msg || 'Save Changes'}
                </button>
              </div>
            </DrawerSection>
          </div>
        </div>
      </div>
    </>
  );
}

function DrawerSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{title}</p>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function DRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-gray-400 shrink-0">{label}</span>
      <span className="text-gray-800 font-medium text-right">{value}</span>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function DashboardSection({ bookings }: { bookings: Booking[] }) {
  const total     = bookings.length;
  const pending   = bookings.filter(b => b.status === 'pending').length;
  const confirmed = bookings.filter(b => b.status === 'confirmed').length;
  const completed = bookings.filter(b => b.status === 'completed').length;
  const cancelled = bookings.filter(b => b.status === 'cancelled').length;
  const revenue   = bookings.filter(b => b.status === 'completed').reduce((s, b) => s + (b.price_offer ?? 0), 0);
  const recent    = bookings.slice(0, 6);

  const months: Record<string, number> = {};
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    months[d.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' })] = 0;
  }
  bookings.forEach(b => {
    const key = new Date(b.created_at).toLocaleDateString('en-GB', { month: 'short', year: '2-digit' });
    if (key in months) months[key]++;
  });
  const monthArr = Object.entries(months);
  const maxM = Math.max(...monthArr.map(([, v]) => v), 1);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-400 mt-0.5">Overview of your moving operations</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total"     value={total}     color="text-gray-900" />
        <StatCard label="Pending"   value={pending}   color="text-orange-500" />
        <StatCard label="Confirmed" value={confirmed} color="text-green-600" />
        <StatCard label="Completed" value={completed} color="text-blue-600" sub={cancelled > 0 ? `${cancelled} cancelled` : undefined} />
      </div>

      {revenue > 0 && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6 shadow-sm">
          <p className="text-sm text-blue-200 font-medium">Confirmed Revenue</p>
          <p className="text-4xl font-bold mt-1">৳{revenue.toLocaleString()}</p>
          <p className="text-xs text-blue-300 mt-2">From {completed} completed bookings</p>
        </div>
      )}

      {total > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Status Breakdown</p>
          <div className="flex h-2.5 rounded-full overflow-hidden gap-px">
            {[
              { count: pending,   cls: 'bg-orange-400' },
              { count: confirmed, cls: 'bg-green-500'  },
              { count: completed, cls: 'bg-blue-500'   },
              { count: cancelled, cls: 'bg-red-400'    },
            ].filter(x => x.count > 0).map(({ count, cls }, i) => (
              <div key={i} className={`${cls} transition-all`} style={{ width: `${(count / total) * 100}%` }} />
            ))}
          </div>
          <div className="flex gap-5 mt-3 flex-wrap">
            {[
              { label: 'Pending',   count: pending,   cls: 'bg-orange-400' },
              { label: 'Confirmed', count: confirmed, cls: 'bg-green-500'  },
              { label: 'Completed', count: completed, cls: 'bg-blue-500'   },
              { label: 'Cancelled', count: cancelled, cls: 'bg-red-400'    },
            ].map(({ label, count, cls }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className={`w-2 h-2 rounded-full ${cls}`} />
                {label}: <span className="font-semibold text-gray-700">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Monthly bar chart */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Requests per Month</p>
          <div className="flex items-end gap-2 h-28">
            {monthArr.map(([month, count]) => (
              <div key={month} className="flex-1 flex flex-col items-center gap-1">
                {count > 0 && <span className="text-xs font-medium text-gray-600">{count}</span>}
                <div
                  className="w-full bg-blue-500 rounded-t-sm"
                  style={{ height: count > 0 ? `${Math.max((count / maxM) * 88, 6)}px` : '2px', opacity: count > 0 ? 1 : 0.15 }}
                />
                <span className="text-xs text-gray-400 whitespace-nowrap">{month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent requests */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recent Requests</p>
          </div>
          <div className="divide-y divide-gray-50">
            {recent.map(b => {
              const sc = STATUS_CFG[b.status];
              return (
                <div key={b.id} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{b.name}</p>
                    <p className="text-xs text-gray-400">{b.booking_id} · {fmtShort(b.moving_date)}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${sc.bg} ${sc.text}`}>{sc.label}</span>
                </div>
              );
            })}
            {recent.length === 0 && (
              <p className="text-center text-sm text-gray-300 py-8">No bookings yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Requests ──────────────────────────────────────────────────────────────────
function RequestsSection({ bookings }: {
  bookings: Booking[];
}) {
  const [search, setSearch]       = useState('');
  const [statusFilter, setStatus] = useState('all');
  const [tab, setTab]             = useState<'moving' | 'truck'>('moving');

  const filtered = bookings.filter(b => {
    const q = search.toLowerCase();
    const matchQ = !q || b.name.toLowerCase().includes(q) || b.booking_id.toLowerCase().includes(q) || b.phone.includes(q);
    const matchS = statusFilter === 'all' || b.status === statusFilter;
    return matchQ && matchS;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Create Request</h2>
          <p className="text-sm text-gray-400 mt-0.5">{bookings.length} total requests</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm">
          <IcoPlus />
          New Request
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><IcoSearch /></span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Order ID, name, phone..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        <div className="relative">
          <select
            value={statusFilter}
            onChange={e => setStatus(e.target.value)}
            className="appearance-none pl-4 pr-9 py-2.5 border border-gray-200 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px] cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><IcoChev /></span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        {(['moving', 'truck'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`inline-block px-5 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px ${
              tab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t === 'moving' ? 'Moving Requests' : 'Truck Requests'}
            {t === 'moving' && filtered.length > 0 && (
              <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full font-bold">
                {filtered.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      {tab === 'truck' ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 mb-4">
            <IcoPart />
          </div>
          <p className="font-semibold text-gray-500">Truck Requests coming soon</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 mb-4">
            <IcoReq />
          </div>
          <p className="font-semibold text-gray-500">No requests found</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(b => (
            <BookingCard key={b.id} b={b} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Customers ─────────────────────────────────────────────────────────────────
function CustomersSection({ bookings }: { bookings: Booking[] }) {
  const map = new Map<string, { name: string; phone: string; email: string | null; count: number; spent: number; last: string }>();
  bookings.forEach(b => {
    const e = map.get(b.phone);
    if (e) {
      e.count++;
      e.spent += b.price_offer ?? 0;
      if (new Date(b.created_at) > new Date(e.last)) e.last = b.created_at;
    } else {
      map.set(b.phone, { name: b.name, phone: b.phone, email: b.email, count: 1, spent: b.price_offer ?? 0, last: b.created_at });
    }
  });
  const customers = Array.from(map.values()).sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Customers</h2>
        <p className="text-sm text-gray-400 mt-0.5">{customers.length} unique customers</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/80">
              {['Customer', 'Phone', 'Bookings', 'Total Spent', 'Last Booking'].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {customers.map(c => (
              <tr key={c.phone} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0">
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{c.name}</p>
                      {c.email && <p className="text-xs text-gray-400">{c.email}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-sm text-gray-600">{c.phone}</td>
                <td className="px-5 py-3.5">
                  <span className="text-sm font-bold text-gray-800">{c.count}</span>
                </td>
                <td className="px-5 py-3.5 text-sm text-gray-700 font-medium">
                  {c.spent > 0 ? `৳${c.spent.toLocaleString()}` : <span className="text-gray-300">—</span>}
                </td>
                <td className="px-5 py-3.5 text-sm text-gray-400">{fmtDate(c.last)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 && (
          <p className="text-center text-sm text-gray-300 py-16">No customers yet</p>
        )}
      </div>
    </div>
  );
}

// ── Analytics ─────────────────────────────────────────────────────────────────
function AnalyticsSection({ bookings }: { bookings: Booking[] }) {
  const byType = ['family', 'office', 'bachelor'].map(t => ({
    label: MOVE_LABELS[t],
    count: bookings.filter(b => b.moving_type === t).length,
  }));
  const maxT = Math.max(...byType.map(t => t.count), 1);

  const byFloor = [1, 2, 3, 4, 5, 6].map(f => ({
    label: `Floor ${f}`,
    count: bookings.filter(b => b.floor_out === f || b.floor_in === f).length,
  }));
  const maxF = Math.max(...byFloor.map(f => f.count), 1);

  const statuses = Object.entries(STATUS_CFG).map(([key, cfg]) => ({
    label: cfg.label,
    count: bookings.filter(b => b.status === key).length,
    dot: cfg.dot,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Analytics</h2>
        <p className="text-sm text-gray-400 mt-0.5">Insights from your booking data</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statuses.map(({ label, count, dot }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-center gap-3">
            <span className={`w-3 h-3 rounded-full ${dot} shrink-0`} />
            <div>
              <p className="text-2xl font-bold text-gray-900">{count}</p>
              <p className="text-xs text-gray-400">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Requests by Type</p>
          <div className="space-y-3">
            {byType.map(({ label, count }) => (
              <div key={label}>
                <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                  <span className="font-medium">{label}</span>
                  <span className="font-bold">{count}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(count / maxT) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Floor Distribution</p>
          <div className="space-y-3">
            {byFloor.filter(f => f.count > 0).map(({ label, count }) => (
              <div key={label}>
                <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                  <span className="font-medium">{label}</span>
                  <span className="font-bold">{count}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${(count / maxF) * 100}%` }} />
                </div>
              </div>
            ))}
            {byFloor.every(f => f.count === 0) && (
              <p className="text-sm text-gray-300 text-center py-4">No data yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [pw, setPw]           = useState('');
  const [authed, setAuthed]   = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState<NavSection>('requests');
  const [error, setError]     = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchBookings = useCallback(async (pass: string) => {
    const res = await fetch('/api/bookings', { headers: { 'x-admin-key': pass } });
    if (res.ok) {
      const json = await res.json();
      setBookings(json.bookings);
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem('bxm_admin');
    if (saved) {
      setPw(saved);
      setAuthed(true);
      fetchBookings(saved);
    }
  }, [fetchBookings]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/bookings', { headers: { 'x-admin-key': pw } });
    if (res.ok) {
      sessionStorage.setItem('bxm_admin', pw);
      setAuthed(true);
      const json = await res.json();
      setBookings(json.bookings);
    } else {
      setError('Incorrect password. Please try again.');
    }
    setLoading(false);
  };

  const handleSignout = () => {
    sessionStorage.removeItem('bxm_admin');
    setAuthed(false);
    setPw('');
    setBookings([]);
    setSection('requests');
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchBookings(pw);
    setRefreshing(false);
  };

  const handleBookingUpdate = (updated: Booking) => {
    setBookings(prev => prev.map(b => b.id === updated.id ? updated : b));
  };

  // ── Login ──
  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
              <IcoTruck />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">BoxBhai Movers</h1>
            <p className="text-gray-400 text-sm mt-1">Admin Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 p-8 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                value={pw}
                onChange={e => setPw(e.target.value)}
                placeholder="Enter admin password"
                className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  error ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
                required
              />
              {error && <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">⚠ {error}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm transition-colors disabled:opacity-50 shadow-sm"
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── App ──
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar section={section} onSection={setSection} onSignout={handleSignout} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold text-gray-900">
              {section === 'requests' ? 'Create Request' : section.charAt(0).toUpperCase() + section.slice(1)}
            </h1>
            {section === 'requests' && (
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold">{bookings.length}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className={`p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-all ${refreshing ? 'animate-spin' : ''}`}
              title="Refresh"
            >
              <IcoRefresh />
            </button>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <IcoUser />
              </div>
              <span className="text-sm font-semibold text-gray-700">Admin</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {section === 'dashboard' && <DashboardSection bookings={bookings} />}
          {section === 'requests'  && <RequestsSection bookings={bookings} />}
          {section === 'customers' && <CustomersSection bookings={bookings} />}
          {section === 'analytics' && <AnalyticsSection bookings={bookings} />}
        </main>
      </div>
    </div>
  );
}
