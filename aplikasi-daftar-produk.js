function addProduct(form) {
    console.log(form);
    productListApplication.inputProduk(form);
    productListApplication.displayproductList();
}

const productListDatabase = {
    save(productList) {
        localStorage.setItem('productList', JSON.stringify(productList));
    },

    get() {
        return JSON.parse(localStorage.getItem('productList'));
    }
}

const categoryListDatabase = {
    save(categoryList) {
        localStorage.setItem('categoryList', JSON.stringify(categoryList));
    },
    get() {
        return JSON.parse(localStorage.getItem('categoryList'));
    }
}

const categoryListApplication = {
    displayCategoryList: function () {
        this.categoryList = categoryListDatabase.get();
        const listCategory = document.getElementById('listCategory');
        this.categoryList.forEach((item) => {
            listCategory.innerHTML +=   `<option>${item.name}</option>`    
        })
    }
}

const productListApplication = {
    product: {
        index: -1,
        name: null,
        cost: null,
        stock: null,
        picture: null
    },
    productList: [],
    inputProduk: function (form) {
        this.product.index = form.index.value;
        this.product.name = form.name.value;
        this.product.cost = form.cost.value;
        this.product.stock = form.stock.value;
        this.product.picture = form.picture.value;

        if(!this.product.name) {
            alert('Nama tidak boleh kosong!');
            return false;
        }

        if(!this.product.cost) {
            alert('Harga tidak boleh kosong!');
            return false;
        }

        if(!this.product.stock) {
            alert('Stok tidak boleh kosong!');
            return false;
        }

        if(!this.product.picture) {
            alert('Gambar tidak boleh kosong!');
            return false;
        }

        if(this.product.index == -1) {
            this.productList = this.productList || [];
            this.productList.push(copy(this.product));
        } else {
            this.productList[this.product.index] = copy(this.product)
        }
        productListDatabase.save(this.productList);
        this.resetFormProduct(form);
    },

    resetFormProduct: function (form) {
        this.product.name = null;
        this.product.cost = null;
        this.product.stock = null;
        this.product.picture = null;
        this.product.index = -1;

        form.name.value = this.product.name;
        form.cost.value = this.product.cost;
        form.stock.value = this.product.stock;
        form.picture.value = this.product.picture;
        form.index.value = this.product.index;

        document.getElementById('btn-save-produk').innerHTML = 'Tambah';
    },
    displayproductList: function () {
        this.productList = productListDatabase.get();
        const componentProductList = document.getElementById('daftar-produk');
        componentProductList.innerHTML = '';
        if (this.productList === null) {
            console.log('Tidak ada produk');
        } else {
        this.productList.forEach((product, index) => {
            componentProductList.innerHTML += `
            <div class="flex justify-between">
                <div> ${product.name} 
                    <br> harga : ${product.cost} 
                    <br> Stok : ${product.stock} 
                    <br> <img src="${product.picture}" width="200" height="200";> <br>
                    <div class="card-actions justify-end">
                        <button class="btn btn-xs mr-2" onclick="productListApplication.editProduct(${index})">Edit</button>
                        <button class="btn btn-xs btn-error" onclick="productListApplication.deleteProduct(${index})">Hapus</button> 
                    </div>
                </div> 
            </div>`;
        });
    }
    },
    deleteProduct: function (index) {
        if(confirm('Apakah anda yakin ingin menghapus data ini ?')) {
            this.productList.splice(index, 1);
            productListDatabase.save(this.productList);
            this.displayproductList();
        }
    },
    editProduct: function (index) {
        const product = this.productList[index];
        const form = document.getElementById('form-produk');
        form.name.value = product.name;
        form.cost.value = product.cost;
        form.stock.value = product.stock;
        form.picture.value = product.picture;
        form.index.value = index;

        document.getElementById('btn-save-produk').innerHTML = 'Edit';
    }
}
 
function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

productListApplication.displayproductList();
categoryListApplication.displayCategoryList();