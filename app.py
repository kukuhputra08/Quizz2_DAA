from flask import Flask, jsonify, request, render_template
from graph_data import graph, locations, customers
from dijkstra import dijkstra

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/locations", methods=["GET"])
def get_locations():
    return jsonify({
        "locations": locations,
        "customers": customers,
        "graph": graph
    })


@app.route("/api/route", methods=["POST"])
def get_route():
    data = request.get_json()

    start = data.get("start", "A")
    destination = data.get("destination")

    if destination not in graph:
        return jsonify({
            "error": "Invalid destination"
        }), 400

    result = dijkstra(graph, start, destination)

    named_path = [locations[node] for node in result["path"]]
    named_visited = [locations[node] for node in result["visited_order"]]

    return jsonify({
        "start": start,
        "destination": destination,
        "path": result["path"],
        "named_path": named_path,
        "total_distance": result["total_distance"],
        "visited_order": result["visited_order"],
        "named_visited_order": named_visited,
        "found": result["found"],
        "algorithm": "Dijkstra Algorithm"
    })


if __name__ == "__main__":
    app.run(debug=True)