# Agri Market — Rwanda Agricultural Marketplace Prototype

Agri Market is a React + Vite prototype for connecting farmers, buyers and processing businesses, with product listings, local demo orders/messages/notifications, an NISR 2025 crop dataset and an admin workspace.

## Run locally

Requirements: Node.js 22+ and npm.

```bash
cd frontend
npm ci
npm run dev
```

Open the local URL printed by Vite. Open the Admin workspace at `/admin.html`.

## Publish as a web app using GitHub Pages

1. Create a new GitHub repository and upload/push the contents of this project (the folders `.github`, `frontend`, `backend`, `database` and this README must be at repository root).
2. In GitHub, open **Settings → Pages** and set the build/deployment source to **GitHub Actions**.
3. Push to branch `main` or `master`, or run the workflow manually under **Actions → Build and deploy Agri Market → Run workflow**.
4. After the workflow succeeds, GitHub shows the public Pages URL in the workflow deployment environment. The main app is at that URL; admin workspace is at `.../admin.html`.

GitHub Pages publishes the static frontend only. It does not run the Express backend or PostgreSQL database.

## What works in the static prototype

- Existing farmer/buyer/business user interface and local demo workflows from the supplied project.
- NISR 2025 crop insights loaded from `frontend/public/data/nisr_2025_crops.json`.
- Admin workspace for adding/editing/removing processing-directory records, deleting locally stored product records, managing local admin notices, and exporting/importing a JSON backup. Admin edits to the processing directory are read by the main app on the same browser/origin.
- GitHub Actions workflow builds and publishes the frontend.

## Important prototype limitations

- Browser `localStorage` data belongs to that browser/device and is not shared between users or synced to a server. The static prototype is suitable for a demo, not for real transactions.
- In demo mode, the Admin workspace is not secured and changes only that browser. In API mode (built with `VITE_API_BASE_URL`), Admin requires a server-side Admin account and JWT authorization; configure and test the backend before using it.
- GitHub Pages cannot host the Express API or PostgreSQL. To make multi-user data persistence and a protected Admin role real, deploy `backend/` to a Node hosting service and provision PostgreSQL; then wire frontend API calls to the deployed API, configure CORS and secrets, and complete security testing.
- In local demo mode, OTP codes are generated in the browser and shown for testing only. Do not present this as secure phone verification.
- In API mode, signup/login and password reset use the backend. Real production OTP requires Twilio credentials configured privately in the backend environment (`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and either `TWILIO_FROM` or `TWILIO_MESSAGING_SERVICE_SID`). Never commit these secrets.
- The server-side Admin login uses JWT role checks. It can manage processing-company records and inspect/delete database products. Product creation, orders, chat and notifications in the main marketplace UI are still local demo flows and are not yet synchronized across users; do not use this build for real transactions.
- Processing directory entries are leads/examples. Verify names, locations, contacts and operating status before presenting them as confirmed partners.
- The NISR 2025 JSON used by the app is served from `frontend/public/data/nisr_2025_crops.json`. Raw CSVs and backup copies are preserved under `data/nisr_source_archive/` and are not copied into the public deployment. Keep source/attribution with the submission and confirm NISR's hackathon data/IP terms before publication.

## Backend setup foundation

1. Provision PostgreSQL and apply `database/schema.sql`, then `database/admin.sql`.
2. Copy `backend/.env.example` to `backend/.env`; fill in real values privately. Never commit `.env`.
3. Set `NODE_ENV=production`, a `DATABASE_URL`, a random `JWT_SECRET` of at least 32 characters, `CORS_ORIGIN` to the exact GitHub Pages origin, and the Twilio environment values listed above.
4. Run `cd backend && npm ci && npm start` on a Node hosting service.
5. In GitHub, open **Settings → Secrets and variables → Actions → Variables**, add `VITE_API_BASE_URL` with the backend origin only (for example `https://your-api-host.example`, without `/api`). Re-run the Pages workflow so the frontend builds in API mode.
6. Use `node scripts/create-admin.mjs` from the backend directory to create the first server-side Admin account.

The GitHub Pages workflow deploys the static frontend only; the backend and PostgreSQL must be deployed separately. Verify `/health`, real SMS delivery, CORS, Admin login and the database before presenting API mode as production-ready.
