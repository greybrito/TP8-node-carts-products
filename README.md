# TP nro 8 carrito y productos

**Inicializacion**

1. npm install
2. npm start

**Products Endpoints:**

- `GET /`: Obtiene la lista de todos los productos.

curl --location 'http://localhost:8080/api/products?limit=10' \
--data ''

- `POST /`: Crea un producto y lo guarda en data/productos.json.

curl --location 'http://localhost:8080/api/products' \
--header 'Content-Type: application/json' \
--data '{
"title": "blabla",
"description": "ble",
"code": 10,
"price": 1000,
"status": true,
"stock": 100,
"category": "libros",
"thumbnails": []
}'

- `GET /products/{id}`: Obtiene un producto por ID.

curl --location 'http://localhost:8080/api/products/2'

- `DELETE /products/{id}`: Elimina un producto por ID.

curl --location --request DELETE 'http://localhost:8080/api/products/3'

- `PUT /products/{id}`: Modifica un producto por ID.

curl --location --request PUT 'http://localhost:8080/api/products/2' \
--header 'Content-Type: application/json' \
--data '{
"title": "blablaxxxx22",
"description": "ble",
"code": 10,
"price": 1000,
"status": true,
"stock": 100,
"category": "libros",
"thumbnails": []
}'

**Carts Endpoints:**

- `GET /carts/`: Obtener todos los carritos.

curl --location 'http://localhost:8080/api/carts'

- `POST /carts/`: Crear un carrito.

curl --location 'http://localhost:8080/api/carts' \
--header 'Content-Type: application/json' \
--data '{
"products": [
{
"id": 1,
"title": "blabla",
"description": "ble",
"code": 10,
"price": 1000,
"status": true,
"stock": 100,
"category": "libros",
"thumbnails": [],
"quantity": 2
},
{
"id": 2,
"title": "blabla",
"description": "ble",
"code": 10,
"price": 1000,
"status": true,
"stock": 100,
"category": "libros",
"thumbnails": [],
"quantity": 10
},
{
"id": 3,
"title": "blabla",
"description": "ble",
"code": 10,
"price": 1000,
"status": true,
"stock": 100,
"category": "libros",
"thumbnails": [],
"quantity": 6
}
]
}'

- `POST /carts/{id}/product/{id}`: Agregar un producto a un carrito.

curl --location 'http://localhost:8080/api/carts/1/product/3' \
--header 'Content-Type: application/json' \
--data '{
"title": "blabla4",
"description": "ble",
"code": 10,
"price": 1000,
"status": true,
"stock": 100,
"category": "libros",
"thumbnails": [],
"quantity": 3
}'
