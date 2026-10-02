# Lab 0: Git, GitHub & Node.js Setup

**67-336 Data Visualization | Fall 2026**

## Overview

In this lab you will set up all the tools you need for the semester: Git, GitHub, and Node.js. By the end you will have a working development environment and hands-on experience with the full version control workflow. This includes how to undo mistakes, since that's half the point of version control.

## Before You Start: Getting Comfortable with the Terminal

The terminal is a text based interface that lets you control your computer by typing commands. Many students have not used it before, and that is completely fine. Here is a quick primer on the commands you will use today.

| Command | What it does |
|---|---|
| `ls` | List all files and folders in your current location |
| `cd folder` | Change into a folder (e.g. `cd Documents`) |
| `cd ..` | Go back up one folder level |
| `mkdir name` | Create a new folder |
| `touch file` | Create a new empty file (Mac/Linux only, see the Windows note in Step 7) |
| `rm file` | Delete a file (permanent, be careful!) |
| `pwd` | Print your current location (full path) |

**Mac/Linux:** Open Spotlight (Cmd+Space), type Terminal, and press Enter. You can also right click any folder in Finder and choose "Open Terminal Here" to start already inside that folder.

**Windows:** Press the Windows key, search PowerShell, and press Enter. You can also right click any folder in File Explorer and choose "Open in Terminal" (Windows 11) or "Open PowerShell window here" (Windows 10).

## Think of Git Like a Shortbread Cookie Recipe

Imagine you are baking shortbread cookies.

- **Working Directory** = Your kitchen counter. You are actively mixing ingredients here. Nothing is saved yet.
- **Staging Area** = The baking tray. You choose which cookies (files) to put on the tray before baking (`git add`).
- **Repository** = The finished tin of cookies. Once baked (committed), the recipe is stored permanently with a label, and you can always take an earlier tin back out if a later batch goes wrong.

The recipe scenario we will follow:

1. You write a shortbread recipe. The yield says 12 cookies.
2. You bake it and discover it actually makes 3. You fix the file and commit.
3. You taste them and realize 3 was also wrong. It actually makes 24. You fix it and commit again.
4. You realize the 24 cookie version was a mistake and you want your 3 cookie version back. You learn how to travel back in time.

## Learning Objectives

By the end of this lab, you will be able to:

- Install and configure Git on your machine
- Create and manage a GitHub account linked to your CMU email
- Navigate your file system using terminal commands
- Execute the core Git workflow: add, commit, push
- Revert a file back to an earlier committed version
- Install Node.js using a version manager

## Part 1: Installing & Configuring Git

Git is a version control system. It tracks every change you make to your files so you can always go back in time. Think of it as an infinite undo button for your entire project.

### Step 1: Check if Git is already installed

Run this command in your terminal:

```
git --version
```

If you see something like `git version 2.41.0`, Git is already installed. Skip to Step 3.

If you see an error or "command not found," continue to Step 2.

### Step 2: Install Git

**Mac/Linux:** Download the Mac installer from https://git-scm.com/downloads and follow the on screen steps. When finished, rerun `git --version`.

> Tip: On newer Macs, you may be prompted to install Xcode Command Line Tools. Go ahead and accept. It includes Git.

**Windows:** Download the Windows installer from https://git-scm.com/downloads and accept all the defaults during setup. When finished, open a new PowerShell window and run `git --version`.

> Tip: During installation, when asked about the default branch name, choose "main."

### Step 3: Configure your Git identity

Tell Git who you are. Run these two commands, replacing the placeholder text with your own info:

```
git config --global user.name "Your Full Name"
git config --global user.email "yourID@andrew.cmu.edu"
```

> Note: The quotation marks are required. Do not remove them.

**Why this step matters:** this does *not* create any account and is not the same as signing in anywhere. It simply labels every commit you make from this computer with your name and email, so when you (or a TA) look at the project history later, you can tell who made each change. This is a one time, local setting stored only on your machine. If you already ran this on this computer in a previous class, it's fine to skip; running it again just overwrites the same values.

