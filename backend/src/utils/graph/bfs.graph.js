function buildGraphFromConnections(connections) {
  const graph = new Map();
  for (const conn of connections) {
    // Extraer el ID desde el documento poblado si existe
    const fromId =
      conn.from && conn.from._id
        ? conn.from._id.toString()
        : conn.from.toString();
    const toId =
      conn.to && conn.to._id ? conn.to._id.toString() : conn.to.toString();

    if (!graph.has(fromId)) {
      graph.set(fromId, []);
    }
    if (!graph.has(toId)) {
      graph.set(toId, []);
    }

    // Agregamos la arista en ambos sentidos para que el grafo sea bidireccional
    graph.get(fromId).push(toId);
    graph.get(toId).push(fromId);
  }

  for (const [key, neighbors] of graph.entries()) {
    console.log("  Nodo:", key, "Vecinos:", neighbors);
  }
  return graph;
}

function canTravel(graph, start, goal) {
  console.log("Iniciando BFS. Start:", start, "Goal:", goal);
  const queue = [start];
  const visited = new Set([start]);

  while (queue.length > 0) {
    const current = queue.shift();
    console.log("Visitando:", current);
    if (current === goal) {
      console.log("¡Encontrado el destino!");
      return true;
    }

    for (const neighbor of graph.get(current) || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        console.log(`Encolando vecino de ${current}:`, neighbor);
      }
    }
  }

  console.log("No se encontró un camino en el BFS");
  return false;
}

export { buildGraphFromConnections, canTravel };
