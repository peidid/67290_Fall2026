# Lab 4 · Direct the Agent

**67-290 Storytelling with Data Visualization · CMU-Qatar · Wednesday 18 November 2026 · 90 minutes · 5 points**

---

## The brief

> ### Tell a stranger something true about your home city/contry/region  that they could not have guessed, using data that did not all exist a year ago, and put it at a link that everyone can open on a phone.

You will work with the **Codex agent in VS Code** for the whole ninety minutes. It will find data, write
the fetch, parse it, and build the charts. **None of that is what you are graded on.**

You are graded on the **decisions**: which story, which data, how many charts, what they say, and what you
refused. The agent cannot make those. This lab is ninety minutes of proving that you can.

**Build it in Observable Framework**, the same way you did in Lab 1. Deployment is your call — the agent
knows several ways to put a site on the internet. Pick one, make it work, and be able to say why.

> **"Did not all exist a year ago"** — a live API (weather, air quality) satisfies this on its own. An
> annually updated source (World Bank, WHO) satisfies it if your story turns on the newest year.

---

## The one rule

> ### Decide in writing before you delegate.
>
> At every stage, type your decision into the chat **before** the agent acts. One line is enough.
> If the agent proposed it first, you owe it a reason.

This is the whole lab. It is also the only thing that makes your chat history readable by someone else —
and your chat history is the main thing you are submitting.

---

## The six gates

Work through these in order. Do not let the agent skip ahead.

| | Gate | You decide | The agent does |
|---|---|---|---|
| 1 | **Story & reader** | The claim, in one sentence. Who is reading it. | *Nothing. Keep it closed.* |
| 2 | **Source & route** | Which source, which endpoint, and why that one | Surveys what exists, explains each API |
| 3 | **Parse & verify** | Row count, units, what got dropped | Writes the loader, reshapes the response |
| 4 | **Views & encodings** | **How many charts, and why that many.** Chart type per question | Implements them |
| 5 | **Voice & order** | Style, colour, sequence, titles that state findings | Types it |
| 6 | **Ship** | Where it lives; check it on your phone | Deploys it |

**Gate 4 is the one with your name on it.** Every other class tells you to make three charts. Here the
number is yours, and you have to defend it. Two charts that each answer a real question beat five that
decorate.

---

## Six moves that keep you in charge

1. **Make it look before it writes.** Never let it guess field names — have it fetch one record and print
   the keys. *Real example: the Qatar portal's API calls a column `segment`; its own CSV export calls the
   same column `segment_type`. An agent that guesses writes a query that fails — or quietly returns nothing.*
2. **After any filter, ask: "how many rows did that drop, and which ones?"** Silent row loss is the most
   common way a correct-looking chart becomes a lie.
3. **Say no in words.** *"No — that's a pie chart with nine slices; use a sorted bar."* That is a decision.
   Silently fixing the code afterwards is also fine work, but it leaves no trace that you were the one deciding.
4. **Give it your taste once, in writing.** Five house rules at the start beats re-arguing every turn.
   For example: never truncate a bar axis · the title states the finding, not the variable · any rate names
   its denominator · sequential data gets a sequential scale.
5. **One gate at a time.** If it offers to build the whole thing, refuse. You cannot review what you did
   not watch being built.
6. **When it is confidently wrong about data, it is almost always units, denominators, or missing rows.**
   Check those three first.

---

## Where to get data

All six were fetched and confirmed working. None needs an account or an API key.

| Source | What it gives you |
|---|---|
| `api.open-meteo.com/v1/forecast` | Live hourly weather. **Several cities in one call** — pass comma-separated lat/long |
| `air-quality-api.open-meteo.com/v1/air-quality` | PM2.5, PM10, dust, hourly |
| `api.worldbank.org/v2` | ~1,500 indicators for all 22 Arab states, or the `ARB` aggregate |
| `ghoapi.azureedge.net/api` | WHO health indicators by country and year |
| `www.data.gov.qa/api/explore/v2.1` | 1,875 Qatari government datasets, queryable with `where` / `select` / `order_by` |
| `ourworldindata.org/grapher/<topic>.csv` | Long-run per-country series, as CSV |

Anything else is allowed if you can get it working — that is your Gate 2 decision to own.

> **Three that look fine and are not.** ReliefWeb's API returns `410 Gone`. REST Countries' Arab League
> endpoint redirects to an HTML error page while still reporting success. The Saudi portal times out.
> **An HTTP 200 is not a promise that you got the file you asked for** — open what came back and look at it.

---

## What to submit

**1 · Your chat history.** Copy the full session out of Codex and submit it as a file. We read it for five things:

- Did your story exist **before** the agent opened?
- Is there at least one **"no"**, with a reason?
- Did you ever ask what it **dropped** or **assumed**?
- Are there five or more turns where you **decide** something — not "ok", "continue", "looks good"?
- Did you catch it being wrong about the data?

**2 · The live link.** It must open on a phone, for anyone, without a login.

**3 · A reflection, under 200 words.** Four lines:

- What I asked for
- What the agent proposed that I rejected, and why
- **What I would have shipped if I had said yes to everything**
- Where a human was genuinely necessary

You may have AI draft this from your own chat history. **Read it before you submit it** — the third line
is the one that matters, and it is the one only you can answer honestly.

---

## Grading · 5 points

| | |
|---|---|
| 2 | Decisions written before delegation at five of the six gates, including at least one real pushback |
| 1 | Live link opens on a phone |
| 1 | Two or more charts, the number justified, at least one title that states a finding rather than naming a variable |
| 1 | Reflection submitted, and the counterfactual line is honest |

Hit a wall, said so, and showed what you tried? **That keeps full marks.** A session where everything went
wrong and you stayed in charge of it is worth more than one where you said yes eleven times.
