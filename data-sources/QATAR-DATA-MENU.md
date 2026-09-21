# Qatar Data Menu — 67-290 Storytelling with Data Visualization
### Vetted datasets for Lab 1, Project 2 and the Final Project · CMU-Qatar, Fall 2026 Mini-2

> ## ✅ Checked on **14 September 2026**
>
> Every URL below was fetched on that date and its HTTP status recorded. Every file described was
> downloaded and opened — row counts, column names, null counts, encodings and the quoted figures
> were all read out of the actual file, never off a landing page. Where something is estimated,
> disputed, or could not be verified, it says so in the text. This course teaches data honesty; the
> course materials have to model it.
>
> **Verified twice.** A second, independent pass on the same date re-fetched every load-bearing URL
> and re-opened every committed file. All sixteen `www.data.gov.qa` exports returned HTTP 200 at the
> exact byte sizes printed below; the catalogue still reports **1,834** datasets; NASA POWER, the
> HDX boundary archive, the Tableau embedding script, `help.tableau.com` and the arXiv PDF all
> reproduced byte for byte; and every headline figure recomputed from `lab1/`, `project2/`,
> `hazards/` and `geo/` matched. **Five things did not reproduce and have been corrected in place**
> — they are marked 🔺 in the text: the Open-Meteo *archive* endpoint (Part 5), the OWID energy row
> count and its `301` redirect (Part 3 · Part 5), the rainfall annual minimum (Part 3), the export
> file's product-category count (Part 2 #8), and the missing Global Carbon Project URL (Part 3 ·
> Part 5), which is now supplied and tested. One structural gap was closed too: **two frozen Project
> 2 copies are narrower than the live file**, and the menu now says so where a student will read it.

### ⚠️ Re-check the links before 31 October — government portals move

Budget **one hour in the week of 26 October**. Work the list below; it is ordered by what breaks the
course soonest.

| Priority | What to re-check | If it fails |
|---|---|---|
| 1 | Nothing. **Lab 1 cannot fail** — both files are committed at `lab1/`. | — |
| 2 | The **ten Project 2 URLs** in Part 2 | Nothing breaks. All ten are frozen at [`project2/`](project2/). Hand out the frozen copy. |
| 3 | The **Open-Meteo air-quality endpoint** (Lab 2, 9 Nov) — test the **pinned** form, not just the default | Nothing breaks. A pinned snapshot is committed at [`hazards/`](hazards/). |
| 4 | **NASA POWER** (heat + flooding, Final Project) | Nothing breaks. Committed at [`hazards/`](hazards/). |
| 5 | `www.data.gov.qa` itself — one dataset is enough to prove the portal is alive | Everything above still works offline. Tell students to cite the frozen copy's download date. |

> **Two things that make a live link look dead when it is not**, both confirmed on 14 Sep 2026 and
> both certain to waste an hour otherwise: **`www.tableau.com` returns 403 to a `curl` dressed up as
> Chrome and 200 to an honest one** (Part 4), and **the OWID URLs answer `301` before `200`, so a
> `curl` without `-L` reports zero bytes** (Part 3 · Part 5). Browsers are unaffected by both.

**Everything a student or TA must have on the day is already in this repo.** The live URLs are the
"go and get today's data" path, never the dependency. That is the whole design: re-checking tells
you what to *say*, not whether the course can run.

**What changed since the first pass (this revision, 14 Sep 2026).** The flooding dataset was
**removed and replaced** — its rainfall column is `0.0` for seven straight years and the headline
figure quoted the wrong indicator (Part 3). Project 2 gained ten **committed offline copies**. Lab 1
gained the half of its own title that was missing, plus the interactivity module Project 2 is
actually graded on. Details are flagged 🔧 throughout.

---

## How to download anything from Qatar's open data portal

The portal is **www.data.gov.qa** — note the `www.`; the bare domain `data.gov.qa` has no DNS record at all. 1,834 datasets, all CC BY 4.0, no login, no API key.

The export URL grammar is:

```
https://www.data.gov.qa/api/explore/v2.1/catalog/datasets/{DATASET-ID}/exports/csv?delimiter=%2C&with_bom=true
```

**`&delimiter=%2C` is not optional.** Verified by hex dump on 14 Sep 2026: the default export is **semicolon**-delimited (`EF BB BF 6D 6F 6E 74 68 5F 79 65 61 72 3B` — that `3B` is a `;`). Tableau will often sniff a semicolon correctly, but "often" is not a thing to bet a 90-minute first lab on. `&with_bom=true` gives UTF-8 with a byte-order mark so Arabic survives in both Tableau and Excel.

Other endpoints and parameters, all tested and all returning HTTP 200:

| What | How |
|---|---|
| Excel instead of CSV | `/exports/xlsx` — returns a real `Microsoft Excel 2007+` file, one sheet, header in row 1, **no merged cells**. The safest format of all. |
| GeoJSON | `/exports/geojson` |
| Human-readable headers | add `&use_labels=true` |
| Filter rows server-side | add `&where=accident_year>=2024` |
| Pick columns | add `&select=col1,col2` |
| **Pre-aggregate server-side** | add `&select=zone,sum(total)%20as%20n&group_by=zone&limit=-1` — this works on `/exports/csv` and turns a 68 MB file into an 18 KB one. It is how the pre-baked file in `geo/` was made. |
| Landing page (for citation) | `https://www.data.gov.qa/explore/dataset/{DATASET-ID}/information/` |

Always take dataset ids from the catalogue API, never from a page title — slugs are truncated in listings and guessing them 404s (see Part 5).

---

# Part 1 — Lab 1: the handed-out dataset

**Saturday 31 October 2026, in person, 5 points, 60–90 minutes, first contact with Tableau.**
The file is already in this repo. Students do not download anything.

## ⭐ RECOMMENDATION — Qatar hotel performance, 2014–2025

**File to hand out: [`lab1/qatar-hotel-performance-2014-2025.xlsx`](lab1/qatar-hotel-performance-2014-2025.xlsx)** (60 KB, 945 rows x 11 columns)
CSV twin: `lab1/qatar-hotel-performance-2014-2025.csv` · untouched original: `lab1/original-downloads/` · what changed and why: [`lab1/PROVENANCE.md`](lab1/PROVENANCE.md)

**Original source** — Qatar Tourism, via www.data.gov.qa, CC BY 4.0
`https://www.data.gov.qa/api/explore/v2.1/catalog/datasets/accommodation-data-by-segment-date-and-key-metrics-supply-demand-occupancy-adr-revpar/exports/csv?delimiter=%2C&with_bom=true`
→ **HTTP 200, 68,359 bytes, checked 14 Sep 2026**
XLSX twin `…/exports/xlsx` → **HTTP 200, 30,371 bytes** · landing page `https://www.data.gov.qa/explore/dataset/accommodation-data-by-segment-date-and-key-metrics-supply-demand-occupancy-adr-revpar/information/` → **HTTP 200**

### Why this one, for a room where many students have never coded

- **It is a perfect balanced panel.** Exactly 7 segments x 135 months = 945 rows. **Zero nulls in all 11 columns.** Nothing is missing, so nothing silently disappears from a view.
- **Not one Arabic character in the file**, and not one Eastern-Arabic digit. No right-to-left text in the data pane, no encoding question on any laptop, and no risk of the one Tableau failure that cannot be worked around (Eastern-Arabic numerals import as text and *cannot* be coerced to numbers — see Part 4).
- **Seven ready-made numeric measures against one clean 7-level category and one date.** That is what makes three genuinely *different* views land inside twenty minutes, rather than three versions of the same bar chart.
- **60 KB.** Uploads, extracts and publishes over campus wifi in seconds. This matters more than it sounds: labs are lost to a spinning progress bar.
- **The payoff is local and immediate.** Every student in the room lived through the World Cup, and the chart tells them something they did not know.
- **The date column is already a real date** in the shipped file, so the time axis works with no calculation. (This is precisely the failure mode that sinks the runner-up, Qatar University enrolment, where `Fall 2015` / `Spring 2016` sorts alphabetically and lies.)

### 🔧 Time budget — the lab is 90 minutes and it has two halves

The lab is called **"Tableau *and Integration in Observable Dashboard*"** in both the schedule CSV and
the grading sheet. The previous revision of this document planned only the Tableau half. Both halves
are budgeted here.

| Minutes | Module | Why it is in |
|---|---|---|
| 0–5 | Accounts, privacy setting, the file | Minute 2 is the "set my vizzes to hidden" step (Part 4) |
| 5–45 | **Build three views** (below) | The Tableau half |
| 45–60 | **🔧 Make them interactive & publish** | *This is what Project 2 is graded on* |
| 60–70 | **🔧 Embed in the page they already own** | *This is the second half of the lab's own title* |
| 70–90 | Slack — stretch goals, stragglers, buddy mode | Something always runs long |

---

### Open with one sentence, and make it this one

> **"On Wednesday you charted a plan. Today you chart what happened."**

🔧 Lab 0 charted `plannedLegacy` — the stadium capacity Qatar **announced** for after the tournament —
and landed on *"A chart of a plan is not a chart of the world."* **The hotel file is the world half of
that exact story:** same event, same two months, what actually happened to the accommodation Qatar
built around those stadiums. The previous revision mentioned Lab 0 once in 700 lines. It costs sixty
seconds to weld the two labs into one argument, and it is the cheapest continuity win available:

> The stadium chart told you Qatar built 44,000-seat venues six times over.
> The hotel chart tells you those visitors paid **4.6×** — and the rooms were still **40% empty**.

### The chart a student builds in the first ten minutes

1. **Connect** → Files → **Upload from Computer** → `qatar-hotel-performance-2014-2025.xlsx`.
   🔧 *Name this motion out loud: download from the repo, upload to the tool. It is the step Lab 0's
   grading sheet promised and Lab 0 never delivered — see the TA prep note below.*
2. Drag **`segment_type`** to Filters, tick **`Whole market`** only.
3. Drag **`month`** to **Columns**. Click the pill → **continuous Month** (the green pill), not the default YEAR.
4. Drag **`avg_daily_rate_qar`** to **Rows**.
5. 🔧 **Click the `SUM(avg_daily_rate_qar)` pill → Measure → *Average*.** Do not skip this. See the box below.

That is it. A flat line for eight years, a cliff going up in November 2022, and a cliff going straight back down in January 2023.

> ### 🚨 Every measure in this file is a ratio, and Tableau's default `SUM` is wrong for all of them
>
> `occupancy_pct`, `avg_daily_rate_qar` and `revpar_qar` are **averages and percentages**. Drag any of
> them to Rows and Tableau gives you `SUM(...)`.
>
> The four-step recipe above produces correct numbers **only by coincidence** — the `Whole market`
> filter leaves exactly one row per month, so a sum of one value equals that value. Verified against
> the file. **The moment a student removes the filter, or adds `segment` to Colour, Tableau starts
> adding prices and percentages together and draws a confident, meaningless chart.**
>
> In a course whose thesis is *"be suspicious of charts"*, shipping a recipe that is right by accident
> is the wrong artefact. So: step 5, and one sentence out loud —
>
> > **"You can add room-nights. You cannot add prices."**
>
> That is also a free callback to Lab 0's lesson that a column's type decides what can be done with it.

**Then the twist, which is the actual lesson:** put **`occupancy_pct`** on the view beside the rate.
🔧 **Do it as two stacked panes, not as a dual axis:** drag `occupancy_pct` to **Rows**, next to
`AVG(avg_daily_rate_qar)`. One ordinary drop, two charts sharing the x-axis, same story. **Occupancy
barely moves.**

> ### 🔧 Why not the dual axis — and how to use it anyway
>
> The old recipe said *"drop it on the far right edge of the view to make a dual axis."* That is a
> **pixel-precise drop onto a thin target**, it is the single hardest interaction in Tableau for a
> beginner, and beginners miss it repeatedly — getting a second row of panes, a Measure Names mess, or
> nothing at all. **Do not budget the lab's payoff on it.** Two panes deliver the identical insight
> with one ordinary drag.
>
> **Keep the dual axis as the stretch for fast finishers — and then spend 60 seconds abusing it.**
> With ADR on 0–2,100 and occupancy on 45–60, right-click each axis and change the ranges. You can
> make the same two series look correlated, uncorrelated, or inverted. **Show the class two
> opposite-looking charts built from identical data.** That is the most famous chart lie in the
> storytelling literature, it sits one click away, and it is Lab 0's *"change one word, get a
> different picture"* move repeated in Tableau.

### The visible story — figures read out of the file on 14 Sep 2026

Qatar, all accommodation, average daily room rate:

| Month | Avg daily rate (QAR) | Occupancy |
|---|---|---|
| 2022-10 | 456.61 | 55.1% |
| **2022-11** | **1,839.25** | 55.9% |
| **2022-12** | **2,103.59** | 59.7% |
| 2023-01 | 423.61 | 46.3% |

**Room rates went up 4.6x. Occupancy went up by four percentage points.** The World Cup money came almost entirely from *price*, not from filling more rooms — and Qatar had built so much capacity that room-nights available rose from 994,697 in October to 1,162,345 in December, which is why occupancy stayed flat while demand surged. A student can see, argue about, and write 300 words on that in one lab session.

Second view, one drag: **`avg_daily_rate_qar` by `segment`, filtered to 2022-12** — 5-star hotels QAR 3,081.65, deluxe apartments 1,655.47, 3-star 778.96, 1&2-star 423.84. The spike was overwhelmingly at the top end.

Third view: **`occupancy_pct` vs `avg_daily_rate_qar` as a scatter**, coloured by segment — the 1&2-star segment runs at 87.7% occupancy for QAR 424 in the same month the 5-star segment runs at 56.7% for QAR 3,082. Two completely different businesses under one word, "hotel".

> 🔧 **Pin this recipe — the previous version quoted December-2022 figures without ever saying to
> filter to December 2022.** Correct order: **filter to `2022-12` first**, then put
> **`AVG(occupancy_pct)`** on Columns and **`AVG(avg_daily_rate_qar)`** on Rows, with `segment` on
> **Colour** *and* on **Detail**. Without the date filter you get every segment-month in one cloud;
> without `AVG` you get sums of percentages. Both defaults are wrong, and both are silent.

> ### 🔧 Lab 0 promised this lab would teach column types. Here is where you pay that promise.
>
> Lab 0's README closes with: *"**Lab 1** (Sat 31 Oct) adds Tableau: a dataset is a table of records
> and fields, and **a column's type decides what can be done with it**." The whole case for the hotel
> file is that every column already arrives correctly typed — which makes it the one file on the menu
> with nothing left to fix. Right choice for Lab 1; wrong to leave the promise unpaid.
>
> **Pay it with the type moment the recipe already contains.** Step 3 — *"click the pill → continuous
> Month, not the default YEAR"* — **is** the lesson. Do not treat it as a click to get past. Say:
>
> > **"Blue means Tableau is treating this as a category. Green means it is treating it as a number on
> > a scale. Same column, two types, two completely different charts — and *you* chose."**
>
> **Then point forward:** *"In Project 2, dataset #7 imports its visitor counts as **text**, because
> 95 cells say `--` or `مغلق` instead of a number. You will have to spot that and fix it yourself."*
> Now the promise is paid and Project 2 has a hook.

---

## 🔧 Module B (45–60 min) — make it interactive, and publish it

**This module was missing, and it is the one Project 2 is graded on.**

Project 2's deliverable is *"a Tableau **story** with **≥3 interactive views**."* In the previous
revision the word "interactive" appeared twice in 700 lines — both times restating the requirement,
never once as a lab step. The recipe ended at **three static worksheets**. Nobody ever clicked
*Show Filter*, built a dashboard, or saw a Tableau **Story** (which is a specific Tableau object, not
a synonym for "narrative").

**Why that is fatal here:** Lab 1 is the **only supervised Tableau time in the entire course.**
Session 5 (4 Nov) is a data-types lecture on Zoom; session 6 (9 Nov) is the ArcGIS lab on Zoom.
Whatever Lab 1 does not teach, **nobody teaches** — and 25 students then build a 20-point deliverable
alone and remotely. The predictable result is three static bar charts that answer three questions and
miss the rubric completely.

