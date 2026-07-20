---
title: Graph Fundamentals
description: Core graph vocabulary — nodes, edges, triples, entities, attributes, relationships, adjacency, and traversal — that every later chapter builds on.
generated_by: claude skill chapter-content-generator
date: 2026-07-19 20:56:03
version: 0.09
---

# Graph Fundamentals

## Summary

This chapter introduces the core vocabulary of graphs — nodes, edges, and the
triples that connect them — that every later chapter in this book builds on.
It also introduces entities, attributes, and relationships as the semantic
layer laid on top of raw graph structure. After completing this chapter,
readers will be able to describe any graph using precise, consistent
terminology and distinguish a graph's structural elements from what those
elements represent in the real world.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Node
2. Edge
3. Directed Edge
4. Undirected Edge
5. Graph
6. Vertex
7. Triple
8. Subject
9. Predicate
10. Object
11. Entity
12. Attribute
13. Relationship
14. Adjacency
15. Graph Traversal

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

---

## Why Graph Vocabulary Comes First

Every field that works with connected information — computer science,
library science, legal knowledge management — has independently invented a
vocabulary for describing things and the connections between them. Before
this book can talk about ontologies, RDF, SPARQL, or matter graphs, it needs
a single, precise vocabulary that all of those later ideas can build on
without redefining terms every chapter.

A litigator tracking who represents whom on a matter, and a data scientist
tracking which proteins interact with which genes, are both drawing the same
underlying picture: a set of things, and a set of connections between those
things. This chapter gives that picture a name — a **graph** — and gives its
two building blocks names too: **nodes** and **edges**. Everything else in
this book is an elaboration on those three words.

## Nodes: The "Things" in a Graph

A **node** is a single point in a graph representing one discrete thing —
a person, a document, a concept, a server, a legal matter. In diagrams,
nodes are usually drawn as circles, boxes, or dots. A node by itself carries
no information about how it connects to anything else; it is simply a
labeled point that something else can point to.

Mathematicians who study graph theory formally almost always use a different
word for the same idea: a **vertex** (plural: *vertices*). "Node" and
"vertex" refer to the identical concept — a single point in a graph — but
the word you'll encounter depends on which community wrote the document
you're reading. Property-graph databases (the kind you'll use hands-on
starting in later chapters) consistently say "node." Academic graph-theory
papers, and the mathematical notation that underlies graph algorithms,
consistently say "vertex." This book uses "node" as the default term but
will use "vertex" when discussing graph theory in its more formal,
mathematical register.

Nodes on their own are not very interesting — a pile of unconnected dots
tells you nothing. What makes a graph useful is the second building block:
the connections between nodes.

Real-world things you might represent as nodes include:

- A person (e.g., an attorney, a client, a researcher)
- A document (e.g., a contract, a patent, a research paper)
- An organization (e.g., a law firm, a company, a university)
- A concept (e.g., a legal claim, a chemical compound, a course topic)
- A physical asset (e.g., a server, a piece of lab equipment)

## Edges: The Connections Between Nodes

An **edge** is a connection between exactly two nodes. If nodes are the
"things" in a graph, edges are the "relationships" — the fact that two
things are connected in some specific way. An edge is usually drawn as a
line or arrow connecting two node circles.

Edges come in two flavors, and the distinction matters throughout the rest
of this book:

- A **directed edge** points from one node to another, and the direction
  carries meaning. An arrow from "Attorney A" to "Matter #2024-001" labeled
  "represents" means something different than an arrow pointing the other
  way — the direction tells you who is doing the representing.
- An **undirected edge** simply states that two nodes are connected, with
  no implied direction. "Alice **knows** Bob" is symmetric — if Alice knows
  Bob, Bob knows Alice too, so an undirected edge captures the relationship
  accurately without needing to pick a direction.

Most real knowledge graphs — including the graph databases and RDF triple
stores you'll work with hands-on in later chapters — use directed edges
almost exclusively, because most real-world relationships (represents,
authored, depends on, cites) are not symmetric. This book will default to
directed edges unless a relationship is explicitly symmetric.

Before looking at a full graph, let's define one more piece of vocabulary
this diagram will use: two nodes connected by an edge are said to be
**adjacent** to each other. **Adjacency** is simply the property of being
directly connected by a single edge — no intermediate nodes involved.

