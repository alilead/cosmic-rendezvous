import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, LogOut, RefreshCw, Download, Search } from "lucide-react";
import { toast } from "sonner";
import { netlifyFunctionUrl } from "@/lib/netlifyApi";

const ADMIN_KEY_STORAGE = "cosmic_admin_key";

const API_ADMIN_BOOKINGS = netlifyFunctionUrl("admin-bookings");

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guest_count: number;
  event_type: string;
  message: string | null;
  status: string;
  created_at?: string;
  updated_at?: string | null;
};

const EVENT_LABELS: Record<string, string> = {
  birthday: "Birthday",
  private_party: "Private party",
  corporate: "Corporate",
  dj_night: "DJ night",
  other: "Other",
};

function authHeaders(key: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${key}`,
  };
}

export default function Admin() {
  const [adminKey, setAdminKey] = useState("");
  const [storedKey, setStoredKey] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "name" | "created">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const k = sessionStorage.getItem(ADMIN_KEY_STORAGE);
    if (k) setStoredKey(k);
  }, []);

  const fetchBookings = useCallback(async (key: string) => {
    setLoading(true);
    try {
      const res = await fetch(API_ADMIN_BOOKINGS, { headers: authHeaders(key) });
      if (res.status === 401) {
        sessionStorage.removeItem(ADMIN_KEY_STORAGE);
        setStoredKey(null);
        toast.error("Invalid admin key");
        return;
      }
      if (!res.ok) {
        toast.error("Failed to load bookings");
        return;
      }
      const data = (await res.json()) as { bookings: Booking[] };
      setBookings(data.bookings ?? []);
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (storedKey) fetchBookings(storedKey);
  }, [storedKey, fetchBookings]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const key = adminKey.trim();
    if (!key) {
      toast.error("Enter admin key");
      return;
    }
    sessionStorage.setItem(ADMIN_KEY_STORAGE, key);
    setStoredKey(key);
    setAdminKey("");
    fetchBookings(key);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_KEY_STORAGE);
    setStoredKey(null);
    setBookings([]);
  };

  const updateStatus = async (id: string, status: string) => {
    if (!storedKey) return;
    setUpdatingId(id);
    try {
      const res = await fetch(API_ADMIN_BOOKINGS, {
        method: "PATCH",
        headers: authHeaders(storedKey),
        body: JSON.stringify({ id, status }),
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      if (!res.ok) {
        toast.error("Failed to update status");
        return;
      }
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredBookings = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = q
      ? bookings.filter(
          (b) =>
            b.name.toLowerCase().includes(q) ||
            b.email.toLowerCase().includes(q) ||
            (b.phone ?? "").toLowerCase().includes(q) ||
            b.date.includes(q) ||
            b.time.includes(q)
        )
      : [...bookings];
    list.sort((a, b) => {
      let cmp = 0;
      if (sortBy === "name") cmp = a.name.localeCompare(b.name);
      else if (sortBy === "created") cmp = (a.created_at ?? "").localeCompare(b.created_at ?? "");
      else cmp = a.date.localeCompare(b.date) || a.time.localeCompare(b.time);
      return sortOrder === "asc" ? cmp : -cmp;
    });
    return list;
  }, [bookings, search, sortBy, sortOrder]);

  const handleExportCsv = () => {
    const headers = ["Date", "Time", "Name", "Email", "Phone", "Guests", "Event", "Status", "Message", "Created"];
    const rows = filteredBookings.map((b) => [
      b.date,
      b.time,
      `"${(b.name ?? "").replace(/"/g, '""')}"`,
      b.email,
      `"${(b.phone ?? "").replace(/"/g, '""')}"`,
      b.guest_count,
      EVENT_LABELS[b.event_type] ?? b.event_type,
      b.status,
      `"${(b.message ?? "").replace(/"/g, '""')}"`,
      b.created_at ?? "",
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `cosmic-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success("CSV exported");
  };

  if (storedKey == null) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 min-h-[60vh] flex items-center justify-center p-4">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-display tracking-wider text-primary">Admin</CardTitle>
              <p className="text-sm text-muted-foreground">Cosmic Cafe · Bookings</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="adminKey">Admin key</Label>
                  <Input
                    id="adminKey"
                    type="password"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    placeholder="Enter admin secret"
                    className="mt-1"
                    autoComplete="off"
                    autoFocus
                  />
                </div>
                <Button type="submit" className="w-full">Sign in</Button>
              </form>
              <p className="text-sm text-muted-foreground mt-4">
                Set <code className="bg-muted px-1 rounded">ADMIN_SECRET</code> in Netlify environment variables.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="text-center pb-8">
          <Button variant="ghost" asChild>
            <Link to="/">← Back to site</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-4">
        <div className="container max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-wider text-primary">
              Bookings
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchBookings(storedKey)}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 sm:mr-2 ${loading ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportCsv}
                disabled={filteredBookings.length === 0}
              >
                <Download className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Export CSV</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Log out</span>
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="relative flex-1 max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search name, email, phone, date..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="sort-by" className="text-sm text-muted-foreground whitespace-nowrap">Sort by</Label>
                  <Select value={sortBy} onValueChange={(v) => setSortBy(v as "date" | "name" | "created")}>
                    <SelectTrigger id="sort-by" className="w-[120px] h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="created">Created</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as "asc" | "desc")}>
                    <SelectTrigger className="w-[100px] h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desc">Newest first</SelectItem>
                      <SelectItem value="asc">Oldest first</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {loading && bookings.length === 0 ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : filteredBookings.length === 0 ? (
                <p className="text-muted-foreground p-6">No bookings found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="text-left p-3 font-medium">Date / Time</th>
                        <th className="text-left p-3 font-medium">Name</th>
                        <th className="text-left p-3 font-medium">Contact</th>
                        <th className="text-left p-3 font-medium">Guests</th>
                        <th className="text-left p-3 font-medium">Event</th>
                        <th className="text-left p-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map((b) => (
                        <tr key={b.id} className="border-b border-border hover:bg-muted/30">
                          <td className="p-3 whitespace-nowrap">{b.date} · {b.time}</td>
                          <td className="p-3">{b.name}</td>
                          <td className="p-3">
                            <a href={`mailto:${b.email}`} className="text-primary hover:underline">{b.email}</a>
                            <br />
                            <span className="text-muted-foreground">{b.phone}</span>
                          </td>
                          <td className="p-3">{b.guest_count}</td>
                          <td className="p-3">{EVENT_LABELS[b.event_type] ?? b.event_type}</td>
                          <td className="p-3">
                            <Select
                              value={b.status}
                              onValueChange={(v) => updateStatus(b.id, v)}
                              disabled={updatingId === b.id}
                            >
                              <SelectTrigger className="w-[120px] h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="request">Request</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                            {updatingId === b.id && (
                              <Loader2 className="inline w-4 h-4 ml-1 animate-spin text-muted-foreground" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          <Button variant="ghost" asChild className="mt-6">
            <Link to="/">← Back to site</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
