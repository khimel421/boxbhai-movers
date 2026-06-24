'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

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
  status: string;
  admin_note: string | null;
  price_offer: number | null;
  details: BookingMeta | null;
  created_at: string;
}

interface BookingMeta {
  leadAssigned?:     string;
  moverCount?:       string;
  truckCategory?:    string;
  zone?:             string;
  advanceBooking?:   string;
  paymentMethod?:    string;
  advanceAmount?:    string;
  dueAmount?:        string;
  truckOnRoad?:      boolean;
  visitDate?:        string;
  visitStatus?:      string;
  rescheduleDate?:   string;
  rescheduleStatus?: string;
  remarks?:          string;
  furniture?:        Record<string, number>;
  cancelReason?:     string;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const STATUS_CFG: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  pending:   { label: 'Pending',   bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
  confirmed: { label: 'Confirmed', bg: 'bg-green-100',  text: 'text-green-700',  dot: 'bg-green-500'  },
  completed: { label: 'Complete',  bg: 'bg-emerald-100',text: 'text-emerald-800',dot: 'bg-emerald-600' },
  cancelled: { label: 'Cancelled', bg: 'bg-red-100',    text: 'text-red-600',    dot: 'bg-red-500'    },
};

const MOVE_LABELS: Record<string, string> = {
  family: 'Family', office: 'Office', bachelor: 'Bachelor',
};

const FURNITURE_ITEMS = [
  { key: 'bed',             label: 'Bed',             emoji: '🛏' },
  { key: 'almirah',         label: 'Almirah',         emoji: '🗄' },
  { key: 'wardrobe',        label: 'Wardrobe',        emoji: '🚪' },
  { key: 'sofa',            label: 'Sofa Set',        emoji: '🛋' },
  { key: 'divan',           label: 'Divan',           emoji: '🛏' },
  { key: 'dining_table',    label: 'Dining Table',    emoji: '🍽' },
  { key: 'chair',           label: 'Chair',           emoji: '🪑' },
  { key: 'tv',              label: 'TV & Stand',      emoji: '📺' },
  { key: 'fridge',          label: 'Refrigerator',    emoji: '🧊' },
  { key: 'ac',              label: 'AC Unit',         emoji: '❄️' },
  { key: 'washing_machine', label: 'Washing Machine', emoji: '🌀' },
  { key: 'gas_stove',       label: 'Gas Stove',       emoji: '🔥' },
  { key: 'computer',        label: 'Computer/Laptop', emoji: '💻' },
  { key: 'mattress',        label: 'Mattress',        emoji: '🛏' },
  { key: 'showcase',        label: 'Showcase',        emoji: '🪟' },
  { key: 'bookshelf',       label: 'Bookshelf',       emoji: '📚' },
];

const CANCEL_REASONS = [
  ['Unqualified lead', 'Personal issue'],
  ['Budget issue',     'Out of zone'   ],
  ['Found cheaper deal','No Bill'      ],
  ['Locally managed',  'Supply issue'  ],
  ['Postponed',        'No Response'   ],
];

const ZONES = [
  'Mohammadpur', 'Dhanmondi', 'Mirpur', 'Uttara', 'Gulshan',
  'Banani', 'Motijheel', 'Old Dhaka', 'Khilgaon', 'Badda', 'Rampura', 'Other',
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function ordSuffix(n: number) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function fmtDate(s: string) {
  const d = new Date(s);
  return `${ordSuffix(d.getDate())} ${d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`;
}

// ── Small UI pieces ───────────────────────────────────────────────────────────
function SectionCard({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50/60">
        <h3 className="text-sm font-bold text-gray-700">{title}</h3>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function InfoTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
      <span className="text-blue-500 mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-gray-400 font-medium leading-none mb-1">{label}</p>
        <p className="text-sm font-semibold text-gray-800 truncate">{value || '—'}</p>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

function Sel({ value, onChange, options, placeholder }: {
  value: string; onChange: (v: string) => void; options: string[]; placeholder?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full appearance-none px-3 py-2.5 pr-8 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
    </div>
  );
}

function Inp({ value, onChange, placeholder, type = 'text' }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

function Counter({ count, onChange }: { count: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => onChange(Math.max(0, count - 1))}
        className="w-7 h-7 rounded-md border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors font-bold text-base leading-none"
      >−</button>
      <span className="w-7 text-center text-sm font-bold text-gray-700">{count}</span>
      <button
        onClick={() => onChange(count + 1)}
        className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors font-bold text-base leading-none"
      >+</button>
    </div>
  );
}

// ── Icons (inline) ────────────────────────────────────────────────────────────
const UserIco  = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>;
const PhoneIco = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"/></svg>;
const CalIco   = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>;
const MailIco  = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>;
const BackIco  = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>;
const UploadIco= () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>;
const PinIco   = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>;

// ── Cancellation Reason Modal ─────────────────────────────────────────────────
function CancelReasonModal({ selected, onChange, onConfirm, onDismiss }: {
  selected: string;
  onChange: (r: string) => void;
  onConfirm: () => void;
  onDismiss: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onDismiss} />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-150">
        <h2 className="text-base font-bold text-gray-800 mb-5 text-center">Cancellation Reason</h2>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-6">
          {CANCEL_REASONS.flatMap(([left, right]) => [left, right]).map(reason => (
            <label key={reason} className="flex items-center gap-2.5 cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                selected === reason ? 'border-blue-600 bg-blue-600' : 'border-gray-300 group-hover:border-blue-400'
              }`}>
                {selected === reason && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <input
                type="radio"
                name="cancelReason"
                value={reason}
                checked={selected === reason}
                onChange={() => onChange(reason)}
                className="sr-only"
              />
              <span className="text-sm text-gray-700">{reason}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onDismiss}
            className="px-6 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!selected}
            className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors disabled:opacity-40 shadow-sm"
          >
            Confirm Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router  = useRouter();

  const [pw, setPw]           = useState('');
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [flash, setFlash]     = useState('');

  // Editable top-level fields
  const [status,     setStatus]     = useState('pending');
  const [priceOffer, setPriceOffer] = useState('');
  const [adminNote,  setAdminNote]  = useState('');

  // Cancellation modal
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason,    setCancelReason]    = useState('');

  // Structured metadata (stored in `details` JSONB column)
  const [meta, setMeta] = useState<BookingMeta>({
    leadAssigned: '', moverCount: '', truckCategory: '', zone: '',
    advanceBooking: '', paymentMethod: '', advanceAmount: '', dueAmount: '',
    truckOnRoad: false,
    visitDate: '', visitStatus: '', rescheduleDate: '', rescheduleStatus: '',
    remarks: '', furniture: {},
  });

  useEffect(() => {
    const saved = sessionStorage.getItem('bxm_admin');
    if (!saved) { router.push('/admin'); return; }
    setPw(saved);

    fetch(`/api/bookings/${id}`, { headers: { 'x-admin-key': saved } })
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(({ booking: b }: { booking: Booking }) => {
        setBooking(b);
        setStatus(b.status);
        setPriceOffer(b.price_offer?.toString() ?? '');
        setAdminNote(b.admin_note ?? '');
        if (b.details) setMeta(prev => ({ ...prev, ...b.details }));
        setLoading(false);
      })
      .catch(() => router.push('/admin'));
  }, [id, router]);

  const setM = <K extends keyof BookingMeta>(k: K, v: BookingMeta[K]) =>
    setMeta(prev => ({ ...prev, [k]: v }));

  const setFurniture = (key: string, n: number) =>
    setMeta(prev => ({ ...prev, furniture: { ...(prev.furniture ?? {}), [key]: n } }));

  const handleStatusChange = (newStatus: string) => {
    if (newStatus === 'cancelled') {
      setCancelReason(meta.cancelReason ?? '');
      setShowCancelModal(true);
    } else {
      setStatus(newStatus);
      setM('cancelReason', '');
    }
  };

  const confirmCancel = () => {
    setStatus('cancelled');
    setM('cancelReason', cancelReason);
    setShowCancelModal(false);
  };

  const dismissCancel = () => {
    setCancelReason('');
    setShowCancelModal(false);
  };

  const handleSave = async () => {
    if (!booking) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/bookings/${booking.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': pw },
        body: JSON.stringify({ status, admin_note: adminNote, price_offer: priceOffer ? Number(priceOffer) : null, details: meta }),
      });
      if (res.ok) {
        setFlash('✓ Saved successfully');
        setTimeout(() => setFlash(''), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-400">Loading booking...</p>
        </div>
      </div>
    );
  }

  if (!booking) return null;

  const sc = STATUS_CFG[booking.status] ?? STATUS_CFG.pending;
  const floorInfo = `${ordSuffix(booking.floor_out)} – ${ordSuffix(booking.floor_in)} Floor`;
  const furnitureHasItems = Object.values(meta.furniture ?? {}).some(v => v > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Cancellation modal ── */}
      {showCancelModal && (
        <CancelReasonModal
          selected={cancelReason}
          onChange={setCancelReason}
          onConfirm={confirmCancel}
          onDismiss={dismissCancel}
        />
      )}

      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => router.push('/admin')}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium"
            >
              <BackIco /> Go Back
            </button>
            <span className="text-gray-200">|</span>
            <div>
              <span className="text-xs text-gray-400">Order ID</span>
              <span className="ml-1.5 text-sm font-bold text-gray-800">#{booking.booking_id}</span>
            </div>
          </div>

          {/* Centre title */}
          <p className="text-sm font-bold text-gray-600 hidden md:block">Moving Details</p>

          {/* Right */}
          <div className="flex items-center gap-2 shrink-0">
            {flash && (
              <span className="text-xs text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">
                {flash}
              </span>
            )}
            <button
              onClick={() => router.push('/admin')}
              className="px-3 py-1.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-60 shadow-sm"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
            <div className="flex items-center gap-2 ml-1 pl-3 border-l border-gray-100">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                {booking.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-semibold text-gray-700 hidden sm:block">{booking.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="max-w-6xl mx-auto px-6 py-6 space-y-5">

        {/* ── Moving Details ── */}
        <SectionCard
          title="Moving Details"
          action={
            <label className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
              <UploadIco /> Upload Invoice
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
            </label>
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer info tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoTile icon={<UserIco />}  label="Customer"       value={booking.name} />
              <InfoTile icon={<PhoneIco />} label="Contact Number" value={booking.phone} />
              <InfoTile icon={<CalIco />}   label="Moving Date"    value={fmtDate(booking.moving_date)} />
              <InfoTile icon={<MailIco />}  label="Email Address"  value={booking.email ?? '—'} />
            </div>

            {/* Additional details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Moving Type</p>
                  <p className="text-sm font-bold text-gray-800">
                    {MOVE_LABELS[booking.moving_type] ?? booking.moving_type}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Floor Information</p>
                  <p className="text-sm font-bold text-gray-800">{floorInfo}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Bedroom Count</p>
                  <p className="text-sm font-bold text-gray-800">{booking.bedrooms} Bedrooms</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2">Truck Access on Road</p>
                  <div className="flex gap-4">
                    {['Yes', 'No'].map(opt => (
                      <label key={opt} className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="truckOnRoad"
                          checked={(meta.truckOnRoad ?? false) === (opt === 'Yes')}
                          onChange={() => setM('truckOnRoad', opt === 'Yes')}
                          className="accent-blue-600 w-3.5 h-3.5"
                        />
                        <span className="text-sm font-medium text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <Field label="Moving Status">
                  <Sel
                    value={status}
                    onChange={handleStatusChange}
                    options={['pending', 'confirmed', 'completed', 'cancelled']}
                  />
                  {status === 'cancelled' && meta.cancelReason && (
                    <p className="mt-1.5 text-xs text-red-500 font-semibold flex items-center gap-1">
                      <span>✕</span> {meta.cancelReason}
                    </p>
                  )}
                </Field>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ── Lead Details ── */}
        <SectionCard title="Lead Details">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Field label="Lead Assigned">
              <Sel value={meta.leadAssigned ?? ''} onChange={v => setM('leadAssigned', v)}
                options={['In-House', 'Field Agent', 'Partner', 'Online']} placeholder="Select…" />
            </Field>
            <Field label="Mover Count">
              <Sel value={meta.moverCount ?? ''} onChange={v => setM('moverCount', v)}
                options={['1', '2', '3', '4', '5', '6+']} placeholder="Select…" />
            </Field>
            <Field label="Truck Category">
              <Sel value={meta.truckCategory ?? ''} onChange={v => setM('truckCategory', v)}
                options={['Mini Truck', '1 Ton', '2 Ton', '3 Ton', '5 Ton', 'Large Truck']} placeholder="Select…" />
            </Field>
            <Field label="Zone">
              <Sel value={meta.zone ?? ''} onChange={v => setM('zone', v)}
                options={ZONES} placeholder="Select…" />
            </Field>
            <Field label="Lead Quiz">
              <Sel value={meta.visitStatus ?? ''} onChange={v => setM('visitStatus', v)}
                options={['Pending', 'Scheduled', 'Visited', 'Cancelled']} placeholder="Select…" />
            </Field>
          </div>
        </SectionCard>

        {/* ── Payment Details ── */}
        <SectionCard title="Payment Details">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Field label="Price Offered (৳)">
              <Inp value={priceOffer} onChange={setPriceOffer} placeholder="e.g. 12000" type="number" />
            </Field>
            <Field label="Advance Booking">
              <Sel value={meta.advanceBooking ?? ''} onChange={v => setM('advanceBooking', v)}
                options={['Post', 'Pre', 'None']} placeholder="Select…" />
            </Field>
            <Field label="Payment Method">
              <Sel value={meta.paymentMethod ?? ''} onChange={v => setM('paymentMethod', v)}
                options={['Bkash', 'Nagad', 'Cash', 'Bank Transfer', 'Rocket', 'Card']} placeholder="Select…" />
            </Field>
            <Field label="Advance Amount (৳)">
              <Inp value={meta.advanceAmount ?? ''} onChange={v => setM('advanceAmount', v)} placeholder="e.g. 500" type="number" />
            </Field>
            <Field label="Due Amount (৳)">
              <Inp value={meta.dueAmount ?? ''} onChange={v => setM('dueAmount', v)} placeholder="Auto / manual" type="number" />
            </Field>
          </div>
        </SectionCard>

        {/* ── Location ── */}
        <SectionCard title="Location">
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 p-3.5 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex flex-col items-center gap-0.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="w-px h-4 bg-blue-200" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-blue-500 font-semibold uppercase tracking-wide">Pickup Location</p>
                <p className="text-sm font-bold text-gray-800 truncate">{booking.pickup}</p>
                <p className="text-xs text-gray-400">Floor {booking.floor_out}</p>
              </div>
              <PinIco />
            </div>

            <div className="flex items-center gap-3 p-3.5 bg-red-50 rounded-xl border border-red-100">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-red-400 font-semibold uppercase tracking-wide">Dropoff Location</p>
                <p className="text-sm font-bold text-gray-800 truncate">{booking.dropoff}</p>
                <p className="text-xs text-gray-400">Floor {booking.floor_in}</p>
              </div>
              <PinIco />
            </div>
          </div>
        </SectionCard>

        {/* ── Customer Note + Visit Info + Remarks ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Customer Note */}
          <SectionCard title="Customer Note">
            <textarea
              value={adminNote}
              onChange={e => setAdminNote(e.target.value)}
              rows={5}
              placeholder="Add internal notes about this customer…"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            {booking.notes && (
              <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                <p className="text-xs text-amber-600 font-bold mb-1 uppercase tracking-wide">Customer&apos;s Note</p>
                <p className="text-sm text-gray-700">{booking.notes}</p>
              </div>
            )}
          </SectionCard>

          {/* Visit Info + Remarks */}
          <div className="space-y-5">
            <SectionCard title="Visit Information">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Visit Date">
                  <Inp value={meta.visitDate ?? ''} onChange={v => setM('visitDate', v)} type="date" />
                </Field>
                <Field label="Visit Status">
                  <Sel value={meta.visitStatus ?? ''} onChange={v => setM('visitStatus', v)}
                    options={['Pending', 'Scheduled', 'Visited', 'Cancelled']} placeholder="Select…" />
                </Field>
                <Field label="Reschedule Date">
                  <Inp value={meta.rescheduleDate ?? ''} onChange={v => setM('rescheduleDate', v)} type="date" />
                </Field>
                <Field label="Reschedule Status">
                  <Sel value={meta.rescheduleStatus ?? ''} onChange={v => setM('rescheduleStatus', v)}
                    options={['None', 'Requested', 'Confirmed']} placeholder="Select…" />
                </Field>
              </div>
            </SectionCard>

            <SectionCard title="Remarks">
              <textarea
                value={meta.remarks ?? ''}
                onChange={e => setM('remarks', e.target.value)}
                rows={4}
                placeholder="Agent will note down any remarks…"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </SectionCard>
          </div>
        </div>

        {/* ── Furniture Details ── */}
        <SectionCard title="Furniture Details">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
            {FURNITURE_ITEMS.map(({ key, label, emoji }) => {
              const count = meta.furniture?.[key] ?? 0;
              return (
                <div
                  key={key}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    count > 0
                      ? 'border-blue-200 bg-blue-50/60'
                      : 'border-gray-100 hover:border-blue-100 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl leading-none">{emoji}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-700">{label}</p>
                      {count > 0 && (
                        <p className="text-xs text-blue-500 font-semibold">{count} item{count !== 1 ? 's' : ''}</p>
                      )}
                    </div>
                  </div>
                  <Counter count={count} onChange={n => setFurniture(key, n)} />
                </div>
              );
            })}
          </div>

          {/* Summary strip */}
          {furnitureHasItems && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Furniture Summary</p>
              <div className="flex flex-wrap gap-2">
                {FURNITURE_ITEMS.filter(({ key }) => (meta.furniture?.[key] ?? 0) > 0).map(({ key, label, emoji }) => (
                  <span key={key} className="flex items-center gap-1 bg-blue-600 text-white text-xs px-2.5 py-1 rounded-full font-semibold">
                    {emoji} {label} × {meta.furniture?.[key]}
                  </span>
                ))}
              </div>
            </div>
          )}
        </SectionCard>

        {/* ── Bottom save bar ── */}
        <div className="flex items-center justify-between py-4">
          <p className="text-xs text-gray-400">
            Created {fmtDate(booking.created_at)} ·{' '}
            <span className={`font-semibold ${sc.text}`}>{sc.label}</span>
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/admin')}
              className="px-5 py-2.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-60 shadow-sm"
            >
              {saving ? 'Saving…' : flash ? '✓ Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
