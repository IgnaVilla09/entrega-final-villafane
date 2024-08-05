# Desafio Coder

Backend para ecommerce. Se aplicaron patrones de diseño (DAO, DTO), mailing, variables de entorno, prueba de errores, autenticación con JWT, mocks y loggers.

Implementacion de testing unitario y avanzado. Mocha y Chai.

## Deployment

Para ejecutar se necesita instalar paquetes de node, configurar variables de entorno (.env). Comando de ejecución en terminal:

```bash
  npm run dev
```

## Funciones de endpoints

- Registro/Login.
- Registro con Github.
- Recuperación de contraseña con JWT.
- Logout.
- Autenticación con JWT.
- (Solo para usuarios) Acceder al chat.
- (Solo para usuarios, Premium) Añadir productos al carrito.
- Ver el carrito.
- Cambio de rol de premium/usuario.
- Eliminar individualmente items del carrito.
- Eliminar todos los items del carrito.
- Procesar compra (DETALLADO MAS ABAJO).
- Ver listado en tiempo real.
- (Solo para admin, Premium) Añadir productos a la tienda.
- (Solo para admin) Actualizar información de items de la tienda.
- (Solo para admin, Premium(limitado)) Eliminar de items de la tienda.

#### Detalles de funcionamiento:

Tanto al añadir item al carrito, como la eliminación individual o colectiva de los productos en el carrito provoca que aumente y disminuya, respectivamente, el stock del producto en DB.

#### PRUEBA DE ERRORES

Se utiliza un handleError para la creación de productos, asegurando el rol del usuario sea admin y que complete los argumentos obligatorios. Evitando que al fallar la creación el servidor caiga.

#### MOCKS

Se añadió un endpoint que genera 100 productos fake con faker.js

```bash
  http://localhost:8080/mockingproducts
```

Por razones de la dependencia, los datos son random y pueden no tener una coherencia total. Se utiliza para generar productos random

## GET Usuario

Para visualizar los datos de la session y el usuario conectado se aplico la ruta protegida con DTO y asi ocultar información sensible del usuario

```bash
   http://localhost:8080/api/session/current
```

#### LOGGERS

Se añadió un endpoint que genera muestra de loggers dependiendo del MODE del .env

```bash
   http://localhost:8080/loggerTest
```

## PROCESO DE COMPRA

### Restricciones

El usuario Premium y Admin puede crear productos, el usuario premium no puede añadir al carrito su propio producto. El admin no puede agregar ningun producto al carrito, ni realizarlas.

El usuario admin/premium pueden eliminar productos de la tienda. Premium solo sus productos, admin cualquiera de ellos.

## COMPRAS:

El carrito posee un botón de procesamiento de compra. Al accionarse se realizan 2 acciones.

#### Creación de Ticket

Se crea un ticket detallando el monto, el mail del comprador, un código de ticket y fecha y hora exacta del momento de compra. Al crearse, automáticamente llama al método de envió de mail.

#### Envió de mail

Se utiliza Nodemailer para enviar un mail al usuario con el ticket de su orden. En este caso el mail de destino será el mail de la persona a cargo de la prueba de este proyecto.

Seguido de eso redirige a un Handlebars con un mensaje de agradecimiento con la oportunidad de volver a la pagina de Inicio.

### SWAGGER

```bash
   http://localhost:8080/api-docs
```

Documentacion de la api
