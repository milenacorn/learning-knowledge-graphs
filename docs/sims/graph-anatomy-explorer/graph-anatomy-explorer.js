// Graph Anatomy Explorer - vis-network MicroSim
// CANVAS_HEIGHT: 500
// Teaches: Node, Edge, Directed Edge, Undirected Edge, Adjacency (Chapter 1: Graph Fundamentals)
//
// Bloom Level: Remember / Understand (L1/L2)
// Learning objective: Identify nodes, directed/undirected edges, and adjacent
// node pairs in a small example graph by hovering for tooltips and clicking
// to reveal adjacency, using discrete state changes rather than animation.

// ===========================================
// CONFIGURATION
// ===========================================

const colors = {
    person: { background: '#97c2fc', border: '#2b7ce9', font: '#1a1a1a' },
    organization: { background: '#ffb74d', border: '#e65100', font: '#1a1a1a' },
    document: { background: '#cfd8dc', border: '#455a64', font: '#1a1a1a' },
    highlighted: { background: '#4caf50', border: '#2e7d32', font: '#ffffff' }
};

const shapeByType = {
    person: 'ellipse',
    organization: 'box',
    document: 'box'
};

// ===========================================
// STATE VARIABLES
// ===========================================
let graphData = null;
let nodeData = [];
let edgeData = [];
let nodes, edges, network;
let selectedNodeId = null;

// ===========================================
// DATA LOADING
// ===========================================

async function loadGraphData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        graphData = await response.json();
        nodeData = graphData.nodes;
        edgeData = graphData.edges;
        return true;
    } catch (error) {
        console.error('Error loading graph data:', error);
        nodeData = [];
        edgeData = [];
        return false;
    }
}

// ===========================================
// TOOLTIP TEXT BUILDERS
// ===========================================

// vis-network renders a string `title` as literal escaped text, not HTML.
// Rich tooltips require an actual DOM element instead.
function nodeTooltip(node) {
    const div = document.createElement('div');
    div.style.maxWidth = '220px';
    div.innerHTML = `<strong>NODE</strong><br>` +
        `Represents: <strong>${node.label}</strong><br>` +
        `Type: ${node.type}`;
    return div;
}

function edgeTooltip(edge) {
    const fromNode = nodeData.find(n => n.id === edge.from);
    const toNode = nodeData.find(n => n.id === edge.to);
    const kind = edge.directed ? 'DIRECTED EDGE' : 'UNDIRECTED EDGE';
    const arrow = edge.directed ? '&rarr;' : '&mdash;';
    const div = document.createElement('div');
    div.style.maxWidth = '240px';
    div.innerHTML = `<strong>${kind}</strong><br>` +
        `${fromNode.label} ${arrow} ${edge.predicate} ${arrow} ${toNode.label}`;
    return div;
}

// ===========================================
// NETWORK INITIALIZATION
// ===========================================

function nodeColorFor(node) {
    return colors[node.type] || colors.document;
}

function buildVisNode(node) {
    const c = nodeColorFor(node);
    return {
        id: node.id,
        label: node.label,
        shape: shapeByType[node.type] || 'box',
        x: node.x,
        y: node.y,
        color: { background: c.background, border: c.border },
        font: { color: c.font, size: 14 },
        title: nodeTooltip(node)
    };
}

function buildVisEdge(edge) {
    return {
        id: edge.id,
        from: edge.from,
        to: edge.to,
        label: edge.predicate,
        arrows: edge.directed ? { to: { enabled: true, scaleFactor: 1 } } : { to: { enabled: false } },
        color: { color: edge.directed ? '#333333' : '#666666' },
        dashes: false,
        width: 2,
        font: { size: 10, align: 'top' },
        title: edgeTooltip(edge),
        smooth: { type: 'curvedCW', roundness: 0.15 }
    };
}

function initializeNetwork() {
    selectedNodeId = null;

    const visNodes = nodeData.map(buildVisNode);
    const visEdges = edgeData.map(buildVisEdge);

    nodes = new vis.DataSet(visNodes);
    edges = new vis.DataSet(visEdges);

    const options = {
        layout: {
            improvedLayout: false
        },
        physics: {
            enabled: false
        },
        interaction: {
            selectConnectedEdges: false,
            zoomView: false,
            dragView: false,
            dragNodes: false,
            navigationButtons: true,
            hover: true
        },
        nodes: {
            margin: 10,
            font: { size: 14, face: 'Arial' },
            borderWidth: 3,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.2)', size: 5, x: 2, y: 2 }
        },
        edges: {
            width: 2
        }
    };

    const container = document.getElementById('network');
    const data = { nodes: nodes, edges: edges };
    network = new vis.Network(container, data, options);

    network.on('click', handleClick);
    setupViewPosition();

    updateStats();
    clearInfoPanel();
}

