/**
 * Virginia inspection and emissions rules, as pure functions.
 *
 * Kept apart from the checker UI so the rules can be unit tested against the
 * sources below and updated in one place when the law moves. Sources, checked
 * November 4, 2026:
 *
 * - Va. Code 46.2-1158 (safety inspection every 12 months)
 * - Va. Code 46.2-1178 (emissions coverage, 25-year rule, qualified hybrids)
 * - Va. Code 46.2-1182 and DEQ "How do I get an inspection?" ($30 cap, one free
 *   retest within 14 days, vehicle classes, exemptions)
 * - DMV "Emissions Inspections" (program localities, the 1994/2019 worked
 *   example that fixes the 25-year boundary)
 * - Virginia State Police vehicle safety inspection page ($20 and $12 caps)
 * - Arlington County "Registering a Vehicle" (DMV 30 days, county 60 days)
 */

export const emissionsLocalities = [
  "Arlington County",
  "Fairfax County",
  "Loudoun County",
  "Prince William County",
  "Stafford County",
  "City of Alexandria",
  "City of Fairfax",
  "City of Falls Church",
  "City of Manassas",
  "City of Manassas Park",
] as const;

export type VehicleType = "car" | "motorcycle";
export type Fuel = "gasoline" | "diesel" | "hybrid" | "electric";
export type WeightClass = "up-to-8500" | "8501-10000" | "over-10000";

export type CheckerInput = {
  inProgramArea: boolean;
  vehicleType: VehicleType;
  fuel: Fuel;
  modelYear: number;
  weightClass: WeightClass;
  /** First titled in Virginia, rather than arriving with an out-of-state title. */
  titledNewInVirginia: boolean;
  /** Hybrids only: EPA city rating meets the qualified-hybrid threshold. */
  hybridMeetsMpg: boolean;
};

export type EmissionsResult = {
  status: "required" | "exempt" | "check-dmv";
  reason: string;
};

export type CheckerResult = {
  safety: { feeCap: string; reason: string };
  emissions: EmissionsResult;
};

/** Oldest model year still in the program during `year`. Older is exempt. */
export function oldestCoveredModelYear(year: number): number {
  // Covered only if built "less than 25 calendar years prior to January 1".
  // DMV's own example: a 1994 model year became exempt on January 1, 2019.
  return year - 24;
}

/** Hybrids qualify at 50 city mpg, or 48 for model years 2008 and 2009. */
export function qualifiedHybridMpg(modelYear: number): number {
  return modelYear === 2008 || modelYear === 2009 ? 48 : 50;
}

function emissionsFor(input: CheckerInput, year: number): EmissionsResult {
  const { inProgramArea, vehicleType, fuel, modelYear, weightClass } = input;

  if (!inProgramArea) {
    return {
      status: "exempt",
      reason:
        "The Northern Virginia emissions program only covers vehicles garaged in the listed localities. You still need the safety inspection.",
    };
  }
  if (vehicleType === "motorcycle") {
    return { status: "exempt", reason: "Motorcycles are exempt from the emissions inspection." };
  }
  if (fuel === "electric") {
    return {
      status: "exempt",
      reason: "Vehicles powered exclusively by electricity are exempt from the emissions inspection.",
    };
  }
  if (fuel === "hybrid" && input.hybridMeetsMpg) {
    return {
      status: "exempt",
      reason: `A qualified hybrid is exempt at ${qualifiedHybridMpg(modelYear)}+ EPA city mpg for this model year, unless on-road testing flags it as a high emitter.`,
    };
  }

  if (fuel === "diesel") {
    if (modelYear < 1997 || weightClass !== "up-to-8500") {
      return {
        status: "exempt",
        reason:
          "Only 1997-and-newer diesels with a manufacturer's gross vehicle weight rating of 8,500 pounds or less are in the program.",
      };
    }
  } else {
    if (weightClass === "over-10000") {
      return {
        status: "exempt",
        reason: "Gasoline vehicles rated over 10,000 pounds gross vehicle weight are outside the program.",
      };
    }
    if (modelYear < oldestCoveredModelYear(year)) {
      return {
        status: "exempt",
        reason: `Gasoline vehicles leave the program at 25 model years old. In ${year}, that means model year ${oldestCoveredModelYear(year) - 1} and older.`,
      };
    }
  }

  if (modelYear >= year - 3) {
    return input.titledNewInVirginia
      ? {
          status: "exempt",
          reason:
            "Vehicles manufactured and titled for the current model year or the three before it are exempt from the two-year test.",
        }
      : {
          status: "check-dmv",
          reason:
            "This model year is normally exempt, but DMV may require a test for newer vehicles first titled in another state. Check the renewal notice or DMV's online renewal.",
        };
  }

  return {
    status: "required",
    reason:
      "This vehicle needs a passing emissions test or a waiver every two years to register or renew in Virginia.",
  };
}

export function checkVehicle(input: CheckerInput, year: number): CheckerResult {
  return {
    safety: {
      feeCap: input.vehicleType === "motorcycle" ? "$12" : "$20",
      reason: "Every vehicle registered in Virginia needs a safety inspection every 12 months.",
    },
    emissions: emissionsFor(input, year),
  };
}

export type MoveDeadline = { label: string; days: number; note: string };

/** Counted from the day you move in. Keep in step with the moving guide. */
export const moveDeadlines: MoveDeadline[] = [
  {
    label: "Title and register with Virginia DMV",
    days: 30,
    note: "Insurance comes first. If you garage the car in the program area, sort out emissions before you go.",
  },
  {
    label: "Get a Virginia driver's license",
    days: 60,
    note: "Arlington lists exemptions for military personnel, out-of-state students and temporary nonresidents.",
  },
  {
    label: "Register with Arlington County for personal property tax",
    days: 60,
    note: "Online through the county's CAPP portal or in person at 2100 Clarendon Blvd, Window 218.",
  },
];

/** Adds calendar days to a yyyy-mm-dd date string and returns the same format. */
export function addDays(isoDate: string, days: number): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days));
  return date.toISOString().slice(0, 10);
}
