import React from 'react';
import { Section, SectionGroup } from './types';
import { BookOpen, Code, Server, Database, Shield, Container, TestTube, Brain } from 'lucide-react';

export const GROUPS: SectionGroup[] = [
  { 
    label: 'Architecture & Core', 
    value: 'core-principles', 
    description: 'Foundational patterns: DDD, Clean Arch, SOLID.',
    icon: <BookOpen className="w-4 h-4" /> 
  },
  { 
    label: 'Frontend & UI', 
    value: 'frontend', 
    description: 'React, Next.js, TypeScript, and Web Vitals.',
    icon: <Code className="w-4 h-4" /> 
  },
  { 
    label: 'Backend & API', 
    value: 'backend', 
    description: 'REST, GraphQL, Node.js, and Python patterns.',
    icon: <Server className="w-4 h-4" /> 
  },
  { 
    label: 'Database & Data', 
    value: 'database', 
    description: 'SQL vs NoSQL, Indexing, and Caching.',
    icon: <Database className="w-4 h-4" /> 
  },
  { 
    label: 'Security', 
    value: 'security', 
    description: 'OWASP Top 10, Auth, and Secrets management.',
    icon: <Shield className="w-4 h-4" /> 
  },
  { 
    label: 'DevOps & Cloud', 
    value: 'devops', 
    description: 'Docker, CI/CD, Observability, and IaC.',
    icon: <Container className="w-4 h-4" /> 
  },
  { 
    label: 'QA & Testing', 
    value: 'testing', 
    description: 'TDD, E2E, and Property-based testing.',
    icon: <TestTube className="w-4 h-4" /> 
  },
  { 
    label: 'AI Persona', 
    value: 'ai-guidelines', 
    description: 'Personas for the Agent (Senior, Tech Lead, etc).',
    icon: <Brain className="w-4 h-4" /> 
  },
];

