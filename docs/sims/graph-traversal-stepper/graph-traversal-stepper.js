// Step Through a Graph Traversal - p5.js MicroSim
// CANVAS_HEIGHT: 470
// Chapter 1: Graph Fundamentals - teaches Graph Traversal and Adjacency
// Bloom Level: Understand (L2) - Verb: explain
// Learning objective: Students will be able to explain how graph traversal
// moves from node to node along edges by stepping through a worked example
// one edge at a time and predicting the next reachable node before it is
// revealed.
// Instructional pattern: step-through with Next/Previous, no auto-animation.
// The learner clicks a candidate (adjacent) node to predict the next step,
// then confirms with "Next" to reveal/commit the move - this predict-then-
// verify sequence is what an Understand-level objective calls for, per the
// microsim-generator skill's Bloom-to-pattern mapping.
// MicroSim template version 2026.03

// ===========================================
// CANVAS LAYOUT (standard MicroSim variables)
// ===========================================
let containerWidth;
let canvasWidth = 700;
let drawHeight = 420;     // graph + step panel area (no controls here)
let controlHeight = 50;   // 1 row: Previous, Next, Reset buttons
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

// Right-side step panel width (graph occupies the remaining left width)
let panelWidth = 220;

// ===========================================
// GRAPH DATA (same 6-node example graph as the Graph Anatomy Explorer,
// extended with Report 45 and Dana, both reachable only via Chinook Labs)
// ===========================================
const nodes = [
  { id: 1, label: 'Ada', type: 'person', fx: 0.16, fy: 0.22 },
  { id: 2, label: 'Ben', type: 'person', fx: 0.16, fy: 0.82 },
  { id: 3, label: 'Chinook Labs', type: 'organization', fx: 0.48, fy: 0.52 },
  { id: 4, label: 'Report 12', type: 'document', fx: 0.82, fy: 0.16 },
  { id: 5, label: 'Report 45', type: 'document', fx: 0.82, fy: 0.52 },
  { id: 6, label: 'Dana', type: 'person', fx: 0.82, fy: 0.88 }
];

const edges = [
  { from: 1, to: 2, predicate: 'KNOWS', directed: false },
  { from: 1, to: 3, predicate: 'WORKS_AT', directed: true },
  { from: 2, to: 3, predicate: 'WORKS_AT', directed: true },
  { from: 1, to: 4, predicate: 'AUTHORED', directed: true },
  { from: 3, to: 4, predicate: 'PUBLISHED', directed: true },
  { from: 3, to: 5, predicate: 'PUBLISHED', directed: true },
  { from: 6, to: 3, predicate: 'WORKS_AT', directed: true }
];

const startNodeId = 1;

// ===========================================
// STATE
// ===========================================
let path = [startNodeId];       // confirmed traversal path so far
let pendingCandidateId = null;  // clicked-but-not-yet-confirmed next node

// UI elements
let nextButton, previousButton, resetButton;

// ===========================================
// SETUP
// ===========================================
function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  previousButton = createButton('Previous');
  previousButton.position(10, drawHeight + 10);
  previousButton.mousePressed(onPrevious);

  nextButton = createButton('Next');
  nextButton.position(100, drawHeight + 10);
  nextButton.mousePressed(onNext);

  resetButton = createButton('Reset');
  resetButton.position(170, drawHeight + 10);
  resetButton.mousePressed(onReset);

  describe('Interactive graph traversal stepper. Click a node adjacent to ' +
    'the current node to select it, then press Next to confirm the move ' +
    'and add it to the visited path.', LABEL);
}

