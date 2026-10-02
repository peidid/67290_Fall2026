# Lab 2 data — provenance

Both files are **unmodified byte-for-byte copies** of files already vetted and committed elsewhere in this repo.
Nothing was cleaned, filtered or renamed except the museum file's filename.

---

## `qatar-hotel-performance-2014-2025.xlsx` — 60 KB

Copied from [`../../data-sources/lab1/`](../../data-sources/lab1/). See that folder's `PROVENANCE.md` for the
full upstream record.

- **Source:** Qatar Tourism, via `www.data.gov.qa`, CC BY 4.0
- **Shape:** 945 rows × 11 columns, one sheet (`hotel_performance`)
- **Coverage:** 7 segments × 135 consecutive months, 2014-01 to 2025-03, no gaps
- **Quality:** zero nulls in all 11 columns · `month` is a true date · zero non-ASCII characters anywhere

### The one thing to know before teaching it

`segment` contains **seven** values, but only six are hotel categories:

| `segment_type` | `segment` |
|---|---|
| `Hotel segment` | 1 & 2 Star Hotels · 3 Star Hotels · 4 Star Hotels · 5 Star Hotels · Deluxe Apartments · Standard Apartments |
| `Whole market` | **Qatar (all accommodation)** — the published total of the six above |

**Any aggregate built without filtering `segment_type` double-counts.** Verified:
`SUM(room_nights_sold)` unfiltered = **141,759,382**; whole-market truth = **70,726,032**; ratio **2.0043**.

This is not a defect to fix. It is Part 1 of the lab.

### Figures quoted in the notebook, all recomputed from this file

| | Oct 2022 | Nov 2022 | Dec 2022 | Jan 2023 |
|---|---|---|---|---|
| `avg_daily_rate_qar` | 456.61 | 1,839.25 | 2,103.59 | 423.61 |
| `occupancy_pct` | 55.1% | 55.9% | 59.7% | 46.3% |
| `room_nights_available` | 994,697 | 1,124,160 | 1,162,345 | 1,161,911 |
| `room_nights_sold` | 547,780 | 628,079 | 694,386 | 538,416 |

November occupancy, whole market, every year — **2022 is the lowest of the eleven**:
2022 **55.9%** · 2017 60.7% · 2020 61.0% · 2018 67.0% · 2015 69.7% · 2016 69.8% · 2021 70.7% · 2023 71.0% ·
2019 71.8% · 2024 83.3% · 2014 84.5%

December 2022 by segment — `avg_daily_rate_qar` / `occupancy_pct`:
5 Star 3,081.65 / 56.7% · Deluxe Apts 1,655.47 / 60.5% · Standard Apts 1,358.57 / 50.3% ·
4 Star 1,088.79 / 61.0% · 3 Star 778.96 / 75.4% · 1&2 Star 423.84 / 87.7%

---

## `qatar-museum-visitors-2013-2024.xlsx` — 16 KB

Copied from [`../../data-sources/project2/07-museum-visitors-2013-2024.xlsx`](../../data-sources/project2/)
and renamed for legibility. **Contents are identical** — every defect was deliberately kept, because the defects
are the lesson.

- **Source:** Qatar Museums / Planning & Statistics Authority, via `www.data.gov.qa`, CC BY 4.0
- **Shape:** 1,372 rows × 6 columns — `year`, `month`, `lshhr`, `museum`, `lmthf`, `number`

### The defects it teaches, all verified

| Defect | Detail |
|---|---|
| **`number` imports as text** | 95 of 1,372 cells are not numeric, so Tableau types the whole column as a string and files it under Dimensions |
| **Two kinds of missing** | `--` ×60 and `-` ×26 mean *not recorded*. `مغلق` ×4 and `مغلق للتجديد Closed For/of Renovation` ×4 mean **the museum was shut**. `يفتح للزوار الرسميين Only Open To Official Visitors` ×1. Coercing the column to Number turns all 95 into Null, erasing the difference. |
| **One museum, several names** | 32 distinct `museum` strings for roughly 20 real institutions: `3-2-1 QOSM` / `321 QOSM` / `QOSM` / `Expo - 3-2-1 QOSM Activities`; `AL-Khor Regional  (M.Arch & Ethnog)` with two, three and four internal spaces plus a trailing `*`; `M7` / `M7*`; `DADU Gardens` / `DADU Gardens *` |
| **`year` is text** | Stored as `'2013'`, not 2013 |
| **`month` is an English name** | Sorts April–August–December alphabetically, not chronologically. Same defect as Project 2 datasets #1, #2 and #5. |
| **Mirrored Arabic columns** | `lshhr` = `month` in Arabic · `lmthf` = `museum` in Arabic |
| **A year is simply absent** | Years run 2013, 2014, 2015, **2017**, 2018 … — there is no 2016 |

### ✅ Safe in the one way that matters

**Zero Eastern-Arabic numerals (U+0660–U+0669) anywhere in the file.** That is the one Tableau failure with no
workaround — a measure written in Eastern-Arabic digits imports as text and *cannot* be coerced. This file does
not contain it. Arabic script in text columns renders correctly in Tableau and is not a problem.

### ⚠️ Note for the Project 2 menu

This is Project 2 dataset **#7**. Lab 2 uses it for a ~13-minute defect drill only — students fix the `number`
column and group a few name variants. **Its story is never built and its best views never go on the board**, so
it can stay on the Project 2 menu. Add a line to the menu entry saying the `number` column was fixed in class.
