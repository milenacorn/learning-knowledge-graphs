---
title: Step Through a Graph Traversal
description: A step-through MicroSim teaching graph traversal and adjacency by letting learners predict, then confirm, each move.
quality_score: 85
status: built
---
# Step Through a Graph Traversal

<iframe src="main.html" height="472px" width="100%" scrolling="no"></iframe>

[Run the Step Through a Graph Traversal MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## Embed This Visualization

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://milenacorn.github.io/learning-knowledge-graphs/sims/graph-traversal-stepper/main.html" height="472px" width="100%" scrolling="no"></iframe>
```

## Description

This MicroSim teaches **graph traversal** and **adjacency** — the two
concepts that close out [Chapter 1: Graph Fundamentals](../../chapters/01-graph-fundamentals/index.md).
It uses the same small example graph as the
[Graph Anatomy Explorer](../graph-anatomy-explorer/index.md) (Ada, Ben,
Chinook Labs, Report 12), extended with two more nodes — Report 45 and
Dana — both reachable only through Chinook Labs.

Rather than watching an animated traversal happen automatically, the
learner **predicts** the next step by clicking a node adjacent to the
current node, then **confirms** that prediction with the Next button. This
predict-then-verify sequence is deliberate: it's the pattern that best
supports an Understand-level objective ("explain how traversal works"),
where seeing concrete data at each stage matters more than watching a
smooth animation.

## How to Use

- The current node is highlighted **green**; nodes adjacent to it (valid
  next steps) are outlined in **orange**.
- Click any orange-outlined node to select it as your predicted next step —
  it turns **gold** and the right-hand panel confirms your selection.
- Click **Next** to confirm the move: the edge you traversed highlights
  gold, the node becomes the new current node, and it's added to the
  Visited list.
- Click **Previous** to undo the last confirmed move.
- Click **Reset** to return to the start node (Ada) with an empty path.
- Once you've taken at least one step, the panel shows a running sentence
  restating your whole path so far.

## Key Concepts

- Two nodes connected by a single edge are **adjacent** — only adjacent
  nodes are valid next steps, which is why non-adjacent nodes are dimmed
  and not clickable.
- **Graph traversal** is the process of moving from node to node across
  adjacent pairs, one edge at a time — you cannot jump to a distant node
  without passing through every node along a connecting path.
- Revisiting an already-visited node (shown with a small visit-order badge)
  is a legitimate traversal move, not an error.

## Lesson Plan

### Learning Objectives

After using this visualization, students will be able to:

- **Understand**: Explain how graph traversal moves from node to node
  along edges, by stepping through a worked example and predicting each
  next move before confirming it.
- **Remember**: Recall that only adjacent nodes are valid next steps in a
  traversal.

### Activities

1. **Predict before you click Next**: Before confirming each step, say out
   loud (or write down) which node you expect to become the new current
   node.
2. **Reach Report 45 and Dana**: Both require passing through Chinook Labs
   first — try to find the shortest path to each.
3. **Revisit a node on purpose**: Traverse back through an already-visited
   node and observe that the visit-order badge does not change — the first
   visit's number stays fixed.

### Assessment

- Can students correctly identify all nodes adjacent to Chinook Labs
  before clicking anything?
- Can students explain, in their own words, why Report 45 and Dana cannot
  be reached directly from Ada?
- Can students read the running summary sentence aloud and confirm it
  matches the path they intended to take?

## References

- [Chapter 1: Graph Fundamentals](../../chapters/01-graph-fundamentals/index.md)
- [Graph Anatomy Explorer](../graph-anatomy-explorer/index.md) — the companion MicroSim introducing the same example graph's vocabulary
