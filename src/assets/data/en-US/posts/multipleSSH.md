## Multiple SSH keys in the pc

Setting up two separate SSH keys was something I wanted to do since I started working at ISTEO and had to create a professional account on `GitHub`. After searching a bit but never finding a complete and easy-to-understand tutorial, and with a pinch of procrastination, I finally decided to learn how to do it. So, I present to you the way I configure my multiple keys.

For the sake of this article, personal = Github and work = Github, but obviously do what you need to do.

# Step 1: Navigate to the right location

All of your SSH keys need to be stored in `~/.ssh`, so navigate there using:

`cd ~/.ssh`

The ~ means the root of your user directory, which should make your SSH keys accessible no matter where you navigate to in your file structure, so long as you are logged into the correct user.

# Step 2: Create the SSH keys

Next you will need to generate the keys. Start by creating your personal key:

```bash
ssh-keygen -t rsa -C "name@personal_email.com"
```

Hit enter.

It will prompt you for a file name, you should name it something like: `id_rsa_personal`

This will print out a big chuck of text for your fingerprint. You can ignore that, we’ll grab what we need from the key after.

Now create your work key:

```bash
ssh-keygen -t rsa -C "name@work_email.com"
```

Hit enter.

This time, when it prompts you for a file name, use `id_rsa_work`

These each will create two files (so four in total), one with the name you entered, and a second with .pub at the end of it.

# Step 3: Create a config file

Still in the same terminal, try using ls to see if a file name config exists. If it does, use `code config` to open it up in your code editor. If it doesn’t exist, you can create it by using `touch config`, then open it with `code config`. Copy and paste the following in your config:

```bash
# Personal Account: (Your-Github-Account-Name)

Host github.com-(Your-Github-Account-Name)
HostName github.com
User git
IdentityFile ~/.ssh/id_rsa_personal

# Work Account: (Your-Work-Github-Account-Name)

Host github.com-(Your-Work-Github-Account-Name)
HostName github.com
User git
IdentityFile ~/.ssh/id_rsa_work

```

# Step 4: Add the keys to the Agent

In a new admin elevated PowerShell window, ensure the ssh-agent is running. You can use the "Auto-launching the ssh-agent" instructions in "Working with SSH key passphrases", or start it manually:

```bash
# start the ssh-agent in the background
Get-Service -Name ssh-agent | Set-Service -StartupType Manual
Start-Service ssh-agent
```

First, let's check the list of keys already watched by the ssh-agent

```bash
ssh-add -l
```

If your key isn't already watched, you need to add it to the list.
In a terminal window without elevated permissions, add your SSH private key to the ssh-agent. If you created your key with a different name, or if you are adding an existing key that has a different name, replace id_rsa_personal in the command with the name of your private key file.

```bash
ssh-add c:/Users/YOU/.ssh/id_rsa_personal
```

Then do it to the work key too

```bash
ssh-add c:/Users/YOU/.ssh/id_rsa_work
```

# Step 5: Add keys to your accounts

Next you will need to grab the actual key to add to either account. To do this, you can type the command:

```bash
clip < ~/.ssh/id_rsa_personal.pub
```

The key will be copied. You can then navigate to the SSH keys section of Github and paste your new key in!
Repeat with `clip < ~/.ssh/id_rsa_work.pub` and you will be golden!

Try to pull or clone a repo from either account and see if it works. You might have to reload your config file (from ~/.ssh type in source config), but if you do happen to get an error while trying, use the next step. If you don’t get an error, then you are done setup and can jump to step 6.

# Step 6: Clone your repo with the correct host

In step 3, we created a field called Host for each of our SSH keys. In my example, I named them after the website used for source control. If you decided to name yours something else, make sure you reference it when you clone a new repo. In my case, I can clone the repository with the following command:

```bash
git clone git@github.com-(Chosen-Name-For-Configuration-User-Or-Work):(name-of-account-organization)/repo-name.git

Example: git clone git@github.com-PersonalConfig:LeonardoSarmento/portfolio.git
```

Hopefully that helps!

---
