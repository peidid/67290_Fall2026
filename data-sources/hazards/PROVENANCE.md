# Final Project hazard datasets — provenance

**Built 14 September 2026.** Offline, pinned copies for the **Final Project — Local Hazard
StoryMap** and for **Lab 2** (9 Nov, on Zoom). See [`../QATAR-DATA-MENU.md`](../QATAR-DATA-MENU.md)
Part 3.

Both files exist for the same reason: the live endpoints behind them return **different data on
different days**, and both are relied on by a remote session where a TA cannot reach across and fix
a laptop.

---

## `doha-climate-daily-2000-2025.xlsx` — heat and rainfall

**9,497 rows x 9 columns, 413 KB. 2000-01-01 to 2025-12-31, no gaps, zero nulls.**

**Source:** NASA POWER, MERRA-2 reanalysis, point 25.29 N / 51.53 E (Doha).

```
https://power.larc.nasa.gov/api/temporal/daily/point
  ?parameters=T2M,T2M_MAX,T2M_MIN,RH2M,PRECTOTCORR&community=RE
  &longitude=51.53&latitude=25.29&start=20000101&end=20251231&format=CSV&header=false
```
→ HTTP 200, 367,299 bytes, verified 14 Sep 2026.

**Changes made — two, both mechanical:**

1. **Added a real `date` column.** The API returns `YEAR`, `MO`, `DY` as three separate integers
   and no date. A beginner's first encounter with Tableau should not be `MAKEDATE([YEAR],[MO],[DY])`.
   The column is written as a true Excel date with a date-only format (`yyyy-mm-dd`), so Tableau
   types it **Date**, not Date & Time. The three integer columns are kept alongside it.
2. **Renamed the columns to plain English** — `T2M`→`temp_mean_c`, `T2M_MAX`→`temp_max_c`,
   `T2M_MIN`→`temp_min_c`, `RH2M`→`humidity_pct`, `PRECTOTCORR`→`rainfall_mm`. No values were
   touched.

**Verified in the built file:** zero nulls and zero `-999` sentinels in all 9,497 rows; max
`temp_max_c` **47.71 °C**; **246 days since 2000 exceeded 45 °C**.

### This is the flooding dataset

It replaces `monthly-environmental-indicators-doha-city`, which **cannot support a flooding story** —
that file records rainfall as `0.0` for every month of 2016 through 2022 (see the menu, Part 3).

Read out of this file:

- **8,441 of 9,497 days (88.9%) record zero rainfall.**
- **Only 30 days in 26 years delivered 10 mm or more.**
- Wettest day: **46.41 mm on 25 November 2015**. Wettest month: **January 2023, 105.0 mm**.
- Annual totals swing from **2.2 mm (2001) to 190.4 mm (2023)**. *(Corrected on the 14 Sep 2026
  verification pass: an earlier draft gave the low as 7.0 mm for 2021. 7.0 mm is 2021's real total,
  but 2001 is the driest year in the file at 2.2 mm.)*

That is the burst pattern, honestly: almost all of Qatar's rain arrives on a handful of days, which
is why Doha floods. The zeros here are *real reanalysis values for a desert*, not missing data —
unlike the portal file, where they were placeholders.

> **Two honesty notes a StoryMap must carry.** (1) POWER is **reanalysis model output**, not a rain
> gauge at Doha airport — write "reanalysis", not "measured". (2) The window is **fixed and stops at
> 31 December 2025**; do not call it "current" in November 2026.

---

## `doha-air-quality-hourly-2026-06-15-to-09-13.xlsx` — Lab 2

**2,184 rows x 6 columns, 72 KB. 2026-06-15 00:00 to 2026-09-13 23:00, hourly.**

**Source:** Open-Meteo air quality (CAMS reanalysis), free, no key.

```
https://air-quality-api.open-meteo.com/v1/air-quality
  ?latitude=25.2854&longitude=51.5310&hourly=pm10,pm2_5,dust
  &start_date=2026-06-15&end_date=2026-09-13&timezone=Asia%2FQatar&format=csv
```
→ HTTP 200, 72,916 bytes, verified 14 Sep 2026.

**Changes made — two, both mechanical:**

1. **Removed the three junk lines above the header.** The raw CSV puts a metadata header on line 1,
   its values on line 2, a blank line 3, and the real header on line 4. In Tableau that needs
   *Text Options → Start reading at row 4* — a dialog no student will find unaided over Zoom.
   Here, row 1 is the header.
2. **Split `time` into `timestamp` / `date` / `hour` and renamed the measures.** The original column
   names carry `μ` and `³` (`pm10 (μg/m³)`), which survive but look broken on an axis. Now:
   `pm10_ug_m3`, `pm2_5_ug_m3`, `dust_ug_m3`. No values were touched.

**Verified in the built file:** 2,184 rows, no missing hours; `pm10_ug_m3` runs **34.2 – 398.6
µg/m³, mean 129.4**.

### Why pinned, and why committed

The live URL in the menu uses `&past_days=92`, which is a **rolling** window — two students
downloading on different days get different data, and neither matches this file. Pinning with
`&start_date=…&end_date=…` fixes that, **but the window must end in the past**: the endpoint accepts
dates only within `2013-01-01` to roughly *today + 6 days*, and a future-dated window returns

```
HTTP 400  {"reason":"Parameter 'start_date' is out of allowed range from 2013-01-01 to 2026-09-20","error":true}
```

A TA who writes a November window into the handout in October gets a hard failure **on the student's
laptop**, not on their own. Hence a committed file.

**Live fetch is the lesson; this file is what keeps 25 remote students moving when it isn't.**
Re-pin a fresh window before 9 November if you want more recent air, and re-commit it — but do not
make the lab depend on a live call.

---

## Licence and attribution

- **NASA POWER** — free and unrestricted for any purpose; NASA asks for acknowledgement.
  Suggested line: *"NASA POWER (MERRA-2 reanalysis), daily point data for Doha, downloaded 14 Sep 2026."*
- **Open-Meteo** — CC BY 4.0, built on Copernicus CAMS.
  Suggested line: *"Open-Meteo air quality (CAMS reanalysis), Doha, 15 Jun – 13 Sep 2026 (CC BY 4.0)."*
