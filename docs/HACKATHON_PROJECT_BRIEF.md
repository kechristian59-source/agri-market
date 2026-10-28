# Agri Market — NISR 2026 Big Data Hackathon

**Track:** Agricultural Productivity  
**Live application:** https://agri-market-gold.vercel.app/  
**GitHub repository:** https://github.com/kechristian59-source/agri-market

## 1. Executive Summary

Agri Market is a data-informed agricultural platform designed to bring crop insights, marketplace tools, and food-processing opportunities together in one application for Rwanda.

The platform uses agricultural records identified in the project as NISR 2025 crop data. It provides district- and season-based crop rankings, planting and harvest period information, and interfaces for farmers, buyers, and food-processing businesses.

Its purpose is to make selected agricultural information easier to explore and support informed decision-making. The platform does not guarantee future yields, prices, or market demand.

## 2. Problem Statement

Farmers and agricultural businesses need accessible information about crop production, planting and harvest periods, and opportunities to connect agricultural production with buyers and processors.

When agricultural information and marketplace services are separated, users may find it difficult to explore relevant data and identify possible value-chain opportunities.

Agri Market brings selected agricultural insights and marketplace-related tools together in a single web application.

## 3. Proposed Solution

Agri Market combines two areas:

### Agricultural insights
- Explore crop records by district and agricultural season.
- Rank crops using valid historical yield records.
- View planting and harvest period information where available.
- Display the source of the selected period and available supporting record counts.

### Marketplace and processing support
- Provide interfaces for farmers, buyers, and businesses.
- Support agricultural product listing and marketplace workflows.
- Provide a processing-business directory.
- Match selected crop categories with relevant processing-directory entries.

## 4. Dataset

The application dataset is stored at:

`frontend/public/data/nisr_2025_crops.json`

A local inspection of this file found:

| Characteristic | Count |
|---|---:|
| Total records | 69,173 |
| Provinces represented | 5 |
| Districts represented | 31 |
| Distinct crop names | 85 |
| Season A records | 34,369 |
| Season B records | 32,920 |
| Season C records | 1,884 |
| Records with missing or blank yield | 5,381 |

Fields include season, province, district, crop, category, plot area, crop area, yield, plot weight, planting period, and harvest period.

These figures describe the local JSON file and may change if the dataset is updated. Distinct crop names do not necessarily represent standardized crop species.

The original NISR publication title, download location, licence, publication date, and data-transformation steps should be verified against the original source before formal publication. Archived seasonal files are located in `data/nisr_source_archive/` and have differing column structures that require validation.

## 5. Crop Recommendation Method

The current implementation:

1. Filters records by the selected district and season.
2. Excludes records with missing, blank, or non-numeric yield values.
3. Groups records by normalized crop name.
4. Calculates a plot-weighted average yield using valid positive plot weights; otherwise, a weight of 1 is used.
5. Ranks crops by calculated average yield, using record count as a secondary ordering criterion.

Planting and harvest periods are selected from the most common specific period for the crop in the selected district and season. If unavailable, the application searches for the same crop and season across districts. If no specific period is available, a general seasonal estimate may be shown and identified as an estimate.

These recommendations summarize historical records. They are not a trained machine-learning forecast and do not independently account for soil conditions, future weather, input costs, current prices, or future market demand.

## 6. Innovation

Agri Market explores how agricultural data insights can be combined with marketplace and processing-related features in one application.

Its approach emphasizes:
- District- and season-based data exploration.
- A documented yield-ranking method.
- Visible source information for planting and harvest periods.
- Connections between agricultural production, buyers, and processing opportunities.

The practical value of these features should be evaluated through testing with intended users.

## 7. Expected Benefits

The project aims to:
- Make selected agricultural statistics easier to explore.
- Help users understand historical crop-yield patterns.
- Improve transparency around planting and harvest period information.
- Make marketplace and processing opportunities easier to explore.
- Support further development of data-informed agricultural tools.

These are intended benefits, not measured impact results. Any claims of actual impact require evidence from user testing and evaluation.

## 8. Evaluation Plan

Potential evaluation indicators include:
- Completeness and validity of key dataset fields.
- Whether users understand crop rankings and their limitations.
- Whether intended users can navigate the application and complete key workflows.
- Relevance of processing-directory matches.
- Application reliability and correct handling of errors.
- Feedback from farmers, buyers, and processing businesses.

Results should only be reported after the relevant tests have been conducted.

## 9. Technology and Deployment

The project uses React, Vite, JavaScript, Node.js, Express.js, and PostgreSQL.

- Frontend: Vercel
- Backend API: Render
- Database: PostgreSQL

The deployed application does not by itself establish that every workflow is production-ready.

## 10. Limitations and Future Work

Known limitations include:
- Some product, order, chat, and notification workflows use browser-local storage and may not synchronize between users or devices.
- Real SMS one-time-password delivery requires a configured and tested SMS provider.
- Original data provenance and licensing details require verification.
- Processing-business entries should be verified before being described as confirmed partners.
- Historical yield rankings are not guaranteed future outcomes.

Future work includes improving data documentation and validation, testing with intended users, strengthening cross-user data synchronization, verifying directory entries, and evaluating reliable contextual datasets.

## 11. Conclusion

Agri Market demonstrates an approach to bringing agricultural statistics, crop insights, marketplace workflows, and processing-related information together in one web application.

The project aims to support informed agricultural decision-making while making its data sources, methods, and limitations clear.
