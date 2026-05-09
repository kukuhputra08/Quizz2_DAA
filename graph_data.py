locations = {
    "A": "Toko A",
    "B": "Gudang Utama",
    "C": "SPBU Timur",
    "D": "Persimpangan Sudirman",
    "E": "Mall Central",
    "F": "Kampus Utama",
    "G": "Stasiun Kota",
    "H": "Pasar Lama",
    "I": "Kos Iyan",
    "J": "Apartemen Budi",
    "K": "Kos Citra",
    "L": "Rumah Dimas",
    "M": "Perumahan Elok",
    "N": "Kantor Fajar",
    "O": "Rumah Gita",
    "P": "Jalan Merdeka",
    "Q": "Jalan Diponegoro",
    "R": "Jalan Asia Afrika",
    "S": "Terminal Bus",
    "T": "Klinik Sehat",
    "U": "Taman Kota",
    "V": "Customer VIP Kukuh"
}


customers = {
    "I": locations["I"],
    "J": locations["J"],
    "K": locations["K"],
    "L": locations["L"],
    "M": locations["M"],
    "N": locations["N"],
    "O": locations["O"],
    "V": locations["V"]
}

graph = {
    "A": {
        "B": 4,
        "C": 3,
        "D": 7
    },
    "B": {
        "A": 4,
        "E": 6,
        "P": 5
    },
    "C": {
        "A": 3,
        "D": 2,
        "F": 4,
        "Q": 6
    },
    "D": {
        "A": 7,
        "C": 2,
        "E": 3,
        "G": 8,
        "R": 5
    },
    "E": {
        "B": 6,
        "D": 3,
        "H": 4,
        "I": 7,
        "S": 5
    },
    "F": {
        "C": 4,
        "G": 3,
        "J": 6,
        "T": 4
    },
    "G": {
        "D": 8,
        "F": 3,
        "H": 2,
        "K": 5,
        "U": 6
    },
    "H": {
        "E": 4,
        "G": 2,
        "L": 4,
        "M": 7
    },
    "I": {
        "E": 7,
        "S": 4
    },
    "J": {
        "F": 6,
        "T": 5
    },
    "K": {
        "G": 5,
        "U": 4,
        "V": 5
    },
    "L": {
        "H": 4,
        "M": 3
    },
    "M": {
        "H": 7,
        "L": 3,
        "N": 5
    },
    "N": {
        "P": 9,
        "M": 5,
        "O": 4
    },
    "O": {
        "Q": 8,
        "N": 4,
        "V": 7
    },
    "P": {
        "B": 5,
        "Q": 3,
        "N": 9
    },
    "Q": {
        "C": 6,
        "P": 3,
        "R": 2,
        "O": 8
    },
    "R": {
        "D": 5,
        "Q": 2,
        "S": 3,
        "V": 10
    },
    "S": {
        "E": 5,
        "R": 3,
        "T": 2,
        "I": 4
    },
    "T": {
        "F": 4,
        "S": 2,
        "U": 3,
        "J": 5
    },
    "U": {
        "G": 6,
        "T": 3,
        "K": 4,
        "V": 6
    },
    "V": {
        "R": 10,
        "U": 6,
        "O": 7,
        "K": 5
    }
}