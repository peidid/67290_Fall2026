# Lab 1 data — provenance and exactly what was changed

All downloads and checks: **14 September 2026**. Source portal: www.data.gov.qa (Opendatasoft), licence **CC BY 4.0** — attribution is the only obligation.

Hand students the **.xlsx**. It is the safest Tableau connector: Excel stores text as Unicode natively, so BOM handling, encoding detection and delimiter guessing all disappear as failure modes, and dates arrive already typed as dates. The .csv is the same content for anyone who wants it.

---

## 1. `qatar-hotel-performance-2014-2025.xlsx` / `.csv`  (PRIMARY)

**Source dataset id:** `accommodation-data-by-segment-date-and-key-metrics-supply-demand-occupancy-adr-revpar`
**Downloaded from:** `https://www.data.gov.qa/api/explore/v2.1/catalog/datasets/accommodation-data-by-segment-date-and-key-metrics-supply-demand-occupancy-adr-revpar/exports/csv?delimiter=%2C&with_bom=true` — HTTP 200, 68,359 bytes, 14 Sep 2026
**Untouched original:** `original-downloads/accommodation-data-by-segment-date-and-key-metrics-supply-demand-occupancy-adr-revpar.csv`

Original: 945 rows x 11 cols, UTF-8 with BOM, CRLF, zero nulls in every column, zero Arabic characters, zero Eastern-Arabic digits.

### Changes made (5), and why

| # | Change | Why |
|---|---|---|
| 1 | Added `month` — a **real date** (first of month) built from the original `date` text column (`2022-11` → `2022-11-01`). Original text column dropped. | Tableau typed the original as a string. It happens to sort correctly (ISO), but a string cannot use a continuous time axis, date parts, or "show trend line". One derived column removes the single most likely first-lab stumble. |
| 2 | Added `year` (integer, derived from `month`). | Lets a student colour or filter by year with no calculation. |
| 3 | Stripped the trailing `+` from every segment name (`5 Star Hotels+` → `5 Star Hotels`) and renamed `Qatar+` → `Qatar (all accommodation)`. | The `+` is a source artefact, not a value. It appears in every legend and axis label and students ask about it. |
| 4 | Added `segment_type`, a 2-level column: `Whole market` (the Qatar row) vs `Hotel segment` (the other six). | The Qatar row is the **whole-market total**. Summing it alongside the six segments double-counts. One filter click now prevents that. |
| 5 | Renamed columns to plain English: `supply`→`room_nights_available`, `demand`→`room_nights_sold`, `occupancy_rate`→`occupancy_pct`, `average_daily_rate`→`avg_daily_rate_qar`, `revenue_per_available_room`→`revpar_qar`, `census_properties`→`properties_counted`, `census_rooms`→`rooms_counted`. **Dropped `sample_properties` and `sample_rooms`.** | "supply"/"demand" are hotel-industry jargon that mean room-nights, not hotels. The two `sample_*` columns are the survey sample behind the census figures; they are near-duplicates of the census columns, add nothing to any of the three lab views, and two extra near-identical measures is exactly what confuses a beginner. They remain in the untouched original. |

**No values were altered.** Row count is unchanged at 945. Every number is as published.

### Known quirks left in deliberately (teach them, don't hide them)
- **3 rows have `occupancy_pct` above 100** (max 102.8): 1 & 2 Star Hotels in 2024-01, 2024-11, 2025-02. Room-nights sold exceeded sampled room-nights available. This is a 30-second lesson about always looking at your min and max, not a defect to patch.
- **`Qatar (all accommodation)` is ≈ but not exactly the sum of the six segments.** December 2022: Qatar row 1,162,345 room-nights available vs 1,160,888 summed across the six segments — a 0.13% gap I cannot explain from the file alone. Treat the Qatar row as the published market series, not as a computed total. Say this out loud; it is honest and it is the kind of thing this course is about.

---

## 2. `fog-dust-haze-doha-2011-2024.xlsx` / `.csv`  (BACKUP)

**Source dataset id:** `fog-dust-storm-and-haze-doha-international-airport-2011-2024`
**Downloaded from:** `https://www.data.gov.qa/api/explore/v2.1/catalog/datasets/fog-dust-storm-and-haze-doha-international-airport-2011-2024/exports/csv?delimiter=%2C&with_bom=true` — HTTP 200, 2,612 bytes, 14 Sep 2026
**Untouched original:** `original-downloads/fog-dust-storm-and-haze-doha-international-airport-2011-2024.csv`

Original: 168 rows x 4 cols (= 14 years x 12 months, 2011-01 to 2024-12), UTF-8 with BOM, CRLF, **zero nulls, zero non-ASCII bytes anywhere in the file.**

### Changes made (3)
1. `month_year` text (`2011-01`) → **real date** `month` (`2011-01-01`).
2. Added `year`, `month_number` and `month_name` so a month-by-year heat map takes no calculation. `month_number` exists so `month_name` can be sorted correctly (Jan…Dec rather than Apr, Aug, Dec…).
3. Renamed the measures: `fog_vis_1_k_m`→`fog_days`, `dust_storm_vis_1_k_m`→`dust_storm_days`, `haze_vis_5_k_m`→`haze_days`. The originals encode the visibility threshold (fog and dust storm = visibility under 1 km; haze = under 5 km); that belongs in the data dictionary, not in the axis label.

**No values were altered.** 168 rows in, 168 rows out.

### Known limitation to state in class
The counts come from **one station**, which moved: Doha International Airport up to March 2015, Hamad International Airport afterwards. There is a station change inside the series. The portal says so; a student writing about a 2011-vs-2024 trend must say so too.
