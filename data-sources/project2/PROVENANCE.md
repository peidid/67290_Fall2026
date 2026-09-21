# Project 2 frozen datasets — provenance

**Downloaded and built 14 September 2026.** These are the *offline fallbacks* for the Project 2 menu
in [`../QATAR-DATA-MENU.md`](../QATAR-DATA-MENU.md). Every one was downloaded from
**www.data.gov.qa**, opened, and its row/column count checked against the menu entry.

**Why these exist.** Project 2 runs 31 Oct – 16 Nov. If the portal is down, reorganised or
re-slugged on the day the project goes out, 25 students have no project. Lab 1 is already protected
this way (`../lab1/`); this is the same protection for Project 2.

**Hand students the frozen file as the default.** The live URL in the menu is the
"go and get today's data" stretch, not the requirement.

## What is in here

| File | Rows x cols | Size | Source dataset id |
|---|---|---|---|
| `01-qu-enrolment-2015-2025.xlsx` | 7,538 x 7 | 78 KB | `qu-registered-students-per-semester-fall-2015-till-spring-2025` |
| `02-hamad-airport-traffic-2017-2022.xlsx` | 144 x 6 | 3 KB | `arrival-and-departures-via-hamad-international-airport-by-month-and-year` |
| `03-traffic-deaths-injuries-2022-2023.xlsx` | 432 x 10 | 6 KB | `number-of-deaths-and-injuries-from-traffic-accidents-by-month-affected-person-location-and-gender` |
| `04-population-by-municipality-age.xlsx` | 1,584 x 5 | 13 KB | `population-by-municipality-and-age-groups` |
| `05-cpi-by-expenditure-group.xlsx` | 936 x 7 | 10 KB | `consumer-price-index-cpi-by-expenditure-group-monthly` |
| `06-qffd-foreign-assistance.xlsx` | 4,083 x 13 | 128 KB | `qatar-s-foreign-assistance-based-on-qffd-records` |
| `07-museum-visitors-2013-2024.xlsx` | 1,372 x 6 | 15 KB | `visitors-of-museums-and-exhibition-by-month-and-museum` |
| `08-qatar-exports-2019-2024.xlsx` | 70,324 x 7 | 2.2 MB | `qatar-export-statistics-2019-2024-copy` |
| `09-hukoomi-eservices.xlsx` | 1,692 x 13 | 212 KB | `government-e-services-directory-with-usage-statistics` |
| `10-real-estate-sales-2020-2025.xlsx` | 26,719 x 8 | 451 KB | `weekly-real-estates-sales-bulletin` |

**Total: 3,200,176 bytes (3.2 MB).** Re-verified 14 Sep 2026 — every file opens, and every row and
column count in the table above was recounted from the file, not carried forward.

> ⚠️ **Files 08 and 10 are narrower than the live downloads** (7 and 8 columns, against 12 and 18),
> because they were slimmed server-side — see below. **All rows survive in both.** The menu entries
> describe the *live* file, so say which copy a student is on before they go looking for a column
> that is not there.

## What was changed

**Eight of the ten are untouched.** Files 01–07 and 09 are the portal's own `/exports/xlsx`
output, byte for byte, with no edits. XLSX rather than CSV because Excel stores text as Unicode
natively, so encoding detection, BOM handling and delimiter guessing all vanish as failure modes
(see the menu's Part 4). Every column, including the Arabic mirrors, is present.

**Two were slimmed server-side**, using the portal's own `&select=` / `&group_by=` parameters —
no local editing, so the numbers are the portal's, not mine:

### `08-qatar-exports-2019-2024.xlsx` — 17.4 MB CSV → 2.2 MB XLSX

```
/qatar-export-statistics-2019-2024-copy/exports/xlsx
  ?select=lsn_year,lshhr_month,country_of_destinatoion,hs4,details,
          sum(value_qr) as value_qr,sum(weight_kg) as weight_kg
  &group_by=lsn_year,lshhr_month,country_of_destinatoion,hs4,details&limit=-1
```

Dropped: `lrb_quarter`, `ltfsyl` (Arabic product description), `dwl_lmqsd` (Arabic destination),
`quantity`, and the redundant `date` column. **All 70,324 rows survive** — the group-by is at the
file's natural grain, so nothing was actually collapsed. Verified after the fact: six-year totals by
destination still read China 325.0bn, South Korea 249.7bn, India 238.3bn, Japan 220.3bn,
Singapore 126.4bn, UAE 78.7bn QAR — identical to the menu.

### `10-real-estate-sales-2020-2025.xlsx` — 6.3 MB CSV → 451 KB XLSX

```
/weekly-real-estates-sales-bulletin/exports/xlsx
  ?select=registration_date,municipality_name,district_name,property_type,usage,
          area_square_meters,price_per_square_meter,property_value&limit=-1
```

Dropped: the five transliterated-Arabic slug columns (`sm_lbldy`, `sm_lmntq`, `nw_l_qr`,
`lstkhdm`), the two encrypted id columns, `share_area`, `price_per_square_foot`,
`number_of_shares_2400` and `share_value`. **All 26,719 rows survive**, including the 1,046 with a
blank `registration_date` — that defect is the point of the entry and was deliberately preserved.
Verified after the fact: median QAR/m² still reads Doha 5,391 → Al Rayyan 3,725 → Al Daayen 3,497
→ Umm Slal 3,333 → Al Wakra 2,799 → Al Khor & Al Thakhira 2,636 → Al Shahniya 1,858 →
Al Shamal 1,531.

> ⚠️ The 289 non-breaking spaces in `district_name` **are still there**, and so is the
> `country_of_destinatoion` misspelling in file 08. Both are described in the menu and both are
> teaching material. Do not silently fix them.

## Licence

All ten are **CC BY 4.0**, per the portal's own metadata (`license: "CC BY"`, with `license_url`
pointing at `creativecommons.org/licenses/by/4.0/` — the "4.0" comes from the URL, not the label).
Attribution is the only obligation. Students should write the line; it is professional practice.

## To refresh these

Re-run the URLs in the menu's Part 2. Eight are a plain `/exports/xlsx`; the two slimmed ones use
the query strings printed above. Then re-check the row counts in the table above — if one has
moved, the menu entry needs re-reading before it is handed out.
