function addCategory(form) {
    console.log(form);
    categoryListApplication.inputKategori(form);
    categoryListApplication.displayCategoryList();
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
    category: {
        index: -1,
        name: null
    },
    categoryList: [],
    inputKategori: function (form) {
        this.category.index = form.index.value;
        this.category.name = form.name.value;

        if(!this.category.name) {
            alert('Nama tidak boleh kosong!');
            return false;
        }

        if(this.category.index == -1) {
            this.categoryList = this.categoryList || [];
            this.categoryList.push(copy(this.category));
        } else {
            this.categoryList[this.category.index] = copy(this.category)
        }

        categoryListDatabase.save(this.categoryList);
        this.resetFormCategory(form);
    },
    resetFormCategory: function (form) {
        this.category.name = null;
        this.category.index = -1;

        form.name.value = this.category.name;
        form.index.value = this.category.index;

        document.getElementById('btn-save-kategori').innerHTML = 'Simpan';
    },
    displayCategoryList: function () {
        this.categoryList = categoryListDatabase.get();
        const componentCategoryList = document.getElementById('daftar-kategori');
        componentCategoryList.innerHTML = '';
        if (this.categoryList === null) {
            console.log('Tidak ada kategori');
        } else {
        this.categoryList.forEach((category, index) => {
            componentCategoryList.innerHTML += `
            ${category.name} <br> 
            <div class="card-actions justify-end"> 
                <button class="btn btn-xs mr-2" onclick="categoryListApplication.editCategory(${index})">Edit</button>
                <button class="btn btn-xs btn-error" onclick="categoryListApplication.deleteCategory(${index})">Hapus</button> 
                </div>
            </div> 
        </div>`;
            });
        }
    },
    deleteCategory: function (index) {
        if(confirm('Apakah anda yakin ingin menghapus data ini ?')) {
            this.categoryList.splice(index, 1);
            categoryListDatabase.save(this.categoryList);
            this.displayCategoryList();
        }
    },
    editCategory: function (index) {
        const category = this.categoryList[index];
        const form = document.getElementById('form-kategori');
        form.name.value = category.name;
        form.index.value = index;

        document.getElementById('btn-save-kategori').innerHTML = 'Edit';
    }
}

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

categoryListApplication.displayCategoryList();