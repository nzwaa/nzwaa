function addTransaction(form) {
    console.log(form);
    transactionListApplication.inputTransaction(form);
    transactionListApplication.displayTransaction();
}

function addition() {
    transactionListApplication.displayCostTotal();
    transactionListApplication.displayAmountChange();
}

const transactionListDatabase = {
    save(transactionList) {
        localStorage.setItem('transactionList', JSON.stringify(transactionList));
    },
    get() {
        return JSON.parse(localStorage.getItem('transactionList'));
    }
}

const consumerListDatabase = {
    save(consumerList) {
        localStorage.setItem('consumerList', JSON.stringify(consumerList));
    },
    get() {
        return JSON.parse(localStorage.getItem('consumerList'));
    }
}

const productListDatabase = {
    save(productList) {
        localStorage.setItem('productList', JSON.stringify(productList));
    },

    get() {
        return JSON.parse(localStorage.getItem('productList'));
    }
}

$('#listProduct').on('change', function(){
    const name = $('#listProduct option:selected').data('name');
    const cost = $('#listProduct option:selected').data('cost');
    const stock = $('#listProduct option:selected').data('stock');
    const picture = $('#listProduct option:selected').data('picture');
    
    $('[name=name]').val(name);
    $('[name=cost]').val(cost);
    $('[name=stock]').val(stock);
    $('[name=picture]').val(picture);
  });

const productListApplication = {
    displayproductList: function () {
        this.productList = productListDatabase.get();
        const listProduct = document.getElementById('listProduct');
        this.productList.forEach((item) => {
            listProduct.innerHTML +=   `<option data-name="${item.name}" data-cost="${item.cost}" data-stock="${item.stock}" data-picture="${item.picture}">${item.name}</option>`    
        })
    }
}

const consumerListApplication = {
    displayConsumerList: function () {
        this.consumerList = consumerListDatabase.get();

        const listConsumer = document.getElementById('listConsumer');
        if(this.consumerList === null) {
            this.consumerList =[];
        }else {
            this.consumerList.forEach((item) => {
                listConsumer.innerHTML += `<option>${item.name}</option>`
        })
        }
    }
}

const transactionListApplication = {
    transaction: {
        index: -1,
        listConsumer: null,
        listProduct: null,
        name: null,
        cost: null,
        stock: null,
        picture: null,
        amount: null,
        total: null,
        cash: null,
        change: null
    },
    transactionList: [],
    inputTransaction: function (form) {
        this.transaction.index = form.index.value;
        this.transaction.listConsumer = form.listConsumer.value;
        this.transaction.listProduct = form.listProduct.value;
        this.transaction.name = form.name.value;
        this.transaction.cost = form.cost.value;
        this.transaction.stock = form.stock.value;
        this.transaction.picture = form.picture.value;
        this.transaction.amount = form.amount.value;
        this.transaction.total = form.total.value;
        this.transaction.cash = form.cash.value;
        this.transaction.change = form.change.value;


        if(!this.transaction.listConsumer) {
            alert('Konsumen tidak boleh kosong!');
            return false;
        }
        if(!this.transaction.listProduct) {
            alert('Produk tidak boleh kosong!');
            return false;
        }
        if(!this.transaction.name) {
            alert('Nama produk tidak boleh kosong!');
            return false;
        }
        if(!this.transaction.cost) {
            alert('harga produk tidak boleh kosong!');
            return false;
        }
        if(!this.transaction.stock) {
            alert('Stok produk tidak boleh kosong!');
            return false;
        }
        if(!this.transaction.picture) {
            alert('Link gambar produk tidak boleh kosong!');
            return false;
        }
        if(!this.transaction.amount) {
            alert('Jumlah tidak boleh kosong!');
            return false;
        }
        if(!this.transaction.total) {
            alert('Total harga tidak boleh kosong!');
            return false;
        }
        if(!this.transaction.cash) {
            alert('Tunai tidak boleh kosong!');
            return false;
        }
        if(!this.transaction.change) {
            alert('kembali tidak boleh kosong!');
            return false;
        }
        if(this.transaction.index == -1) {
            this.transactionList = this.transactionList || [];
            this.transactionList.push(copy(this.transaction));
        } else {
            this.transactionList[this.transaction.index] = copy(this.transaction)
        }
        transactionListDatabase.save(this.transactionList);
        this.resetFormtransaction(form);
    },
    resetFormtransaction: function(form) {
        this.transaction.index = -1;
        this.transaction.listConsumer = null;
        this.transaction.listProduct = null;
        this.transaction.name = null;
        this.transaction.cost = null;
        this.transaction.stock = null;
        this.transaction.picture = null;
        this.transaction.amount = null;
        this.transaction.total = null;
        this.transaction.cash = null;
        this.transaction.change = null;

        form.index.value = this.transaction.index;
        form.listConsumer.value = this.transaction.listConsumer;
        form.listProduct.value = this.transaction.listProduct;
        form.name.value = this.transaction.name;
        form.cost.value = this.transaction.cost
        form.stock.value = this.transaction.stock;
        form.picture.value = this.transaction.picture;
        form.amount.value = this.transaction.amount;
        form.total.value = this.transaction.total;
        form.cash.value = this.transaction.cash;
        form.change.value = this.transaction.change;

        document.getElementById('btn-save-transaksi').innerHTML = 'Simpan';
    },
    displayTransaction: function () {
        this.transactionList = transactionListDatabase.get();
        const componenttransactionList = document.getElementById('daftar-transaksi');
        
        componenttransactionList.innerHTML = '';
        if (this.transactionList === null) {
            this.transactionList = [];
        } else {
            this.transactionList.forEach((transaction, index) => {
                componenttransactionList.innerHTML += 
                    `<div class="flex justify-between">
                        <div>
                            ${transaction.listConsumer} <br>
                            ${transaction.name} <br> 
                            Harga:${transaction.cost} <br> 
                            Stok: ${transaction.stock} <br> 
                            Jumlah: ${transaction.amount} <br> 
                            Total Harga: ${transaction.total} <br> 
                            Tunai: ${transaction.cash} <br> 
                            kembali: ${transaction.change} <br> 
                        </div>
                        <div>
                            <img src="${transaction.picture}" width="110px" height="110px"> <br>
                        </div>
                    </div>`;
            });
        }
    },

    displayCostTotal: function() {
        var costValue = document.getElementById('cost').value;
        var amountValue = document.getElementById('amount').value;
        var result = parseInt(costValue) * parseInt(amountValue);
        if (!isNaN(result)) {
           document.getElementById('total').value = result;
        }
    },
    
    displayAmountChange: function() {
        var cashValue = document.getElementById('cash').value;
        var totalvalue = document.getElementById('total').value;
        var result = parseInt(cashValue) - parseInt(totalvalue);
        if (!isNaN(result)) {
           document.getElementById('change').value = result;
        }
    }
}

    

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

transactionListApplication.displayTransaction();
consumerListApplication.displayConsumerList();
productListApplication.displayproductList();