// ===========================================
// DRAW
// ===========================================
function draw() {
  updateCanvasSize();

  const leftWidth = canvasWidth - panelWidth;

  // Drawing region background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control region background
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Divider between graph area and step panel
  stroke('silver');
  line(leftWidth, 0, leftWidth, drawHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Step Through a Graph Traversal', leftWidth / 2, 8);

  const currentId = path[path.length - 1];
  const neighborIds = adjacentIds(currentId);

  drawEdges(leftWidth, neighborIds, currentId);
  drawNodes(leftWidth, neighborIds, currentId);
  drawStepPanel(leftWidth, currentId, neighborIds);

  updateButtonStates();
}

// ===========================================
// GRAPH HELPERS
// ===========================================

function adjacentIds(nodeId) {
  const ids = [];
  edges.forEach(e => {
    if (e.from === nodeId && !ids.includes(e.to)) ids.push(e.to);
    if (e.to === nodeId && !ids.includes(e.from)) ids.push(e.from);
  });
  return ids;
}

function nodeById(id) {
  return nodes.find(n => n.id === id);
}

function nodePixelPos(node, leftWidth) {
  const top = 34;
  const bottom = drawHeight - 12;
  return {
    x: node.fx * leftWidth,
    y: top + node.fy * (bottom - top)
  };
}

function nodeHalfSize(node) {
  if (node.type === 'person') {
    return { rx: 34, ry: 34, ellipse: true };
  }
  return { rx: 54, ry: 24, ellipse: false };
}

function isInsideNode(node, leftWidth, mx, my) {
  const p = nodePixelPos(node, leftWidth);
  const h = nodeHalfSize(node);
  if (h.ellipse) {
    return dist(mx, my, p.x, p.y) <= h.rx;
  }
  return mx >= p.x - h.rx && mx <= p.x + h.rx && my >= p.y - h.ry && my <= p.y + h.ry;
}

// ===========================================
// DRAWING: EDGES
// ===========================================

function drawEdges(leftWidth, neighborIds, currentId) {
  edges.forEach(e => {
    const a = nodeById(e.from);
    const b = nodeById(e.to);
    const pa = nodePixelPos(a, leftWidth);
    const pb = nodePixelPos(b, leftWidth);

    const onConfirmedPath = isEdgeOnPath(e);

    if (onConfirmedPath) {
      stroke('gold');
      strokeWeight(4);
    } else {
      stroke(180);
      strokeWeight(2);
    }

    // Shrink the line at both ends so it doesn't run under the node shapes
    const ha = nodeHalfSize(a);
    const hb = nodeHalfSize(b);
    const angle = atan2(pb.y - pa.y, pb.x - pa.x);
    const startX = pa.x + cos(angle) * (ha.ellipse ? ha.rx : ha.rx * 0.9);
    const startY = pa.y + sin(angle) * (ha.ellipse ? ha.ry : ha.ry * 0.9);
    const endX = pb.x - cos(angle) * (hb.ellipse ? hb.rx : hb.rx * 0.9);
    const endY = pb.y - sin(angle) * (hb.ellipse ? hb.ry : hb.ry * 0.9);

    line(startX, startY, endX, endY);

    if (e.directed) {
      drawArrowhead(endX, endY, angle, onConfirmedPath ? 'gold' : color(120));
    }

    // Edge label at midpoint
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    noStroke();
    fill(onConfirmedPath ? color('#8a6d00') : color(90));
    textSize(10);
    textAlign(CENTER, CENTER);
    text(e.predicate, midX, midY - 6);
  });
  strokeWeight(1);
}

function isEdgeOnPath(edge) {
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i];
    const b = path[i + 1];
    if ((edge.from === a && edge.to === b) || (edge.from === b && edge.to === a)) {
      return true;
    }
  }
  return false;
}

function drawArrowhead(x, y, angle, col) {
  push();
  translate(x, y);
  rotate(angle);
  noStroke();
  fill(col);
  triangle(0, 0, -10, -5, -10, 5);
  pop();
}

// ===========================================
// DRAWING: NODES
// ===========================================

function typeColor(type) {
  if (type === 'person') return color('lightblue');
  if (type === 'organization') return color('orange');
  return color('lightgray'); // document
}

function drawNodes(leftWidth, neighborIds, currentId) {
  const visitedSet = new Set(path);

  nodes.forEach(node => {
    const p = nodePixelPos(node, leftWidth);
    const h = nodeHalfSize(node);
    const isCurrent = node.id === currentId;
    const isPending = node.id === pendingCandidateId;
    const isCandidate = neighborIds.includes(node.id) && !isCurrent;
    const isVisited = visitedSet.has(node.id);

    let fillCol = typeColor(node.type);
    if (!isCurrent && !isCandidate && !isPending) {
      // Dim nodes that are not the current node and not a clickable candidate
      fillCol = color(red(fillCol), green(fillCol), blue(fillCol), 110);
    }
    if (isPending) {
      fillCol = color('gold');
    }
    if (isCurrent) {
      fillCol = color('mediumseagreen');
    }

    if (isCandidate) {
      stroke('darkorange');
      strokeWeight(3);
    } else if (isCurrent) {
      stroke('black');
      strokeWeight(3);
    } else {
      stroke(120);
      strokeWeight(1.5);
    }

    fill(fillCol);
    if (h.ellipse) {
      ellipse(p.x, p.y, h.rx * 2, h.ry * 2);
    } else {
      rectMode(CENTER);
      rect(p.x, p.y, h.rx * 2, h.ry * 2, 6);
      rectMode(CORNER);
    }

    noStroke();
    fill(isCurrent ? 'white' : 'black');
    textAlign(CENTER, CENTER);
    textSize(12);
    text(node.label, p.x, p.y);

    // Visit-order badge for visited nodes
    if (isVisited) {
      const order = path.indexOf(node.id) + 1;
      noStroke();
      fill('black');
      textAlign(CENTER, CENTER);
      textSize(10);
      text(order, p.x + h.rx - 6, p.y - h.ry + 8);
    }
  });
}