**Give students this definition, in one line, on the handout:**

> **A view is interactive when a person who is not you can change what it shows** — a shown filter, a
> highlight action, or a parameter. If the only way to see something different is to ask you to
> rebuild it, it is not interactive.

**The sequence. Ten minutes, and it is the whole learning objective:**

1. Right-click **`segment_type`** in the data pane → **Show Filter**. A control appears at the right.
2. Drag **`year`** to Filters → right-click it → **Show Filter** too. Now there are two.
3. Click a few boxes. **The chart changes and you did not rebuild it.** That is the entire concept.
4. **File → Save.** 🔧 *On Tableau Public web authoring, **Save publishes** — there is no local save.
   Say so before you click, or it is a surprise.*
5. **Open the resulting public URL in a brand-new browser tab** — not the editor, a fresh tab —
   and click the filters **there**.

> Step 5 is the one that lands it. Until a student sees their own filters working on a page that is
> not the editor, "interactive" is a word on a rubric. **This is also exactly how you will grade
> them**, so show them the grader's view.

**Then five minutes of showing, not building** — so that the words in the Project 2 prompt are not
first encountered alone at home on 14 November:

- **Dashboard:** new Dashboard tab, drag two of their worksheets in. *"This is one page with more
  than one chart on it."*
- **Story:** new Story tab, add two Story Points. *"This is a sequence of views with captions. When
  Project 2 says 'a Tableau story', it means this button."*

Do not require either. **Requiring them costs 20 minutes; naming them costs 5** — and the entire
problem was that students met the word cold.

---

## 🔧 Module C (60–70 min) — the half of the title that was missing

The lab is named **"Tableau and Integration in Observable Dashboard."** Part 1 previously contained
120 lines about Tableau and **not one word about the embed.**

**The 67-336 original cannot be run as written by this cohort.** `Lab&Project_67336/…/lab3-tableau-observable/INSTRUCTIONS.ipynb`
offers two options: Option 1 opens `tableau-embed.html` **in VSCode**; Option 2 requires creating an
**observablehq.com account** and building a three-cell notebook. This cohort has neither VSCode nor a
terminal — Lab 0 was deliberately browser-only through GitHub's pencil editor — and there is no
67-290 replacement in the repo.

### The 67-290 version: 8–10 minutes, no new account, no editor

Students already own `index.html` in their **`qatar-stadiums`** repo from Lab 0, and they already know
the pencil → commit → reload loop. **Reuse it exactly.**

**Pre-step — get the URL.** In Tableau Public, open the published viz → **Share** → copy the **Link**
(not the embed code). 🔧 **Then delete everything from the `?` onward.** Tableau appends tracking
parameters and they break the embed:

```
Before:  https://public.tableau.com/views/QatarHotels/Sheet1?:language=en-US&:sid=&:redirect=auth&:origin=viz_share_link
After:   https://public.tableau.com/views/QatarHotels/Sheet1
```

**Then, in GitHub, in the browser:** open `qatar-stadiums` → `index.html` → the **pencil** → paste the
two blocks below just above `</body>` → **Commit changes** → reload their live page.

```html
<!-- EDIT ME: paste your own Tableau link between the quotes -->
<tableau-viz
  id="tableauViz"
  src="https://public.tableau.com/views/YOUR_WORKBOOK/YOUR_SHEET"
  width="100%"
  height="800px">
</tableau-viz>

<script type="module"
  src="https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js">
</script>
```

*(Embedding API v3 script verified **HTTP 200, 337,087 bytes, `application/javascript`**, 14 Sep 2026.)*

**The payoff, and it is a good one:** their World Cup **stadium** chart from Wednesday and their World
Cup **hotel** chart from Saturday, on the same page, at their own address, which they can send home.
The plan and the world, one page. It reuses Lab 0's commit/History safety net verbatim — **if the
paste breaks the page, it is one click in History to undo**, which they have already practised.

> ### Two decisions for the TA, in writing, before 31 October
>
> 1. **If Module C will not fit, rename the lab in both CSVs.** Do not leave the grading sheet and the
>    lab disagreeing — Lab 0's `INSTRUCTOR-NOTES.md` §13 already establishes that precedent and the
>    reasoning.
> 2. **Verify that a *hidden* Tableau Public viz renders inside `<tableau-viz>` on a GitHub Pages
>    page.** Part 4 tells every student to set "hidden" at minute 2, and hidden vizzes are certainly
>    still *gradeable* by URL — but the **embed** case is untested, and it is the exact configuration
>    all 25 students will be in. Five minutes with one test viz settles it. **Do this before the lab,
>    not during.**

---

### TA prep — what you must do before 31 October

1. **Nothing to the data.** It is already fixed and committed. Read `lab1/PROVENANCE.md` so you can answer "why does it say room-nights?".
2. **Say three things out loud during the lab** (they are all on the handout, but say them anyway):
   - `Qatar (all accommodation)` is the whole-market row. Do not sum it with the six segments. That is what `segment_type` is for.
   - It is ≈ but not *exactly* the sum of the six segments (Dec 2022: 1,162,345 vs 1,160,888, a 0.13% gap). We do not know why. Published aggregates often do not reconcile, and saying so is better than pretending.
   - Three rows show occupancy above 100% (max 102.8). Room-nights sold exceeded *sampled* room-nights available. Always look at your min and max before you plot.
3. **Test the upload yourself once**, in a browser, on a fresh Tableau Public account, on campus wifi. Ten minutes. It is the only way to know the room will work.
4. **Have the file on a USB stick and in the course repo.** If the wifi dies, the lab still runs.
5. 🔧 **Run Module C end to end yourself**, including the hidden-viz embed test (above). It is the only genuinely unverified step in this lab.
6. 🔧 **Answer Lab 0's two open handoffs**, both of which were addressed to whoever designed Lab 1 and both of which this document previously left unanswered:
   - **`INSTRUCTOR-NOTES.md` §13 item 10 — the grading sheet's "upload" clause.** Lab 0 never delivers the promised upload step, and the notes recommend moving it into Lab 1 *"where Tableau needs a CSV on disk anyway and it costs nothing extra."* ✅ **Done** — step 1 of the recipe above *is* that motion; it is now named as such in the handout. Amend the Lab 0 grading-sheet cell to match.
   - **§13 item 11 — Lab 2's live air-quality fetch has no prerequisite anywhere.** ✅ **Answered in Part 3**: a pinned snapshot is committed at `hazards/`, so Lab 2 does not depend on a live call succeeding on 25 remote laptops. Take the notes' option (b) — hand students a working block with only lat/lon as an EDIT ME zone.

### Data dictionary — copy-paste into the handout

| Column | Type | Meaning |
|---|---|---|
| `month` | **Date & Time** | First day of the reporting month. 2014-01-01 to 2025-03-01, 135 consecutive months, no gaps. 🔧 The `.xlsx` stores it as an Excel date serial under a `YYYY-MM-DD HH:MM:SS` format, so **Tableau types it Date & Time, not Date.** Tooltips and axes will read `01/01/2014 12:00:00 AM`. **The time is always midnight and means nothing** — a monthly figure stamped to the first of the month. Say it out loud; someone will ask. |
| `year` | Whole number | Calendar year, 2014–2025. |
| `segment` | Text | One of 7: `1 & 2 Star Hotels`, `3 Star Hotels`, `4 Star Hotels`, `5 Star Hotels`, `Deluxe Apartments`, `Standard Apartments`, `Qatar (all accommodation)`. |
| `segment_type` | Text | `Whole market` for the Qatar row, `Hotel segment` for the other six. **Filter on this before you sum anything.** |
| `room_nights_available` | Whole number | Rooms x nights on offer in the month ("supply"). 4,648 – 1,266,505. |
| `room_nights_sold` | Whole number | Rooms x nights actually sold ("demand"). 2,645 – 1,015,494. |
| `occupancy_pct` | Decimal | Sold ÷ available, **already in percentage points — `55.1` means 55.1%**. 17.0 – 102.8. Values above 100 are real; see the caveat. 🚨 **Do not apply Format → Percentage** — Tableau would render it as **5,510%**. Add a `%` to the axis title instead. *(This is a natural tidying impulse, and design-minded architecture and fine-arts students are the most likely to have it.)* |
| `avg_daily_rate_qar` | Decimal | Average price paid per occupied room-night, Qatari riyals. 136.57 – 3,081.65. |
| `revpar_qar` | Decimal | Revenue per *available* room-night = rate x occupancy. 45.37 – 1,748.80. The industry's single headline number. |
| `properties_counted` | Whole number | Hotels/apartment buildings in the segment that month. 3 – 202. |
| `rooms_counted` | Whole number | Rooms in those properties. 166 – 40,855. |

*Licence: CC BY 4.0. Attribution line for a student's viz: “Qatar Tourism, accommodation performance by segment, via data.gov.qa (CC BY 4.0), downloaded 14 Sep 2026.”*

---

## 🥈 BACKUP — Fog, dust storm and haze at Doha airport, 2011–2024

**File: [`lab1/fog-dust-haze-doha-2011-2024.xlsx`](lab1/fog-dust-haze-doha-2011-2024.xlsx)** (10 KB, 168 rows x 7 columns)

**Original source** — Civil Aviation Authority, via www.data.gov.qa, CC BY 4.0
`https://www.data.gov.qa/api/explore/v2.1/catalog/datasets/fog-dust-storm-and-haze-doha-international-airport-2011-2024/exports/csv?delimiter=%2C&with_bom=true`
→ **HTTP 200, 2,612 bytes, checked 14 Sep 2026** (XLSX twin: HTTP 200, 2,654 bytes)

**Why it is the backup, not the primary:** it is the single cleanest file on the entire 1,834-dataset portal — 2.6 KB, zero nulls, zero non-ASCII bytes, 14 complete years with no gaps. If anything at all goes wrong with the primary, this cannot fail. It is *not* the primary only because three measures over one time axis gives you a strong first view and a weaker second and third, whereas the hotel file gives you three strong ones.

**Use it instead of the primary if:** the room is struggling and you want to cut scope; or you want Lab 1 to seed the Final Project directly, because this is a Qatar hazard dataset.

**First ten minutes:** drag `month` to Columns (continuous Month), drag `haze_days`, `dust_storm_days` and `fog_days` to Rows (or to a single axis via Measure Values).

**The visible story** — days per year, summed from the file on 14 Sep 2026:

| Year | Haze days | Dust storm days | Fog days |
|---|---|---|---|
| 2011 | 108 | 8 | 1 |
| 2015 | 99 | 2 | 7 |
| 2020 | 46 | 0 | 4 |
| 2022 | 97 | 3 | 1 |
| 2024 | 48 | 0 | 4 |

**The thing everyone in Qatar talks about — dust storms — happens 0 to 8 days a year. The thing nobody talks about — haze — happens 46 to 108 days a year, up to a third of the calendar.** And haze days roughly halved between 2011 and 2024. Is that cleaner air, a moved weather station, or a changed definition? The honest answer is that this file cannot tell you, and that is a very good 300-word reflection.

### Data dictionary

| Column | Type | Meaning |
|---|---|---|
| `month` | Date | First day of the month. 2011-01-01 to 2024-12-01, 168 consecutive months. |
| `year` | Whole number | 2011–2024. |
| `month_number` | Whole number | 1–12. Use this to sort `month_name` correctly. |
| `month_name` | Text | `Jan`…`Dec`. Sorts alphabetically unless you sort it by `month_number`. |
| `fog_days` | Whole number | Days that month with fog reducing visibility below 1 km. 0–6. |
| `dust_storm_days` | Whole number | Days with a dust storm reducing visibility below 1 km. 0–2. |
| `haze_days` | Whole number | Days with haze reducing visibility below 5 km. 0–18. |

**Station caveat, must be stated:** one station, and it moved — Doha International Airport to March 2015, Hamad International Airport after. A 2011-vs-2024 trend claim has to acknowledge that.

### Also considered for Lab 1, and why not

- **Hamad airport arrivals & departures** (144 rows, 2017–2022; `arrival-and-departures-via-hamad-international-airport-by-month-and-year`, HTTP 200, 8,728 bytes). The most dramatic single line available for Qatar: arrivals fall from **2,015,820 in August 2019 to 57,635 in May 2020**, a 97% collapse. Rejected as primary only because `year` and `month` are separate columns and `month` is a full English name, so a continuous time axis needs a calculation. Excellent Project 2 option — it is #2 on that menu.
- **NASA POWER daily climate for Doha** (9,497 rows; verified HTTP 200, 367,299 bytes with `&header=false`, which strips the 13 junk header lines). Genuinely perfect data, but `YEAR`, `MO`, `DY` are three separate integers and there is no date column, so the first thing a beginner meets is `MAKEDATE([YEAR],[MO],[DY])`. Wrong first impression of Tableau. Keep it for the Final Project.
- **Qatar University enrolment** (7,538 rows). Superb file, best engagement in the whole menu for this cohort — but `semester` is text, so all ten Falls sort before all ten Springs and the trend line is a lie. That is a fine Project 2 lesson and a terrible Lab 1 surprise.

---

# Part 2 — Project 2: the student menu

**"Qatar in Data": a Tableau story with ≥3 interactive views + a 300–500-word reflection. 20 points, individual. Out 31 Oct, due 16 Nov.**

Eleven options, eleven different subjects, so 25 students do not all build the same workbook.
Everything here was downloaded and opened on **14 September 2026**. All are CC BY 4.0 unless noted.

> ### 🔧 Every dataset below is committed offline at [`project2/`](project2/)
>
> Ten `.xlsx` files, **3.2 MB total**, with [`project2/PROVENANCE.md`](project2/PROVENANCE.md)
> recording exactly what was changed (eight are untouched; two were slimmed **server-side** using the
> portal's own `&select=`/`&group_by=`, so the numbers are the portal's, not mine).
>
> **Hand students the frozen copy as the default.** The live URL is the "go and get today's data"
> stretch. Lab 1 has been protected this way since day one; Project 2 now is too, and for the same
> reason — if the portal is re-slugged or down on 31 October, 25 students would otherwise have no
> project. Every headline figure in this Part was re-checked against the frozen files on the
> verification pass and reproduces exactly — including the 311,080 / 96,292 gender split in #1, the
> 543-row zone file, and all four Lab 1 World Cup months.
>
> 🔺 **Two frozen copies are narrower than the live file, and the entries below describe the live
> one.** #8 ships **70,324 x 7** (the live CSV is 12 columns) and #10 ships **26,719 x 8** (live is
> 18). **Every row survives in both**; what was dropped server-side is the Arabic mirror columns and
> redundant fields — listed exactly in `project2/PROVENANCE.md`. Practical effect: a student on the
> frozen copy of #8 never meets `lrb_quarter` or the `date` text column, and on #10 never meets the
> five transliterated-Arabic slug columns. The *defects the entries teach* were deliberately kept —
> the `country_of_destinatoion` misspelling and the 289 non-breaking spaces are both still in there.

**Difficulty is about the data, not the topic — and it is not about marks.**
🟢 **Gentle · ≈3 hours** — open it and chart it. No cleaning, no calculations.
🟡 **Moderate · ≈4–5 hours** — one named, documented fix (change a data type, build one date field, apply one filter). The fix is written out below; it is 2–5 minutes of work, not hours.
🔴 **Ambitious · ≈7 hours+** — real decisions about what to exclude, big files, outliers that will eat your chart.

> **🔴 earns no extra points.** Pick it because the question interests you, never because you think
> it scores higher. A 🟢 dataset with a sharp question and an honest reflection beats a 🔴 dataset
> with a muddled one, every time.

🌡️ = pairs naturally with the **Final Project hazard StoryMap**.

> ### 🌡️ **If you pick a 🌡️ dataset, your Final Project can continue the same story with the same data.**
> Project 2 is due 16 November; the Final Project goes out 9 November. Choosing 🌡️ means the data you
> already downloaded, already cleaned and already understand carries into the Final — **this is the
> cheapest path through November, and it is not a shortcut we disapprove of.** The grading sheet
> explicitly permits it. Say this out loud when the project goes out, not just in writing.