#### Diagram: Graph Anatomy Explorer

<iframe src="../../sims/graph-anatomy-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Graph Anatomy Explorer</summary>
Type: graph-model

**sim-id:** graph-anatomy-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Bloom Taxonomy Level: Remember / Understand (L1/L2)<br/>
Bloom Taxonomy Verb: identify, label, describe

Learning objective: Students will be able to identify nodes, directed edges,
undirected edges, and adjacent node pairs in a small example graph, and
recall the vocabulary term for each element they click.

Purpose: Give learners a hands-on, low-stakes first encounter with graph
vocabulary using a small, easy-to-follow example graph before any
domain-specific (legal or scientific) graphs are introduced later in the
book.

Node types to show (6 nodes total):

1. "Ada" (person, circle, light blue)
2. "Ben" (person, circle, light blue)
3. "Chinook Labs" (organization, square, orange)
4. "Report 12" (document, rounded rectangle, gray)
5. "Ben" and "Ada" should be visually adjacent to each other and to "Chinook Labs"

Edges to show (5 edges total):

1. Ada — KNOWS — Ben (undirected edge, plain line, no arrowhead)
2. Ada — WORKS_AT — Chinook Labs (directed edge, arrow from Ada to Chinook Labs)
3. Ben — WORKS_AT — Chinook Labs (directed edge, arrow from Ben to Chinook Labs)
4. Ada — AUTHORED — Report 12 (directed edge, arrow from Ada to Report 12)
5. Chinook Labs — PUBLISHED — Report 12 (directed edge, arrow from Chinook Labs to Report 12)

Layout: Force-directed, so the graph naturally settles into a readable
arrangement regardless of window size.

Interactive features (required):

- Hovering any node shows a tooltip: "This is a NODE. It represents: [thing]."
- Hovering any edge shows a tooltip stating whether it is a DIRECTED or UNDIRECTED edge and reads the relationship aloud, e.g., "Directed edge: Ada → WORKS_AT → Chinook Labs."
- Clicking any node highlights every node adjacent to it (i.e., every node connected by exactly one edge) and displays an infobox: "ADJACENT NODES:" followed by their labels.
- A legend in the corner explains: circle = node, arrow = directed edge, plain line = undirected edge, highlighted nodes = adjacent to selection.
- The diagram must be responsive and re-layout cleanly on window resize.

Visual styling: Directed edges use arrowheads; undirected edges use plain
lines with no arrowhead, so the visual distinction is immediately obvious
even before a learner reads a tooltip.

Implementation: vis-network JavaScript library, canvas responsive to
container width, default height 500px.
</details>

## The Graph Itself

Put nodes and edges together and you have a **graph**: a collection of
nodes, plus a collection of edges connecting pairs of those nodes. That's
the entire formal definition — deliberately simple, because the power of
graphs comes from how flexibly this simple structure can model complicated
real-world systems, not from any complexity in the definition itself.

Every knowledge graph in this book — from a small example with six nodes to
a legal matter graph with thousands of documents, parties, and filings — is
built from nothing more than nodes and edges. The concepts introduced later
in this book (triples, ontologies, RDF, property graphs) are all different
ways of adding more structure, more meaning, and more rules on top of this
same simple foundation.

Now that nodes, edges, and the graph itself are defined, it's worth pausing
on the vocabulary itself. Because graphs are studied by mathematicians,
built by database engineers, and standardized by the semantic web community,
the same concepts sometimes travel under different names depending on which
community's document you're reading.

Before looking at the table below, recall that a node is also called a
vertex in formal graph theory, and that this book defaults to "node" while
noting the graph-theory equivalent for readers coming from a mathematics or
computer science background.

The following table summarizes the terminology introduced so far and the
alternate name you may encounter for each:

| This Book's Term | Also Called | Typically Used By |
|---|---|---|
| Node | Vertex | Graph theory / mathematics |
| Edge | Link, Arc | General usage / graph theory |
| Directed Edge | Arc | Graph theory |
| Undirected Edge | Link | Graph theory, social network analysis |
| Graph | Network | General usage |

## Triples: Subject, Predicate, Object

