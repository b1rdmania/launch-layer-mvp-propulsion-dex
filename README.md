
# Launch Layer - Token Launchpad for Sonic Network

## Project info

**URL**: https://lovable.dev/projects/2ac71f54-2592-4b08-9239-8035f48c764c

## GitHub Integration

To link this project with GitHub:

1. Create a new GitHub repository on your GitHub account
2. From the Lovable interface, click the GitHub button in the top-right corner
3. Follow the prompts to connect your Lovable project to the GitHub repository
4. Once connected, any changes made via Lovable or GitHub will be synchronized

## Smart Contract Integration

This project integrates with the following smart contracts on Sonic Testnet:
- LaunchFactory: Factory contract for creating new token raises
- LaunchRaise: Individual raise contracts created by the factory
- ERC20: Standard token contract for tokens used in raises

To update the contract addresses:
1. Open `src/contracts/config.ts`
2. Update the addresses in the `CONTRACT_ADDRESSES` object

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/2ac71f54-2592-4b08-9239-8035f48c764c) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Ethers.js for blockchain interaction

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2ac71f54-2592-4b08-9239-8035f48c764c) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