### 🔧 Picking — there is a cap

**Maximum 4 students per dataset, first come.** Sign-up sheet goes out with the project on 31 October;
put your name against one row. This exists because the alternative is a dozen identical QU-enrolment
workbooks and a TA grading the same three charts twenty times.

If you would rather not run a sheet, seed by major instead and say it is a suggestion, not an
assignment: **information systems → #9 · business → #5, #8 · architecture & fine arts → #7, #10 ·
public policy → #3, #4, #6, #11 · anyone → #1, #2.**

### 🔧 May I use the Lab 1 hotel file?

**No — pick from the menu.** The hotel data has been worked through in class, its three best views are
already on the board, and Project 2 is where you show you can do it yourself on data nobody has
walked you through. *(If you are set on hotels, ask — but your three views will have to answer a
question the lab did not: segment mix, seasonality, or the collapse in `properties_counted`.)*

## The menu at a glance

| # | Dataset | Source | Rows x cols | What's interesting | Difficulty |
|---|---|---|---|---|---|
| 1 | Qatar University enrolment, Fall 2015 – Spring 2025 | Qatar University | 7,538 x 7 | 76% of QU registrations are female — and the gap by college runs from 58% to 96% | 🟢 / 🟡 * |
| 2 | Hamad Airport arrivals & departures, 2017–2022 | Civil Aviation | 144 x 6 | A 97% collapse and a recovery, legible from across a classroom | 🟡 * |
| 3 | Traffic deaths & injuries by month, 2022–2023 | Ministry of Interior | 432 x 10 | Pedestrians die at 4x the rate of drivers per casualty | 🟢 🌡️ |
| 4 | Population by municipality and age group, 2014–2024 | National Planning Council | 1,584 x 5 | A population shaped like no other country's — and a hard question about why | 🟢 |
| 5 | Consumer Price Index by expenditure group, 2020–2025 | Planning & Statistics Authority | 936 x 7 | Recreation & culture prices doubled while health *fell* | 🟡 |
| 6 | Qatar's foreign assistance (QFFD), 2020–2026 | Qatar Fund for Development | 4,083 x 13 | Palestine $1.32bn, Syria $897m — auto-geocodes to a world map | 🟡 |
| 7 | Museum & exhibition visitors, 2013–2024 | Qatar Museums / PSA | 1,372 x 6 | A museum's closure is literally written in the data as the word "closed" — **and the file that teaches column types** | 🟡 |
| 8 | Qatar export statistics, 2019–2024 | National Planning Council | 70,324 x 12 | Qatar's economy points east: China, Korea, India, Japan | 🟡 |
| 9 | Government e-services directory (Hukoomi) | MOCIT | 1,692 x 13 | **The only dataset here where nobody has ever drawn the chart** — which ministries actually digitised | 🟡 |
| 10 | Weekly real estate sales bulletin, 2020–2025 | Ministry of Justice | 26,719 x 18 | A 3.5x price gradient across a country you can drive across in 90 minutes | 🔴 |
| 11 | Qatar's CO₂ emissions per capita, 1949–2024 | Our World in Data | 76 x 4 | **The most charged number in Qatari public data** — and two accounting choices that make it | 🟡 |

> ***🔧 #1 and #2 were re-rated.** The previous revision rated both 🟢, which contradicted this
> document's own Part 1 — where #1 is rejected for Lab 1 because *"`semester` is text, so all ten
> Falls sort before all ten Springs and the trend line is a lie"* and #2 because *"`year` and `month`
> are separate columns and `month` is a full English name, so a continuous time axis needs a
> calculation."* Building a date field is the literal definition of 🟡 above, and #5 carries the
> identical defect and was always rated 🟡. Honest ratings: **#1 is 🟢 for questions 1 and 3 and 🟡
> for question 2** (which needs a semester sort); **#2 is 🟡** throughout. The fix for both is the
> copy-pasteable `DATEPARSE` snippet written out in #5.*

Also eligible, and described in **Part 3** because they suit the hazard theme: monthly Doha weather
(🌡️), monthly temperature & humidity for Qatar (🌡️), **daily Doha heat *and* rainfall** — the
committed `hazards/doha-climate-daily-2000-2025.xlsx` (🌡️), water production and losses (🌡️),
traffic accidents by cause (🌡️), and the pre-baked accidents-by-zone map file (🌡️).

🔧 *`monthly-environmental-indicators-doha-city` was on this list in the previous revision and has
been **removed** — its rainfall column is `0.0` for every month of 2016–2022. Part 3 explains. If a
student finds it themselves and wants it, that conversation is a good one; the file is not.*

---

## 1. Qatar University enrolment 🟢 / 🟡

`https://www.data.gov.qa/api/explore/v2.1/catalog/datasets/qu-registered-students-per-semester-fall-2015-till-spring-2025/exports/csv?delimiter=%2C&with_bom=true` → **HTTP 200, 575,397 bytes, 14 Sep 2026**

7,538 rows x 7 columns: `semester`, `college`, `level`, `major`, `nationality`, `gender`, `total_registered`. **Zero nulls in every cell. Zero Arabic anywhere** — rare on this portal. 20 semesters, 13 colleges, 7 levels, 129 majors.

Read from the file: across the whole decade, female registrations total **311,080** against male **96,292**. Total enrolment grew from **16,771** (Fall 2015) to **23,827** (Fall 2024). In Fall 2024 the female share by college runs Engineering 58.3% → Business 72.4% → Arts & Sciences 83.0% → Education 86.1% → Health Sciences **95.6%**. *(All re-verified against the frozen copy at `project2/01-qu-enrolment-2015-2025.xlsx`.)*

> ### 🔧 Required framing — read this before writing 400 words about 76%
>
> This is a real and interesting finding, and it is **not** a finding about how well men and women
> study. The honest explanations — Qatari men studying abroad, entering employment or national
> service, Qatari women's high domestic participation — involve **people who are not in this file at
> all.**
>
> **Name the missing denominator explicitly.** This file counts *registrations at one university*.
> It is not Qatari participation in higher education, and it says nothing whatever about students
> who left the country to study. A student who writes "76% of Qatari students are female" has
> said something the data does not support.
>
> **The rule for the reflection:** any claim about gender must be written in the form
> *"this file shows X; explaining X would need data on Y."* The `nationality` column lets you slice
> Qatari vs non-Qatari, which sharpens the analysis and **raises the stakes at the same time** —
> your classmates and their families are inside these numbers.
>
> This requirement is not a restriction on the dataset. **It is learning objective 3**, and this is
> the best chance in the course to practise it.

**Three questions:** (1) Which colleges are most and least gender-balanced, and is the gap closing over ten years? (2) Which majors grew fastest since 2015 and which are shrinking? (3) How does the Qatari / non-Qatari mix differ between undergraduate, Master's and PhD?

**Watch out:** `semester` is text, so Tableau sorts *all ten Falls before all ten Springs* — chronologically wrong. For a trend line, either sort manually or filter to one season. `QU Health` overlaps Medicine/Pharmacy/Nursing and there is a `No College Designated` bucket; do not sum colleges blindly.

## 2. Hamad International Airport arrivals & departures 🟢

`https://www.data.gov.qa/api/explore/v2.1/catalog/datasets/arrival-and-departures-via-hamad-international-airport-by-month-and-year/exports/csv?delimiter=%2C&with_bom=true` → **HTTP 200, 8,728 bytes, 14 Sep 2026**

144 rows x 6 columns = 6 years (2017–2022) x 12 months x 2 flows, with **no gaps and no nulls**. Two of the six columns are Arabic mirrors (`lshhr`, `nw`); hide them and it is a four-column table.

Arrivals peak at **2,015,820 in August 2019** and bottom out at **57,635 in May 2020** — a 97.1% collapse — then climb back. The most dramatic single line chart available for Qatar.

**Three questions:** (1) How deep and how long was the collapse, and had traffic recovered by the end of 2022? (2) Do arrivals and departures ever diverge — is there a month where people left and did not come back? (3) 🔧 Strip out 2020–21 entirely and compare **2017–2019 against 2022**: is the recovery a return to the old shape, or a different airport with a similar total?

> 🔧 *Question 3 was rewritten. It previously asked for "a stable seasonal rhythm underneath the
> shock", which is the same line chart as question 1 read a second time. The replacement forces a
> different view — a filtered year-on-year comparison rather than one continuous series.*

**Watch out:** `year` and `month` are separate columns and `month` is a full English name, so there is no continuous time axis out of the box. Easiest route for 3 views: put `year` on Columns and `month` on Colour. Ends at 2022, so it says nothing about the World Cup aftermath.

## 3. Traffic deaths and injuries by month 🟢 🌡️

`https://www.data.gov.qa/api/explore/v2.1/catalog/datasets/number-of-deaths-and-injuries-from-traffic-accidents-by-month-affected-person-location-and-gender/exports/csv?delimiter=%2C&with_bom=true` → **HTTP 200, 38,545 bytes, 14 Sep 2026**

432 rows x 10 columns, a perfectly balanced 2 years x 12 months x 3 person-types x 3 outcomes x 2 genders. Five English columns each have an Arabic twin — hide five fields and it is clean. Exactly **1 null** in 432.

The finding, computed from the file (2022+2023 combined):

| | Death | Severe injury | Slight injury | Deaths as % of casualties |
|---|---|---|---|---|
| Driver | 211 | 642 | 14,509 | 1.4% |
| Passenger | 89 | 262 | 6,069 | 1.4% |
| **Pedestrian** | **94** | **165** | **1,462** | **5.5%** |

**A pedestrian involved in a Qatari road casualty is about four times more likely to be killed than a driver is.** That is a real, defensible, one-crosstab road-safety finding, and it is the kind of thing a public-policy student can build a whole StoryMap around.

**Three questions:** (1) Are pedestrians disproportionately killed rather than injured, and why would that be? (2) 🔧 Does the **severity mix** shift between person types and between the two years — i.e. is the pedestrian penalty stable, or an artefact of one bad year? (3) How does the male/female split differ between drivers and pedestrians, and what does that say about who is on Qatar's roads?

> 🔧 *Question 2 was rewritten. It previously asked for a month-of-year pattern in road deaths — but with only **two years** and death counts in the tens per cell, month-to-month movement here is almost entirely noise, and the entry's own "no trend claims" caveat forbids reading it. The replacement asks a question two years can actually answer.*

**Watch out:** only 2022 and 2023 — two years, so no trend claims. Pre-aggregated, so `SUM(number_of_people)` is the only sensible measure.

## 4. Population by municipality and age group 🟢

`https://www.data.gov.qa/api/explore/v2.1/catalog/datasets/population-by-municipality-and-age-groups/exports/csv?delimiter=%2C&with_bom=true` → **HTTP 200, 69,295 bytes, 14 Sep 2026**

1,584 rows x 5 columns — the least intimidating data pane on the menu. 11 years (2014–2024) x 8 municipalities x 18 age bands, one clean count (0 – 216,880). **Zero nulls.** One Arabic column (`lbldy`) with a complete English twin.

Qatar's population pyramid is shaped like almost no other country's — a very large **male 25–44
bulge** — and this file draws it in three drags.

> ### 🔧 Required framing — this is a chart of migrant labour, and the file does not say so
>
> That bulge is Qatar's migrant workforce. This is a legitimate and teachable subject, and the course
> commits to it. But look at what you actually have: **five columns — year, municipality, age band,
> sex, count.** No nationality. No occupation. No visa status.
>
> **You can see the shape. You cannot see the cause.** Two failures are equally easy and equally
> wrong: writing *"migrant workers"* as though the file said it (an inference dressed as a reading),
> or drawing the pyramid, calling it a curiosity, and never naming the human beings in it.
>
> **What the reflection must do:** mark any demographic explanation as an inference, and name the
> column that would have settled it. This is Lab 0's grey-note move again — *what can a dataset with
> only these five columns not tell you?* — and you have already done it once.
>
> 🔧 *A note on wording: the previous revision called this pyramid "the most distorted in the world."
> That was an unsourced superlative in a document that insists every figure be traceable, and
> "distorted" is a loaded word for a real population of real people. Prefer "unusual" or
> "male-skewed", or cite a comparison.*

**Three questions:** (1) What does Qatar's age structure actually look like, and how is it different from any other country's? (2) Which municipality is ageing and which is getting younger across the decade? (3) How did the World Cup construction wave show up in the working-age bands, and did it reverse?

**Watch out:** `age_groups` is text with 18 levels and sorts alphabetically, so `10 - 14` lands before `5 - 9`. A manual sort is required for a real pyramid — that is the only defect. Municipality spellings here (`AL Khor` with a capital L, `Al Dayyan`) do not match other portal files; see the map notes in Part 3 before attempting a join.

## 5. Consumer Price Index by expenditure group 🟡

`https://www.data.gov.qa/api/explore/v2.1/catalog/datasets/consumer-price-index-cpi-by-expenditure-group-monthly/exports/csv?delimiter=%2C&with_bom=true` → **HTTP 200, 84,517 bytes, 14 Sep 2026**

936 rows x 7 columns = 13 expenditure groups x 72 months (Jan 2020 – Dec 2025). **Zero nulls.** `cpi_index` 71.47 – 246.00. Two Arabic mirror columns.

December 2020 → December 2025, computed from the file:

| Group | Dec 2020 | Dec 2025 | Change |
|---|---|---|---|
| Recreation and culture services | 76.36 | 152.92 | **+100.3%** |
| Miscellaneous goods and services | 105.27 | 137.82 | +30.9% |
| Communication | 91.67 | 110.11 | +20.1% |
| **General index** | 95.93 | 112.39 | **+17.2%** |
| Food and beverages | 99.51 | 111.05 | +11.6% |
| Housing, water, electricity, gas | 90.25 | 92.70 | +2.7% |
| Health | 102.27 | 96.74 | **−5.4%** |

**The headline number hides everything.** "Qatar's inflation was 17%" and "recreation doubled while healthcare got cheaper" are both true, and a student choosing which to show is doing exactly what this course is about.

**Three questions:** (1) Which expenditure group rose fastest since 2020, and does the general index represent anyone's actual experience? (2) Did the World Cup leave a visible mark, and in which categories? (3) Are essentials and discretionary spending diverging?

**The one fix:** there is no date column. `year` is a number and `month` is `Jan`…`Dec`. Either put `year` on Columns and `month` on Colour, or make one calculated field: `DATEPARSE("yyyy-MMM", STR([year]) + "-" + [month])`. Note `group_code` 0 is the General Index — do not sum it with the twelve components.

🔧 **Cosmetic, but you will read it off your own axis: *four* group names are misspelled in the
source, not one.** Verified in the file today:

| As printed in the file | Should read |
|---|---|
| `Miscellaneous gooda and services` | goods |
| `Resturant and hotels` | Restaurants |
| `Clothing and foot ware` | footwear |
| `Furnishing, household equipment and rouitin housholds maintainance` | routine household maintenance |

*(There is also a double space in `Food  and Beverages`.)* **The table above in this document prints
the corrected spellings; your axis will not.** Either alias them in Tableau or leave them and note it
— but do not quietly retype them and let a reader think the source was clean.

## 6. Qatar's foreign assistance (QFFD) 🟡

`https://www.data.gov.qa/api/explore/v2.1/catalog/datasets/qatar-s-foreign-assistance-based-on-qffd-records/exports/csv?delimiter=%2C&with_bom=true` → **HTTP 200, 850,517 bytes, 14 Sep 2026**

4,083 rows x 13 columns. **Zero nulls in all 13.** Six Arabic mirror columns, each with a complete English twin. 153 recipients, 5 sectors, 8 regions, grants vs development loans. Updated monthly; runs to 2026.

Totals computed from the file (USD): **Palestine 1,316.9m**, Syria 896.6m, Somalia 135.1m, Yemen 129.3m, Lebanon 110.9m. By sector: Relief aid 1,395.1m, Economic Development 1,001.8m, Education 616.0m, Other 492.6m, Healthcare 408.6m. Because `recipient` holds real country names, Tableau geocodes it into a filled world map with **no join and no shapefile** — the most impressive-looking view available from this portal for the least effort.

