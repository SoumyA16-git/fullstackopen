# Full Stack Open — Part 11: CI/CD (Continuous Integration / Delivery)

This folder links to the two standalone GitHub repositories created and verified for Part 11 exercises:

---

## 🔗 Repositories & Submissions (Exercise 11.23)

### 1. Primary Repository: Pokedex (Exercises 11.2 – 11.20)
- **GitHub Repository**: [https://github.com/SoumyA16-git/fs-pokedex](https://github.com/SoumyA16-git/fs-pokedex)
- **Live Deployed App**: [https://fs-pokedex-4bka.onrender.com](https://fs-pokedex-4bka.onrender.com)
- **Health Check Endpoint**: [https://fs-pokedex-4bka.onrender.com/health](https://fs-pokedex-4bka.onrender.com/health)
- **Version Endpoint**: [https://fs-pokedex-4bka.onrender.com/version](https://fs-pokedex-4bka.onrender.com/version)
- **CI/CD Pipeline**: [`.github/workflows/pipeline.yml`](https://github.com/SoumyA16-git/fs-pokedex/blob/main/.github/workflows/pipeline.yml) (Lint, Jest unit tests, Playwright E2E tests, Render deploy hook, Discord alerts, Semantic Versioning)
- **Periodic Health Check**: [`.github/workflows/periodic-health-check.yml`](https://github.com/SoumyA16-git/fs-pokedex/blob/main/.github/workflows/periodic-health-check.yml) (Daily cron health monitor)

### 2. Secondary Repository: Bloglist CI/CD (Exercises 11.21 & 11.22)
- **GitHub Repository**: [https://github.com/SoumyA16-git/fullstackopen-bloglist-ci](https://github.com/SoumyA16-git/fullstackopen-bloglist-ci)
- **PR for Review (Exercise 11.22)**: [PR #1](https://github.com/SoumyA16-git/fullstackopen-bloglist-ci/pull/1)
- **Collaborator Invitation for Course Reviewers**: [https://github.com/SoumyA16-git/fullstackopen-bloglist-ci/invitations](https://github.com/SoumyA16-git/fullstackopen-bloglist-ci/invitations)
- **CI/CD Pipeline**: Backend testing, Frontend Vitest tests, Production build, Deployment trigger, and Tagging.

---

## 📋 Completed Exercises Summary

- **11.2 – 11.9**: Repository initialization, Hello World workflow, ESLint CI, code & line-ending fixes, Jest testing, navigation bug fix, Playwright E2E tests.
- **11.10 – 11.12**: `/health` & `/version` endpoints, Render build script, cloud deployment hook.
- **11.13 – 11.17**: PR workflow, main-only deployment, semantic version tagging (`v0.0.1`), `#skip` commit condition, branch protection on `main`.
- **11.18 – 11.20**: Discord webhook notifications, modular pipeline jobs, periodic health check cron workflow.
- **11.21 – 11.22**: Own application CI/CD pipeline for Bloglist, protected main branch, collaborator invite and review PR for `@mluukkai`.
- **11.23**: Repository documentation and cross-links.
