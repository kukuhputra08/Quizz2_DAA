const nodePositions = {
    A: { x: 90, y: 400 },
    B: { x: 230, y: 210 },
    P: { x: 390, y: 120 },
    Q: { x: 560, y: 120 },
    R: { x: 730, y: 160 },
    C: { x: 250, y: 540 },
    D: { x: 420, y: 400 },
    E: { x: 590, y: 270 },
    S: { x: 730, y: 290 },
    H: { x: 810, y: 360 },
    I: { x: 970, y: 210 },
    L: { x: 990, y: 380 },
    F: { x: 430, y: 670 },
    T: { x: 610, y: 640 },
    U: { x: 780, y: 610 },
    G: { x: 680, y: 500 },
    K: { x: 900, y: 590 },
    J: { x: 560, y: 740 },
    M: { x: 1010, y: 510 },
    N: { x: 930, y: 700 },
    O: { x: 740, y: 730 },
    V: { x: 1030, y: 710 }
};

let locationsData = {};
let graphData = {};

async function loadCustomers() {
    const response = await fetch("/api/locations");
    const data = await response.json();

    locationsData = data.locations;
    graphData = data.graph;

    const destinationSelect = document.getElementById("destination");
    destinationSelect.innerHTML = "";

    for (const [code, name] of Object.entries(data.customers)) {
        const option = document.createElement("option");
        option.value = code;
        option.textContent = `${code} - ${name}`;
        destinationSelect.appendChild(option);
    }

    drawGraph(data.graph, data.locations);
}

function drawGraph(graph, locations) {
    const edgesGroup = document.getElementById("edges");
    const nodesGroup = document.getElementById("nodes");

    edgesGroup.innerHTML = "";
    nodesGroup.innerHTML = "";

    const drawnEdges = new Set();

    for (const from in graph) {
        for (const to in graph[from]) {
            const edgeKey = [from, to].sort().join("-");

            if (drawnEdges.has(edgeKey)) {
                continue;
            }

            drawnEdges.add(edgeKey);

            const fromPos = nodePositions[from];
            const toPos = nodePositions[to];

            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", fromPos.x);
            line.setAttribute("y1", fromPos.y);
            line.setAttribute("x2", toPos.x);
            line.setAttribute("y2", toPos.y);
            line.setAttribute("class", "edge");
            edgesGroup.appendChild(line);

            const midX = (fromPos.x + toPos.x) / 2;
            const midY = (fromPos.y + toPos.y) / 2;

            const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
            label.setAttribute("x", midX);
            label.setAttribute("y", midY - 6);
            label.setAttribute("class", "edge-label");
            label.textContent = graph[from][to] + " km";
            edgesGroup.appendChild(label);
        }
    }

    for (const code in locations) {
        const pos = nodePositions[code];

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("id", `node-${code}`);
        circle.setAttribute("cx", pos.x);
        circle.setAttribute("cy", pos.y);
        circle.setAttribute("r", 22);

        let nodeClass = "node";

        if (code === "A") {
            nodeClass += " store-node";
        }

        if (["I", "J", "K", "L", "M", "N", "O", "V"].includes(code)) {
            nodeClass += " customer-node";
        }

        circle.setAttribute("class", nodeClass);
        nodesGroup.appendChild(circle);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", pos.x);
        text.setAttribute("y", pos.y);
        text.setAttribute("class", "node-label");
        text.textContent = code;
        nodesGroup.appendChild(text);
    }

    moveAgentInstant("A");
}

function resetMap() {
    document.getElementById("routeLayer").innerHTML = "";

    for (const code in nodePositions) {
        const node = document.getElementById(`node-${code}`);

        if (!node) {
            continue;
        }

        node.classList.remove("visited-node");
        node.classList.remove("path-node");
    }

    moveAgentInstant("A");
}

function moveAgentInstant(code) {
    const agent = document.getElementById("agent");
    const pos = nodePositions[code];

    agent.setAttribute("cx", pos.x);
    agent.setAttribute("cy", pos.y);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateAgent(path) {
    const agent = document.getElementById("agent");
    const routeLayer = document.getElementById("routeLayer");

    for (let i = 0; i < path.length - 1; i++) {
        const from = path[i];
        const to = path[i + 1];

        const fromPos = nodePositions[from];
        const toPos = nodePositions[to];

        const routeLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        routeLine.setAttribute("x1", fromPos.x);
        routeLine.setAttribute("y1", fromPos.y);
        routeLine.setAttribute("x2", fromPos.x);
        routeLine.setAttribute("y2", fromPos.y);
        routeLine.setAttribute("class", "route-edge");
        routeLayer.appendChild(routeLine);

        const steps = 40;

        for (let step = 1; step <= steps; step++) {
            const progress = step / steps;

            const currentX = fromPos.x + (toPos.x - fromPos.x) * progress;
            const currentY = fromPos.y + (toPos.y - fromPos.y) * progress;

            agent.setAttribute("cx", currentX);
            agent.setAttribute("cy", currentY);

            routeLine.setAttribute("x2", currentX);
            routeLine.setAttribute("y2", currentY);

            await sleep(15);
        }

        const reachedNode = document.getElementById(`node-${to}`);

        if (reachedNode) {
            reachedNode.classList.add("path-node");
        }
    }
}

function highlightVisitedNodes(visitedOrder) {
    visitedOrder.forEach(code => {
        const node = document.getElementById(`node-${code}`);

        if (node) {
            node.classList.add("visited-node");
        }
    });
}

function highlightPathNodes(path) {
    path.forEach(code => {
        const node = document.getElementById(`node-${code}`);

        if (node) {
            node.classList.remove("visited-node");
            node.classList.add("path-node");
        }
    });
}

async function findRoute() {
    const destination = document.getElementById("destination").value;

    resetMap();

    const response = await fetch("/api/route", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            start: "A",
            destination: destination
        })
    });

    const data = await response.json();

    if (!response.ok) {
        alert(data.error || "Failed to calculate route");
        return;
    }

    document.getElementById("algorithm").textContent = data.algorithm;
    document.getElementById("route").textContent = data.named_path.join(" -> ");
    document.getElementById("distance").textContent = `${data.total_distance} km`;
    document.getElementById("visited").textContent = data.named_visited_order.join(" -> ");

    highlightVisitedNodes(data.visited_order);

    await sleep(500);

    highlightPathNodes(data.path);
    await animateAgent(data.path);
}

loadCustomers();