export const SECTIONS: Section[] = [
  // --- Core Principles ---
  {
    id: 'pragmatic-philosophy',
    title: 'Pragmatic Philosophy',
    category: 'core-principles',
    description: 'Timeless advice from The Pragmatic Programmer.',
    recommended: true,
    content: `## Pragmatic Philosophy (The Pragmatic Programmer)
- **ETC (Easier To Change)**: Good design is easier to change than bad design. Always ask: "Does this make the code easier to change?"
- **DRY (Don't Repeat Yourself)**: Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.
- **Orthogonality**: Eliminate effects between unrelated things. Changes in one module should not break another.
- **Tracer Bullets**: Build end-to-end functionality early to validate architecture, rather than building strictly layer-by-layer.
- **Broken Windows**: Fix bad designs, wrong decisions, and poor code when you see them.
`
  },
  {
    id: 'clean-architecture',
    title: 'Clean Architecture',
    category: 'core-principles',
    description: 'Hexagonal / Onion Architecture patterns.',
    recommended: true,
    content: `## Clean Architecture (Ports & Adapters)
- **Dependency Rule**: Source code dependencies must point only inward, toward high-level policies.
- **Entities**: Encapsulate Enterprise wide business rules.
- **Use Cases**: Encapsulate application-specific business rules.
- **Interface Adapters**: Convert data from the format most convenient for the use cases and entities, to the format most convenient for some external agency (Database, Web).
- **Frameworks & Drivers**: The outermost layer is generally composed of frameworks and tools such as the Database, the Web Framework, etc.
`
  },
  {
    id: 'solid-principles',
    title: 'SOLID Principles',
    category: 'core-principles',
    description: 'Object-Oriented Design Principles.',
    content: `## SOLID Principles
- **SRP (Single Responsibility)**: A class should have one, and only one, reason to change.
- **OCP (Open/Closed)**: Software entities should be open for extension, but closed for modification.
- **LSP (Liskov Substitution)**: Derived classes must be substitutable for their base classes.
- **ISP (Interface Segregation)**: Many client-specific interfaces are better than one general-purpose interface.
- **DIP (Dependency Inversion)**: Depend upon abstractions, not concretions.
`
  },
  {
    id: 'ddd-basics',
    title: 'Domain-Driven Design',
    category: 'core-principles',
    description: 'Strategic design, ubiquitous language, and bounded contexts.',
    content: `## Domain-Driven Design (DDD)
- **Ubiquitous Language**: Use the same language in the code as the domain experts use in conversation.
- **Bounded Contexts**: Explicitly define the boundaries within which a particular model applies.
- **Aggregates**: A cluster of domain objects that can be treated as a single unit. Ensure consistency within the aggregate boundary.
- **Entities vs Value Objects**: Entities have identity; Value Objects are defined by their attributes and are immutable.
`
  },
  {
    id: '12-factor',
    title: 'The Twelve-Factor App',
    category: 'core-principles',
    description: 'Methodology for building software-as-a-service apps.',
    content: `## The Twelve-Factor App
1. **Codebase**: One codebase tracked in revision control, many deploys.
2. **Dependencies**: Explicitly declare and isolate dependencies.
3. **Config**: Store config in the environment.
4. **Backing services**: Treat backing services as attached resources.
5. **Build, release, run**: Strictly separate build and run stages.
6. **Processes**: Execute the app as one or more stateless processes.
7. **Port binding**: Export services via port binding.
8. **Concurrency**: Scale out via the process model.
9. **Disposability**: Maximize robustness with fast startup and graceful shutdown.
10. **Dev/prod parity**: Keep development, staging, and production as similar as possible.
11. **Logs**: Treat logs as event streams.
12. **Admin processes**: Run admin/management tasks as one-off processes.
`
  },

  // --- Frontend ---
  {
    id: 'modern-react',
    title: 'Modern React Best Practices',
    category: 'frontend',
    description: 'Hooks, Functional Components, and composition.',
    recommended: true,
    content: `## Modern React Best Practices
- **Functional Components**: Use functional components with Hooks. Avoid class components.
- **Composition over Inheritance**: Build complex UIs by combining small, isolated components.
- **Custom Hooks**: Extract stateful logic into custom hooks (e.g., \`useUser\`, \`useFetch\`) to keep components clean.
- **Dependency Arrays**: Always include all used variables in \`useEffect\` and \`useCallback\` dependency arrays. Disable the linter rule only in exceptional cases.
- **Server State**: Use libraries like TanStack Query or SWR for server state, rather than \`useEffect\` + \`useState\`.
`
  },
  {
    id: 'typescript-strict',
    title: 'Strict TypeScript',
    category: 'frontend',
    description: 'Type safety, Generics, and avoiding "any".',
    recommended: true,
    content: `## TypeScript Guidelines
- **Strict Mode**: \`"strict": true\` must be enabled in \`tsconfig.json\`.
- **No Any**: Avoid \`any\`. Use \`unknown\` if the type is truly not known yet, and narrow it down with type guards.
- **Inference**: Rely on type inference for primitive variables; explicit types for function arguments and return values.
- **Zod / IO-TS**: Use runtime validation (like Zod) for data coming from external APIs or forms.
- **Discriminated Unions**: Use discriminated unions for modeling state transitions (e.g., \`{ status: 'loading' } | { status: 'success', data: T }\`).
`
  },
  {
    id: 'nextjs-app-router',
    title: 'Next.js App Router',
    category: 'frontend',
    description: 'Server Components, Streaming, and Layouts.',
    content: `## Next.js App Router Guidelines
- **Server Components by Default**: Use Server Components for data fetching and static markup.
- **Client Components**: Add \`"use client"\` only when interactivity (state, effects, event listeners) is needed.
- **Data Fetching**: Use \`fetch\` with caching options or ORM calls directly in Server Components.
- **Streaming**: Use \`<Suspense>\` to wrap slow data-fetching components to show partial UI immediately.
- **Route Handlers**: Use Route Handlers (\`route.ts\`) only for external public APIs; Server Actions are preferred for mutations called from the UI.
`
  },
  {
    id: 'css-tailwind',
    title: 'Tailwind CSS Patterns',
    category: 'frontend',
    description: 'Utility-first styling and maintainability.',
    content: `## Tailwind CSS Strategy
- **Utility First**: Avoid \`@apply\` unless creating reusable base typography or complex animations.
- **clsx / tailwind-merge**: Use these utilities to merge classes dynamically without conflicts.
- **Design Tokens**: Configure colors, spacing, and fonts in \`tailwind.config.js\`, do not hardcode arbitrary values (e.g. \`text-[17px]\`).
- **Mobile First**: Write default classes for mobile, then add \`md:\`, \`lg:\` prefixes for larger screens.
`
  },
  {
    id: 'accessibility',
    title: 'Accessibility (a11y)',
    category: 'frontend',
    description: 'ARIA, keyboard navigation, and semantic HTML.',
    content: `## Accessibility (a11y) Standards
- **Semantic HTML**: Use \`<button>\`, \`<nav>\`, \`<main>\`, \`<header>\` correctly. Don't use \`<div>\` with click handlers for interactive elements.
- **Keyboard Nav**: Ensure all interactive elements are focusable and usable via keyboard.
- **ARIA**: Use ARIA attributes only when standard HTML is insufficient.
- **Images**: All \`<img>\` tags must have an \`alt\` attribute. Use empty \`alt=""\` for decorative images.
- **Contrast**: Ensure text color contrast ratios meet WCAG AA standards.
`
  },

  // --- Backend ---
  {
    id: 'restful-api',
    title: 'RESTful API Design',
    category: 'backend',
    description: 'Resource naming, HTTP verbs, and status codes.',
    recommended: true,
    content: `## RESTful API Standards
- **Nouns not Verbs**: Paths should represent resources (e.g., \`/users\`, \`/orders\`), not actions (e.g., \`/getUsers\`).
- **HTTP Methods**: Use GET for retrieval, POST for creation, PUT/PATCH for updates, DELETE for removal.
- **Status Codes**: Return appropriate codes (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error).
- **Filtering & Pagination**: Use query parameters for filtering, sorting, and pagination (e.g., \`?page=2&limit=20&sort=-createdAt\`).
`
  },
  {
    id: 'node-best-practices',
    title: 'Node.js Best Practices',
    category: 'backend',
    description: 'Event loop, Async/Await, and Error handling.',
    content: `## Node.js Best Practices
- **Async/Await**: Use \`async/await\` over callbacks or raw promises.
- **Error Handling**: Use a centralized error handling middleware. Extend the built-in \`Error\` class for custom errors.
- **Validation**: Validate all incoming inputs (headers, body, query params) using a schema library like Joi or Zod.
- **Environment Variables**: Never commit secrets. Use \`dotenv\` or platform-specific config.
- **Logging**: Use a structured logger (e.g., Winston, Pino) instead of \`console.log\`.
`
  },

  // --- Database ---
  {
    id: 'database-indexing',
    title: 'Database Indexing Strategy',
    category: 'database',
    description: 'Performance optimization for SQL/NoSQL.',
    content: `## Database Indexing & Performance
- **Primary Keys**: Always define a primary key. Use UUIDs or ULIDs for distributed systems; Integers for simple internal apps.
- **Foreign Keys**: Index foreign key columns to speed up JOINs.
- **Query Analysis**: Use \`EXPLAIN ANALYZE\` to understand query performance.
- **N+1 Problem**: Watch out for N+1 query issues when fetching related data. Use batching (e.g., DataLoader) or JOINs.
`
  },
  {
    id: 'data-integrity',
    title: 'Data Integrity & Transactions',
    category: 'database',
    description: 'ACID properties and data consistency.',
    content: `## Data Integrity
- **ACID**: Ensure critical mutations happen within a Transaction (Atomicity, Consistency, Isolation, Durability).
- **Migrations**: Manage schema changes via migration scripts (e.g., Prisma Migrate, Liquibase). Never change schema manually in production.
- **Soft Deletes**: Consider using a \`deleted_at\` timestamp instead of removing rows physically, if audit trails are important.
`
  },

  // --- Security ---
  {
    id: 'owasp-top-10',
    title: 'OWASP Top 10 Mitigation',
    category: 'security',
    description: 'Protecting against common web vulnerabilities.',
    recommended: true,
    content: `## Security (OWASP Top 10)
- **Injection**: Use parameterized queries (Prepared Statements) or an ORM to prevent SQL Injection.
- **Broken Auth**: Enforce strong passwords, implement MFA, and do not ship default credentials.
- **Sensitive Data**: Encrypt sensitive data at rest and in transit (TLS). Do not log PII or secrets.
- **Broken Access Control**: Deny by default. Verify permissions on every request at the data access level.
- **Vulnerable Components**: Regularly update dependencies (\`npm audit\`).
`
  },
  {
    id: 'auth-standards',
    title: 'Authentication & Authorization',
    category: 'security',
    description: 'JWT, OAuth, and RBAC.',
    content: `## Auth Standards
- **Passwords**: Hash passwords using slow algorithms (Argon2, bcrypt). Never store plain text.
- **JWTs**: Store short-lived access tokens in memory or httpOnly cookies. Use refresh tokens for long sessions.
- **RBAC**: Implement Role-Based Access Control. Map users to roles, and roles to permissions.
- **Least Privilege**: Services and database users should only have the permissions necessary to perform their function.
`
  },

  // --- DevOps ---
  {
    id: 'docker-containers',
    title: 'Docker & Containerization',
    category: 'devops',
    description: 'Dockerfile best practices and optimization.',
    content: `## Docker Best Practices
- **Multi-stage Builds**: Use multi-stage builds to keep production images small (e.g., build in \`node:latest\`, run in \`node:alpine\`).
- **Non-root User**: Run the application as a non-root user inside the container for security.
- **Layer Caching**: Order \`COPY\` commands from least to most frequently changed (e.g., \`package.json\` before source code) to maximize cache hits.
- **.dockerignore**: Use \`.dockerignore\` to prevent \`node_modules\`, secrets, and build artifacts from entering the build context.
`
  },
  {
    id: 'cicd-pipelines',
    title: 'CI/CD Pipelines',
    category: 'devops',
    description: 'Automation for testing and deployment.',
    content: `## CI/CD Guidelines
- **Automated Testing**: Run Unit and Integration tests on every Pull Request.
- **Linting & Formatting**: Enforce style guides (ESLint, Prettier) automatically in the pipeline.
- **Preview Environments**: Spin up ephemeral environments for each PR to allow manual testing.
- **Immutable Artifacts**: Build once, deploy anywhere. The same Docker image should move from Staging to Production.
`
  },

  // --- Testing ---
  {
    id: 'testing-pyramid',
    title: 'The Testing Pyramid',
    category: 'testing',
    description: 'Balancing Unit, Integration, and E2E tests.',
    recommended: true,
    content: `## Testing Strategy
- **Unit Tests**: Fast, isolated tests for individual functions/classes. Should make up the majority of the suite.
- **Integration Tests**: Verify that modules work together (e.g., API endpoint talking to a database container).
- **E2E Tests**: Test the full user journey (e.g., Cypress, Playwright). Slow and brittle, so use sparingly for critical paths.
- **Test Behavior**: Test *what* the code does, not *how* it does it. Avoid testing private methods.
`
  },
  {
    id: 'tdd',
    title: 'Test-Driven Development (TDD)',
    category: 'testing',
    description: 'Red-Green-Refactor cycle.',
    content: `## TDD Workflow
1. **Red**: Write a failing test that defines the desired behavior.
2. **Green**: Write the minimum code necessary to pass the test.
3. **Refactor**: Clean up the code while keeping the test passing.
- **Confidence**: TDD ensures high test coverage and design testability from day one.
`
  },

  // --- AI Guidelines ---
  {
    id: 'persona-tech-lead',
    title: 'Persona: The Senior Tech Lead',
    category: 'ai-guidelines',
    description: 'Authoritative, concise, and architectural focus.',
    recommended: true,
    content: `## AI Persona: Senior Tech Lead
- **Role**: You are an expert Senior Software Engineer and Tech Lead.
- **Tone**: Professional, concise, authoritative but helpful.
- **Constraint**: Do not apologize. Do not fluff. Go straight to the solution.
- **Code Style**: Prefer clean, readable, modern code over clever "one-liners".
- **Safety**: Always prioritize security and data integrity. Warn the user if a request is dangerous.
`
  },
  {
    id: 'persona-pair-programmer',
    title: 'Persona: The Pair Programmer',
    category: 'ai-guidelines',
    description: 'Collaborative, explanatory, and Socratic.',
    content: `## AI Persona: Empathetic Pair Programmer
- **Role**: You are a helpful, collaborative pair programmer.
- **Method**: Explain your thought process step-by-step (Chain of Thought).
- **Engagement**: Ask clarifying questions if the requirements are ambiguous.
- **Teaching**: When introducing a complex pattern, briefly explain *why* it is being used.
`
  },
  {
    id: 'code-gen-rules',
    title: 'Code Generation Rules',
    category: 'ai-guidelines',
    description: 'Strict rules for outputting code blocks.',
    recommended: true,
    content: `## Code Generation Rules
- **Completeness**: Do not leave placeholders like \`// ... rest of code\` unless explicitly asked for brevity.
- **Language**: Always specify the language in markdown code blocks (e.g., \`\`\`typescript).
- **Imports**: Include necessary imports at the top of code snippets.
- **Comments**: Comment complex logic, but avoid commenting obvious code.
- **File Names**: Suggest file names and paths for the generated code.
`
  }
];