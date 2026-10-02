# Lab 1: JavaScript Foundations

**67-336 Data Visualization | Fall 2026**

It is crucial that you read the following instructions before working on anything in this project. Throughout this lab, make sure to commit regularly and push your changes to GitHub.

Have fun learning JavaScript!

## Before You Start

Make sure you have completed Lab 0. You should already have:

- Git installed and configured with your CMU email
- Node.js v22 installed (exact minor/patch version doesn't matter)
- A GitHub account
- A code editor (VS Code recommended)

If any of these are missing, go back to Lab 0 before continuing.

## Terminal Quick Reference

| Command | What it does |
|---|---|
| `ls` | List files and folders in your current location |
| `cd folder` | Move into a folder |
| `cd ..` | Go back up one level |
| `pwd` | Show your current location |
| `git clone <url>` | Download a remote repository to your machine |
| `git remote -v` | See which remote your repo is connected to |

## Step 1: Check for Node.js and VS Code

Make sure Node is installed by going to your terminal and typing:

```
node -v
```

You should see a version starting with `v22` (for example `v22.17.0` or `v22.23.2`, exact minor/patch doesn't matter). You do not need to open a new terminal window for this.

If Node is not installed, go back to Lab 0 and complete Part 4 before continuing.

Also make sure VS Code is installed. We will use it to edit files throughout this lab.

## Step 2: Clone the Starter Repository

Create a folder on your computer for 67-336 labs. Open your terminal inside that folder, then clone the starter repo:

```
git clone https://github.com/CMU-67336-Data-Visualization/Lab01_JavaScriptFoundations.git
```

After cloning, use `ls` to confirm the folder was created:

```
ls
```

You should see `Lab01_JavaScriptFoundations` listed. Now move into it:

```
cd Lab01_JavaScriptFoundations
```

Run `ls` again to see the starter files:

```
ls
```

You should see `index.js`, `index.html`, and `package.json`.

> Note: The starter repo's own README may list different collaborator usernames (an older TA team) than the ones below. Ignore whatever that file says, always use the collaborator list in Step 3 of these instructions, since that's kept current for this semester.

## Step 3: Create Your Own Private GitHub Repo

1. Go to github.com and sign in.
2. Click the **+** icon in the top right corner and choose "New repository."
3. Name it exactly: `67336_Lab1`
4. Set visibility to **Private**.
5. Leave everything else unchecked. Do not add a README or .gitignore.
6. Click "Create repository."

Then add your instructors as collaborators so they can grade your work:

7. Go to your new repo, then Settings, then Collaborators, then Add people.
8. Add each of the following one at a time: `shihongh`, `ygonz174`, `lillian-zhao`

> WARNING: You must do this so we can grade your lab.

## Step 4: Connect the Starter Repo to Your New GitHub Repo

**1. Check the current remote.**
```
git remote -v
```
You should see the class repo URL. That is expected.

**2. Remove the existing remote.**
```
git remote remove origin
```
Verify it was removed. This command should return no output:
```
git remote -v
```

**3. Add your new remote.**
```
git remote add origin https://github.com/YOUR-USERNAME/67336_Lab1.git
```
Replace `YOUR-USERNAME` with your GitHub username. Verify:
```
git remote -v
```
You should now see your personal repo URL.

**4. Initialize package.json.**
```
npm init -y
```
Open `package.json` and replace the `"scripts"` section with:
```json
"scripts": {
  "start": "node index.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

**5. Push to your repository.**
```
git add .
git commit -m "Initial commit from starter repo and created package.json"
git push --set-upstream origin main
```
Go to GitHub and confirm the files are populated in your repository. If not, stop and ask a TA for help before continuing.

## Step 5: Use a Development Branch

For best coding practices, you should not be working on the main branch. To keep your main branch clean, create and switch to a new branch:

```
git checkout -b lab-dev
```

> What this command means: `git checkout <branch-name>` switches you to an existing branch. Adding `-b` tells it to create that branch first, then switch to it. So `git checkout -b lab-dev` creates a new branch called `lab-dev` and moves you onto it in one step.

As you make changes, commit and push regularly:

```
git add .
git commit -m "Complete Challenge 1"
git push -u origin lab-dev
```

> Tip: Commit after completing each challenge section, not just at the end. This builds good habits and gives you checkpoints to return to if something breaks.

When you are finished and everything works, merge back into main:

```
git checkout main
git merge lab-dev
git push
```

## Step 6: Run the Starter Code

`package.json` is the configuration file for a Node project, it lists your dependencies and defines shortcut commands (called "scripts") you can run with `npm run <script-name>`. You already edited its `"scripts"` section in Step 4; `npm start` specifically runs whatever command is defined there under `"start"`, which in this project is `node index.js`. That's why running `npm start` is the same as running `node index.js` directly.

Install dependencies and run the starter file:

```
npm install
npm start
```

You should see output printed to your terminal. Read through it. This gives you a preview of the JavaScript concepts you will be working with.

> Note: If you see a `ReferenceError: document is not defined` error at this stage, that's expected and not a bug. `document` only exists in a browser, not in Node. Any challenge that uses `document` needs to be tested by opening `index.html` in the browser with Live Server (Step 7), not by running `npm start`. Ignore this error for those sections and keep going.

## Step 7: Complete the index.js and index.html Files

Open `index.js` and `index.html` in VS Code and work through each challenge in order. Each challenge has:

- An example showing the concept
- A **Your Turn** section where you write your own code

Tips:

- Run `npm start` after each challenge to check your output in the terminal.
- For Challenges 3, 4, and 5, open `index.html` in Chrome using Live Server (right click, then Open with Live Server). Live Server is not built into VS Code, it's an extension you need to install first: open the Extensions sidebar (Cmd+Shift+X on Mac, Ctrl+Shift+X on Windows), search "Live Server," and install the one by Ritwick Dey.
- Open the browser console with Cmd+Option+J (Mac) or Ctrl+Shift+J (Windows) to see output and errors.
- Use W3Schools for reference.
- Add a `console.log(...)` at the end of each challenge that labels its output (for example `console.log("Challenge 1.4 output:", result)`) so it's easy to tell which printed line belongs to which challenge.

> WARNING: Do NOT use AI to complete this lab. The goal is to build your own understanding of JavaScript fundamentals. You will need these skills for every lab and project in this course.

## Step 8: Deployment on Vercel

We will use Vercel to deploy your JavaScript project so it is accessible at a live public URL.

**1. Create a Vercel account.**

Go to https://vercel.com and sign up with your GitHub account.

**2. Import your project from GitHub.**

- On the Vercel dashboard, click "Add New Project."
- Select your `67336_Lab1` repo.
- For Framework Preset, choose **Other** (this is a basic HTML and JS project).
- Set the following:
  - Root Directory: `./` (or leave blank)
  - Build Command: leave blank
  - Output Directory: `./` or leave blank
- Click **Deploy**.

**3. Get your live URL.**

After deployment finishes, you will get a live URL like:
```
https://67336-lab1-yourname.vercel.app
```
Open it and confirm your `index.html` loads correctly in the browser.

## Step 9: Submitting on Canvas

Submit the following on Canvas:

- Your GitHub repo link (for example `https://github.com/YOUR-USERNAME/67336_Lab1`)
- Your Vercel live site link (for example `https://67336-lab1-yourname.vercel.app`)

> Make sure you have added `shihongh`, `ygonz174`, and `lillian-zhao` as collaborators before submitting.

## Quick Reference: Git Commands Used This Lab

| Command | What it does |
|---|---|
| `git clone <url>` | Download a repo to your machine |
| `git remote -v` | See which remote you are connected to |
| `git remote remove origin` | Disconnect from the current remote |
| `git remote add origin <url>` | Connect to a new remote |
| `git checkout -b lab-dev` | Create and switch to a new branch |
| `git add .` | Stage all changes |
| `git commit -m "message"` | Save staged changes with a message |
| `git push -u origin lab-dev` | Push branch to GitHub for the first time |
| `git checkout main` | Switch back to main |
| `git merge lab-dev` | Merge `lab-dev` into main |
| `git push` | Push current branch to GitHub |

That's it. You've cloned a project, set up Git, written JavaScript foundations, and deployed a live site.
