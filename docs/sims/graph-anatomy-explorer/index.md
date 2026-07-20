---
title: Graph Anatomy Explorer
description: An interactive vis-network diagram teaching node, edge, directed/undirected edge, and adjacency vocabulary.
quality_score: 85
status: built
---
# Graph Anatomy Explorer

<iframe src="main.html" height="502px" width="100%" scrolling="no"></iframe>

[View Graph Anatomy Explorer Fullscreen](./main.html){ .md-button .md-button--primary }

## Embed This Visualization

Place the following line in your website to include this visualization:

```html
<iframe src="https://milenacorn.github.io/learning-knowledge-graphs/sims/graph-anatomy-explorer/main.html" height="502px" width="100%" scrolling="no"></iframe>
```

## Overview

This MicroSim is a small, four-node example graph (Ada, Ben, Chinook Labs,
and Report 12) used in [Chapter 1: Graph Fundamentals](../../chapters/01-graph-fundamentals/index.md)
to give learners a first hands-on encounter with graph vocabulary before any
domain-specific (legal or scientific) graphs appear later in the book.

## How to Use

- Hover any node to see a tooltip confirming it is a **node** and what
  real-world thing it represents.
- Hover any edge to see whether it is a **directed** or **undirected** edge,
  read as a subject &ndash; predicate &ndash; object triple.
- Click a node to highlight every node **adjacent** to it (green) and see
  the list in the right-hand panel.
- Click empty space, or the Reset button, to clear the selection.

## Graph Structure

Four nodes and five edges, deliberately small so every relationship can be
inspected in a single view.

### Nodes

| Node | Type | Shape/Color |
|---|---|---|
| Ada | Person | Blue ellipse |
| Ben | Person | Blue ellipse |
| Chinook Labs | Organization | Orange box |
| Report 12 | Document | Gray box |

### Edges

| Subject | Predicate | Object | Directed? |
|---|---|---|---|
| Ada | KNOWS | Ben | No (undirected) |
| Ada | WORKS_AT | Chinook Labs | Yes |
| Ben | WORKS_AT | Chinook Labs | Yes |
| Ada | AUTHORED | Report 12 | Yes |
| Chinook Labs | PUBLISHED | Report 12 | Yes |

## Key Concepts

- A **node** represents one discrete thing (a person, organization, or document).
- An **edge** connects exactly two nodes; it is either **directed** (order
  matters, drawn with an arrow) or **undirected** (order doesn't matter,
  drawn as a plain line).
- Two nodes connected by a single edge are **adjacent**.

## Lesson Plan

### Learning Objectives

After using this visualization, students will be able to:

- **Remember**: Recall the vocabulary terms node, edge, directed edge, undirected edge, and adjacency.
- **Understand**: Explain, for any edge in the diagram, whether it is directed or undirected and why.

### Activities

1. **Explore the Graph**: Hover every node and edge before clicking anything.
2. **Identify Patterns**: Click each node in turn and note how many neighbors it has.
3. **Trace Dependencies**: Read each edge aloud as a subject &ndash; predicate &ndash; object sentence.

### Assessment

- Can students correctly identify which edges are directed vs. undirected?
- Can students name all nodes adjacent to "Ada" without clicking (then verify by clicking)?
- Can students explain, in their own words, what "adjacent" means?

## References

- [Chapter 1: Graph Fundamentals](../../chapters/01-graph-fundamentals/index.md)
- [vis-network documentation](https://visjs.github.io/vis-network/docs/network/)
