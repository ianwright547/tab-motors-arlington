"use client";

import { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, CircleHelp, MinusCircle } from "lucide-react";
import {
  addDays,
  checkVehicle,
  emissionsLocalities,
  moveDeadlines,
  qualifiedHybridMpg,
  type Fuel,
  type VehicleType,
  type WeightClass,
} from "@/lib/inspection-rules";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-base text-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500";
const labelClass = "block text-sm font-semibold text-ink-900";

const OUTSIDE = "outside";

const statusStyles = {
  required: { Icon: CheckCircle2, title: "Emissions test required", tone: "text-brand-700" },
  exempt: { Icon: MinusCircle, title: "Emissions test not required", tone: "text-ink-700" },
  "check-dmv": { Icon: CircleHelp, title: "Check with DMV", tone: "text-amber-700" },
} as const;

function formatDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function InspectionChecker({ year }: { year: number }) {
  const [locality, setLocality] = useState<string>("Arlington County");
  const [vehicleType, setVehicleType] = useState<VehicleType>("car");
  const [fuel, setFuel] = useState<Fuel>("gasoline");
  const [modelYear, setModelYear] = useState(String(year - 6));
  const [weightClass, setWeightClass] = useState<WeightClass>("up-to-8500");
  const [titledNewInVirginia, setTitledNewInVirginia] = useState(true);
  const [hybridMeetsMpg, setHybridMeetsMpg] = useState(false);
  const [moveDate, setMoveDate] = useState("");

  const parsedYear = Number(modelYear);
  const validYear =
    Number.isInteger(parsedYear) && parsedYear >= 1950 && parsedYear <= year + 1;

  const result = useMemo(
    () =>
      validYear
        ? checkVehicle(
            {
              inProgramArea: locality !== OUTSIDE,
              vehicleType,
              fuel,
              modelYear: parsedYear,
              weightClass,
              titledNewInVirginia,
              hybridMeetsMpg,
            },
            year,
          )
        : null,
    [locality, vehicleType, fuel, parsedYear, validYear, weightClass, titledNewInVirginia, hybridMeetsMpg, year],
  );

  const status = result ? statusStyles[result.emissions.status] : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <form
        className="rounded-xl border border-ink-200 bg-white p-5 shadow-card sm:p-6"
        onSubmit={(event) => event.preventDefault()}
        aria-label="Vehicle details"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="ic-locality" className={labelClass}>
              Where is the vehicle garaged?
            </label>
            <select
              id="ic-locality"
              className={fieldClass}
              value={locality}
              onChange={(event) => setLocality(event.target.value)}
            >
              {emissionsLocalities.map((name) => (
                <option key={name}>{name}</option>
              ))}
              <option value={OUTSIDE}>Somewhere else in Virginia</option>
            </select>
          </div>

          <div>
            <label htmlFor="ic-type" className={labelClass}>
              Vehicle type
            </label>
            <select
              id="ic-type"
              className={fieldClass}
              value={vehicleType}
              onChange={(event) => setVehicleType(event.target.value as VehicleType)}
            >
              <option value="car">Car, SUV, van or truck</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>

          <div>
            <label htmlFor="ic-year" className={labelClass}>
              Model year
            </label>
            <input
              id="ic-year"
              className={fieldClass}
              inputMode="numeric"
              maxLength={4}
              value={modelYear}
              onChange={(event) => setModelYear(event.target.value.replace(/\D/g, ""))}
              aria-invalid={!validYear}
            />
          </div>

          {vehicleType === "car" && (
            <>
              <div>
                <label htmlFor="ic-fuel" className={labelClass}>
                  Fuel
                </label>
                <select
                  id="ic-fuel"
                  className={fieldClass}
                  value={fuel}
                  onChange={(event) => setFuel(event.target.value as Fuel)}
                >
                  <option value="gasoline">Gasoline</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="electric">Fully electric</option>
                </select>
              </div>

              <div>
                <label htmlFor="ic-weight" className={labelClass}>
                  Gross vehicle weight rating
                </label>
                <select
                  id="ic-weight"
                  className={fieldClass}
                  value={weightClass}
                  onChange={(event) => setWeightClass(event.target.value as WeightClass)}
                >
                  <option value="up-to-8500">8,500 lb or less</option>
                  <option value="8501-10000">8,501 to 10,000 lb</option>
                  <option value="over-10000">Over 10,000 lb</option>
                </select>
              </div>

              {fuel === "hybrid" && validYear && (
                <label className="flex items-start gap-2.5 text-sm text-ink-800 sm:col-span-2">
                  <input
                    type="checkbox"
                    className="mt-0.5 size-4"
                    checked={hybridMeetsMpg}
                    onChange={(event) => setHybridMeetsMpg(event.target.checked)}
                  />
                  EPA city rating is {qualifiedHybridMpg(parsedYear)} mpg or better
                </label>
              )}

              <label className="flex items-start gap-2.5 text-sm text-ink-800 sm:col-span-2">
                <input
                  type="checkbox"
                  className="mt-0.5 size-4"
                  checked={titledNewInVirginia}
                  onChange={(event) => setTitledNewInVirginia(event.target.checked)}
                />
                First titled in Virginia (untick if it came from another state)
              </label>
            </>
          )}
        </div>

        <div className="mt-6 border-t border-ink-200 pt-5">
          <label htmlFor="ic-move" className={labelClass}>
            Just moved to Arlington? Add your move-in date (optional)
          </label>
          <input
            id="ic-move"
            type="date"
            className={fieldClass}
            value={moveDate}
            onChange={(event) => setMoveDate(event.target.value)}
          />
        </div>
      </form>

      <div className="space-y-4" aria-live="polite">
        {!result && (
          <p className="rounded-xl border border-ink-200 bg-white p-5 text-ink-700 shadow-card">
            Enter a four-digit model year to see your result.
          </p>
        )}

        {result && status && (
          <>
            <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-card">
              <p className="flex items-center gap-2 font-display text-xl font-bold uppercase tracking-tight text-brand-700">
                <CheckCircle2 className="size-5 shrink-0" aria-hidden />
                Safety inspection required
              </p>
              <p className="mt-2 text-ink-700">
                {result.safety.reason} The state caps the fee at {result.safety.feeCap}.
              </p>
            </div>

            <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-card">
              <p className={`flex items-center gap-2 font-display text-xl font-bold uppercase tracking-tight ${status.tone}`}>
                <status.Icon className="size-5 shrink-0" aria-hidden />
                {status.title}
              </p>
              <p className="mt-2 text-ink-700">{result.emissions.reason}</p>
              {result.emissions.status === "required" && (
                <p className="mt-2 text-sm text-ink-600">
                  The state caps the test at $30. If it fails, you get one free retest at the same
                  station within 14 calendar days.
                </p>
              )}
            </div>
          </>
        )}

        {moveDate && (
          <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-card">
            <p className="flex items-center gap-2 font-display text-xl font-bold uppercase tracking-tight text-ink-900">
              <CalendarDays className="size-5 shrink-0" aria-hidden />
              Your deadlines
            </p>
            <ul className="mt-3 space-y-3">
              {moveDeadlines.map((deadline) => (
                <li key={deadline.label}>
                  <p className="font-semibold text-ink-900">{formatDate(addDays(moveDate, deadline.days))}</p>
                  <p className="text-sm text-ink-700">{deadline.label}</p>
                  <p className="text-sm text-ink-600">{deadline.note}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-sm leading-relaxed text-ink-600">
          A general guide based on Virginia DMV, DEQ and State Police rules, not legal advice. Your
          DMV renewal notice has the final word on whether your vehicle needs a test.
        </p>
      </div>
    </div>
  );
}
