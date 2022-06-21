var productNameInput = document.getElementById(`productNameInput`);
var productPriceInput = document.getElementById(`productPriceInput`);
var productCategoryInput = document.getElementById(`productCategoryInput`);
var productDescInput = document.getElementById(`productDescInput`);
var submitBtn = document.getElementById(`submitBtn`);
var products = [];
var inputs = document.getElementsByClassName(`form-control`);
var currentIndex;
var inputsAlert = document.getElementById(`inputsAlert`)

// ! ************** start alerts*****************
var nameAlert = document.getElementById(`nameAlert`)
var priceAlert = document.getElementById(`priceAlert`)
var categoryAlert = document.getElementById(`categoryAlert`)
var descriptionAlert = document.getElementById(`descriptionAlert`)




// ! *******************end alerts****************














if (JSON.parse(localStorage.getItem("productsList")) != null) {
    products = JSON.parse(localStorage.getItem("productsList"))
    displayProduct()
}




submitBtn.onclick = function () {
    if (checkName() && checkPrice() && checkCategory() && checkDescription()) {
        if (submitBtn.innerHTML == "Add Product") {
            addProduct()
        } else {
            updateProduct()
        }
    
        displayProduct()
        clearForm()
        inputsAlert.classList.add("d-none");
    } else {
        inputsAlert.classList.remove("d-none");
        submitBtn.disabled ="false"
       
    }

  
}






function addProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescInput.value,
    };
    products.push(product);
    localStorage.setItem("productsList", JSON.stringify(products))
}

function clearForm() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

function displayProduct() {
    var trs = ``;
    for (var i = 0; i < products.length; i++) {
        trs += `
        <tr>
            <td>${i + 1}</td>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category}</td>
            <td>${products[i].description}</td>
            <td><button class="btn btn-success" onclick="getProductInfo(${i})">update</button></td>
            <td><button class="btn btn-danger" onclick="deleteProduct(${i})" >delete</button></td>
        </tr>
    
        `;
    }
    document.getElementById(`tableData`).innerHTML = trs;
}



function deleteProduct(index) {
    products.splice(index, 1)
    displayProduct()
    localStorage.setItem("productsList", JSON.stringify(products))
}




function getProductInfo(index) {
    productNameInput.value = products[index].name;
    productPriceInput.value = products[index].price
    productCategoryInput.value = products[index].category
    productDescInput.value = products[index].description
    submitBtn.innerHTML = `update`;
    currentIndex = index

}



function updateProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescInput.value,
    }
    products[currentIndex] = product
    displayProduct()
    localStorage.setItem("productsList", JSON.stringify(products))
    submitBtn.innerHTML = `Add Product`
}


function checkName() 
{
    if (nameRegex.test(productNameInput.value)) {
        return true
    } else {
        return false
    }
}







var nameRegex = /^[A-Z][a-z]{2,8}$/

productNameInput.onkeyup = function () {

    if (!nameRegex.test(productNameInput.value)) {
        submitBtn.disabled = `true`;
        productNameInput.classList.add(`is-invalid`)
        productNameInput.classList.remove(`is-valid`)
        productNameInput.classList.add(`fa-fade`)
        nameAlert.classList.replace(`d-none`, `d-block`)
        inputsAlert.classList.remove("d-none");
        submitBtn.disabled = true;
    } else {
        submitBtn.removeAttribute(`disabled`)
        productNameInput.classList.remove(`is-invalid`)
        inputsAlert.classList.add("d-none");
        productNameInput.classList.add(`is-valid`)
        nameAlert.classList.replace(`d-block`, `d-none`)
        productNameInput.classList.remove(`fa-fade`)
        submitBtn.disabled = false;
    }
}


function checkPrice() 
{
    if (priceRegex.test(productPriceInput.value)) {
        return true
    } else {
        return false
    }
}









var priceRegex = /^([1-9]{1}[0-9]{3}|10000)$/
productPriceInput.onkeyup = function () {
    
    if (!priceRegex.test(productPriceInput.value)) {
        productPriceInput.classList.add(`is-invalid`)
        productPriceInput.classList.remove(`is-valid`)
        productPriceInput.classList.add(`fa-fade`)
        priceAlert.classList.replace(`d-none`, `d-block`)
        inputsAlert.classList.remove("d-none");
        submitBtn.disabled = true;

    } else {
        submitBtn.removeAttribute(`disabled`)
        productPriceInput.classList.remove(`is-invalid`)
        productPriceInput.classList.add(`is-valid`)
        priceAlert.classList.replace(`d-block`, `d-none`)
        inputsAlert.classList.add("d-none");
        productPriceInput.classList.remove(`fa-fade`)
        submitBtn.disabled = false;
    }
}







function checkCategory() 
{
    if (catRegex.test(productCategoryInput.value)) {
        return true
    } else {
        return false
    }
}
















var catRegex = /^[a-z]{2,8}$/

productCategoryInput.onkeyup = function () {
   
    if (!catRegex.test(productCategoryInput.value)) {
        productCategoryInput.classList.add(`is-invalid`)
        productCategoryInput.classList.remove(`is-valid`)
        productCategoryInput.classList.add(`fa-fade`)
        categoryAlert.classList.replace(`d-none`, `d-block`)
        submitBtn.disabled = true;
        inputsAlert.classList.remove("d-none");

    } else {
        submitBtn.removeAttribute(`disabled`)
        productCategoryInput.classList.remove(`is-invalid`)
        productCategoryInput.classList.add(`is-valid`)
        categoryAlert.classList.replace(`d-block`, `d-none`)
        productCategoryInput.classList.remove(`fa-fade`)
        submitBtn.disabled = false;
        inputsAlert.classList.add("d-none");
    }
}




function checkDescription() 
{
    if (descRegex.test(productDescInput.value)) {
        return true
    } else {
        return false
    }
}












var descRegex = /^[a-z]{2,20}$/
productDescInput.onkeyup = function () {
    
    if (!descRegex.test(productDescInput.value)) {
        productDescInput.classList.add(`is-invalid`)
        productDescInput.classList.remove(`is-valid`)
        productDescInput.classList.add(`fa-fade`)
        descriptionAlert.classList.replace(`d-none`, `d-block`)
        submitBtn.disabled = true;
        inputsAlert.classList.remove("d-none");

    } else {
        submitBtn.removeAttribute(`disabled`)
        productDescInput.classList.remove(`is-invalid`)
        productDescInput.classList.add(`is-valid`)
        descriptionAlert.classList.replace(`d-block`, `d-none`)
        productDescInput.classList.remove(`fa-fade`)
        submitBtn.disabled = false;
        inputsAlert.classList.add("d-none");
    }
}




function validation() {
    if (productNameInput.value !="" && productPriceInput.value !="" && productCategoryInput.value !="" && productDescInput.value !="") {
        return true
    }else 
{
    return false
}

}