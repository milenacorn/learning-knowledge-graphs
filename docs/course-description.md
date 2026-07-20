---
title: Course Description for Course Learning Knowledge Graphs
description: A detailed course description for Learning Knowledge Graphs including overview, topics covered and learning objectives in the format of the 2001 Bloom Taxonomy
quality_score: 99
---

# Course Description

This file is the seed document used by the learning-graph-generator skill to
enumerate concepts, build the dependency graph, and assign concepts to a
taxonomy. Keep it focused, concrete, and free of marketing language.

A good course description includes:

- **Title** — same as `site_name` in `mkdocs.yml`
- **Audience** — who this book is for and what they already know
- **Prerequisites** — concepts the reader is assumed to have mastered
- **Topics** — the major areas the book covers (typically 8–20 topics)
- **Bloom's Taxonomy outcomes** — what the reader should be able to *remember,
  understand, apply, analyze, evaluate,* and *create* by the end

Run the `course-description-analyzer` skill to validate completeness, then run
`learning-graph-generator` to enumerate ~200 concepts with dependencies.

---

## Title

Learning Knowledge Graphs

## Why This Book Matters

Knowledge graphs sit at the center of two converging trends: they are the
backbone that grounds large language models in verifiable facts (via GraphRAG
and similar retrieval patterns), and they are increasingly used inside
professional-services organizations — including law firms — to connect
matters, documents, people, and precedent. A reader who understands both the
classical semantic-web foundations and the modern LLM-integration patterns is
equipped to evaluate, build, or commission a knowledge graph project in
either a technical or a legal knowledge-management setting.

## Audience

This book is written for two overlapping groups of tech-forward readers:

- **Legal professionals** — lawyers, legal knowledge managers, legal operations
  staff, and law librarians who are comfortable adopting new technology and
  want to understand knowledge graphs well enough to evaluate, commission, or
  contribute to a legal knowledge graph project (matter graphs, citation
  networks, expertise location, conflicts checking).
- **Scientists, engineers, and developers** who want a structured, hands-on
  introduction to knowledge graphs — from modeling through querying,
  analytics, and integration with modern LLM-based tools.

Both groups are assumed to be curious about the underlying technology rather
than looking for a purely conceptual overview — the book includes runnable
code and real query examples throughout, not just diagrams.

## Prerequisites

- Comfort with basic set and relationship concepts (e.g., categories,
  hierarchies, many-to-many relationships) — no formal mathematics beyond
  that is assumed.
- Familiarity with at least one programming language is helpful for the
  hands-on chapters (examples use Python) but is not required to follow the
  conceptual chapters.
- No prior knowledge of RDF, OWL, SPARQL, Cypher, graph databases, or the
  semantic web is assumed — these are introduced from first principles.
- Prior exposure to taxonomies, thesauri, or document classification systems
  (e.g., from legal knowledge management, library science, or information
  architecture) is helpful but not required.

## Topics

1. What is a knowledge graph — nodes, edges, and triples, contrasted with
   relational tables and document/folder-based systems
2. From taxonomies to ontologies — controlled vocabularies, thesauri, and
   formal class hierarchies
3. Graph data models — RDF triples vs. labeled property graphs, and when to
   use each
4. Modeling concepts and relationships — entities, classes, properties,
   cardinality, and schema design
5. Semantic web standards — RDF, RDFS, OWL, SKOS, and SPARQL
6. Building a knowledge graph from data — sources, ETL, entity extraction,
   and entity resolution/deduplication
7. Querying knowledge graphs — SPARQL and Cypher, with Python client examples
8. Graph algorithms and analytics — centrality, community detection, and
   path-finding
9. Knowledge graphs and machine learning — embeddings, graph neural networks,
   and link prediction
10. Knowledge graphs meet large language models — GraphRAG, LLM-grounded
    retrieval, and LLM-assisted graph construction
11. Case studies across industries — search, biomedical research, enterprise
    knowledge management, and recommendation systems
12. Legal and enterprise knowledge graphs — matter/document graphs, citation
    networks, expertise location, and conflicts checking
13. Governance, quality, and maintenance — versioning, provenance, data
    quality, and keeping a graph current over time
14. Capstone — designing, building, querying, and visualizing an original
    knowledge graph project

## Topics Not Covered

- General relational database administration and performance tuning
- Deep distributed-systems or cloud-infrastructure operations for hosting
  graph databases at scale
- Legal doctrine, case law, or substantive legal analysis beyond illustrative
  examples
- General statistics or machine learning theory beyond what is needed to
  understand embeddings and graph neural networks conceptually
- Building or fine-tuning large language models from scratch

## Learning Outcomes

By the end of this book, the reader will be able to:

### Remember

- List the core graph primitives: node, edge, triple, and property.
- Name the major semantic web standards: RDF, RDFS, OWL, SKOS, and SPARQL.
- Identify the two dominant graph data models: RDF triple stores and labeled
  property graphs.
- Recall the stages of building a knowledge graph, from source data through
  governance.

### Understand

- Explain the difference between a taxonomy, an ontology, and a full
  knowledge graph.
- Explain when a property graph model is preferable to an RDF triple store,
  and vice versa.
- Describe how entity resolution and deduplication address the same
  real-world entity appearing under different labels or identifiers.
- Explain how GraphRAG grounds large language model outputs in a knowledge
  graph.

### Apply

- Model a real-world domain (e.g., a legal matter or a scientific dataset)
  as a graph schema.
- Write basic SPARQL queries to retrieve and traverse RDF data.
- Write basic Cypher queries to retrieve and traverse property-graph data.
- Use a Python graph client library to load and query a small dataset.

### Analyze

- Apply centrality measures to identify the most influential entities in a
  graph.
- Apply community detection to find clusters of related entities.
- Diagnose data-quality and entity-resolution issues in a constructed graph.
- Trace a multi-hop path between two entities and explain what it reveals
  about their relationship.

### Evaluate

- Compare RDF vs. property graph models for a given use case and justify a
  recommendation.
- Assess whether manual curation or LLM-assisted extraction better fits a
  project's accuracy and cost constraints.
- Critique a knowledge graph schema for missing, ambiguous, or redundant
  relationships.
- Judge whether a legal or enterprise knowledge graph's governance plan is
  sufficient to keep it current.

### Create

- Design a graph schema (classes, properties, cardinality) for an original
  domain.
- Build and populate a knowledge graph from a real or realistic dataset.
- Query and visualize the resulting graph to answer a specific question.
- Draft a governance plan (versioning, provenance, update cadence) for
  keeping the graph current.