A **triple** is the smallest possible unit of factual knowledge in a graph:
one fact, expressed as exactly three parts. Every triple has a **subject**
(the node the fact is about), a **predicate** (the relationship or
property being asserted), and an **object** (the node or value the subject
is related to). Written out, a triple reads almost like a simple English
sentence: *subject – predicate – object*.

In fact, that similarity to sentence grammar is not a coincidence, and it's
worth calling out explicitly for readers newer to formal data modeling.

!!! tip "Triples read like simple sentences"
    If you can write a fact as a short sentence with one subject, one verb,
    and one object — "Attorney A represents Client B," "Gene X regulates
    Gene Y," "Contract C references Clause D" — you have already written a
    triple. The subject and object become two nodes; the verb becomes the
    predicate, expressed as a directed edge from subject to object. This is
    exactly the pattern behind RDF triples, introduced formally in
    [Chapter 4](../04-graph-data-models/index.md).

A directed edge, introduced earlier in this chapter, is really just the
predicate of a triple drawn as an arrow — the edge's label is the predicate,
its starting node is the subject, and its ending node is the object. Every
directed edge in a graph can be read as a triple, and every triple can be
drawn as a directed edge.

The following table shows the same triple structure applied across the two
domains this book focuses on — legal knowledge management and general
technical/scientific data — to make clear that the pattern is domain-agnostic:

| Subject | Predicate | Object |
|---|---|---|
| Attorney A | represents | Client B |
| Client B | is a party to | Matter #2024-001 |
| Contract C | references | Clause D |
| Gene X | regulates | Gene Y |
| Report 12 | was authored by | Ada |
| Chinook Labs | published | Report 12 |

## Entities, Attributes, and Relationships

So far, this chapter has described graphs purely in structural terms: nodes,
edges, and triples, without saying much about what they *mean*. But a node
labeled "Ada" is not useful on its own — a reader needs to know that "Ada"
refers to a real person, and that person has properties worth recording
(her job title, her employer) beyond just her name.

This is where three more terms come in, describing the *semantic layer*
laid on top of raw graph structure:

- An **entity** is the real-world thing a node represents — a specific
  person, document, organization, or concept. Where "node" describes a
  point in the graph's structure, "entity" describes what that point stands
  for in the world. Every node represents an entity, but "entity" is the
  word you use when you're talking about the real-world referent rather
  than the graph mechanics.
- An **attribute** is a property that belongs to a single entity, rather
  than a connection to another entity. A person's name, a document's filing
  date, a gene's chromosome location — these are attributes: facts *about*
  one thing, not facts connecting that thing to another node.
- A **relationship** is the meaningful, real-world connection an edge
  represents — the semantic content behind a directed edge, in the same way
  "entity" is the semantic content behind a node. "Represents,"
  "regulates," and "cites" are all relationships.

Put another way: nodes and edges are the *structure* of a graph. Entities,
attributes, and relationships are what that structure *means*. A single
graph database stores both — the structural layer (which the database
engine manipulates directly) and the semantic layer (which is what a human
reader, or a downstream reasoning system, actually cares about).

The distinction between an attribute and a relationship is one of the more
common sources of confusion for newcomers, so it's worth stating the rule
plainly:

- If a fact is a simple value belonging to one thing (a date, a name, a
  count), it's an **attribute**.
- If a fact connects one thing to *another* thing that could itself be a
  node with its own attributes, it's a **relationship**, expressed as an
  edge.

For example, "Contract C was signed on March 3, 2026" is an attribute of
Contract C — March 3, 2026 is a plain date value, not another node. But
"Contract C references Clause D" is a relationship, because Clause D is
itself a full entity with its own attributes (its text, its section
number), not just a value.

## Adjacency and Graph Traversal

With nodes, edges, entities, and relationships all defined, this chapter
closes with the concept that makes graphs *useful* rather than merely
descriptive: the ability to move through them.

Recall that two nodes connected directly by a single edge are called
**adjacent**. **Graph traversal** is the general process of moving from
node to node by following edges — starting at some node, and repeatedly
stepping to an adjacent node, one edge at a time, until you reach a goal or
have explored everything reachable from where you started.

Traversal is how every useful question about a graph actually gets
answered. "Who are all the attorneys who have ever represented a party
opposing this client?" is not a question about any single node — it's a
question that requires traversing outward from a starting node, edge by
edge, and collecting what you find along the way. Later chapters on
querying (Chapter 8) and graph algorithms (Chapter 9) are, at their core,
different disciplined ways of performing traversal.

