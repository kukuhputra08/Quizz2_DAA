import heapq


def dijkstra(graph, start, destination):
    distances = {}
    previous_nodes = {}
    visited_order = []

    for node in graph:
        distances[node] = float("inf")
        previous_nodes[node] = None

    distances[start] = 0

    priority_queue = []
    heapq.heappush(priority_queue, (0, start))

    visited = set()

    while priority_queue:
        current_distance, current_node = heapq.heappop(priority_queue)

        if current_node in visited:
            continue

        visited.add(current_node)
        visited_order.append(current_node)

        if current_node == destination:
            break

        for neighbor, weight in graph[current_node].items():
            new_distance = current_distance + weight

            if new_distance < distances[neighbor]:
                distances[neighbor] = new_distance
                previous_nodes[neighbor] = current_node
                heapq.heappush(priority_queue, (new_distance, neighbor))

    path = []
    current = destination

    while current is not None:
        path.append(current)
        current = previous_nodes[current]

    path.reverse()

    if distances[destination] == float("inf"):
        return {
            "path": [],
            "total_distance": None,
            "visited_order": visited_order,
            "found": False
        }

    return {
        "path": path,
        "total_distance": distances[destination],
        "visited_order": visited_order,
        "found": True
    }