Confirm your settings were saved:

```
git config --list
```

You should see your name and CMU email listed under `user.name` and `user.email`.

## Part 2: Setting Up GitHub

GitHub is where your Git repositories live in the cloud. It lets you back up your work, collaborate with teammates, and share your projects with instructors and TAs.

> Note: This is a separate thing from the Git identity you just configured in Part 1. Part 1 was a local setting on your computer. Part 2 is an actual online account you sign into. You'll connect the two in Step 10.

### Step 4: Create or verify your GitHub account

Find your situation below and follow only those steps.

**A. You already have a GitHub account with your CMU email.**
You are all set. Skip to Step 5.

**B. You do not have a GitHub account yet.**
1. Go to https://github.com/.
2. Click "Sign up" in the top right corner.
3. Enter your CMU email (`yourID@andrew.cmu.edu`), create a password, and choose a username.
   > Tip: pick a username you're fine using for the rest of the semester and beyond. TAs will add this exact username as a collaborator on every lab and project repo, so don't change it mid course.
4. Solve the verification puzzle if prompted, then click "Create account."
5. GitHub emails you a short verification code. Check your CMU inbox and enter the code on the page to confirm your email.
6. You'll land on a short "welcome" survey (team size, plan, interests). You can click through or skip most of it.
7. Continue to Step 5.

**C. You already have a GitHub account, but it's tied to a personal (non-CMU) email.**
Don't create a second account. That splits your commit history across two profiles and makes it harder to build a portfolio later. Instead, add your CMU email to your existing account:
1. Sign in to your existing account at https://github.com/.
2. Click your profile photo in the top right corner, then click "Settings."
3. In the left sidebar, click "Emails."
4. Under "Add email address," enter your CMU email (`yourID@andrew.cmu.edu`) and click "Add."
5. Check your CMU inbox for a confirmation email from GitHub and click the verification link.
   > You do not need to make this your primary or default email. Adding and verifying it is enough for this course's purposes.
6. Continue to Step 5, using this same account and its username for the rest of the course.

> Whichever path you followed, double check that Settings → Emails shows your CMU email as "Verified" before you move on. TAs use your GitHub username, not your email, to add you as a collaborator, so make sure whichever username you land on here is the one you intend to use all semester.

### Step 5: Create a new private repository on GitHub

1. Go to github.com and sign in.
2. Click the **+** icon in the top right corner and choose "New repository."
3. Name your repository `lab0-setup`.
4. Set visibility to **Private**.
5. Do not check any boxes for README, .gitignore, or license. Leave the repo empty.
6. Click "Create repository" and leave the page open. You will need the URL in Step 11.

> Tip: Keep your repositories private unless instructed otherwise. This protects your work from being copied by other students.

## Part 3: Git in Practice, The Cookie Recipe

Now let's put it all together. You will practice the full Git workflow using a simple text file before applying these same skills to real project code.

### Step 6: Create a local repository

In your terminal, create a new folder and initialize a Git repository inside it:

```
mkdir cookie_recipes
cd cookie_recipes
git init
```

After running `mkdir`, use `ls` to confirm the folder was created before moving into it:

```
ls
```

You should see `cookie_recipes` listed. Then move into it and run `git init`.

> Tip: `git init` creates a hidden `.git` folder inside your project that stores your entire version history. Never delete it!

### Step 7: Create a file and make your first commit

Create a new file called `shortbread.txt`.

**Mac/Linux:**
```
touch shortbread.txt
```

**Windows:** `touch` is a Linux/Mac command and will not work in PowerShell by default. Use this instead:
```
type nul > shortbread.txt
```

> If you don't already have a code editor installed, install VS Code now at https://code.visualstudio.com/. You'll use it starting in Lab 1, so it's worth setting up here.