Before working through the step-by-step example below, it helps to fix the
core traversal rule in mind: at each step, you are standing on exactly one
node, and you can only move to a node that is adjacent to it — that is,
connected by a single edge. You cannot "jump" to a distant node without
passing through every node along a connecting path.

#### Diagram: Step Through a Graph Traversal

<iframe src="../../sims/graph-traversal-stepper/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Step Through a Graph Traversal</summary>
Type: microsim

**sim-id:** graph-traversal-stepper<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy Level: Understand (L2)<br/>
Bloom Taxonomy Verb: explain, summarize

Learning objective: Students will be able to explain how graph traversal
moves from node to node along edges by stepping through a worked example
one edge at a time and predicting the next reachable node before it is
revealed.

Instructional Rationale: This is an Understand-level objective, so the
MicroSim uses a step-through pattern with Next/Previous buttons and full
data visibility at every stage, rather than continuous animation.
Continuous animation would let the traversal happen "to" the learner
rather than letting them predict and verify each step, which is what
builds real comprehension of the adjacency rule.

Canvas layout:

- Left side (500px): The same 6-node example graph from the Graph Anatomy Explorer diagram earlier in this chapter (Ada, Ben, Chinook Labs, Report 12, plus two additional nodes: "Report 45" and "Dana," connected so that Ada has three adjacent nodes: Ben, Chinook Labs, and Report 12).
- Right side (200px): A step list showing every node visited so far, in order, plus Next/Previous/Reset controls.

Data Visibility Requirements:

- Stage 0 (start): Show the full graph. Highlight the start node ("Ada") in green. Right panel shows "Visited: [Ada]" and "Currently at: Ada."
- Stage 1: Right panel lists Ada's adjacent nodes (Ben, Chinook Labs, Report 12) as clickable candidates before the learner picks one. Prompt: "Which node will we visit next? Pick any node adjacent to Ada."
- Stage 2: After the learner picks (e.g., "Chinook Labs"), highlight the edge just traversed in yellow, move the "current node" marker to Chinook Labs, and update the right panel: "Visited: [Ada, Chinook Labs]." Show Chinook Labs's adjacent nodes as the next set of candidates (Ada, Ben, Report 12 — note Ada is adjacent but already visited).
- Stage 3: Continue the same pattern for one or two more steps, always showing the full "Visited" list so far and the current node's full set of adjacent nodes as the next choice.
- Final stage: Right panel shows the complete path taken as an ordered list, and a plain-language sentence restating it: "You traversed from Ada to Chinook Labs to Report 45 by following two edges, one step at a time."

Interactive controls:

- Button: "Next" (advances one step; disabled until the learner has clicked a candidate node)
- Button: "Previous" (steps back)
- Button: "Reset" (returns to Stage 0)
- Clickable candidate nodes (the learner chooses the next step rather than watching an animation choose it for them)

Default parameters: Start node = Ada; no nodes visited except the start node.

Implementation notes: Use p5.js for rendering the graph and controls. Do NOT auto-animate between stages — every transition is learner-initiated by clicking a candidate node or the Next/Previous buttons. Store the graph as an adjacency list so "adjacent nodes" can be computed directly for the prompt at each stage.
</details>

## Key Takeaways

This chapter established the vocabulary every later chapter depends on:

- A **node** (also called a **vertex** in formal graph theory) represents
  one discrete thing.
- An **edge** connects exactly two nodes, and is either **directed**
  (order matters) or **undirected** (order doesn't matter).
- A **graph** is simply a collection of nodes plus a collection of edges
  connecting them.
- A **triple** — subject, predicate, object — is the smallest unit of
  factual knowledge in a graph, and reads like a simple sentence.
- **Entities**, **attributes**, and **relationships** describe what a
  graph's structure *means*, layered on top of the structural vocabulary
  of nodes and edges.
- Two nodes connected by one edge are **adjacent**; **graph traversal** is
  the process of moving from node to node across adjacent pairs, and it
  underlies every meaningful question you can ask a knowledge graph.

With this vocabulary in place, [Chapter 2](../02-data-storage-paradigms/index.md)
turns to how graphs are actually stored, and how graph databases differ
from the relational tables and document stores many readers already know.
