# Agri Market — Rwanda Agricultural Marketplace

Agri Market is a React + Vite project designed to connect farmers, buyers and food-processing businesses in Rwanda. It includes agricultural insights based on NISR 2025 crop data.

## Live Application

- **Frontend:** https://agri-market-gold.vercel.app/
- **Backend API:** https://agri-market-api-ck.onrender.com
- **GitHub Repository:** https://github.com/kechristian59-source/agri-market

## Main Features

- Agricultural insights using the NISR 2025 crop dataset.
- Farmer, buyer and business interfaces.
- Product listings and demonstration marketplace workflows.
- Processing-business directory and admin workspace.
- Express backend and PostgreSQL database foundation.

## Run Locally

Requirements: Node.js 22+ and npm.

```bash
cd frontend
npm ci
npm run dev
```

Open the local URL printed by Vite. The admin workspace is available at `/admin.html`.

## Deployment

- Frontend: Vercel
- Backend: Render
- Database: PostgreSQL hosted on Render

The frontend and backend are deployed separately. Environment variables, API configuration and CORS settings must match the deployed domains.

## Data and Attribution

The app uses the NISR 2025 crop dataset stored at `frontend/public/data/nisr_2025_crops.json`. Archived source data is maintained under `data/nisr_source_archive/`.

External data should be properly attributed. Processing-business directory entries must be verified before being presented as confirmed partners.

## Current Limitations

- Some product, order, chat and notification workflows remain browser-local demonstrations and are not synchronized between users.
- Browser `localStorage` data is specific to the browser and device.
- Real SMS OTP delivery requires a configured and tested SMS provider.
- Backend authentication and database functionality must be tested before real transactions.
- Demo-mode administration is not a secure production admin system.

## Security

Never commit `.env` files, passwords, API keys, database credentials or JWT secrets. Store production secrets privately in the hosting provider's environment settings.

## Hackathon Note

Agri Market is intended to support agricultural productivity and data-informed decision-making. Recommendations should be interpreted according to the source data and its limitations.