// ===========================================
// DRAWING: STEP PANEL (right side)
// ===========================================

function drawStepPanel(leftWidth, currentId, neighborIds) {
  const panelX = leftWidth + 14;
  const panelRight = canvasWidth - 10;
  const lineHeight = 18;
  let y = 34;

  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(13);

  text('Visited:', panelX, y);
  y += lineHeight;

  path.forEach((id, i) => {
    text((i + 1) + '. ' + nodeById(id).label, panelX, y);
    y += lineHeight;
  });

  y += 6;
  fill('black');
  text('Currently at:', panelX, y);
  y += lineHeight;
  textStyle(BOLD);
  text(nodeById(currentId).label, panelX, y);
  textStyle(NORMAL);
  y += lineHeight + 8;

  // Prompt or pending-selection status
  if (pendingCandidateId !== null) {
    fill('#8a6d00');
    text('Selected: ' + nodeById(pendingCandidateId).label, panelX, y, panelRight - panelX);
    y += lineHeight;
    fill('black');
    text('Click Next to confirm.', panelX, y, panelRight - panelX);
    y += lineHeight * 2;
  } else {
    fill('black');
    text('Which node will we visit next?', panelX, y, panelRight - panelX);
    y += lineHeight;
    text('Pick any node adjacent to', panelX, y, panelRight - panelX);
    y += lineHeight;
    textStyle(BOLD);
    text(nodeById(currentId).label + '.', panelX, y, panelRight - panelX);
    textStyle(NORMAL);
    y += lineHeight * 2;
  }

  // Running summary sentence once at least one step has been confirmed
  if (path.length >= 2) {
    y += 4;
    fill(90);
    textSize(12);
    const stepWord = (path.length - 1) === 1 ? 'edge' : 'edges';
    const sentence = 'You traversed from ' + path.map(id => nodeById(id).label).join(' to ') +
      ' by following ' + (path.length - 1) + ' ' + stepWord + ', one step at a time.';
    text(sentence, panelX, y, panelRight - panelX, drawHeight - y - 10);
  }
}

// ===========================================
// BUTTON HANDLERS
// ===========================================

function onNext() {
  if (pendingCandidateId !== null) {
    path.push(pendingCandidateId);
    pendingCandidateId = null;
  }
}

function onPrevious() {
  if (path.length > 1) {
    path.pop();
    pendingCandidateId = null;
  }
}

function onReset() {
  path = [startNodeId];
  pendingCandidateId = null;
}

function updateButtonStates() {
  if (pendingCandidateId !== null) {
    nextButton.removeAttribute('disabled');
  } else {
    nextButton.attribute('disabled', '');
  }

  if (path.length > 1) {
    previousButton.removeAttribute('disabled');
  } else {
    previousButton.attribute('disabled', '');
  }
}

// ===========================================
// MOUSE INTERACTION (click a candidate node)
// ===========================================

function mousePressed() {
  if (mouseY < 0 || mouseY > drawHeight || mouseX < 0 || mouseX > canvasWidth) return;

  const leftWidth = canvasWidth - panelWidth;
  const currentId = path[path.length - 1];
  const neighborIds = adjacentIds(currentId);

  for (const node of nodes) {
    if (isInsideNode(node, leftWidth, mouseX, mouseY)) {
      if (neighborIds.includes(node.id)) {
        pendingCandidateId = node.id;
      }
      return;
    }
  }
}

// ===========================================
// RESPONSIVE SIZING (REQUIRED - keep at end of file)
// ===========================================

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
  // Keep the panel a reasonable fraction of narrow containers so the graph
  // area never collapses to zero width.
  panelWidth = Math.max(150, Math.min(220, canvasWidth * 0.35));
}
