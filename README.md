# Agri Market — Rwanda Agricultural Marketplace

**Agri Market** is a data-informed agricultural marketplace project designed to help connect farmers, buyers, and food-processing businesses in Rwanda. It combines agricultural insights based on NISR 2025 crop records with marketplace and processing-related features.

## Live Links

- **Live application:** https://agri-market-gold.vercel.app/
- **Backend API:** https://agri-market-api-ck.onrender.com/
- **GitHub repository:** https://github.com/kechristian59-source/agri-market

## Problem and Objective

Farmers and agricultural businesses need accessible information about crops, production, planting and harvest periods, as well as opportunities to connect agricultural production with buyers and processors.

Agri Market aims to bring selected agricultural data and marketplace tools together in one application. Its insights are intended to support informed decisions; they do not guarantee future yields, prices, or market demand.

## Main Features

- Agricultural insights based on NISR 2025 crop records.
- Crop recommendations filtered by selected district and agricultural season.
- Yield-based crop ranking using valid records and plot-weighted averages.
- Planting and harvest period information, with source indications where available.
- Interfaces for farmers, buyers, and businesses.
- Product listings and marketplace workflows.
- Processing-business directory and processing-related crop matching.
- Administrative workspace.
- React frontend, Express API, and PostgreSQL database foundation.

## Agricultural Dataset

The application dataset is located at:

`frontend/public/data/nisr_2025_crops.json`

A local inspection of this file found:

| Dataset characteristic | Count |
|---|---:|
| Total records | 69,173 |
| Provinces represented | 5 |
| Districts represented | 31 |
| Distinct crop names | 85 |
| Season A records | 34,369 |
| Season B records | 32,920 |
| Season C records | 1,884 |
| Records with missing or blank yield | 5,381 |

The dataset contains fields including season, province, district, crop, category, plot area, crop area, yield, plot weight, planting period, and harvest period.

These figures describe the local JSON file and may change if the dataset is updated. The counts of distinct crop names refer to names in the file and do not necessarily represent 85 standardized crop species.

### Data Source and Attribution

The application uses a dataset identified in the project as NISR 2025 crop data. Archived source files are stored in `data/nisr_source_archive/`.

Before formal publication, the original NISR dataset title, publication date, download location, licence, and any transformation steps should be documented from the original source materials. The archived seasonal files have differing column structures, so they should not be assumed to be directly interchangeable without validation.

## How Crop Recommendations Work

The current recommendation logic:

1. Filters records by the selected district and season.
2. Excludes records whose yield is missing, blank, or not numeric.
3. Groups records by crop name after basic name normalization.
4. Calculates a plot-weighted average yield, using a valid positive `plot_weight` where available and a weight of 1 otherwise.
5. Ranks crops by calculated average yield, with record count used as a secondary ordering criterion.

Planting and harvest periods are selected using this order:

1. The most frequently recorded specific period for that crop in the selected district and season.
2. The most frequently recorded specific period for the same crop and season across districts.
3. A general season estimate, clearly identified as an estimate rather than a crop-specific NISR record.

The application also displays source information and available record counts for the selected periods.

**Important interpretation:** These recommendations summarize historical dataset records. They are not a trained machine-learning forecast and do not independently account for soil conditions, weather forecasts, input costs, current prices, or future market demand.

## Technology

- React
- Vite
- JavaScript
- Express.js
- PostgreSQL
- Node.js

## Run the Frontend Locally

Requirements: Node.js 22+ and npm.

```bash
cd frontend
npm ci
npm run dev
```

## Student Project Team

Agri Market is a student project developed by students in the Food Science and Technology department.

### Project Members

- **Kubwakristu Christian** — Student, Level 2
- **MWIZERWA Costantin** — Student, Level 2

**Department:** Food Science and Technology  
**Academic Level:** Level 2

### Project Demo

[Watch the Agri Market Demo](agri-market-demo.mp4)