**Three questions:** (1) Where does Qatari aid go, and how concentrated is it in two recipients? (2) Has the balance between emergency relief and long-term development shifted year to year? (3) Do grants and development loans go to different regions or different sectors?

**The one fix:** `recipient` mixes countries with organisations (`Gavi Alliance`, `UN OCHA CERF`). Filter `regions_entities ≠ Organization` before mapping, or Tableau reports unknown locations. Also: `value` has a floating-point minimum of −1.8e-12 where a zero should be (cosmetic, shows up in tooltips), and 2026 is partial.

> ### 🔧 The basemap will make a political choice for you. Say which one.
>
> The moment this map renders, the basemap labels something, and **somebody in the room will ask
> about it out loud.** Be ready, because it is one of the best illustrations this course has.
>
> **Tableau recognises "Palestine" as a country entry.** Datawrapper and Flourish silently convert
> the same name to "West Bank and Gaza." Same data, same word, three different maps. *(This note was
> previously buried 300 lines away in the Tableau section, framed as a fun fact. It belongs here.)*
>
> This is not a reason to avoid the dataset — it is **official Qatari government data**, Qatar's aid
> to Palestine is a matter of public record and national pride, and the geocoding difference is the
> course's whole thesis in one screenshot: **tools embed choices, and the default is still a choice.**
>
> **How this is graded:** you are assessed on whether you **disclose** your basemap and geocoding
> choice — which tool drew it, what it labelled, and that you noticed. **Never on which one you
> made.** One sentence in the reflection is enough.
>
> *TA line for the room, if you want one ready: "Tableau made a choice there, and a different tool
> would have made a different one. Neither is neutral, and that is exactly what we are studying —
> so the only thing I want in your write-up is that you noticed, and said which."*

## 7. Museum and exhibition visitors 🟡

`https://www.data.gov.qa/api/explore/v2.1/catalog/datasets/visitors-of-museums-and-exhibition-by-month-and-museum/exports/csv?delimiter=%2C&with_bom=true` → **HTTP 200, 120,809 bytes, 14 Sep 2026**

1,372 rows x 6 columns. 32 museums and heritage sites — Museum of Islamic Art, National Museum of Qatar, Zubarah Fort, the Weaponry Museum — monthly, 2013–2024. **The arts/architecture option.**

**The one fix, and it is the whole point of this dataset:** the `number` column is **not numeric**. 95 of 1,372 cells contain text instead of a count. 🔧 Re-read out of the file today, with two corrections to the previous revision — **the "closed for renovation" label is split across two different spellings**, and the last one has a missing space:

| Value | Count |
|---|---|
| `--` | 60 |
| `-` | 26 |
| `مغلق` ("closed") | 4 |
| `مغلق للتجديد Closed of Renovation` | 2 |
| `مغلق للتجديد Closed For Renovation` | 2 |
| `يفتح للزوار الرسميين Only Open ToOfficial Visitors` *(no space in "ToOfficial")* | 1 |

Those two renovation spellings will appear as **two separate entries in a filter list** — a small
live example of the same defect as #10's non-breaking spaces. Tableau imports the whole column as a **string dimension**, so dragging it to Rows gives you `CNT(number)` and a nonsense chart. Fix: in the Data Source pane click the `Abc` icon on `number` → Number (whole). The 95 text cells become nulls, which is the correct semantics — a closed museum has no visitor count, it does not have zero visitors. **That distinction is a perfect reflection topic.**

**Three questions:** (1) Which museums recovered from COVID and which never did? (2) Did the National Museum of Qatar's 2019 opening grow the audience or take it from MIA? (3) What did the World Cup do to cultural attendance in Nov–Dec 2022?

**Watch out:** **2016 is missing entirely** from the year sequence (2013, 2014, 2015, 2017, …). There are 33 Arabic museum names for 32 English ones, so group on the English.

## 8. Qatar export statistics, 2019–2024 🟡

`https://www.data.gov.qa/api/explore/v2.1/catalog/datasets/qatar-export-statistics-2019-2024-copy/exports/csv?delimiter=%2C&with_bom=true` → **HTTP 200, 17,413,680 bytes, 14 Sep 2026**

70,324 rows x 12 columns. 🔧 **The column names are the first thing you will meet and the previous
revision did not warn about them: `lsn_year`, `lrb_quarter`, `lshhr_month` are transliterated-Arabic
slugs, not the plain `year`/`quarter`/`month` you would expect.** In full: `lsn_year`,
`lrb_quarter`, `lshhr_month`, `hs4`, `ltfsyl` (Arabic product description), `details` (English
product description), `dwl_lmqsd` (Arabic destination), `country_of_destinatoion` (English,
misspelled — see below), `quantity`, `weight_kg`, `value_qr`, and `date`. 🔧 **`date` is `YYYY-MM`
*text*, not a full ISO date.**

Six-year totals by destination, computed from the file (QAR): **China 325.0bn**, South Korea 249.7bn, India 238.3bn, Japan 220.3bn, Singapore 126.4bn, UAE 78.7bn. **Qatar's economy points east, not west.** `country_of_destinatoion` geocodes straight to a filled world map.

**Three questions:** (1) How concentrated is Qatar's export income in four Asian buyers? (2) Beyond LNG, which product categories are growing, and are they meaningful? (3) Did the 2022 energy price shock change the export *mix* or only the export *value*?

🔧 *Counted in the file today: **922 distinct `hs4` codes** and **1,287 distinct English product
descriptions** (`details`), with a further **18 rows carrying no description at all** — count blanks
as a value and you get the 1,288 a naive `COUNTD` will report. The original "1,287 product
categories" was the description count, not the category count — **`hs4` is the one that means
"category"**, and 922 is the number to quote.*

> 🔧 **The `-copy` slug is not an accidental duplicate — it is a portal-curated frozen snapshot, and that is why this menu uses it.** Checked today: the portal titles it **"Qatar Export Statistics 2019-2024 - for visualisation"**, frozen at **70,324 rows**. The non-`-copy` dataset has meanwhile been **retitled "Qatar Export Statistics 2014-2026" and grown to 142,720 rows**, so the previous revision's "34 MB full version" figure is now low. **Stay on `-copy`:** it is smaller, it is explicitly published for visualisation, and it will still match the figures printed here in November.

**Watch out:** **the column name is misspelled in the source** — `country_of_destinatoion`. That is not your typo. 78 rows have no destination at all in either language, and there are 180 distinct Arabic destination labels for 173 English ones (the Arabic is finer-grained) — group on the English. `value_qr` runs from 20,000 to 5,334,141,015, so use a Top-N filter or a log scale or four bars will eat the chart. Prefer this 17 MB "copy" over the 34 MB full version on a student laptop.

## 9. Government e-services directory (Hukoomi) 🟡

`https://www.data.gov.qa/api/explore/v2.1/catalog/datasets/government-e-services-directory-with-usage-statistics/exports/csv?delimiter=%2C&with_bom=true` → **HTTP 200, 924,323 bytes, 14 Sep 2026**

1,692 rows x 13 columns: every Qatari government online service, which of **65 ministries and agencies** provides it, whether it is Online / Offline / Hybrid, when the page was created and last updated (full ISO-8601 timestamps that Tableau parses without help), and how many people used it (1 – 29,669 users; 1 – 49,979 page views).

**The information-systems option — and the only dataset on this menu where nobody has ever drawn the
chart.** Every other entry here has a published version of its story somewhere; this one does not.
A scatter of `page_views` against `users_by_year` separates the services people find useful from the
ones they bounce off, and **you would be the first person to look.**

**Three questions:** (1) Which ministries have actually digitised and which still route citizens to a counter? (2) 🔧 Which ministries publish **many low-traffic services** versus **few high-traffic ones** — and what does that say about how the portal was built, department by department? (3) Where is the gap between page views and completed users biggest — which services are hardest to use?

> 🔧 *Question 2 was replaced. The previous version asked whether recently-updated pages get more
> traffic than stale ones — which compares a per-row last-updated date against an **undated
> snapshot** total, exactly the apples-to-oranges construction this entry warns against one paragraph
> below. The replacement uses only what the file actually supports.*

**Watch out — a real limitation:** `users_by_year` is a single snapshot figure with **no year dimension attached**, so it cannot be trended. This dataset answers "which" and "how much", never "when". 5 nulls in `service_mode`, 41 in each external URL column. Some titles contain backslash-escaped commas (`Import\, Export`) — an export artefact that shows up in labels.

## 10. Weekly real estate sales bulletin 🔴

`https://www.data.gov.qa/api/explore/v2.1/catalog/datasets/weekly-real-estates-sales-bulletin/exports/csv?delimiter=%2C&with_bom=true` → **HTTP 200, 6,324,305 bytes, 14 Sep 2026**

26,719 rows x 18 columns. Every registered property transaction, 2020-07-05 to 2025-12-31. 8 municipalities, 161 districts, 16 property types.

> 🔧 **It is called a weekly bulletin, but the series currently stops at 31 December 2025.** Checked
> today: the newest `registration_date` in the file is still 2025-12-31 — about 8.5 months old — while
> the portal's own metadata shows it was *republished* on 31 Aug 2026 with the same 26,719 records.
> The portal is reposting unchanged content, not appending transactions. **Do not tell students it is
> "updated weekly"** — they will repeat it in a reflection and be wrong.
>
> **This is quietly good news for the course:** every student downloading in November gets exactly
> the figures printed below, and the whole year-by-year table reproduces to the decimal. Stability is
> worth stating as a feature.

Median price per square metre, computed from the file: **Doha 5,391 → Al Rayyan 3,725 → Al Daayen 3,497 → Umm Slal 3,333 → Al Wakra 2,799 → Al Khor & Al Thakhira 2,636 → Al Shahniya 1,858 → Al Shamal 1,531 QAR.** A clean 3.5x gradient across a country you can drive across in 90 minutes.

Value and volume by year, from the file:

| Year | Deals | Total value (QAR bn) |
|---|---|---|
| 2020 (Jul–Dec only) | 3,818 | 40.6 |
| 2021 | 5,256 | 31.1 |
| 2022 | 4,691 | 33.0 |
| 2023 | 4,005 | 21.4 |
| 2024 | 3,625 | **15.9** |
| 2025 | 4,278 | 19.0 |
| *no date recorded* | 1,046 | 7.7 |

**Qatar sells roughly the same number of properties for a fraction of the money.** Note honestly that **2020 is a half-year** (the file starts 5 July 2020) and still has the highest total — which makes the contrast stronger, and which a student must say out loud rather than quietly comparing a half-year to a full one.

**Three questions:** (1) Did Qatar's property market crash after 2020, or did the *mix* of what is sold change? (2) How big is the Doha-to-north price gradient, and is it widening? (3) Which property types hold value best across the window?

**Why it is 🔴:** (a) **1,046 rows (3.9%) have no `registration_date`** — they vanish silently from every time view, and they are scattered across all 8 municipalities, not one clean block. Add an explicit filter and mention it in the reflection. (b) Outliers are enormous and *real*: `property_value` max is QAR 4.22 **billion**, area max 2,149,236 m². A default `SUM` view is dominated by a handful of land deals — use a median or a filter. (c) Five columns carry transliterated-Arabic slug names with no vowels (`sm_lbldy` = municipality, `sm_lmntq` = district, `nw_l_qr` = property type, `lstkhdm` = usage); they are the Arabic twins of the adjacent English columns — hide them. (d) 289 `district_name` values contain a **non-breaking space** instead of a normal space, which silently splits one district into two entries in a filter list. `municipality_name` is clean of this.

## 11. Qatar's CO₂ emissions per capita 🟡

```
https://ourworldindata.org/grapher/co-emissions-per-capita.csv?country=~QAT&csvType=filtered
```
→ **HTTP 200, 1,910 bytes, 76 rows x 4 columns, 14 Sep 2026.** Our World in Data, CC BY 4.0.
Columns: `Entity`, `Code`, `Year`, `CO₂ emissions per capita`. 1949–2024, zero nulls.
Qatar 2024 = **41.27 t per capita**; 2023 = 40.13 t.

🔧 **This entry is new.** Qatar is routinely first or second in the world on this measure, and the
previous revision held the numbers but never offered the dataset — it appeared only inside a
dead-ends table and a one-line aside. That meant the most charged statistic in Qatari public data was
**reachable, unlisted and unframed**, which in practice means it arrives via a student who found it
alone and wrote 400 words on it without knowing what the number is made of. Better to teach it.

> ### Required framing — the ranking is made by two accounting choices, and both are arguable
>
> Neither of these makes the number *wrong*. Both make it **a choice**, and the choice is the lesson.
>
> **1. Production-based accounting.** The emissions from liquefying Qatar's natural gas are charged to
> **Qatar**, not to the countries that import and burn the gas. Under consumption-based accounting the
> same molecules land on a different country's ledger. Qatar's figure is high partly because Qatar
> does the industrial step and somebody else does the burning.
>
> **2. The denominator is a population that is roughly 85% non-citizen**, much of it a temporary
> workforce. "Per capita" divides a national industrial output by a population whose size is set by
> labour demand. Compare with #4 — the population file — and you can see the denominator moving.
>
> **This is a first-rate lesson in how a denominator and an accounting boundary manufacture a
> ranking**, which is the same muscle as the missing denominator in the accident map (Part 3). It is
> also the entry most likely to be read by someone outside the class. **Any student picking #11 must
> state both caveats in the reflection.** If that feels like a lot to ask, it is exactly the ask the
> course exists to make.

**Three questions:** (1) When did Qatar's per-capita emissions peak, and what was happening in the
economy then? (2) The series runs from 1949 — what does the shape say about the arrival of the gas
industry? (3) If you re-based the figure on citizens only, or on consumption rather than production,
roughly what would happen to the ranking — and what data would you need to do it properly?

> 🚨 **`&csvType=filtered` is not optional.** Without it the same URL returns **HTTP 200 and the
> entire 26,000-row world file** (801,498 bytes) with the country filter silently dropped. See Part 5.
> *(The energy-use sibling needs `&tab=chart` as well — also Part 5.)*

**Watch out:** OWID's per-capita figure (40.13 t for 2023) and the Global Carbon Project's (42.60 t)
differ because they use different population series. **Cite which one you used.** A student who
quotes both interchangeably has demonstrated the entry's own point without meaning to.

---

# Part 3 — Final Project: Qatar hazard data

**"Local Hazard StoryMap": one Qatar hazard, ArcGIS StoryMaps, with a Tableau chart embedded.**

The division of labour that actually works: **Tableau makes the chart from tabular data; ArcGIS StoryMaps carries the map.** This is not a stylistic preference — Tableau Public's *browser* upload accepts only `.xlsx`, `.csv` and `.tsv` (verified in Tableau's own docs, Part 4), so a browser-only student cannot load a GeoJSON into Tableau at all. Put the spatial layer in ArcGIS, where it belongs, and let Tableau do what it is good at.

## Hazard-by-hazard: what exists, and what does not

| Hazard | Verdict | Best data | What it can say about **people** |
|---|---|---|---|
| **Heat** | ✅ Strong | Doha airport monthly weather (tabular); **committed** `hazards/doha-climate-daily-2000-2025.xlsx` | Nothing directly — it is a point reading. Pair with #4 (population by municipality) to ask *who is outdoors in it*. |
| **Dust & visibility** | ✅ Good | Fog/dust/haze day-counts (tabular, and it is the Lab 1 backup) | Nothing directly. One airport station stands in for a whole country. |
| **Air quality (PM10/PM2.5)** | ⚠️ Live API, **snapshot committed** | Open-Meteo air-quality CSV + `hazards/doha-air-quality-hourly-*.xlsx`. **Nothing usable on the national portal.** | Nothing directly — one grid point. Who breathes it is an inference you must label. |
| **Flooding** | ✅ Good *(source changed — see below)* | **committed** `hazards/doha-climate-daily-2000-2025.xlsx`, `rainfall_mm` | Nothing directly. Which districts flood is not in any open Qatari dataset. |
| **Road traffic** | ✅ Strongest of all | Accident microdata + a **pre-baked zone map file in this repo** | The most, and the most dangerous — see the denominator warning below. |
| **Water stress** | 🟡 Usable | Water production, abstraction and losses (tabular) | National totals only. No per-capita, no per-district. |
| **Electricity stress** | ❌ **Do not offer** | Nothing exists at a usable grain — see below | — |

