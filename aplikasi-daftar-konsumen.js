function addConsumer(form) {  
    console.log(form);
    consumerListApplication.inputKonsumen(form);
    consumerListApplication.displayConsumerList();
}

const consumerListDatabase = {
    save(consumerList) {
        localStorage.setItem('consumerList', JSON.stringify(consumerList));
    },
    get() {
        return JSON.parse(localStorage.getItem('consumerList'));
    }
}

const consumerListApplication = {
    consumer: {
        index: -1,
        name: null,
        address: null,
        noPhone: null,
        email: null
    },
    consumerList: [],
    inputKonsumen: function (form) {
        this.consumer.index = form.index.value;
        this.consumer.name = form.name.value;
        this.consumer.address = form.address.value;
        this.consumer.noPhone = form.noPhone.value;
        this.consumer.email = form.email.value;
    
        if(!this.consumer.name) {
            alert('Nama tidak boleh kosong!');
            return false;
        }
        if(!this.consumer.address) {
            alert('Alamat tidak boleh kosong!');
            return false;
        }
        if(!this.consumer.noPhone) {
            alert('No HP tidak boleh kosong!');
            return false;
        }
        if(!this.consumer.email) {
            alert('Email tidak boleh kosong!');
            return false;
        }
        if(this.consumer.index == -1) {
            this.consumerList = this.consumerList || [];
            this.consumerList.push(copy(this.consumer));
        } else {
            this.consumerList[this.consumer.index] = copy(this.consumer)
        }

        consumerListDatabase.save(this.consumerList);
        this.resetFormConsumer(form);
    },
    resetFormConsumer: function (form) {
        this.consumer.name = null;
        this.consumer.address = null;
        this.consumer.noPhone = null;
        this.consumer.email = null;
        this.consumer.index = -1;

        form.name.value = this.consumer.name;
        form.address.value = this.consumer.address;
        form.noPhone.value = this.consumer.noPhone;
        form.email.value = this.consumer.email;
        form.index.value = this.consumer.index;

        document.getElementById('btn-save-konsumen').innerHTML = 'Simpan';
    },
    displayConsumerList: function () {
        this.consumerList = consumerListDatabase.get();
        const componentConsumerList = document.getElementById('daftar-konsumen');
        componentConsumerList.innerHTML = '';
        if (this.consumerList === null) {
            console.log('Tidak ada konsumen');
        } else {
        this.consumerList.forEach((consumer, index) => {
            componentConsumerList.innerHTML += `
            <div class="flex justify-between">
                <div> Nama : ${consumer.name}
                <br> Alamat : ${consumer.address} 
                <br> No Hp : ${consumer.noPhone} 
                <br> Email : ${consumer.email} <br>
                    <div class="card-actions justify-end">
                        <button class="btn btn-xs mr-2" onclick="consumerListApplication.editConsumer(${index})">Edit</button>
                        <button class="btn btn-xs btn-error" onclick="consumerListApplication.deleteConsumer(${index})">Hapus</button> 
                    </div>
                </div> 
            </div>`;
        });
        }
    },
        deleteConsumer: function (index) {
            if(confirm('Apakah anda yakin ingin menghapus data ini ?')) {
                this.consumerList.splice(index, 1);
                consumerListDatabase.save(this.consumer);
                this.displayConsumerList();
            }
        },
            editConsumer: function (index) {
            const consumer = this.consumerList[index];
            const form = document.getElementById('form-konsumen');
                form.name.value = consumer.name;
                form.address.value = consumer.address;
                form.noPhone.value = consumer.noPhone;
                form.email.value = consumer.email;
                form.index.value = index;

            document.getElementById('btn-save-konsumen').innerHTML = 'Edit';
            }
        }
        function copy(obj) {
        return JSON.parse(JSON.stringify(obj));
        } 

        consumerListApplication.displayConsumerList();