from graph_data import graph, locations
from dijkstra import dijkstra

start = "A"
destination = "I"

result = dijkstra(graph, start, destination)

print("=== Dijkstra Test ===")
print(f"Start: {locations[start]}")
print(f"Destination: {locations[destination]}")
print()

if result["found"]:
    path_names = [locations[node] for node in result["path"]]
    visited_names = [locations[node] for node in result["visited_order"]]

    print("Best Route:")
    print(" -> ".join(path_names))
    print()

    print(f"Total Distance: {result['total_distance']} km")
    print()

    print("Visited Nodes:")
    print(" -> ".join(visited_names))
else:
    print("Route not found.")