// Compute scale and camera position from the actual measured widths of the
// network container and the right-side panel, so the graph fits the safe
// (non-overlapped) drawing area at any viewport width. Re-runs on resize.
function setupViewPosition() {
    network.once('afterDrawing', positionViewToFitPanel);
    window.addEventListener('resize', function () {
        if (network) positionViewToFitPanel();
    });
}

function positionViewToFitPanel() {
    if (!network) return;

    const networkEl = document.getElementById('network');
    const panelEl = document.querySelector('.right-panel');
    const containerWidth = networkEl.offsetWidth;
    const panelWidth = panelEl ? panelEl.offsetWidth + 20 : 0;
    const safeWidth = Math.max(containerWidth - panelWidth, 100);

    // Graph bounding box in diagram coordinate units, padded for node
    // radius/labels so nodes aren't clipped at the edges of the safe zone.
    const xs = nodeData.map(n => n.x);
    const minX = Math.min(...xs) - 70;
    const maxX = Math.max(...xs) + 70;
    const graphWidth = maxX - minX;
    const graphCenterX = (minX + maxX) / 2;

    let scale = safeWidth / graphWidth;
    scale = Math.min(Math.max(scale, 0.3), 1.1);

    // Shift the camera right of true center (which visually shifts the
    // diagram left) by half the panel's screen width, converted to diagram
    // units at this scale, so the graph settles inside the safe zone.
    const shiftUnits = (panelWidth / 2) / scale;

    network.moveTo({
        position: { x: graphCenterX + shiftUnits, y: 0 },
        scale: scale,
        animation: false
    });
}

// ===========================================
// EVENT HANDLERS
// ===========================================

function adjacentNodeIds(nodeId) {
    const ids = new Set();
    edgeData.forEach(edge => {
        if (edge.from === nodeId) ids.add(edge.to);
        if (edge.to === nodeId) ids.add(edge.from);
    });
    return Array.from(ids);
}

function handleClick(params) {
    // Reset all nodes to their default color first
    const resetUpdates = nodeData.map(node => {
        const c = nodeColorFor(node);
        return { id: node.id, color: { background: c.background, border: c.border }, font: { color: c.font, size: 14 } };
    });
    nodes.update(resetUpdates);

    if (params.nodes.length === 0) {
        // Clicked empty space: clear selection
        selectedNodeId = null;
        clearInfoPanel();
        return;
    }

    selectedNodeId = params.nodes[0];
    const clickedNode = nodeData.find(n => n.id === selectedNodeId);
    const neighborIds = adjacentNodeIds(selectedNodeId);

    // Highlight adjacent nodes
    const highlightUpdates = neighborIds.map(id => ({
        id: id,
        color: { background: colors.highlighted.background, border: colors.highlighted.border },
        font: { color: colors.highlighted.font, size: 14 }
    }));
    nodes.update(highlightUpdates);

    // Update info panel
    const neighborLabels = neighborIds.map(id => nodeData.find(n => n.id === id).label);
    showInfoPanel(clickedNode.label, neighborLabels);
}

function showInfoPanel(nodeLabel, neighborLabels) {
    const infoPanel = document.getElementById('info-panel');
    const infoContent = document.getElementById('info-content');
    if (!infoPanel || !infoContent) return;

    let html = `<strong>${nodeLabel}</strong><br>`;
    html += `<span style="color:#2e7d32;font-weight:bold;">ADJACENT NODES:</span><br>`;
    html += neighborLabels.length > 0
        ? neighborLabels.map(l => `&bull; ${l}`).join('<br>')
        : '<em>None</em>';

    infoContent.innerHTML = html;
    infoPanel.style.display = 'block';
}

function clearInfoPanel() {
    const infoPanel = document.getElementById('info-panel');
    const infoContent = document.getElementById('info-content');
    if (infoContent) {
        infoContent.innerHTML = '<p class="info-placeholder">Click a node to see its adjacent nodes.</p>';
    }
    if (infoPanel) {
        infoPanel.style.display = 'block';
    }
}

// ===========================================
// UI UPDATES
// ===========================================

function updateStats() {
    const statsElement = document.getElementById('stats');
    if (statsElement) {
        statsElement.textContent = `Nodes: ${nodeData.length} | Edges: ${edgeData.length}`;
    }
}

function reset() {
    initializeNetwork();
}

// ===========================================
// INITIALIZATION
// ===========================================

document.addEventListener('DOMContentLoaded', async function () {
    await loadGraphData();
    initializeNetwork();

    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', reset);
    }
});