Open the file in any text editor and add this content:

```
Shortbread Cookies

Yield: 12 cookies

Ingredients:
1 cup butter
1/2 cup powdered sugar
2 cups flour
```

Save the file, then check Git's view of your project:

```
git status
```

The file appears as untracked. Git sees it but is not watching it yet.

Add it to the staging area (place it on the baking tray):

```
git add shortbread.txt
```

> Tip: `git add shortbread.txt` stages just that one file. Very often, including constantly in future labs, you'll want to stage everything you changed at once instead of naming each file. For that, use `git add .` (the period means "everything in this folder"). You'll see `git add .` used a lot starting in Lab 1.

Commit it to the repository (bake it into the tin):

```
git commit -m "Add initial shortbread recipe, yield 12 cookies"
```

> Tip: Write commit messages that describe what changed and why. Your future self will thank you.

### Step 8: Make a change and view the difference

You just discovered the recipe actually yields 3 cookies, not 12.

Open `shortbread.txt` and change `Yield: 12 cookies` to `Yield: 3 cookies`.

Save the file, then see exactly what changed:

```
git diff shortbread.txt
```

Lines starting with `-` were removed. Lines starting with `+` were added.

Stage and commit the fix:

```
git add shortbread.txt
git commit -m "Fix yield: recipe makes 3 cookies, not 12"
```

### Step 9: Make another change and commit

You taste the cookies and realize 3 was also wrong. The actual yield is 24.

Open `shortbread.txt` and change `Yield: 3 cookies` to `Yield: 24 cookies`.

Save the file, then see exactly what changed:

```
git diff shortbread.txt
```

Stage and commit the correction:

```
git add shortbread.txt
git commit -m "Correct yield: recipe makes 24 cookies"
```

View the full history:

```
git log --oneline
```

You should now see three commits, one for each change you made. This is version control in action. Every saved state of your recipe is recorded and recoverable.

### Step 10: Revert to an earlier version (go back in time)

You look at all three commits and decide the 24 cookie version was actually a mistake. You want the 3 cookie version back. This is where version control becomes an infinite undo button.

First, look at your commit history along with the hash (ID) for each commit:

```
git log --oneline
```

You'll see something like:

```
a1b2c3d Correct yield: recipe makes 24 cookies
e4f5g6h Fix yield: recipe makes 3 cookies, not 12
i7j8k9l Add initial shortbread recipe, yield 12 cookies
```

You have two common ways to go back.

**Option A: Restore just the file to an old version, then commit that as a new change.** This is the safest option and it keeps your full history.

```
git checkout e4f5g6h -- shortbread.txt
git add shortbread.txt
git commit -m "Revert to yield: 3 cookies"
```

This copies `shortbread.txt` exactly as it was in that old commit, stages it, and commits it as a brand new commit. Nothing is deleted. Your history now shows all four states, in order.

**Option B: Undo the most recent commit with `git revert`.** This creates an automatic "undo" commit.

```
git revert HEAD
```

This creates a new commit that automatically reverses the changes from your last commit. Git will open a text editor for the commit message. Save and close it to confirm.

> Which should you use? `git checkout <hash> -- <file>` is great when you want to jump back to a specific older version of a file. `git revert` is great when you just want to undo the most recent commit. Both are safer than deleting commits, because they add to your history instead of erasing it.

Run `git log --oneline` again and confirm you now have a new commit reflecting the reverted content, and that `shortbread.txt` says `Yield: 3 cookies` again.

**STOP:** Show a TA your `git log --oneline` output with all commits, including your revert, visible before moving on.

### Step 11: Push to GitHub

Connect your local repo to the private GitHub repo you created in Step 5. Copy the HTTPS URL from your GitHub repository page, then run:

```
git remote add origin https://github.com/YOUR_USERNAME/lab0-setup.git
git branch -M main
git push -u origin main
```