> ### 🔧 The Final Project brief must be amended in the same edit as this menu
>
> The grading sheet lists the allowed hazards as *"heat, dust storms, air quality, flooding, road
> traffic accidents, water/electricity stress."* **Electricity stress has to come off that list** —
> the datasets are 2 to 78 rows (evidence below), and a student who picks it hits a wall in week 5
> with no way back. Heat, dust, air quality, flooding, road traffic and water all survive.
>
> ### 🔧 The "whose story" paragraph — where the answer actually is
>
> The brief requires a *"whose story"* paragraph, and **every hazard file above is an aggregate with
> no people in it** — a station reading, a monthly count, a zone total. That is not a flaw to hide;
> it is the paragraph. Two honest routes, both already in this repo:
>
> 1. **Join the hazard to #4** (population by municipality and age). It is the only file on the whole
>    menu with human beings in it at a geography you can match.
> 2. **Write the missing denominator.** The accident map below has no population at zone level, and
>    saying so — naming the column you would have needed — is a better paragraph than any map.
>
> Grade this paragraph on whether the student **names what their data cannot see**, never on whether
> they found a way to see it.

---

## 🌡️ Heat

**`monthly-weather-data-doha-international-airport`** — **tabular**, ideal for a Tableau embed
`https://www.data.gov.qa/api/explore/v2.1/catalog/datasets/monthly-weather-data-doha-international-airport/exports/csv?delimiter=%2C&with_bom=true` → **HTTP 200, 3,071 bytes, 14 Sep 2026**

84 rows x 6 columns = 7 complete years, 2018-01 to 2024-12. `month` is ISO `YYYY-MM`, so text sort = chronological sort. Pure ASCII, zero nulls. Average monthly maximum runs 21.4 °C to **43.4 °C** (June 2019); the *average monthly minimum* peaks at **34.3 °C** — in a Qatari July the overnight low is hotter than a hot English afternoon. That single fact is a whole StoryMap section.

**Use its one real error deliberately.** `msl_pressure_hpa` for 2019-06 is **10008.0** — a missing decimal point for 1000.8. Every other value sits between 995.6 and 1028. It will blow up any pressure chart's y-axis. Ninety seconds of class time, and the lesson sticks.

**`monthly-temperature-and-relative-humidity-statistics-qatar`** — **tabular**, longer series
→ **HTTP 200, 56,016 bytes, 14 Sep 2026** · 528 rows, 132 consecutive months, 2014–2024. 🔧 **One null in `value`** (the only one in the file).
**Two traps, both confirmed in the file:** `month` has **23 distinct values**, not 12, because it mixes `Jan` with `January` — use the clean `date` column instead. And `climate_indicator` has three values where it should have two: `Relative Humidity` and `Relative Humidity %` are the same thing under two labels. It is long/tidy, so one `value` column means temperature *or* humidity depending on the indicator — filter first or you will average degrees with percentages.

**NASA POWER daily, Doha** — **live API, no key**, and the only source here with daily grain
```
https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M,T2M_MAX,T2M_MIN,RH2M,PRECTOTCORR&community=RE&longitude=51.53&latitude=25.29&start=20000101&end=20251231&format=CSV&header=false
```
→ **HTTP 200, 367,299 bytes, 9,497 rows x 8 columns, 14 Sep 2026.** 🔧 The window is **fixed** (`start=20000101&end=20251231`), so it returns the same 9,497 rows forever — good for grading, but **the series stops at 31 December 2025**, which a student writing "current" in November 2026 needs to know.

