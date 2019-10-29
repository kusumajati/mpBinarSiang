<<<<<<< HEAD
# mpbinar
<h3>Autentikasi</h3>
<ol>
	<li>Autentikasi "Auth.js" di buat sebagai middleware untuk cek jika user sudah login sebelum akses endpoint </li>
	<li>Contoh endpointnya adalah "productCreate", "/product" dengan method POST</li>

</ol>

<h4>Steps:</h4>
<ol>
	<li>Buat endpoint untuk login dengan response user._id dan token jwt</li>
	<li>Buat middleware "Auth.js" dengan handler if(req.headers.authorization), dan next() jika ada authorization ada di header</li>
	<li>Pasang Auth.js sebagai middleware untuk productCreate,  app.post("/product", Auth, product.productCreate)</li>
	<li>token jwt ditaruh sebagai request header dari front-end (postman atau react app) untuk endpoint productCreate</li>

</ol>


=======
# mpBinarSiang

test
>>>>>>> 6c6667eb216478367b080fdb628a02bb89da97ab
