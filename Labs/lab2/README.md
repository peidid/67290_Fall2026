# Lab 2 · Tableau: Make a Chart That Does Not Lie

**67-290 Storytelling with Data Visualization · CMU-Qatar · Saturday 31 October 2026 · 90 minutes · 5 points**

Students build and publish an interactive dashboard about what actually happened to Qatar's hotels around the
2022 World Cup — and, in the first six minutes, build a chart that is wrong by a factor of two and find out why.

Everything runs in the **browser** on Tableau Public. Nothing to install.

---

## Start here

| File | Who it's for | What it is |
|---|---|---|
| **[`Lab2-Tableau.ipynb`](./Lab2-Tableau.ipynb)** | Students | The handbook. Its first section, **"Before you walk in"**, is the pre-class task — post it on Canvas by **Mon 26 Oct**. The rest is followed in class, top to bottom. |
| [`data/`](./data/) | Students | The two files you upload. Clone or download before Saturday. |
| [`TAKE-HOME-embed-in-observable.md`](./TAKE-HOME-embed-in-observable.md) | Students, optional | Put your viz inside the Lab 1 Observable dashboard |
| [`expected-deliverable/`](./expected-deliverable/) | **TA & instructor** | Run sheet, rubric, prep checklist, failure modes |
| [`data/PROVENANCE.md`](./data/PROVENANCE.md) | Anyone | Where the data came from and every defect it contains |

---

## What students can do when they leave

Chosen by working backwards from Project 2, which they build **alone and remotely** two weeks later:

1. Upload their own `.xlsx` to Tableau Public
2. Tell a dimension from a measure — and know that **blue** and **green** mean different things
3. **Spot a column Tableau typed wrong, and fix it**
4. **Catch `SUM` being silently wrong on a ratio**
5. Build three views that answer three *different* questions
6. Make a view interactive with **Show Filter**
7. Assemble a **Dashboard** and a **Story** — the actual Tableau objects Project 2 names
8. Publish, and verify it works for someone who is not them
9. Know what "published" means before they click Save

---

## The data

| File | Size | Used in | Why |
|---|---|---|---|
| `qatar-hotel-performance-2014-2025.xlsx` | 60 KB | Parts 1–7 | 945 rows, zero nulls, a real date column, no Arabic. Clean enough that nothing ambushes a beginner — **except one trap that is the whole point.** |
| `qatar-museum-visitors-2013-2024.xlsx` | 16 KB | Part 8 | Deliberately messy. A measure that arrives as text, two different kinds of missing, and one museum spelled four ways. |

**The trap:** `segment` holds six hotel categories *and* `Qatar (all accommodation)`, which is their total. Any
aggregate built without filtering `segment_type` double-counts — `SUM(room_nights_sold)` reads **141,759,382**
against a true **70,726,032**. The lab opens by walking students straight into it.

**The story:** room rates went 456.61 → 2,103.59 QAR in two months, then fell 79.9% in one. Meanwhile **November
2022 was the emptiest November in the entire file at 55.9% occupancy — emptier than November 2020, mid-pandemic.**
Qatar had built 17% more rooms in three months. The plan was a full country; the world was a price spike in
half-empty buildings.

---

## Where this sits

- **Lab 1** (28 Oct) ended on *"a column's type decides what can be done with it."* Lab 2 pays that promise twice:
  the blue/green date pill, and a measure that arrives as a dimension.
- **Project 2** (out today, due 16 Nov) is this lab done alone on an unfamiliar dataset.
- **Lab 3** (9 Nov) owns maps. **There is no map in this lab** — Tableau's browser editor cannot load GeoJSON, and
  Tableau has no geocoding for Qatar's 91 zones.
- **The Final Project** needs a Tableau chart embedded in an ArcGIS StoryMap. The optional take-home rehearses
  exactly that move.