> 🔧 **Prefer the committed copy: [`hazards/doha-climate-daily-2000-2025.xlsx`](hazards/doha-climate-daily-2000-2025.xlsx).** Same data, plus a **real `date` column** (so no `MAKEDATE([YEAR],[MO],[DY])` as a beginner's first act) and plain-English column names. It also carries `rainfall_mm`, which is now the flooding dataset. The live URL above stays the "get your own point" route — the lat/lon is still editable.

**`&header=false` is what makes it usable** — without it the response carries 13 junk lines above the real header. With it, line 1 is `YEAR,MO,DY,T2M,T2M_MAX,T2M_MIN,RH2M,PRECTOTCORR`. Checked directly: **zero nulls and zero `-999` sentinel values** across all 9,497 rows. Max recorded T2M_MAX is **47.71 °C**; **246 days since 2000 exceeded 45 °C**. The lat/lon is editable in the URL, so every student can pick a different Qatar point (Al Khor, Dukhan, Mesaieed) and get their own file.

> **An honesty note this course should insist on.** The 45 °C day-count per year is *noisy and does not draw a clean warming line*: 2017 had 26 such days, 2021 had 22, 2024 had 20 — but 2005 had 1 and 2014 had 2, and the year-to-year sequence jumps around. A student who plots it and writes "Qatar is getting hotter" has over-claimed. The honest version names the smoothing, uses a longer baseline, or argues from the monthly minima (which move much more steadily) instead. **This is the best built-in over-claiming trap in the whole menu — use it.**
>
> Also: POWER is **MERRA-2 reanalysis model output**, not a thermometer at Doha airport. A write-up must say "reanalysis", not "measured".

## 🌪️ Dust and visibility

**`fog-dust-storm-and-haze-doha-international-airport-2011-2024`** — **tabular**, and already cleaned in this repo at `lab1/fog-dust-haze-doha-2011-2024.xlsx`. Full profile in Part 1. 168 rows, 14 complete years. **Haze 46–108 days a year; dust storms 0–8.** The hazard everyone names is the rare one.

## 💨 Air quality (PM10, PM2.5, dust concentration)

**There is no usable numeric air-quality data on www.data.gov.qa.** Verified on 14 Sep 2026 by querying the catalogue: **11 air-quality datasets, every one 120 rows or fewer** (7, 10, 24, 50, 50, 50, 50, 50, 56, 120). The largest, `annual-average-of-air-quality-doha-city0` (120 rows), was downloaded and opened: **it contains no numeric measure at all** — the pollutant column is paired with a three-level text `status` (`Clean` / …), so there are no PM10 or NO₂ numbers to plot.

**The one live route that works — Open-Meteo air quality (free, no key, CAMS reanalysis):**
```
https://air-quality-api.open-meteo.com/v1/air-quality?latitude=25.2854&longitude=51.5310&hourly=pm10,pm2_5,dust&past_days=92&timezone=Asia%2FQatar&format=csv
```
→ **HTTP 200, 77,598 bytes, 2,328 hourly rows x 4 columns, 14 Sep 2026.** Sample verified: PM10 29.5 µg/m³ at the overnight low.

**The trap, confirmed by reading the bytes:** the CSV has **three junk lines above the header** — line 1 is a metadata header (`latitude,longitude,elevation,…`), line 2 its values, line 3 is **blank**, and the real header (`time,pm10 (μg/m³),…`) is on line 4. In Tableau's text connector, use **Text Options → Start reading at row 4**. Column names contain `μ` and `³`; they survive fine but look odd, so rename them.

### 🔧 For grading, pin the window — and pin it to the past

The default `&past_days=92` is a **rolling** window, so two students downloading on different days
get different data. Add `&start_date=…&end_date=…`. **But the pinned window must end in the past.**
Tested on 14 Sep 2026:

| Request | Result |
|---|---|
| `&start_date=2026-06-15&end_date=2026-09-13` (past) | ✅ **HTTP 200, 72,916 bytes, 2,184 hourly rows** |
| `&start_date=2026-11-01&end_date=2026-11-10` (future) | ❌ **HTTP 400** — `{"reason":"Parameter 'start_date' is out of allowed range from 2013-01-01 to 2026-09-20","error":true}` |

The allowed range is **2013-01-01 to roughly today + 6 days**. A TA who writes a November window into
the handout in late October gets a hard failure — **and it arrives on the student's laptop, not on
theirs.**

> ### 🔧 Better for a course: do not have 25 remote students hit a live endpoint at all
>
> Lab 2 is **9 November, on Zoom**, where you cannot reach across and fix a laptop. A pinned snapshot
> is already committed:
> **[`hazards/doha-air-quality-hourly-2026-06-15-to-09-13.xlsx`](hazards/doha-air-quality-hourly-2026-06-15-to-09-13.xlsx)**
> — 2,184 rows, **the three junk lines already stripped** (so no hunting for *Text Options → Start
> reading at row 4* over a video call) and the `μg/m³` column names already renamed.
>
> **Live fetch is the lesson; the committed file is what keeps the room moving when it isn't.**
> Demonstrate the live call, hand out the file.

⚠️ This endpoint is the Lab 2 dependency (ArcGIS live air quality). **Re-test it in the week before
9 November — and re-test the *pinned* form, not just the default**, since that is the one the handout
will use.

## 🌊 Flooding

### 🔧 The portal's rainfall file was removed from this menu. Use the committed NASA POWER file.

**File: [`hazards/doha-climate-daily-2000-2025.xlsx`](hazards/doha-climate-daily-2000-2025.xlsx)**
(413 KB, 9,497 rows x 9 columns, 2000-01-01 to 2025-12-31, **zero nulls**)
Built from the NASA POWER URL below; what changed and why: [`hazards/PROVENANCE.md`](hazards/PROVENANCE.md)

The same file carries the heat story (`temp_max_c`) and the flooding story (`rainfall_mm`), so a
student who picks either hazard loads one file and never touches a second.

**Read out of the file on 14 Sep 2026:**

- **8,441 of 9,497 days (88.9%) record zero rainfall.**
- **Only 30 days in 26 years delivered 10 mm or more.**
- Wettest day: **46.41 mm on 25 November 2015.** Wettest month: **January 2023, 105.0 mm.**
- Annual totals swing from **2.2 mm (2001) to 190.4 mm (2023)** — a **86-fold** spread between the driest and wettest year in the series. 🔺 *(An earlier draft gave the low as "7.0 mm (2021)". 7.0 mm is 2021's true total, but it is not the minimum: 2001 recorded 2.2 mm. Recomputed from the committed file on the verification pass.)*

Almost all of Qatar's rain arrives on a handful of days. **That shape, plotted, *is* the flooding
argument** — and here the zeros are real values for a desert, not placeholders.

**Two honesty notes a StoryMap must carry:** POWER is **reanalysis model output**, not a rain gauge —
write "reanalysis", not "measured". And the window is **fixed and stops at 31 December 2025**; do not
call it "current" in November 2026.

<details>
<summary><strong>🔧 Why <code>monthly-environmental-indicators-doha-city</code> was removed — read this before anyone puts it back</strong></summary>

The link is not broken. `…/monthly-environmental-indicators-doha-city/exports/csv?delimiter=%2C&with_bom=true`
→ **HTTP 200, 68,264 bytes, 540 rows x 9 columns, 2014–2022, zero nulls, re-verified 14 Sep 2026.**
The **content** is what fails, in two ways.

**1. The headline figure in the previous revision was the wrong indicator.** It said Qatar's rainfall
"arrives in violent single-month bursts — the file's maximum is **84 mm in one month**." It is not.
**84.0 is the maximum *relative humidity*, in percent** (January 2014). The actual rainfall maximum is
**51.3 mm** (December 2015). The figure was the global maximum of the long-format `value` column
across all three indicators — i.e. this document committed the exact error it warned about in the
very next sentence. A caveat you do not apply to your own numbers is decoration.

**2. Far worse: the rainfall series is empty for seven of its nine years.** Annual rainfall sums read:

| 2014 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 |
|---|---|---|---|---|---|---|---|---|
| 52.4 | 114.5 | **0.0** | **0.0** | **0.0** | **0.0** | **0.0** | **0.0** | **0.0** |

**98 of the 108 rainfall cells are literal zeros, not nulls.** They will not drop out of a view —
they plot as a flat line along the axis, indistinguishable from a real measurement. A student who
picks flooding here builds a StoryMap on a premise their own chart contradicts: that Qatar had no
rain for seven consecutive years.

**Usable rainfall exists only for 2014 and 2015.** If you ever need this file for its *temperature*
or *humidity* columns, those are fine — but treat 2016–2022 rainfall as **missing, not dry**, and
say so on the chart.
</details>

## 🚗 Road traffic — the strongest hazard story available, and the only working Qatar choropleth

### Ready to use, already in this repo

| File | What it is |
|---|---|
| [`geo/accidents-by-zone-and-year-2020-2025.csv`](geo/accidents-by-zone-and-year-2020-2025.csv) | **543 rows** x 5 cols, 33 KB. `zone`, `zone_name`, `municipality`, `year`, `accidents`. **Built by me on 14 Sep 2026** from the 1,000,500-row microdata using the portal's own server-side aggregation, then joined to the official boundary names. 🔧 **543, not the 546 that 91 zones x 6 years implies — zone 99 has only three of the six years.** Filter it out or say so; otherwise a per-zone line chart shows zone 99 silently dropping to nothing. |
| [`geo/qatar-zones-91.geojson`](geo/qatar-zones-91.geojson) | 91 zone polygons, 175 KB, EPSG:4326. Props: `adm2_name`, `adm2_pcode`, `adm1_name`. |
| [`geo/qatar-municipalities-8.geojson`](geo/qatar-municipalities-8.geojson) | 8 municipality polygons, 123 KB, EPSG:4326. Props: `adm1_name`, `adm1_pcode`. |
| [`geo/qatar-zone-to-municipality.csv`](geo/qatar-zone-to-municipality.csv) | 91 rows. Zone number → zone name → municipality → p-code. The join key for anything zone-based. |

**Boundary provenance:** HDX / OCHA Common Operational Datasets for Qatar (`cod-ab-qat`, sourced from Qatar's Planning & Statistics Authority), `https://data.humdata.org/dataset/6a84f3b8-41cd-4769-a61f-6dbd5f61bd05/resource/1955adf8-4e4a-4a87-b3f0-0fbe6e761ca9/download/qat_admin_boundaries.geojson.zip` → **HTTP 200, 27,047,015 bytes, 14 Sep 2026** (needs a browser User-Agent). Licence **CC BY-IGO**. The raw archive bundles ADM0–ADM3 at full coastline resolution — the ADM1 layer alone is 5.1 MB for 8 polygons — so I simplified with `ogr2ogr -simplify 0.0008` and kept only the two name fields. Feature counts verified after simplification: 8 and 91.

**The key insight: join on the zone NUMBER, never on a municipality name.** I verified this end to end on 14 Sep 2026:

- The microdata's `zone` column takes **91 distinct values**. The boundary file has **91 zones**. **Every accident zone exists in the boundary file and every boundary zone has accidents — zero orphans in both directions.**
- Only **929 of 1,211,799 weighted accidents (0.08%)** have a null zone.
- **A number cannot be misspelled.** Every name-based join in Qatar's open data is a spelling minefield (Part 5); this one is not.

Rolled up to municipality, 2020–2025:

| Municipality | Accidents |
|---|---|
| Doha | 583,295 |
| Al Rayyan | 357,314 |
| Al Wakra | 91,016 |
| Al Daayen | 55,127 |
| Umm Slal | 54,495 |
| Al Khor and Al Thakhira | 35,773 |
| Al Sheehaniya | 29,401 |
| Al Shamal | 4,449 |

The worst single zone is **zone 56 — Fereej Al Asiri / Al Maamoura / Bu Hamour / Mesaimeer / Ain Khaled, with 121,023**, followed by zone 55 (73,460) and zone 57, the Industrial Area (71,262).

> ### 🔧 Required framing: this map has no denominator, and that is not a detail
>
> `accidents-by-zone-and-year-2020-2025.csv` holds **raw counts**. A count choropleth with no
> population, vehicle-count or road-length denominator is the single most common lie in thematic
> mapping, and this one has a specific edge: **zone 57 is the Industrial Area, where a large share of
> Qatar's labour force lives.** An undenominated map shades labour housing as the most dangerous
> ground in the country — which is a claim about the residents, not about traffic exposure. A zone
> with a motorway interchange and nobody living in it will also top the list, for the opposite reason.
>
> **The honest denominator is genuinely unavailable.** The accident file has no population; the
> population file (#4) is by municipality, not by these 91 zones. There is no open Qatari dataset that
> closes the gap.
>
> **So make it a required, named step rather than a silent hazard.** Every student who builds this map
> writes one sentence, in the StoryMap, in their own words:
>
> > *"This map shows **where accidents happen**, not **where it is dangerous**. I do not have a
> > population or traffic-volume figure at zone level, so I cannot turn these counts into a rate.
> > What I would need is ___."*
>
> That sentence is also the cleanest available answer to the Final Project's **"whose story"**
> requirement. The word *denominator* should be said out loud at least once in this course, and this
> is the place.

### The underlying microdata, if a student insists

`https://www.data.gov.qa/api/explore/v2.1/catalog/datasets/accident/exports/csv?delimiter=%2C&with_bom=true` → **HTTP 200, 68,089,143 bytes, 1,000,500 rows x 16 cols.** It fits inside Tableau Public's 15M-row cap, but the extract build and the publish upload will consume a whole lab on campus wifi. **Do not hand this out.** Use the portal's server-side aggregation instead — this is the exact request that produced the repo file, and it returns **18,862 bytes**:
```
…/accident/exports/csv?delimiter=%2C&with_bom=true&select=zone,accident_year,sum(total)%20as%20n&group_by=zone,accident_year&limit=-1
```
→ **HTTP 200, 14 Sep 2026.** (Note `accident_year` comes back as a full timestamp, `2025-01-01 00:00:00+00:00`.)

**Two things about the microdata nobody should rediscover mid-project:** `total` is a **pre-aggregated row weight** — use `SUM(total)`, never a count of rows. And `weather` and `road_status` are ~99.9% null while `accident_reason` is ~98.6% null, so **never promise a "crashes by weather" chart**.

**Companion, tabular, no map needed:** `traffic-accidents-by-cause-of-the-accident-and-cases`
→ **HTTP 200, 56,793 bytes, 14 Sep 2026** · 565 rows, 37 named causes (`Overtaking`, `Wrong-way driving`, `Violating traffic lights`, `Neglect and lack of attention`) x 4 outcomes x 5 years (2019–2023), values 0–3,477, exactly 1 null. Which behaviours *kill*, as opposed to which merely dent cars. Also **excellent as a 🟢 Project 2 option.**

## 💧 Water stress

**`water-production-abstraction-losses-and-uses`** — **tabular**
→ **HTTP 200, 21,581 bytes, 14 Sep 2026** · 185 rows x 4 columns, 2009–2023, zero nulls, units are million m³.

A country with essentially no fresh surface water, running on desalination and a depleting aquifer. 14 water-balance line items including `System volume input (primarily desalinated water)`, `Total abstraction from groundwater`, `Total reuse of treated sewage water` and `Total real water losses`. Network losses read **39.80 (2009) → 21.78 (2016) → 40.80 (2021) → 37.68 (2023)** — losses fell for seven years and then went back up. Why is a real question.

**Two frictions:** item names carry footnote markers baked into the text (`Total real water losses [2]`, `Total abstraction from groundwater [4]=[5]+[6]+[7]+[8]`), which look broken on an axis and need renaming. And it is long format, so filter to 2–3 items or you get 14 overlapping lines.

## ⚡ Electricity stress — **drop this from the hazard menu**

There is nothing to build on. Searching the portal on 14 Sep 2026 for "electricity" returns 57 datasets; the ones actually about electricity supply and demand are **2 to 78 rows** (`number-of-electricity-customers-and-annual-growth-rate` has **6 rows**; `electricity-cables-laid-by-voltage-level-rkm` has 8). A student cannot build three interactive views on six rows.

The one promising-looking exception is a trap worth knowing about: `cooling-energy-consumption-and-savings-by-municipality-and-economic-activity-mwh` has 112 rows and covers district cooling by municipality — genuinely relevant to heat and electricity. Its CSV is **6,584,892 bytes for 112 rows** (HTTP 200, 14 Sep 2026) because the portal **inlines the full municipality polygon into every single row**. It is also wide-format (one column per economic activity) with a `health` column that imports as text. Not student-ready. *Rule: never hand out the CSV of a portal dataset that has a `geo_shape` field — use `/exports/geojson`, or `&select=` the geometry away.*

🔧 **If a student is set on energy, send them to the international route — here is the URL, tested today.**
The previous revision named two sources and gave a working address for neither; that is the one thing
this document tells you never to do.

```
https://ourworldindata.org/grapher/energy-use-per-capita.csv?tab=chart&country=~QAT&csvType=filtered
```
→ **HTTP 200, 1,548 bytes, 61 Qatar rows, 1965–2025, 4 columns** (`Entity`, `Code`, `Year`,
`Total energy supply`). Verified 14 Sep 2026.

🔺 **Two corrections from the verification pass.** (1) It is **61** rows, not 60 — 1965 to 2025
inclusive. (2) **This URL answers `301` first**, redirecting to
`ourworldindata.org/grapher/energy-mix.csv?metric=per_capita&source=total&tab=chart&country=~QAT&csvType=filtered`.
A browser follows that invisibly, so a student clicking the link is fine — but a TA re-checking with
`curl` **must pass `-L`**, or they will see `HTTP 301, 0 bytes` and report a dead link that is not
dead.

> 🚨 **`&tab=chart` is not optional, and this is a new trap.** Without it — i.e. the obvious
> `?country=~QAT&csvType=filtered` — the endpoint returns **HTTP 200, 6,221 bytes containing all 195
> countries**, Afghanistan to Zimbabwe. The country filter is silently dropped because this grapher's
> default tab is a *map*, which has no country selection to honour. It is the same class of failure as
> the missing `csvType=filtered` in Part 5, one level deeper. `per-capita-energy-use` is an alias with
> identical behaviour; `primary-energy-consumption-per-capita`, `primary-energy-cons-per-capita` and
> `energy-use-per-person` all **404**.

🔺 **For the Global Carbon Project fuel-mix file, here is the Zenodo record — the previous revision
named a filename with no address, which is the one thing this document tells you never to do.**

```
https://zenodo.org/records/14106218/files/GCB2024v18_MtCO2_flat.csv?download=1
```
→ **HTTP 200, 3,128,569 bytes**, tested 14 Sep 2026. Record: *"The Global Carbon Project's fossil
CO2 emissions dataset"*, `zenodo.org/records/14106218`. Qatar 2023 reads **115.711814 MtCO₂ total,
of which gas 99.691457, and 42.597628 t per capita** — read out of the file, not off the page.

The per-capita numbers live in a **`Per Capita` column inside that same file**; there is no separate
per-capita file in the v18 record (the widely-cited `GCB2024v18_percapita_flat.csv` **404s** — only
its `_metadata.json` exists). A standalone `GCB2024v17_percapita_flat.csv` *does* exist, in the
**earlier** record `zenodo.org/records/13981696`. Header, verbatim:
`"Country","ISO 3166-1 alpha-3","UN M49","Year","Total","Coal","Oil","Gas","Cement","Flaring","Other","Per Capita"`.

---

# Part 4 — Tableau platform notes for the TA

Everything here was read off Tableau's own live pages on **14 September 2026**. Where I could not verify something, it says so.

> ### 🔧 If you re-check these links and get 403, you are probably sending a browser User-Agent
>
> `www.tableau.com` sits behind Akamai, and its bot rules are **counter-intuitive**. Re-tested today,
> all four pages this section cites:
>
> | Request | Result |
> |---|---|
> | Plain `curl` (default User-Agent) | ✅ **HTTP 200** — `/academic/students` ≈130.0 KB · `/academic/teaching` ≈159.6 KB · `/mapdata` **365,003 b** · `/products/techspecs` ≈197.4 KB. 🔺 *Re-confirmed on the verification pass; the three marketing pages drift by a byte or two between fetches, so do not treat their sizes as fingerprints. `/mapdata` was byte-identical, and the Qatar row was re-extracted from that fetch — see the geocoding table at the end of this Part.* |
> | `curl` **spoofing a full browser** (Chrome UA + `Accept` + `Accept-Language`) | ❌ **HTTP 403**, ~374–389 b Akamai "Access Denied" |
>
> **A spoofed browser header set is what gets blocked**, because the headers claim a browser and the
> TLS/HTTP fingerprint does not match one. An honest scripted client passes. A real browser on campus
> passes. **So these pages are not dead and the audit trail does reproduce** — just do not dress your
> script up as Chrome. *(Every `help.tableau.com` page cited below is HTTP 200 unconditionally.)*

## The headline: the free student *Desktop* licence is gone

From Tableau's own Students FAQ (`https://www.tableau.com/academic/students` → **HTTP 200**):

> *"The Tableau for Students program has shifted over to providing free software through **Tableau Desktop Public Edition**. While the products are similar in visualization capabilities, the process to get a free license is now much easier. Now, learners beyond the traditional classroom such as part-time learners and apprentices can access the software."*

**There is no licence application form, no proof-of-enrolment upload, no approval queue for students any more.** University IT pages all over the web still describe the old one-year student licence; they are stale. Do not build a pre-class task around "apply for a student licence".

The same FAQ also states, and it matters if you take the Cloud route below: *"Tableau Desktop: Public Edition is unable to publish to Tableau Cloud, and you can only publish to Tableau Public."*

## Which Tableau, for this course

**Run Lab 1 in the browser on Tableau Public. Zero installation.** It mirrors Lab 0's philosophy exactly, it works on any laptop in the room, and it eliminates install-day failure entirely.

Two different things share the name "Tableau Public" — keep them apart in the handout:

| | **Web authoring** (recommended) | **Desktop Public Edition** (optional) |
|---|---|---|
| Install | none, browser only | free download, no licence key, no expiry |
| Data it accepts | **`.xlsx`, `.csv`, `.tsv` only**, 1 GB max upload, plus Google Drive and OData | Google Sheets, JSON, Excel, OData, PDF, **Spatial files (Shapefile, KML, GeoJSON, MapInfo)**, SAS/SPSS/R files, CSV, Web Data Connector. No databases. |
| Save locally | **No** — File > Save publishes to your profile | **Yes** — File > Save As > `.twbx` |
| Stories & dashboards | Yes — worksheets, dashboards and **stories** all work | Yes |

*(Web-authoring file types: `help.tableau.com/current/pro/desktop/en-us/creator_connect.htm` → HTTP 200, "Tableau supports uploading Excel or text-based data sources (.xlsx, .csv, .tsv) directly in your browser… The maximum file size you can upload is 1 GB." Desktop connectors and OS support: `https://www.tableau.com/products/techspecs` → HTTP 200.)*

**The practical consequence for the Final Project:** a GeoJSON cannot be uploaded through the browser. If a student wants a Qatar polygon map *inside Tableau*, they must install Desktop Public Edition. Otherwise — and this is the recommended design — **the map lives in ArcGIS StoryMaps and Tableau supplies the chart.**

Limits, from the Tableau Public FAQ (`help.tableau.com/current/pro/desktop/en-us/public_faq.htm` → HTTP 200): **15 million rows per workbook**, **10 GB of profile storage**, extract-only (no live connections). Nothing on this menu comes close.

## ⚠️ Privacy — disclose this to students before they publish

Tableau Public is the public internet. In Tableau's own words:

- FAQ: *"Workbooks and data published to your Tableau Public profile are **not private and are freely accessible to anyone**."*
- FAQ, on the Hidden tab: *"Anyone who knows (or stumbles across) the URL for the viz can see it, so be sure not to use this service for data that isn't meant for sharing."*
- FAQ, on downloads: *"**By default, any Tableau Public viz as well as the underlying data can be downloaded** by clicking the Download link in the lower right corner."* (Togglable per viz, and settable as a profile default.)
- Data Policy (`public.tableau.com/app/data-policy`, fetched via a reader proxy on 14 Sep 2026 because the page is a JavaScript app): *"Any data published may also be used by Tableau or other third parties to **train AI models**."*

**The data itself is not sensitive** — it is Qatari government open data. The exposure is the **student's name and work product**, permanently, on a searchable public profile. Some students, and some families, will object, and they are not being unreasonable.

**Three things to do about it:**
1. **Minute 2 of Lab 1, before anyone touches data:** everyone sets the profile option *"When Saving… set my vizzes to hidden"*. Hidden vizzes are still fully gradeable, because the URL works for anyone holding it.
2. Say the four bullets above out loud. Do not bury them in a handout.
3. Offer an opt-out: a `.twbx` submitted directly via Desktop Public Edition, or the Tableau Cloud site below.

## Tableau for Teaching — what to request, and when

Request at **`https://trailhead.salesforce.com/tftlicenses`** → **HTTP 200, 14 Sep 2026** (sign in with the school-issued email). Proof required: full name, institutional affiliation, current year — a public instructor profile page (must not be behind a login), a course syllabus, or a redacted letter of employment. Escalation: `tft@tableau.com`.

Four free, renewable offerings, with the delivery times **quoted verbatim from the Tableau for Teaching FAQ** (`https://www.tableau.com/academic/teaching` → HTTP 200):

| Offering | What it is | Lead time (Tableau's own words) |
|---|---|---|
| **Individual instructor licence** | Tableau Desktop + Prep Builder + eLearning, 1 year, 2 devices | *"within 5-7 business days of the request date"* |
| **Student Course License** | *"A bulk classroom license requested by the instructor… One key with multiple activations for number of students in course."* Duration: length of course. Does **not** include eLearning. | *"approximately one week before the course start date as indicated on the online request form"* |
| **Lab License** | Campus machines. *"One key with multiple activations (max 2,000)… Not to be downloaded on personal machines, shared devices only."* | *"by the Date needed by indicated on the online request form"* |
| **⭐ Tableau Cloud Site** | *"A cloud-based workspace for instructors and students to collaborate… 100 seats that instructors can subscribe students to via email address… Perks: Works on any device (Linux, Chromebooks, iPad, etc.) and no download required."* One active site per year. | *"by the Date needed by indicated on the online request form"* |

**The trap, quoted from the same FAQ:** *"if the indicated 'Date needed by' is the day you submit the request, or in the past, you will instead receive the license(s) within 5-7 business days of the request date."* A carelessly-filled form in late October could deliver **after** the 31 October lab.

### Recommended request, to submit now (mid-September 2026)

In one sitting at `trailhead.salesforce.com/tftlicenses`:
1. **Individual instructor licence** — fastest, 5–7 business days, unblocks you building lab materials.
2. **Tableau Cloud Site**, "Date needed by" = **20 October 2026**. Cloud content is **not public**, which answers the entire privacy problem above, and it works on Chromebooks and iPads with no download. 100 seats covers 25 students with room to spare. Cost: you become site admin.

   > 🚨 **But it forecloses the embed, so it cannot be the lab default.** A Tableau **Cloud** viz
   > requires authentication and **will not render inside a public GitHub Pages page** — which is
   > Module C, the second half of this lab's own title. The previous revision called Cloud "the
   > sleeper option" without noticing that it breaks the other half of the lab.
   >
   > **The trade-off, stated plainly: Cloud solves privacy and forecloses public embedding. Tableau
   > Public allows embedding and exposes the student's name.** Keep **Tableau Public as the lab
   > default**; offer Cloud as the **opt-out** for students who object to a public profile — they do
   > Module C against a classmate's public viz, or skip it and submit the Tableau half only.
3. *(Optional)* **Student Course License**, "Date needed by" = **24 October 2026**, as a Desktop fallback.

**Contingency:** if the Cloud site does not arrive, Tableau Public loses nothing pedagogically — only the privacy benefit. The lab is safe either way. **Do not make the lab depend on any approval queue.**

## What students must do before 31 October

**One task, and it depends on no approval from anyone:**

> Create a free Tableau Public account at `public.tableau.com` and confirm you can sign in. Do it **at least a week early**, and check your spam folder.

Two caveats that will bite someone, both from the Tableau Public FAQ:
- The **activation email has a nominal 48-hour window** (accounts are still recoverable afterwards via Forgot Password).
- Activation emails are regularly eaten by institutional firewall filters. Tableau's own advice is to retry *"from a different device… and on a different network"*.

**Have 2–3 spare pre-made accounts ready for lab day.** Someone will not have one.

> ### 🚨 🔧 As written, this requirement reaches **no student**. Fix the delivery, not the wording.
>
> Do the arithmetic. This says "at least a week early", i.e. **by ~24 October**. The class does not
> physically meet until **Tuesday 27 October** — *after* that window has already closed. And the only
> pre-class communication that exists is
> [`../lab0-under-the-hood/PRE-CLASS.md`](../lab0-under-the-hood/PRE-CLASS.md), which is **100% about
> GitHub**; `grep -i tableau` across the entire Lab 0 folder returns only instructor-facing forward
> references. So this requirement currently lives in a TA-facing survey document and is read by
> nobody who needs it.
>
> ### The fix: add it to `PRE-CLASS.md` as a second task under the same 26 October deadline
>
> One task, one email, one deadline, one Canvas post. `PRE-CLASS.md` **already** explains, for GitHub,
> every single trap that applies identically to Tableau:
>
> | `PRE-CLASS.md` already teaches (GitHub) | Applies unchanged to Tableau Public |
> |---|---|
> | "will not let you create anything until you click a link in an email" | ✅ same |
> | "the link expires after 24 hours" | ✅ same — Tableau's is a nominal **48 hours** |
> | "university mail filters put it in Junk more often than you would expect" | ✅ same — Tableau's own advice is to retry on a different network |
> | "twenty-five people signing up from the same campus wifi ... can start refusing them" | ✅ same reason to sign up from home |
> | "sign in once on the laptop you are bringing" | ✅ same |
>
> Mirror its structure and tone: a short *why now*, the signup link, the **verify your email** step as
> the one that actually matters, and a one-line Canvas post. Add the Tableau username to the existing
> "tell us your username" submission so you can spot failures on the Monday night.
>
> **Also ask, in the same message: what laptop and what OS version are you bringing?** You need it for
> the next section.

## Hardware and OS — three specific students to plan for

From `tableau.com/products/techspecs` (HTTP 200, 14 Sep 2026):

- **Mac:** macOS **Ventura, Sonoma, Sequoia, Tahoe** (Tahoe needs Tableau 2026.1+). **Apple Silicon is listed as a natively supported processor** — no Rosetta, no workaround needed, nothing to warn students about.
  ⚠️ **macOS Monterey (12) and older are NOT supported.** A student on an older MacBook **cannot install** Desktop Public Edition. They go browser-only — which is fine, because that is the plan anyway.
- **Windows:** 8/8.1, 10 (x64), 11. CPU must support SSE4.2 and POPCNT (any machine from the last decade; it breaks on VMs with Processor Compatibility mode enabled).
- **The Chromebook student:** ✅ **fine.** There is no Linux build, so installation is impossible — but browser web authoring in Chrome on ChromeOS works, and the Tableau for Teaching Cloud site explicitly lists Chromebooks. Browser-only is the plan.
- **The iPad-only student:** ❌ **cannot author.** Verified in Tableau's web-authoring docs (`help.tableau.com/current/pro/desktop/en-us/web_author_build_view.htm` → HTTP 200): *"Editing a view on a mobile device, either with a mobile web browser or the Tableau Mobile app, is not supported. You must use a desktop web browser."* An iPad can **view** vizzes fine. If someone turns up with only an iPad, they need a loaner or a lab machine. **Plan for at least one.**

## What gets submitted, and how to grade it without a licence

**Primary deliverable: the Tableau Public URL.** It is fully gradeable with zero software — any browser with JavaScript, no plug-ins. You open the link, click the filters, and assess the interactivity directly, which *is* the learning objective for "≥3 interactive views". A screenshot cannot demonstrate interactivity. **Insist on the live link.**

**Project 2 submission bundle:**
1. The Tableau Public viz URL (or Cloud URL, if the site lands).
2. The 300–500-word reflection as a document.
3. **Optionally the `.twbx`**, as an archival backstop — students can and do delete vizzes, and a dead URL at grading time is a bad afternoon. Note the `.twbx` needs Tableau to open, so it is an archive, not the grading surface.

Hidden vizzes remain gradeable (the URL still resolves). Deleted ones do not — hence the `.twbx`.

## Arabic text — one hard rule, and one thing that works fine

Best available evidence is a peer-reviewed IEEE VIS / TVCG paper that systematically evaluated seven authoring tools including Tableau: Alebri, Rakotondravony, Bechqito, Panagiotidou, Harrison, Aldhanhabi & Alkaabi, *"Designing Within the Lines: Practitioners' Perspectives and Visualisation Tool Evaluation in the Arabic Context"*, arXiv **2607.24571** — PDF fetched **HTTP 200, 406,287 bytes, 14 Sep 2026**, text extracted and read.

**✅ Arabic *text* is fine.** *"Overall, the seven visualisation tools had better Arabic text rendering than Eastern numerals rendering. Labels, headers, and other Arabic rendered correctly in most cases."* Tableau is not among the tools the paper faults for broken Arabic text (that was Datawrapper and Flourish, in maps). Tableau's own specs independently state it *"is Unicode-enabled and compatible with data stored in any language."*

**❌ Eastern-Arabic numerals (٠١٢٣٤٥٦٧٨٩) are an unfixable dead end.** *"Tableau and Power BI treated numbers as text."* And, decisively: *"Manual attempts to change the data type (e.g. in Tableau) were rejected by the tool, indicating limited flexibility in handling Arabic inputs."* **A measure column written in Eastern-Arabic digits imports as a string and cannot be coerced to a number.** That is not a formatting annoyance; it kills the chart.

> **The rule this imposes on every dataset in this menu: Western digits (0–9) in every numeric column.** I checked every file recommended in this document for Eastern-Arabic digits (`U+0660–U+0669`, `U+06F0–U+06F9`). **None contain any.**

**RTL layout is not supported as a default** — the paper finds RTL mirroring across tools is *"partial, heterogeneously labeled, and never default"*. An Arabic-language chart will render with LTR axis conventions. **Tableau's UI ships in 15 languages and Arabic is not one of them** (English US/UK, French x2, German, Italian, Spanish, Brazilian Portuguese, Swedish, Japanese, Korean, Traditional/Simplified Chinese, Thai, Dutch).

**Practical instruction for the lab:** hand out `.xlsx`, not `.csv`. Excel stores text as Unicode natively, so encoding detection, BOM handling and delimiter guessing all vanish as failure modes. (A mis-detected CSV *is* recoverable — Tableau's Text File Properties dialog lets you override both the separator and the character set, `help.tableau.com/current/pro/desktop/en-us/examples_text.htm` → HTTP 200 — but finding that dialog is far beyond a first-lab student. The `.xlsx` makes the question moot.)

**Worth mentioning in the ethics thread:** Tableau recognises **"Palestine"** as a country entry, where some other tools silently convert it to "West Bank and Gaza". Mapping tools embed political choices. 🔧 **This is not a footnote — it is a live classroom moment**, because dataset #6 (QFFD foreign assistance) auto-geocodes to exactly that map and a student will build it in the room. **The framing, the TA's prepared line, and the grading rule now live with the dataset, in Part 2 #6.** Read that before teaching this.

## Are maps of Qatar realistic? Yes — and here is the definitive answer

**I was able to read Tableau's official country-by-country geocoding table** (`https://www.tableau.com/mapdata` → **HTTP 200, 365,003 bytes**) and 🔧 **re-read and re-extracted it on 14 Sep 2026 to confirm the table below is still exactly what the page says.** *(Earlier passes reported 403 on this page; that is the User-Agent effect described at the top of this Part, not an outage.)* It lists, verbatim, for **Qatar (QAT)**:

| Tableau Geographic Role | Type | Count |
|---|---|---|
| Airport | | **2** |
| City | | **5** |
| State/Province | **Municipality** | **7** |

**And nothing else.** No County row, so **Tableau has no built-in geocoding for Qatar's 91 zones**. No Zip Code/Postcode row — correctly, since **Qatar has no postal-code system at all**; addresses use zone / street / building numbers. Never design anything around postcodes here.

> **An honest gap:** the page gives a *count*, not a *list*. Qatar has had **8** municipalities since Al Shahaniya was split from Al Rayyan in 2014, so **one of the eight is missing from Tableau's geocoding and the page does not say which.** Al Shahaniya is by far the likeliest candidate — the same municipality is missing from GADM's Qatar file for the same vintage reason, and it is also the municipality with the thinnest coverage in the real-estate file (73 transactions of 26,719).
>
> 🔧 **This is now a required TA prep step, not a suggestion.** Type the eight municipality names into
> Tableau with the geographic role set to State/Province and Qatar as Country/Region context, and see
> which one comes back unknown. **Two minutes, and it is the only way to know.** Do it before
> promising students a municipality map — the `mapdata` page gives you a count and will never give
> you the missing name.

### Ranked routes to a Qatar map, for a student who has never coded

1. **🥇 ArcGIS StoryMaps, using the GeoJSON in `geo/`.** This is the Final Project design. No geocoding, no spelling risk, no Tableau licence question. The files are 123 KB and 175 KB and open instantly.
2. **🥈 Tableau Desktop Public Edition → Connect → Spatial file** (the GeoJSON in `geo/`). Two clicks. Tableau draws the polygons directly — **no geocoding is involved at all**, so it cannot fail because of a name Tableau does not know. **Requires the installed app; this is not available in the browser.**
3. **🥉 Tableau's built-in geocoding**, setting the municipality field's role to *State/Province* and adding Qatar as Country/Region context. Viable for 7 of 8 municipalities — but every one of Qatar's own datasets spells them differently (Part 5), so expect to hand-alias.
4. **❌ Custom geocoding import.** Requires building a CSV directory tree and restarting Tableau. Do not put this in front of these students.

**And the rule that makes all of this work: join on the zone NUMBER, not on a municipality name.** See Part 3 — I verified a 91-of-91 match with zero orphans. A number cannot be misspelled.

---

# Part 5 — Dead ends

**Everything here was actually attempted and the result recorded. Do not retry these.** Unless noted, every check in this section was run on **14 September 2026**.

## The dangerous category: HTTP 200 that is not the file you asked for

These are worse than errors, because a script saves the garbage and fails confusingly later.

| What | What actually happens |
|---|---|
| **The portal's default CSV export** | `…/exports/csv` with no query string returns **semicolon-delimited** data. Verified by hex dump: `EF BB BF 6D 6F 6E 74 68 5F 79 65 61 72 **3B**`. Always append `?delimiter=%2C&with_bom=true`. |
| **OWID `?country=` without `csvType=filtered`** | `ourworldindata.org/grapher/co-emissions-per-capita.csv?country=~QAT` → **HTTP 200, 801,498 bytes** — the *entire* 26,000-row world file. The country filter is silently dropped. You must add `&csvType=filtered`, which returns **1,910 bytes / 76 Qatar rows**. |
| 🔧 **OWID map-default graphers, even *with* `csvType=filtered`** | **A second layer of the same trap.** `ourworldindata.org/grapher/energy-use-per-capita.csv?country=~QAT&csvType=filtered` → **HTTP 200, 6,221 bytes containing all 195 countries** (re-confirmed on the verification pass: 195 distinct `Entity` values, Afghanistan to Zimbabwe, and a **fifth column** the filtered version does not have). The filter is dropped because this grapher's **default tab is a map**, which has no country selection to honour. Adding **`&tab=chart`** fixes it → **HTTP 200, 1,548 bytes, 61 Qatar rows, 4 columns**. `per-capita-energy-use` behaves identically. 🔺 **Both forms answer `301` before `200`** — re-check them with `curl -L`, or a live URL will look dead. **Always open the CSV and count the distinct entities before believing a filter worked.** |
| **ILOSTAT with no User-Agent** | `rplumber.ilo.org/data/ref_area?id=QAT_A&format=.csv` → **HTTP 200, ZERO BYTES**. It only returns the real ~10 MB file when a browser User-Agent is sent. Looks like an outage; is not. |
| **WHO GHO `$format=csv`** | `ghoapi.azureedge.net/api/WHOSIS_000001?$format=csv` → **HTTP 200, 7.7 MB of JSON.** The `$format=csv` parameter is ignored. There is no CSV export from GHO. |
| **Geofabrik Qatar extract** | `download.geofabrik.de/asia/qatar-latest.osm.pbf` → **HTTP 200** but it redirects to the site root and saves **9,609 bytes of homepage HTML** under a `.pbf` name. **No standalone Qatar extract exists** — Qatar is bundled inside `asia/gcc-states`. |
| **ODS `/records?format=csv`** | Returns JSON regardless. Aggregation queries must be parsed as JSON, or run through `/exports/csv` (which *does* accept `group_by`). |
| **`public.tableau.com/app/*` help paths** | HTTP 200, but the body is a single-page-app shell. `public.tableau.com/app/data-policy` fetched directly is **389 bytes**. Real Tableau Public documentation lives on `help.tableau.com`. |
| **UNESCO's old bulk path** *(carried forward from an earlier pass, not re-tested today)* | `uis.unesco.org/sites/default/files/documents/bdds/<yyyymm>/SDG.zip` → HTTP 200 serving a 44 KB **HTML landing page** saved as `.zip`. The working host is `download.uis.unesco.org`, and the release-month folder is dated and moves. |

## Hosts that are dead, blocked, or geo-restricted

| Host | Result |
|---|---|
| **`data.gov.qa`** (bare) | `Could not resolve host` — **no DNS record.** The portal is **`www.data.gov.qa`**. |
| **`psa.gov.qa`** (Planning & Statistics Authority) | 🔧 **Publishes no public DNS A record at all** — `dig +short A psa.gov.qa` returns nothing, and `curl` exits `000` having never opened a connection. That is **split-horizon DNS, not an HTTP geofence** (the previous revision diagnosed a 25-second timeout; an unresolved host looks identical to one). It matters because it changes what a test from campus would prove: inside Qatar the name may resolve to an internal address, so a success there says nothing about reachability for anyone else. Operational advice unchanged: **the TA should still test from campus in Doha, and no required step may depend on it.** Everything PSA publishes appears on www.data.gov.qa anyway. |
| **`qatar2022.qa`** | `Could not resolve host` — dead. **Never cite it.** |
| **`qweather.gov.qa`** | HTTP 200, but redirects to `https://caa.gov.qa/ar/weather-information` — the Civil Aviation Authority, Arabic-first, with no open-data download. **Citation source only, never a data source.** |
| **Kaggle** *(carried forward)* | Programmatic access returns a reCAPTCHA challenge, not JSON; it needs an account and an API token. Separately, Kaggle's Qatar datasets are overwhelmingly re-uploads of World Bank or OWID data with the licence and vintage stripped. **Since every upstream source here is directly downloadable and properly cited, there is no reason to send students to Kaggle at all** — it adds an account requirement and subtracts provenance. |
| **IEA / IRENA** *(carried forward)* | IEA data products are sold. IRENA's bulk download returns HTTP 403; the only retrievable artefact was an 8.3 MB PDF yearbook. Qatar's renewables share is near zero anyway — a dull chart. Skip both. |

## APIs that need a key, or are broken

- **OpenAQ v3** → **HTTP 401.** It now requires an API key. Use **Open-Meteo air quality** instead (Part 3).
- **WAQI / aqicn.org demo token** → `api.waqi.info/feed/doha/?token=demo` returns **HTTP 200** with `{"status":"error","data":"Unknown station"}`. Earlier passes reported the demo token silently returning *a different city* for other queries. Either way: **the demo token cannot be trusted and must not be used in a lab.**
- 🔺 **Open-Meteo *archive* (historical) endpoint — UNSTABLE. Do not build any required step on it.** `archive-api.open-meteo.com/v1/archive`, 2-year single-variable CSV (`daily=temperature_2m_max`, Doha). This endpoint has now returned three different verdicts on three passes, which is itself the finding: an early pass saw `timeoutReached` / `allEndpointsUnavailable` / HTTP 500; a later pass saw **HTTP 200, 11,853 bytes in 0.5 s** on 4 of 5 attempts; and the **verification pass on 14 Sep 2026 could not reach the host at all — five consecutive attempts returned `curl` exit code 000 with zero bytes**, including a bare `GET https://archive-api.open-meteo.com/` (connect failure after 20 s, and once after 900 s). **Note that this is a *different host* from the air-quality endpoint** `air-quality-api.open-meteo.com`, which was HTTP 200 and fast on every attempt in every pass — so a failure here says nothing about Lab 2. **Treat the archive endpoint as unreliable: never a lab dependency, and test it the same morning if you plan to demo it.** When it does answer, its CSV has the same 3-junk-lines-then-header shape as the air-quality sibling. **NASA POWER is the primary recommendation for historical weather** — it verified perfectly on every pass and its committed copy already has a real date column.
- **Open-Meteo *forecast* endpoint** *(carried forward)*: works, but its CSV has a 2-row metadata block, then a blank line, then the real header — and it returned `NaN` for deep `past_days` values. Not a drop-in file.
- **FAOSTAT API** → `faostatservices.fao.org/api/v1/en/data/QCL?...` **HTTP 401 Unauthorized.** The public API now needs credentials. FAOSTAT also has **no Qatar-specific bulk files** — everything is a global bundle you download whole and filter (53 MB for Food Balances, 65 MB decompressed for Temperature Change).

## Files that download fine but are not Tableau-ready

- **World Bank per-indicator CSV** → `api.worldbank.org/v2/en/indicator/{CODE}?downloadformat=csv` is **HTTP 200, 133,705 bytes**, and it is a catalogue of every trap at once. Verified by opening it: it is a **ZIP** (Tableau cannot open a zip) containing three CSVs; the data file has a **UTF-8 BOM**, then **four junk lines** before the real header (`"Data Source","World Development Indicators"` / blank / `"Last Updated Date","2026-07-13"` / blank); it is **wide**, one column per year 1960–2025; and every line ends in a **trailing comma**, creating a phantom empty 71st column.
  Tableau's Data Interpreter genuinely does handle `.csv` (the help page is titled *"Clean Data from Excel, CSV, PDF, and Google Sheets with Data Interpreter"*, HTTP 200), so the junk rows are usually survivable with one checkbox — but Data Interpreter is a guess, not a guarantee, and it does nothing about wide-to-long. **Everything this file offers is available already-tidied in the OWID grapher CSVs. Use OWID for the chart and cite the World Bank as the upstream source.**
- **Compressed archives generally.** Tableau cannot open `.gz` or `.zip`. UN WPP ships `.csv.gz`, ILOSTAT `.csv.gz`, FAOSTAT/UNESCO/World Bank `.zip`. **Decompress anything you hand to a lab.**
- **ILOSTAT and UNESCO bulk files** are mechanically clean but **semantically opaque** — every dimension is a code (`SDG_0131_SEX_SOC_RT`, `SEX_T`, `ADMI.ENDOFLOWERSEC.MAT`) with no human-readable label anywhere in the data file. Making any chart legible requires joining to separate dictionary CSVs. That is a multi-table join plus a data-dictionary hunt, squarely against this course's "demonstration over construction" philosophy. **Keep both off the student menu.**
- **Zenodo `GCB2024v18_percapita_flat.csv`** → **HTTP 404.** This filename is widely cited and **does not exist in the v18 record** — only its `_metadata.json` does, which is why the citation looks plausible. 🔺 The per-capita numbers live in a `Per Capita` **column** inside `GCB2024v18_MtCO2_flat.csv`: `https://zenodo.org/records/14106218/files/GCB2024v18_MtCO2_flat.csv?download=1` → **HTTP 200, 3,128,569 bytes** (re-tested; Qatar 2023 = 115.711814 MtCO₂ total, of which gas 99.691457; 42.597628 t per capita). A standalone `GCB2024v17_percapita_flat.csv` exists only in the **earlier** record, `zenodo.org/records/13981696`.
- **Gapminder open-numbers** *(carried forward)*: the repo is alive but `ddf--datapoints--population_total--by--geo--time.csv` **404s on both branches**. The male/female files exist but use lowercase ISO codes with no country names, requiring a separate entity join. Not worth it when UN WPP gives the same story pre-labelled.
- **`data.un.org` DownloadHandler** *(carried forward)*: HTTP 404. It is a UI-only route now; there is no scriptable UN Data CSV endpoint.

## Qatar portal quirks that will waste your afternoon

1. **The obvious landing-page URL is wrong.** `www.data.gov.qa/datasets/{id}` → **HTTP 404** for every dataset. The working form is `www.data.gov.qa/explore/dataset/{id}/information/` (HTTP 200). And **there is no `/en/` locale prefix** — `www.data.gov.qa/en/explore/dataset/{id}/information/` → **HTTP 404**.
2. **Dataset slugs are truncated in listings, and guessing them fails.** Demonstrated live today: `cooling-energy-consumption-and-savings-by-municipality-and-economic-activity` → **HTTP 404** with `{"error_code":"NotFoundResource"}`; the real id ends `-mwh`. Same class of failure: the traffic-department deaths file needs `-location-` in the middle of the slug, and the QU *graduated* students file ends `-spring-2024`, not `-2025`. **Always take ids from the catalogue API.**
3. 🔧 **The catalogue endpoint rejects `select` on non-scalar fields — not on `select` itself.** Re-tested today: `…/catalog/datasets?limit=2&select=dataset_id` → **HTTP 200**, works fine. It is `metas` that fails: `…?limit=2&select=dataset_id,metas` → **HTTP 400**, `ODSQL query is malformed: Unknown field: metas`. So you *can* select scalar fields; to get metadata, **pull full catalogue records and filter client-side**. (`select` also works on the per-dataset `/exports/` and `/records` endpoints, including aggregates — that is how `geo/` and the two slimmed `project2/` files were built.)
4. **Dataset pages are client-side rendered.** Fetching one returns literal Angular placeholders like `{{ ctx.nhits | number }}`. Get metadata from `…/catalog/datasets/{id}` instead, which returns real values.
5. **🚨 Never download the CSV of a dataset that has a `geo_shape` field.** The portal inlines the full polygon into **every row**. Verified today: `education-statistics-number-of-public-schools-…` is **65,444,795 bytes for 800 rows**, and `cooling-energy-consumption-…-mwh` is **6,584,892 bytes for 112 rows**. Use `/exports/geojson`, or `&select=` the geometry away.
6. **The 1M-row accident microdata CSV is 68,089,143 bytes.** It fits Tableau Public's row cap but not a 90-minute lab on campus wifi. Use the server-side aggregation (Part 3) — same data, 18,862 bytes.
7. **Municipality name spellings are inconsistent across the portal's own files**, which is why every map join here uses a number. The same eight municipalities appear as:

| Boundary file (HDX) | Real-estate bulletin | Population file | Mosques file |
|---|---|---|---|
| Al Daayen Municipality | Al Daayen Municipality ✅ | Al Dayyan | *17 spelling variants* |
| Al Khor and Al Thakhira Municipality | ✅ exact | **`AL Khor`** (capital L) | *for 8 municipalities,* |
| Al Sheehaniya Municipality | **`Al Shahniya Municipality`** ❌ | Al Sheehaniya | *including `AL- Wakrah`* |
| Al Wakra Municipality | ✅ exact | Al Wakra | *with a stray space* |
| Umm Slal Municipality | ✅ exact | Umm Salal | |

8. **Some datasets are unusable for this cohort because they are Arabic-only.** The MOCI business-certificate files are tempting on size (13,189 / 40,472 / 8,259 rows) but **all four columns carry transliterated-Arabic slug names and every value is Arabic** — thousands of distinct Arabic business-activity descriptions with **no English twin anywhere**. Unless the student reads Arabic fluently there is nothing to label a chart with.
9. **`sports-facilities-by-type-and-agency0` double-counts badly** — 108 rows where the facility name is literally `Total`, 450 where a column reads `المجموع`, 675 where `type` is `Total`, all mixed in with detail rows. Any naive `SUM` doubles or triples. *(Notably, this was the only Total-row problem found in 34 profiled portal files — the portal is unusually clean on this.)*

## Boundary data

- **GADM 4.1 — reject.** `geodata.ucdavis.edu/gadm/gadm4.1/json/gadm41_QAT_1.json` → HTTP 200, 31,262 bytes, and it parses — but it has only **7 features and Al Shahaniya is missing entirely** (split from Al Rayyan in 2014; GADM's vintage predates it). The names are also **run together with no spaces**: `AdDawhah`, `AlDaayen`, `AlKhor`, `AlWakrah`, `ArRayyan`, `MadinatashShamal`, `UmmSalal`. They join to nothing. GADM's licence is non-commercial, which is awkward for a course repo. **Use the HDX files in `geo/`.**
- **Raw HDX archives are too heavy to hand out** — 24.4 MB (shp) and **27,047,015 bytes** (geojson, re-verified today), because they bundle ADM0–ADM3 plus edge-matched duplicates at full coastline resolution. 🔧 **The unsimplified ADM1 layer alone is 7,784,437 bytes for 8 polygons** (the previous revision's "5.1 MB" is stale — the archive was rebuilt 19 Aug 2026). Use the ~123 KB / ~175 KB simplified derivatives in `geo/`.
- 🚨 🔧 **Use the `data.humdata.org/...` URL, never the S3 URL it redirects to.** The documented form re-signs on every request and returned HTTP 200 today. But it **302s to a presigned Amazon S3 URL** carrying `AWSAccessKeyId`, `Signature`, `x-amz-security-token` and an `Expires=` stamp **a few hours in the future**. Anyone who follows the link in a browser and then copies the address bar has captured a URL that **dies the same day** — and it will look like HDX took the data down. This is the only presigned redirect anywhere in this document.
- **HDX's API rejects some automated fetchers** (403 to certain clients) but works fine via `curl` with a browser User-Agent. All resource download URLs work.

## Environment gotchas, if you reproduce this work

- **This shell is zsh, which does not word-split unquoted variables.** `for id in $IDS` passes the whole string as one argument and every request 404s silently. Use `while read -r id; do … done < file`. Relatedly, `rm -f *.csv` **errors** in zsh when nothing matches, silently killing an `&&` chain.
- **`curl -o` writes to the process CWD**, not to the directory in your variable. Always pass an absolute path.
- **A prefix-only encoding check gives false "not UTF-8" results.** Reading the first 4,096 bytes and calling `.decode('utf-8')` truncates a multi-byte Arabic character mid-sequence. **Decode the whole file.** Every data.gov.qa CSV checked here is valid UTF-8 end to end.
- **Do not name a script `enum.py`.** Python's `re` imports `enum`; a local `enum.py` causes a circular-import crash before your first line runs.
- `pandas` is not in the system Python on this machine; a venv with pandas + openpyxl was used. GDAL (`ogr2ogr`, `ogrinfo`) is available via Postgres.app.

## Two facts worth writing straight into the student handout

1. **Licensing is a solved problem.** 1,821 of the portal's **1,834** datasets are **CC BY** (13 unlabelled) — count re-verified today. 🔧 *Small sourcing note: the portal's metadata reads `"license": "CC BY"` with `license_url` pointing at `creativecommons.org/licenses/by/4.0/`. **The "4.0" comes from the URL, not from the label.*** Attribution is the only obligation. Teach students to write the attribution line; it costs nothing and it is professional practice.
2. **Tableau Public is the public internet.** See the privacy section in Part 4. Say it before they publish, not after.

---

## Checked on

**Compiled and last verified: 14 September 2026** — and **independently re-verified the same day**,
end to end. Every URL above was fetched and its HTTP status recorded; every file described was
downloaded and opened; every quoted figure was computed from the bytes, not copied from a landing
page.

**What the second pass re-ran, and what it found.** All sixteen `www.data.gov.qa` exports → HTTP 200
at the exact byte sizes printed above, not one off by a byte (68,359 · 2,612 · 8,728 · 575,397 ·
38,545 · 69,295 · 84,517 · 850,517 · 120,809 · 17,413,680 · 924,323 · 6,324,305 · 3,071 · 56,016 ·
21,581 · 56,793), plus the XLSX twin at 30,371, the landing page, the 18,862-byte server-side
aggregation, and a catalogue still reporting **1,834** datasets. NASA POWER 367,299 b / 9,497 rows ·
Open-Meteo air quality 77,598 b default and 72,916 b pinned, with the future-dated window still
failing **HTTP 400** as documented · HDX 27,047,015 b · Tableau's embedding script 337,087 b ·
all four `help.tableau.com` pages 200 · the arXiv PDF 406,287 b · Tableau's `mapdata` Qatar row
re-extracted and still reading **Airport 2 · City 5 · State/Province (Municipality) 7**. Every
committed file recomputed: Lab 1's 945 x 11 with zero nulls and the four World Cup months to the
decimal, all ten `project2/` files, `hazards/` (9,497 daily rows, 47.71 °C, 246 days over 45 °C,
2,184 air-quality hours), and `geo/` (543 rows, 1,210,870 accidents, zone 99 present in only three
years). Part 5's dead ends all reproduced: `psa.gov.qa`, bare `data.gov.qa` and `qatar2022.qa` still
publish **no A record**; `qweather.gov.qa` still lands on `caa.gov.qa/ar/weather-information`;
OpenAQ v3 still **401**; the WAQI demo token still `Unknown station`; the catalogue still accepts
`select=dataset_id` and still rejects `select=…,metas` with **HTTP 400**.

🔺 **Four corrections were made in place** — the Open-Meteo *archive* endpoint (unreachable on five
attempts, so its "working again" verdict is withdrawn); the OWID energy row count (61, not 60) and
its `301`, which needs `curl -L`; the rainfall annual minimum (2.2 mm in 2001, not 7.0 mm in 2021);
and the Global Carbon Project file, which now carries a **tested Zenodo URL** instead of a bare
filename. Nothing in the four changes a recommendation.

### ⚠️ Re-check before 31 October — and here is the good news

Government portals move, and this one will. **But nothing a student or TA needs on the day depends on
a live request.** Everything load-bearing is committed in this repo:

| | Committed at | Covers |
|---|---|---|
| Lab 1 | [`lab1/`](lab1/) | The handout file + its backup |
| Project 2 | [`project2/`](project2/) | **All ten datasets, 3.2 MB** |
| Lab 2 + Final Project | [`hazards/`](hazards/) | Pinned air quality; daily heat + rainfall |
| Final Project maps | [`geo/`](geo/) | 91 zones, 8 municipalities, pre-baked accident counts |

So the re-check tells you **what to say**, not whether the course can run. Work the priority table at
the top of this document; budget an hour in the week of 26 October. If a link has moved, hand out the
frozen copy and have the student cite its download date — that is honest provenance, and it is a
better lesson than a working link.

**Four things in this document are *not* settled by a link check, and the TA must do them by hand:**

1. **Type Qatar's eight municipality names into Tableau** and find which one its geocoder does not
   know (Part 4). Two minutes. The `mapdata` page gives a count and will never give you the name.
2. **Verify a *hidden* Tableau Public viz embeds** in a `<tableau-viz>` element on a GitHub Pages page
   (Part 1, Module C). Five minutes. It is the exact configuration all 25 students will be in.
3. **Test `psa.gov.qa` from campus in Doha** (Part 5) — and read the result carefully: the host
   publishes no public DNS record at all, so success on campus proves only that split-horizon DNS
   exists, not that anyone off-campus can reach it.
4. **Decide Module C's scope in writing** (Part 1) — run it end to end, or rename the lab in both
   CSVs. The sheet and the lab must not disagree on 31 October.

*Everything else can be replaced from this menu without redesigning a session.*
