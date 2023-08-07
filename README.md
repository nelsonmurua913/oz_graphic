# Architecture Decision Record (ADR) - oz-cloud System Architecture

<p align="center">
  <a href="https://www.ozsports.is/" target="blank"><img src="https://assets.website-files.com/62c58eb5cb8ce19b27e911e5/62cee5c4448ae61afef81b08_logo_oz.png" width="200" alt="Oz Sports Logo" /></a>
</p>

## ADR-001: NestJS Project Setup

### Context

We need to set up a robust backend infrastructure for the oz-cloud system. NestJS is a popular framework that provides a well-organized structure and a modular approach to build scalable server-side applications with TypeScript.

### Decision

We will use NestJS as the framework for implementing the backend services of the oz-cloud system. NestJS provides a solid foundation for creating maintainable and scalable applications.

### Consequences

Using NestJS will allow us to leverage TypeScript and its strong typing system, making the codebase more robust and less error-prone. Additionally, NestJS provides a clear structure and encourages the use of decorators, making the codebase easy to read and understand.

## ADR-002: Reading Live Stream from External API

### Context

1. To fetch live stream data, we need to make a long-running HTTP GET request to the external API endpoint (https://live.test.wh.geniussports.com/).
   <br />
2. As multiple matches are played concurrently, we need to fetch live stream data for each match simultaneously.

### Decision

We will use Axios, a popular HTTP client, to read the live stream from the external API in our NestJS project.
<br />
We will utilize a cron job to retrieve available match IDs from the Genius API(REST), fetch the corresponding match information via Long Get HTTP by iterating all the available matchIDs, and emit events with topics containing the match information throught a Socket server. On the frontend, the data will be subscribed to and stored in the Redux Store for use in overlay widgets.

### Consequences

Using Axios will simplify the process of making HTTP requests and handling responses. It provides robust error handling and supports various features like request retries and request cancellation.
<br />
Using socket allows for real-time update of match information, ensuring that the fronend always displays the latest data without manual refresh. The architcture is designed to handle multiple concurrent matches and can scale as the number of matches increases.

## ADR-003: Analyzing Live Stream Data

### Context

Once we receive the live stream data from the external API, we need to analyze the data to determine which items will be used in the oz-cloud system.

### Decision

We will implement a data analysis module within the NestJS project to process and filter the received live stream data.

### Consequences

By performing data analysis within the system, we can efficiently process the incoming data and extract the relevant information required for the system's functionality.

## ADR-004: Neo4j Database for Storing Necessary Match Data

### Context

We need a database to store the necessary match data efficiently and with support for flexible querying.

### Decision

We will use Neo4j as the database to store necessary match data. Neo4j's graph database model allows for complex relationships and querying, which suits the requirements of the oz-cloud system.

### Consequences

Using Neo4j will enable us to store and retrieve match data with ease. The graph-based data model will facilitate querying and provide the ability to traverse relationships efficiently.

## ADR-005: Redis for In-Memory Data Store and BullMQ Integration

### Context

To improve performance, caching, and reduce loading time, we need an in-memory data store.

### Decision

We will use Redis as an in-memory data store. Additionally, we will integrate BullMQ, a Redis-backed queue library, to communicate with Redis.

### Consequences

Using Redis as an in-memory data store will significantly improve data access speed and reduce the load on the primary database. BullMQ integration will enable us to manage background jobs effectively, leading to enhanced system performance.

## ADR-006: NextJS Project Setup for Data Visualization

### Context

To present the data to users, we need a frontend application.

### Decision

We will set up a NextJS project to build the frontend application. NextJS provides server-side rendering capabilities and facilitates the integration of server-rendered React components.

### Consequences

NextJS will enable us to render the frontend on the server, enhancing initial loading speed and improving search cloud optimization. It will also allow us to build a dynamic and responsive user interface.

## ADR-007: Customized UI for Inputting Match Data

### Context

When the external API endpoint is down, users still need to input match data into the system.

### Decision

We will build a customized user interface within the NextJS project to allow users to manually input match data.

### Consequences

Having a customized user interface will ensure that users can continue to use the system even when the external API is unavailable. This feature will enhance the system's reliability and availability.

## ADR-008: Cloud Run and Docker for Deployment

### Context

We need a scalable and containerized deployment solution for the oz-cloud system.

### Decision

We will use Docker to create a container image encapsulating all the necessary tools and services, including NestJS, Neo4j, Redis, and the NextJS frontend. We will then deploy the Docker container on Cloud Run, a managed container platform on a cloud-based infrastructure.

### Consequences

Using Docker will ensure that the system runs consistently across different environments. Deploying on Cloud Run will provide auto-scaling and high availability, making the system resilient to varying traffic loads.

## ADR-009: Future Consideration - Kafka Integration

### Context

In the future, we may need to handle event streaming and real-time data processing at scale.

### Decision

We will consider integrating Kafka into the oz-cloud system for event streaming and real-time data processing, if the need arises.

### Consequences

Integrating Kafka will provide a robust and distributed messaging platform for handling real-time events, making the system more scalable and efficient.

---

Please note that this ADR outlines the decisions made for the initial implementation of the oz-cloud system. As the system evolves and new requirements arise, it is essential to document further architectural decisions following the same ADR format to maintain clarity and consistency.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
