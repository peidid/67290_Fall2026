# Take-home · Put your Tableau viz inside your Observable dashboard

**Optional · ungraded · about 15 minutes · genuinely useful for the Final Project**

---

Your Final Project is an ArcGIS StoryMap with **a Tableau chart embedded in it**. This is the same move, practised
somewhere safe first: putting a published Tableau viz inside a page you already own — the `doha-dashboard`
Observable project you built in Lab 1.

---

## Step 1 · Get a clean URL

Open your published viz on Tableau Public → **Share** → copy the **Link** (not the embed code).

It will look like this:

```
https://public.tableau.com/views/67290Lab2YourName/PriceVsOccupancy?:language=en-US&:sid=&:redirect=auth&:origin=viz_share_link
```

> ### ⚠️ Delete everything from the `?` onward
> Those tracking parameters break the embed. You want:
> ```
> https://public.tableau.com/views/67290Lab2YourName/PriceVsOccupancy
> ```
> This is the single most common reason the embed shows a blank box.

---

## Step 2 · Load the Tableau library once, in your config

Open `observablehq.config.js` at the root of your `doha-dashboard` project and add a `head` entry inside the
exported object:

```js
export default {
  title: "Doha dashboard",
  head: '<script type="module" src="https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js"></script>',
  // ...whatever else is already in here, leave it alone
};
```

That loads Tableau's Embedding API v3 on every page of your site. It has to be `type="module"` — the API is an
ES module and will not load without it.

---

## Step 3 · Add a page with the viz

Make a new page:

```
touch src/hotels.md
```

*(Windows PowerShell: `New-Item src/hotels.md`)*

Put this in it, with **your** URL from Step 1:

```markdown
# Qatar's hotels around the World Cup

Rates went up 4.6× in two months. The rooms stayed emptier than during the pandemic.

<tableau-viz
  src="https://public.tableau.com/views/YOUR_WORKBOOK/YOUR_SHEET"
  width="100%"
  height="800">
</tableau-viz>
```

Save. Your dev server reloads and **"Hotels" appears in the sidebar** with your live, interactive Tableau viz
inside your own dashboard.

> If the server is not running: `npm run dev` from the project root, then open the address it prints.

---

## Step 4 · Commit it

```
git add .
git commit -m "Embed Tableau hotel viz"
git push
```

---

## Troubleshooting

| What you see | Why | Fix |
|---|---|---|
| Blank box where the viz should be | Tracking parameters still in the URL | Delete everything from `?` onward |
| Blank box, clean URL | The script never loaded | Check `head:` is **inside** the exported object and the script has `type="module"` |
| "Viz not found" | The viz is set to hidden *and* deleted, or the URL has a typo | Open the URL by itself in a new tab — if it fails there, it will fail here |
| Viz loads but is tiny | No height set | Keep `height="800"` — a percentage height will collapse |

> **A hidden viz still embeds.** Hidden keeps it off your public profile and out of search; the URL still
> resolves, which is what the embed uses. If you want to be certain, open your page in a private browsing window.
