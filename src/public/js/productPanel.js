
const updatePro = () => {
    if (confirm("Save your product?") == true) {
        $('.detailProForm').attr('action', `https://${host}:${port}/api/product/update`)
        $('.detailProForm').submit();
    }
}

const addPro = () => {
    if (confirm("Add new product?") == true) {
        $('.addForm').attr('action', `https://${host}:${port}/api/product/add`)
        $('.addForm').submit();
    }
}

const removePro = () => {
    if (confirm("Remove product?") == true) {
        $('.detailProForm').attr('action', `https://${host}:${port}/api/product/remove`)
        $('.detailProForm').submit();
    }
}




const detailProduct = async (id) => {
    let url = `https://${host}:${port}/api/product/ProID=${id}`;
    $('.productContent .mssDetail').addClass('d-none');
    $('.detailProForm').removeClass('d-none');
    $('#detail-tab-pane').addClass('show active')
    $('#add-tab-pane').removeClass('show active');
    $('#add-tab').removeClass('active');
    $('#detail-tab').addClass('active');
    let data = await fetch(url, { credentials: "same-origin" });
    data = (await data.json())[0];
    $('.detailProForm .detailItem img').attr('src', `/images/pid/${data.ProID}/main_thumbs.jpg`);
    $('.detailProForm .detailItem [name="ProID"]').val(data.ProID);
    $('.detailProForm .detailItem [name="ProName"]').val(data.ProName);
    $('.detailProForm .detailItem [name="TinyDes"]').val(data.TinyDes);
    $('.detailProForm .detailItem [name="FullDes"]').val(data.FullDes);
    $('.detailProForm .detailItem [name="Price"]').val(data.Price);
    $('.detailProForm .detailItem [name="Quantity"]').val(data.Quantity);
    $('.detailProForm .detailItem [selected]').removeAttr('selected');
    $(`.detailProForm .detailItem [value="${data.CatID}"]`).attr('selected', true);
}

const updateData = (data) => {
    per_page = parseInt(data.per_page);
    page = parseInt(data.page);
    totalPage = parseInt(data.totalPage);
    products = data.products;
}

$('.catDropDown').text("All");

const generateProduct = () => {
    $('.proList').empty();
    for (let product of products) {
        const html = `<div class="card me-auto ms-auto  proCard mt-3 mb-3" ProID="${product.ProID}"  style="width: 18rem;">
                                            <img src="/images/pid/${product.ProID}/main_thumbs.jpg" class="card-img-top"
                                                alt="/images/pid/${product.ProID}/main_thumbs.jpg">
                                            <div class="card-body d-flex flex-column align-content-between ">
                                                <h5 class="card-title">${product.ProName}</h5>
                                                <p class="card-text">${product.TinyDes}</p>
                                                <p class="card-text">${product.Price}vnđ</p>
                                            </div>
                </div>`
        const listItem = $(html)
        listItem.on('click', async function (e) {
            await detailProduct($(this).attr('ProID'));
        })
        $('.proList').append(listItem);
    }

}

const updatePagination = () => {
    $('.pagePerTotal').text(`${page}/${totalPage}`);
}

$('.dropdown-item').on("click", async function () {
    $('.catDropDown').text($(this).text());
    currentCat = $(this).attr('CatID');
    if ($(this).attr('CatID') == undefined) {
        data = await fetch(`https://${host}:${port}/api/product/per_page=${per_page}/page=1`);
    } else {
        data = await fetch(`https://${host}:${port}/api/product/per_page=${per_page}/page=1/CatID=${$(this).attr('CatID')}`);
    }
    data = await data.json();
    updateData(data);
    updatePagination();
    generateProduct();
})

$('.pre').on('click', async function (e) {
    if (page > 1) {
        if (currentCat == undefined) {
            data = await fetch(`https://${host}:${port}/api/product/per_page=${per_page}/page=${page - 1}`);
        } else {
            data = await fetch(`https://${host}:${port}/api/product/per_page=${per_page}/page=${page - 1}/CatID=${currentCat}`);
        }
        data = await data.json();
        updateData(data);
        updatePagination();
        generateProduct()
    } else {
        e.preventDefault();
    }
})

$('.next').on('click', async function (e) {
    if (page < totalPage) {
        if (currentCat == undefined) {
            data = await fetch(`https://${host}:${port}/api/product/per_page=${per_page}/page=${page + 1}`);
        } else {
            data = await fetch(`https://${host}:${port}/api/product/per_page=${per_page}/page=${page + 1}/CatID=${currentCat}`);
        }
        data = await data.json();
        updateData(data);
        updatePagination();
        generateProduct();
    } else {
        e.preventDefault();
    }
})

$('.proCard').on('click', async function (e) {
    await detailProduct($(this).attr('ProID'));
})

/*  ==========================================
SHOW UPLOADED IMAGE
* ========================================== */
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imageResult')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

$(function () {
    $('#upload').on('change', function () {
        readURL(input);
    });
});

/*  ==========================================
    SHOW UPLOADED IMAGE NAME
* ========================================== */
var input = document.getElementById('upload');
var infoArea = document.getElementById('upload-label');

