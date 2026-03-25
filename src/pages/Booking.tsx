import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, Users, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import rentalImg from "@/assets/space-rental.jpg";
import { netlifyFunctionUrl } from "@/lib/netlifyApi";

const EVENT_TYPE_VALUES = ["birthday", "private_party", "corporate", "dj_night", "other"] as const;

function buildBookingSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(2, t("bookingValidationName")),
    email: z.string().email(t("bookingValidationEmail")),
    phone: z.string().min(10, t("bookingValidationPhone")),
    date: z.string().min(1, t("bookingValidationDate")),
    time: z.string().min(1, t("bookingValidationTime")),
    guest_count: z.number().min(1, t("bookingValidationGuests")).max(200),
    event_type: z.enum(EVENT_TYPE_VALUES),
    message: z.string().optional(),
  });
}

type BookingForm = z.infer<ReturnType<typeof buildBookingSchema>>;

const API_BOOKING = netlifyFunctionUrl("booking");

export default function Booking() {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailSent, setEmailSent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const schema = useMemo(() => buildBookingSchema((k) => t(k)), [t]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BookingForm>({
    resolver: zodResolver(schema),
    defaultValues: { event_type: "birthday", guest_count: 10 },
    shouldFocusError: true,
  });

  const onSubmit = async (data: BookingForm) => {
    setApiError(null);
    setIsSubmitting(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);
    try {
      const res = await fetch(API_BOOKING, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          date: data.date,
          time: data.time,
          guest_count: data.guest_count,
          event_type: data.event_type,
          message: data.message?.trim() || null,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const json = await res.json().catch(() => ({}));
      const serverError = typeof (json as { error?: string }).error === "string" ? (json as { error: string }).error : null;
      if (res.ok && (json as { success?: boolean }).success) {
        setEmailSent((json as { emailSent?: boolean }).emailSent !== false);
        setIsSubmitted(true);
        toast.success(t("bookingSuccessToast"));
      } else {
        setApiError(serverError || t("bookingErrorMessage"));
        toast.error(serverError || t("bookingErrorMessage"));
      }
    } catch (e) {
      clearTimeout(timeoutId);
      const msg = e instanceof Error ? e.message : t("bookingErrorMessage");
      setApiError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const eventTypeLabels: Record<(typeof EVENT_TYPE_VALUES)[number], string> = {
    birthday: t("bookingEventTypeBirthday"),
    private_party: t("bookingEventTypePrivateParty"),
    corporate: t("bookingEventTypeCorporate"),
    dj_night: t("bookingEventTypeDjNight"),
    other: t("bookingEventTypeOther"),
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 min-h-[60vh] flex items-center justify-center px-4">
          <div className="container max-w-2xl text-center">
            <div className="bg-card border border-primary/30 p-8 md:p-12 rounded-lg shadow-xl text-card-foreground">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary">
                <CheckCircle className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-2xl md:text-4xl font-display font-bold mb-4 tracking-wider">
                {t("bookingRequestReceivedTitle")}
              </h1>
              <div className="h-px bg-border my-6 max-w-xs mx-auto" />
              <p className="text-muted-foreground mb-6">{t("bookingRequestReceivedDesc")}</p>
              {!emailSent && (
                <p className="text-sm text-amber-600 dark:text-amber-500 mb-4 px-4">{t("bookingEmailNotSentNote")}</p>
              )}
              <p className="text-sm text-muted-foreground mb-8">
                {t("bookingContactQuestion")}{" "}
                <a href="tel:+41795247754" className="text-primary font-semibold hover:underline">
                  +41 79 524 77 54
                </a>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" asChild>
                  <Link to="/">{t("navHome")}</Link>
                </Button>
                <Button onClick={() => setIsSubmitted(false)} className="border-primary text-primary hover:bg-primary/10">
                  {t("bookingMakeAnother")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Hero section — Spinella-style */}
      <section className="relative min-h-[280px] sm:min-h-[320px] md:h-80 flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={rentalImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/70" />
        </div>
        <div className="relative z-10 container text-center px-4">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-[0.1em] neon-glow-pink">
            {t("bookingTitle")}
          </h1>
          <div className="h-px w-24 bg-primary mx-auto mb-4" />
          <p className="text-lg md:text-xl text-muted-foreground">{t("bookingSubtitle")}</p>
        </div>
      </section>

      {/* Booking form — card layout like Spinella */}
      <section className="py-12 md:py-16">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="bg-card border border-border rounded-lg p-8 md:p-12 shadow-xl text-card-foreground">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold tracking-wider text-primary">
                  {t("bookingYourInfo")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="name">{t("bookingName")} *</Label>
                    <Input id="name" {...register("name")} placeholder={t("bookingName")} className="mt-1" />
                    {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">{t("bookingEmail")} *</Label>
                    <Input id="email" type="email" {...register("email")} placeholder={t("bookingEmail")} className="mt-1" />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">{t("bookingPhone")} *</Label>
                    <Input id="phone" type="tel" {...register("phone")} placeholder={t("bookingPhone")} className="mt-1" />
                    {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
              </div>

              <div className="h-px bg-border" />

              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold tracking-wider text-primary">
                  {t("bookingEventDetails")}
                </h2>

                <div>
                  <Label className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {t("bookingEventType")} *
                  </Label>
                  <Select
                    value={watch("event_type")}
                    onValueChange={(v) => setValue("event_type", v as (typeof EVENT_TYPE_VALUES)[number], { shouldValidate: true })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {EVENT_TYPE_VALUES.map((value) => (
                        <SelectItem key={value} value={value}>
                          {eventTypeLabels[value]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {t("bookingDate")} *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      {...register("date")}
                      min={new Date().toISOString().split("T")[0]}
                      className="mt-1"
                    />
                    {errors.date && <p className="text-sm text-destructive mt-1">{errors.date.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="time" className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {t("bookingTime")} *
                    </Label>
                    <Input id="time" type="time" {...register("time")} className="mt-1" />
                    {errors.time && <p className="text-sm text-destructive mt-1">{errors.time.message}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="guest_count" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {t("bookingGuests")} *
                  </Label>
                  <Input
                    id="guest_count"
                    type="number"
                    min={1}
                    max={200}
                    {...register("guest_count", { valueAsNumber: true })}
                    className="mt-1"
                  />
                  {errors.guest_count && <p className="text-sm text-destructive mt-1">{errors.guest_count.message}</p>}
                </div>

                <div>
                  <Label htmlFor="message">{t("bookingMessage")}</Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder={t("bookingMessage")}
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>

              {apiError && (
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-foreground">
                  {apiError}
                </div>
              )}

              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-display tracking-wider uppercase"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("bookingSubmitting") : t("bookingSubmit")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