After pushing, use `ls` to confirm your files are still in place locally:

```
ls
```

Refresh your GitHub repository page. Your files and all your commits, including the revert, should be visible online.

> Note: You can also use GitHub Desktop as a graphical alternative to the command line for cloning and pushing, if you prefer a visual interface.

**STOP:** Show a TA your GitHub repository with all commits visible in the commit history before moving on.

## Part 4: Installing Node.js

Node.js lets you run JavaScript outside the browser. We use it throughout this course to power Observable notebooks and build interactive data visualizations.

### Step 12: Check if Node.js is already installed

Run this command in your terminal:

```
node -v
```

If you see a version number, Node is already installed. Check whether it's v22 by running `node -v` and comparing to Step 14 below; if it's a different major version, follow Step 13 to install version 22 alongside it using a version manager (that's the whole point of using one, you're not stuck with just one version). If you get "command not found," continue to Step 13.

### Step 13: Install Node.js using a version manager

We use a version manager, a tool called **nvm** (Node Version Manager), so you can easily switch Node versions if needed later.

**Mac/Linux:**

Step 1, install nvm (Node Version Manager):
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

Step 2, activate nvm without restarting your terminal:
```
. "$HOME/.nvm/nvm.sh"
```

Step 3, install Node 22:
```
nvm install 22
```

**Windows:**

Step 1, install Chocolatey (run PowerShell as Administrator):
```
powershell -c "irm https://community.chocolatey.org/install.ps1|iex"
```

Step 2, install Node 22:
```
choco install nodejs-lts --version="22"
```

### Step 14: Verify the installation

You do not need to open a new terminal window, run these in the same terminal:

```
node -v
```
Expected: a version starting with `v22` (for example `v22.17.0` or `v22.23.2`). The exact minor and patch numbers don't matter, only the major version, `22`, does. Node gets small updates over time, so your exact number may not match a classmate's, and that's fine.

```
npm -v
```
Expected: a version starting with `10` (for example `10.9.2` or `10.9.8`). Same idea, only the major version `10` matters.

> Warning: If the major version doesn't match at all (for example you see `v18` or `v20` instead of `v22`), close your terminal, reopen it, and run the commands again before troubleshooting further.

**STOP:** Show a TA your terminal with `node -v` returning a `v22.x.x` version and `npm -v` returning a `10.x.x` version before moving on.

## Submission

Submit the following on Canvas:

- Your GitHub repo link (e.g. `https://github.com/YOUR-USERNAME/lab0-setup`)

> Warning: Make sure your repo is private, has at least 4 commits visible (including your revert), and add `shihongh`, `ygonz174`, and `lillian-zhao` as collaborators so we can grade your lab.

## Quick Reference: Essential Git Commands

| Command | What it does |
|---|---|
| `git init` | Create a new local repository |
| `git status` | See what files have changed |
| `git add <file>` | Stage a specific file for commit |
| `git add .` | Stage ALL changed files at once |
| `git commit -m "message"` | Save staged files with a descriptive message |
| `git log --oneline` | View a compact commit history |
| `git diff <file>` | See line by line changes not yet staged |
| `git checkout <hash> -- <file>` | Restore a file to how it looked in an earlier commit |
| `git revert <hash>` | Create a new commit that undoes a previous commit |
| `git push origin main` | Upload commits to GitHub |
| `git pull origin main` | Download latest commits from GitHub |
| `git clone <url>` | Download a remote repository to your machine |
| `git remote -v` | See which remote repository you are connected to |
| `git remote add origin <url>` | Connect your local repo to a GitHub repository |
| `git remote remove origin` | Disconnect from the current remote |
| `git branch <name>` | Create a new branch |
| `git checkout <branch>` | Switch to a branch |
| `git merge <branch>` | Merge a branch into the current one |

That's it! You have installed Git, set up GitHub, practiced version control (including reverting a mistake) with a cookie recipe, and installed Node.js.
